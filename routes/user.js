import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already registered" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ email, username, password: hashedPassword });
  await newUser.save();
  res.status(200).json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, username, password } = req.body;
  const mail = await UserModel.findOne({ email });
  if (!mail) {
    return res.status(400).json({ message: "Email Doesn't Exist" });
  }
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Wrong Credentials" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Wrong Credentials" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userId: user._id });
});

export { router as UserRouter };

export const verifyToken = (req, res, next) => {
 const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}