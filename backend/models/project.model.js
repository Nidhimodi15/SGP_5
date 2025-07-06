import mongoose from "mongoose";
import mongooseaggregatepaginate from "mongoose-aggregate-paginate-v2";

const projectSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectName: {
      type: String,
      trim: true,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pendingRequest: [
      {
        email: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

projectSchema.plugin(mongooseaggregatepaginate);

const Project = mongoose.model("Project", projectSchema);

export default Project;
