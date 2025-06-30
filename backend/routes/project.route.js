import express from "express"
import { Router } from "express"
import { createProjectFromPrompt } from "../controllers/project.controllers.js"
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js"
const projectRouter = Router();

projectRouter.route("/createProjectFromPrompt").post(authMiddleware,createProjectFromPrompt)


export default projectRouter