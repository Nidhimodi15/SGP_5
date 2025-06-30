import mongoose from "mongoose";
import mongooseaggregatepaginate from "mongoose-aggregate-paginate-v2"

const messageSchema = new mongoose.Schema(
    {
        projectId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project",
            required:true
        },
        sender:{
            type:String,
            enum:["user","ai"],
            required:true
        },
        message:{
            type:String,
            required:true,
            trim:true
        }
    },
    {
        timestamps:true
    })

messageSchema.plugin(mongooseaggregatepaginate);

const Message = mongoose.model("Message",messageSchema)
export default Message