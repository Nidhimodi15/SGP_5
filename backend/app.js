import express, { urlencoded } from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import connectToDb from "./db/connectToDB.js";
import cookieParser from "cookie-parser";

const app = express()

//db connection
connectToDb();

//Middlewares
app.use(cors({
    origin:"*"
}))
app.use(urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())




export default app