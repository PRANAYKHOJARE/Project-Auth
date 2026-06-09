import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from 'express';
import mongoose from 'mongoose';
import UserModel from './models/User.js';
import router from './routes/auth.route.js';
import todoRouter from "./routes/todo.route.js";



const app = express();
app.use(express.json());


app.use(cors());
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/todos", todoRouter);


app.listen(3000);

// app.get('/', (req, res) => {
//     res.send("working on this server tessting");
// });
// console.log("ENV:", process.env.JWT_SECERT);
// console.log(process.env.JWT_SECRET)


// const result = dotenv.config();
// console.log(result);

// app.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     const existingUser = await UserModel.findOne({email: email});
//     if(existingUser){
//         return res.status(400).json({
//             message: "User with this email already exists"
//         });
//     }

//     try {
//         const User = await new UserModel({
//             name: name,
//             email: email,
//             password: password
//         });
//         await User.save();
//         res.status(201).send("User registered successfully");
//     }
//     catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }

// })




//  catch (error) {

//   res.status(500).json({

//     success: false,

//     message: error.message