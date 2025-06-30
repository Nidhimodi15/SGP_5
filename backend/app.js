import express, { urlencoded } from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import connectToDb from "./db/connectToDB.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js"
import projectRouter from "./routes/project.route.js";

const app = express()

//db connection

//Middlewares
app.use(cors({
    origin:["http://localhost:5173","*"],
    credentials: true  
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectToDb();

//user Routes
app.use('/api/v1/user',userRouter)

//project Routes
app.use('/api/v1/project',projectRouter)

export default app