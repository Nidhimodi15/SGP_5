import projectModel from "../models/project.model.js";
import messageModel from "../models/message.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { v4 as uuidv4 } from "uuid";
import { generateSummaryAndName,generatePromptForCode,generateCodeFIles } from "../utils/aiGeneration.js";
import codeFileModel from "../models/codeFiles.model.js";

const createProjectFromPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userID = req.User._id;
    const sessionId = uuidv4();
    const {summary,title, slug } = await generateSummaryAndName(prompt.trim());
    
    const newProject = await projectModel.create({
        owner:userID,
        projectName:slug,
        sessionId
    })

    if(!newProject)
    {
        throw new apiError("error while adding project details to db",400,[])
    }
    await messageModel.create({
        projectId:newProject._id,
        sender:"user",
        message:prompt
    })
    await messageModel.create({
        projectId:newProject._id,
        sender:"ai",
        message:summary
    })
    const aiMessage2 = await generatePromptForCode(summary)
    const codeFilesOutput = await generateCodeFIles(aiMessage2.prompt);
    console.log(codeFilesOutput.files)

    const codeFile = await codeFileModel.create({
        projectID:newProject._id,
        codeFiles:codeFilesOutput.files,
        dependencies:codeFilesOutput.dependencies
    })
    if(!codeFile)
    {
        throw new apiError("Error while adding code files to db ",500,[])
    }
    const code = await codeFileModel.findById(newProject._id)

   

    return res.status(201)
    .json(
        new apiResponse(
            200,
            "project created successfully",
            {
                newProject,
                code
            }
        )
    )

  } catch (error) {
    throw new apiError("Error while creating new project", 500, error);
  }
};

const retriveAllProjects = async(req,res) =>{
    try {

        const userID = req.User;
        const projectCreated = await projectModel.find({
            owner:userID
        })
        if(!projectCreated)
        {
            console.log("No Projects Found")
        }

        return res.status(200)
        .json(
            new apiResponse(200,"Projects Retrived successfully",
                {
                    projectCreated
                }
            )
        )
        
    } catch (error) {
        throw new apiError("error while retriving projects",400,error)
    }
}

const deleteProject = async(req,res) =>{
    try {
        const userID = req.User
        const sessionId = req.params
        if(!sessionId)
        {
            throw new apiError("Sessionid not found",404,[])
        }
        const deletedProject = await projectModel.findOne({owner:userID,sessionId:req.params.sessionId});
        if(!deletedProject)
        {
            throw new apiError("Project not found",404,[])
        }
        await deletedProject.deleteOne()
        return res.status(200)
        .json(
           new apiResponse(200,"project deleted successfully",deletedProject)
        )
        
    } catch (error) {
        throw new apiError("Error while deleting project",500,error)
    }
}

export {createProjectFromPrompt,retriveAllProjects,deleteProject}