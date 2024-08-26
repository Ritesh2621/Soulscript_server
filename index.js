//import
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
import {UserRouter} from "./routes/user.js";
import {BlogRouter} from "./routes/blog.js";

//middlewares
app.use(express.json());
app.use(cors());

app.use("/auth",UserRouter);
app.use("/blogs",BlogRouter);


//mongoDB connection
mongoose.connect("mongodb+srv://riteshsuryawanshi2621:Soulscript123@cluster0.0xwt8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("MongoDB connected");
}).catch((e)=>{
    console.log(e);
})



app.listen(4000,()=> console.log("Server running on port 4000"));