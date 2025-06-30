import mongoose from "mongoose";
import mongooseaggregatepaginate from "mongoose-aggregate-paginate-v2"

const fileSchema = new mongoose.Schema({
    filename:{
        type:String,
    },
    path:{
        type:String,
    },
    content:{
        type:String
    }
})

const codeFileSchema = new mongoose.Schema(
    {
        projectID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project",
            required:true
        },
        codeFiles:[fileSchema],
        dependencies:{
            type: Object,
            default: {}
        }
    },
    {
        timestamps:true
    }
)

const codeFile = mongoose.model("codeFile",codeFileSchema)
export default codeFile