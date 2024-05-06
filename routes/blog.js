import express from "express";
import mongoose from "mongoose";
import { BlogModel } from "../model/Blog.js";
import { UserModel } from "../model/Users.js";
import { verifyToken } from "./user.js";
//  start
const router =express.Router();

router.get("/",async(req,res)=>{
    try{
        const result = await BlogModel.find({});
        res.status(200).json(result);
    }catch(err){
         res.status(500).json(err);
    }
})

router.post("/",verifyToken,async(req,res)=>{
    const blog = new BlogModel({
        _id:new mongoose.Types.ObjectId(),
        tittle:req.body.tittle,
        image:req.body.image,
        desc:req.body.desc,
        date:req.body.date,
        author:req.body.author,
        category:req.body.category,
        userOwner: req.body.userOwner,
    });
    console.log(blog);
    try{
        const result = await blog.save();
        res.status(201).json({
            createdBlog:{
                tittle:result.tittle,
                image:result.image,
                desc:result.desc,
                author:result.author,
                category:result.category,
                _id:result._id,
            },
    });
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//get id of blog-
router.get("/:id",async(req,res)=>{
    try{
        // const user = await UserModel.findById(req.params.userId);
        const blog = await BlogModel.findById(req.params.id);
        res.status(201).json(blog);
    }catch(err){
        console.log(err);
         res.status(500).json(err);
    }
});



//my blogs
router.get("/myblog/:userId",async(req,res)=>{
    try{
        const myBlog = await BlogModel.find({userOwner:req.params.userId});
        res.status(201).json(myBlog);
    }catch(err){
        console.log(err);
         res.status(500).json(err);
    }
});



//serach blog by category
router.get("category/:category",async(req,res)=>{
    try{
        const result = await BlogModel.find({category:req.params.category});
        res.status(200).json(result);
    }catch(err){
         res.status(500).json(err);
    }
});


//edit a blog only by owner
router.put("/edit/:id",async(req,res)=>{
    const blog = await BlogModel.findById(req.params.id);
    try{
       
            await blog.updateOne({$set:req.body});
            res.status(200).json("Blog Updated");
       
    }catch(err){
        res.status(500).json(err);
    }
}
);


//delete a blog only by owner
router.delete("/:id",async(req,res)=>{
    const blog = await BlogModel.findById(req.params.id);
    try{
        await blog.deleteOne();
        res.status(200).json("Blog Deleted");
    }catch(err){
        res.status(500).json(err);
    }
}
);





export { router as BlogRouter };