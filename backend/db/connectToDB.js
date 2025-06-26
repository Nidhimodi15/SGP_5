import mongoose from "mongoose";

export default async function connectToDb(){
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        if(!connectionInstance){
            throw new Error("Error while connecting DB")
        }
        console.log(`Connected to ${connectionInstance.connection.name} DB`)
        
    } catch (error) {
        throw new Error("Error in connecting with DB ",error)
    }
}