import express from "express"
import { Router } from "express"
import { createUser,loginUser,getCurrentUser, updateUser} from "../controllers/user.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js"
import { logoutUser } from "../controllers/user.controllers.js";

const router = Router();
router.route("/logout").post(authMiddleware, logoutUser);

router.route("/signup").post(createUser)
router.route("/signin").post(loginUser)
router.route("/getprofile").post(authMiddleware,getCurrentUser)
router.route("/updateprofile").patch(authMiddleware,
    upload.fields([
        { name: 'avatar', maxCount: 1 },
    ]),
    updateUser
)




export default router