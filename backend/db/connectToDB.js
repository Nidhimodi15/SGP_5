import mongoose from "mongoose";

export default async function connectToDb(){
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        if(!connectionInstance){
            console.log("Error while connecting DB")
        }
        console.log(`Connected to ${connectionInstance.connection.name} DB`)
        
    } catch (error) {
        console.log("Error while connecting to DB", error);
    }
}