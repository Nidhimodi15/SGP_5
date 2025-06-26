import express, { urlencoded } from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import connectToDb from "./db/connectToDB.js";

const app = express()

//db connection
connectToDb();

//Middlewares
app.use(cors())
app.use(urlencoded({extended: true}))
app.use(express.json())




export default app