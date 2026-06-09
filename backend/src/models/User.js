import mongoose from "mongoose";
const mongoURL = 'mongodb+srv://user1:mane123@cluster1.w2ks0ib.mongodb.net/auth_task';
const connectionUrl = await mongoose.connect(mongoURL);
console.log("Connected to MongoDB", connectionUrl.connection.host);


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
    password: String,
    googleId: {
      type:String,
  }
})


const UserModel = mongoose.model("Users", userSchema);


export default UserModel;