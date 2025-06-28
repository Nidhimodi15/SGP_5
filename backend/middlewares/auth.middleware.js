import userModel from "../models/user.model.js"
import apiError from "../utils/apiError.js"
import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next) => {
    try {

        const accessToken = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
        if(!accessToken)
        {
            throw new apiError("Access Token not found")
        }

        const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
        const User = await userModel.findById(decodedToken._id).select("-refreshToken")
        if(!User){
            throw new apiError("User not found",404,[])
        }
        req.User=User
        next();
    } catch (error) {
        throw new apiError("User is unauthorized",400,error)
    }
}

export default authMiddleware