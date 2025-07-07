import userModel from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import { OAuth2Client } from "google-auth-library";
import apiResponse from "../utils/apiResponse.js";
import cloudinaryUpload from "../utils/cloudinary.js"
import fs from 'fs'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateRefreshAndAccessToken = async (userId) => {
  try {
    const User = await userModel.findById(userId);
    const refreshToken = User.generateRefreshToken();
    const accessToken = User.generateAccessToken();

    User.refreshToken = refreshToken;
    await User.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
      User,
    };
  } catch (error) {
    throw new apiError("error while generating tokens", 500, error);
  }
};

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
      $or: [{ email }, { googleID }],
    });

    if (isUserExists) {
      throw new apiError("User already exist with this Email or GoogleID",400);
    }

    const newUser = await userModel.create({
      googleID,
      email,
      name,
      profileIMG: picture,
    });

    if (!newUser) {
      throw new apiError("Error while uploading details to db", 500);
    }

    const { accessToken, refreshToken, User } =
      await generateRefreshAndAccessToken(newUser._id);

    const options = {
      httpOnly: false,
      secure: true,
    };

    return res
      .status(201)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new apiResponse(200, "User created successfully", {
          User,
          accessToken,
          refreshToken,
        })
      );
  } catch (error) {
    throw new apiError(500, "Internal Server Error", error);
  }
};

const loginUser = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleID, email} = payload;

    const isUserExists = await userModel.findOne({
      $or: [{ email }, { googleID }],
    });

    if (!isUserExists) {
      throw new apiError("User doesnot exist with this Email or GoogleID");
    }

    const { accessToken, refreshToken, User } =
      await generateRefreshAndAccessToken(isUserExists._id);

    const options = {
      httpOnly: false,
      secure: true,
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new apiResponse(200, "User LoggedIn successfully", {
          User,
          accessToken,
          refreshToken,
        })
      );
  } catch (error) {
    throw new apiError("Error while logging User", 500, error);
  }
};

const logoutUser = async(req,res)=>{
  try {

    if(!req.User)
    {
      throw new apiError("User is not logged in")
    }
    
    return res.status(200)
    .json(
      new apiResponse(200,"Logged out successfully")
    )
  } catch (error) {
    throw new apiError("error while logout",400,error)
  }
}

const getCurrentUser = async (req,res) =>{
  try {
    if(!req.User)
    {
      throw new apiError("Cannot get user",404,[])
    }
    return res.status(200)
    .json(
      new apiResponse(200,"User profile fetched successfully",req.User)
    )
  } catch (error) {
    throw new apiError("Error while fetching user's profile")
  }
}

const updateUser = async (req,res) => {
  try {

    console.log(req.body)
    let User,avatarFilepath

    if(req.body && req.files && req.files.avatar[0] && req.files.avatar[0].path)
    {
      const { updatedName } = req.body;
      avatarFilepath = req.files?.avatar[0]?.path
      const avatarUrl = await cloudinaryUpload(avatarFilepath);
      if(!avatarUrl){
        throw new apiError("Error while uploading image",500,[])
      }
      User = await userModel.findByIdAndUpdate(
        req.User._id,
        {
          $set:{name:updatedName,profileIMG:avatarUrl.secure_url}
        },
        {
          validateBeforeSave:false
        },
        {
          new:true
        }
      ).select("-refreshToken");
      fs.unlinkSync(req.files.avatar[0].path)

    }
    else if(req.files && req.files.avatar[0] && req.files.avatar[0].path)
    {
      avatarFilepath = req.files?.avatar[0]?.path
      console.log(avatarFilepath)
      avatarUrl = await cloudinaryUpload(avatarFilepath)
      User = await userModel.findByIdAndUpdate(
        req.User._id,
        {
          $set:{profileIMG:avatarUrl.secure_url}
        },
        {
          validateBeforeSave:false
        },
        {
          new:true
        }
      ).select("-refreshToken");
      fs.unlinkSync(req.files.avatar[0].path)

   }
   else if(req.body)
    {
      const { updatedName } = req.body;
       User = await userModel.findByIdAndUpdate(
        req.User._id,
        {
          $set:{name:updatedName}
        },
        {
          validateBeforeSave:false
        },
        {
          new:true
        }
      ).select("-refreshToken");
    
    }
    return res.status(200)
    .json(
      new apiResponse(200,"User details updated successfully",User)
    )
  } catch (error) {
    fs.unlinkSync(req.files.avatar[0].path)
    throw new apiError("Error while updating user",500,error)
  }
}

export {createUser,loginUser,getCurrentUser,updateUser,logoutUser};