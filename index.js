//import
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();


const app = express();
import {UserRouter} from "./routes/user.js";
import {BlogRouter} from "./routes/blog.js";

//middlewares
app.use(express.json());
app.use(cors());

app.use("/auth",UserRouter);
app.use("/blogs",BlogRouter);


//mongoDB connection
mongoose.connect(process.env.Mongo_url).then(()=>{
    console.log("MongoDB connected");
}).catch((e)=>{
    console.log(e);
})



app.listen(4000,()=> console.log("Server running on port 4000"));