import express from "express"
import { Router } from "express"
import { createUser } from "../controllers/user.controllers.js";
const router = Router();

router.route("/signup").post(createUser)




export default router