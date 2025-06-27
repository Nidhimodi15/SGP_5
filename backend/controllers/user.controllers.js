import userModel from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import { OAuth2Client } from "google-auth-library";
import apiResponse from "../utils/apiResponse.js"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateRefreshAndAccessToken = async (userId) => {
   try {
     const User = await userModel.findById(userId)
     const refreshToken =  User.generateRefreshToken()
     const accessToken =  User.generateAccessToken();
 
     User.refreshToken=refreshToken;
     await User.save({validateBeforeSave:false})
 
     return {
         accessToken,
         refreshToken,
         User
     }
   } catch (error) {
      throw new apiError("error while generating tokens",500,error)
   }
}

const getCookies=(req,res)=>{
   const accessTokenCookie = req?.cookies.accessToken;
   const refreshTokenCookie = req?.cookies.refreshToken
   return {accessTokenCookie,refreshTokenCookie}
}

const createUser = async (req, res) => {
    const { token } = req.body;

  try {

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleID, email, name, picture } = payload;

    const isUserExists = await userModel.findOne({
        $or:[{email},{googleID}]
    })

    if(isUserExists)
    {
        throw new apiError("User already exist with this Email or GoogleID")
    }

    const newUser = await userModel.create({
        googleID,
        email,
        name,
        profileIMG:picture
    })

    if(!newUser)
    {
        throw new apiError("Error while uploading details to db",500)
    }

    const { accessToken,refreshToken,User} = await generateRefreshAndAccessToken(newUser._id);

    const options = {
        httpOnly:false,
        secure:true,
    }
    // User=User.select("-refreshToken")

    return res.status(201)
    .cookie("refreshToken",refreshToken,options)
    .cookie("accessToken",accessToken,options)
    .json(
        new apiResponse(200,"User created successfully",{User,accessToken,refreshToken})
    )
  } catch (error) {
    throw new apiError(500, "Internal Server Error",error);
  }
};


export {createUser};