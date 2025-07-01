import express from "express"
import { Router } from "express"
import { createProjectFromPrompt ,retriveAllProjects,deleteProject} from "../controllers/project.controllers.js"
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js"
const projectRouter = Router();

projectRouter.route("/createProjectFromPrompt").post(authMiddleware,createProjectFromPrompt)
projectRouter.route("/retriveAllProjects").post(authMiddleware,retriveAllProjects)
projectRouter.route("/deleteProject/:sessionId").delete(authMiddleware,deleteProject)


export default projectRouter