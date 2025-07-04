import projectModel from "../models/project.model.js";
import messageModel from "../models/message.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { v4 as uuidv4 } from "uuid";
import {
  generateSummaryAndName,
  generatePromptForCode,
  generateCodeFIles,
  counterPrompt,
} from "../utils/aiGeneration.js";
import codeFileModel from "../models/codeFiles.model.js";
import mongoose from "mongoose";

const createProjectFromPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userID = req.User._id;
    const sessionId = uuidv4();
    const { summary, title, slug } = await generateSummaryAndName(
      prompt.trim()
    );

    const newProject = await projectModel.create({
      owner: userID,
      projectName: slug,
      sessionId,
    });

    if (!newProject) {
      throw new apiError("error while adding project details to db", 400, []);
    }
    await messageModel.create({
      projectId: newProject._id,
      sessionId: sessionId,
      sender: "user",
      message: prompt,
    });
    await messageModel.create({
      projectId: newProject._id,
      sessionId: sessionId,
      sender: "ai",
      message: summary,
    });
    const aiMessage2 = await generatePromptForCode(summary);
    const codeFilesOutput = await generateCodeFIles(aiMessage2.prompt);
    console.log(codeFilesOutput.files);

    const codeFile = await codeFileModel.create({
      projectID: newProject._id,
      sessionId: sessionId,
      codeFiles: codeFilesOutput.files,
      dependencies: codeFilesOutput.dependencies,
    });
    if (!codeFile) {
      throw new apiError("Error while adding code files to db ", 500, []);
    }
    // const code = await codeFileModel.findById(newProject._id);
    // console.log(code);

    return res.status(201).json(
      new apiResponse(200, "project created successfully", {
        newProject,
        codeFile,
      })
    );
  } catch (error) {
    throw new apiError("Error while creating new project", 500, error);
  }
};

const createCounterprompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    const { sessionID } = req.params;
    const ownerId = req.User._id;

    const Project = await projectModel.aggregate([
      {
        $match: {
          sessionId: sessionID,
        },
      },
      {
        $match: {
          owner: new mongoose.Types.ObjectId(ownerId),
        },
      },
    ]);

    if (!Project.length) {
      throw new apiError("No such project found for loggedin User", 404, []);
    }

    await messageModel.create({
      projectId: Project[0]._id,
      sessionId: sessionID,
      sender: "user",
      message: prompt,
    });

    const retrivedProjectfromDB = await projectModel.aggregate([
      {
        $match: {
          sessionId: sessionID,
        },
      },
      {
        $match: {
          owner: new mongoose.Types.ObjectId(ownerId),
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "sessionId",
          foreignField: "sessionId",
          as: "messages",
        },
      },
      {
        $lookup: {
          from: "codefiles",
          localField: "sessionId",
          foreignField: "sessionId",
          as: "codeFile",
        },
      },
    ]);
    console.log(retrivedProjectfromDB);

    if (!retrivedProjectfromDB.length) {
      throw new apiError("Cannot retrive project", 400, []);
    }

    const contextMessages = JSON.stringify(retrivedProjectfromDB[0]?.messages);
    const contextCodeFiles = JSON.stringify(
      retrivedProjectfromDB[0]?.codeFile[0]?.codeFiles
    );

    const updatedOutput = await counterPrompt(
      contextCodeFiles,
      contextMessages,
      prompt
    );
    console.log(updatedOutput);

    await messageModel.create({
      projectId: Project[0]._id,
      sessionId: sessionID,
      sender: "ai",
      message: updatedOutput.airesponse,
    });
    console.log("ai message added")

    const codeFile = await codeFileModel.findOneAndUpdate(
      { sessionId: sessionID },
      {
        $set: {
          codeFiles: updatedOutput.updatedCode,
          dependencies: updatedOutput.dependencies,
        },
      },
      {
        new:true
      }
    );
    if (!codeFile) {
      throw new apiError("Error while adding code files to db ", 500, []);
    }
    console.log("code files added message added",codeFile)

    return res.status(200).json(
      new apiResponse(200, "counter prompt created successfully", {
        // retrivedProjectfromDB,
        codeFile,
      })
    );
  } catch (error) {
    new apiError("Error while sending message", 400, error);
  }
};

const retriveAllProjects = async (req, res) => {
  try {
    const userID = req.User;
    const projectCreated = await projectModel.find({
      owner: userID,
    });
    if (!projectCreated) {
      console.log("No Projects Found");
    }

    return res.status(200).json(
      new apiResponse(200, "Projects Retrived successfully", {
        projectCreated,
      })
    );
  } catch (error) {
    throw new apiError("error while retriving projects", 400, error);
  }
};

const retriveProjectByIds = async (req, res) => {
  try {
    const { sessionID } = req.params;
    // console.log(sessionID);
    const ownerId = req.User._id;

    const retrivedProject = await projectModel.aggregate([
      {
        $match: {
          sessionId: sessionID,
        },
      },
      {
        $match: {
          owner: new mongoose.Types.ObjectId(ownerId),
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "sessionId",
          foreignField: "sessionId",
          as: "messages",
        },
      },
      {
        $lookup: {
          from: "codefiles",
          localField: "sessionId",
          foreignField: "sessionId",
          as: "codeFile",
        },
      },
    ]);

    if (!retrivedProject.length) {
      throw new apiError("Cannot retrive project", 400, []);
    }
    return res
      .status(200)
      .json(new apiResponse(200, "Project retrived", retrivedProject));
  } catch (error) {
    throw new apiError("Error while retriving project", 400, error);
  }
};

const deleteProject = async (req, res) => {
  try {
    const userID = req.User;
    const sessionId = req.params;
    if (!sessionId) {
      throw new apiError("Sessionid not found", 404, []);
    }
    const deletedProject = await projectModel.findOne({
      owner: userID,
      sessionId: req.params.sessionId,
    });
    if (!deletedProject) {
      throw new apiError("Project not found", 404, []);
    }
    await deletedProject.deleteOne();
    return res
      .status(200)
      .json(
        new apiResponse(200, "project deleted successfully", deletedProject)
      );
  } catch (error) {
    throw new apiError("Error while deleting project", 500, error);
  }
};

export {
  createProjectFromPrompt,
  createCounterprompt,
  retriveAllProjects,
  retriveProjectByIds,
  deleteProject,
};
