import mongoose from "mongoose";
// const mongoURL = 'mongodb+srv://user1:mane123@cluster1.w2ks0ib.mongodb.net/auth_task';
// const mongoURL = process.env.MONGO_URL;
// const connectionUrl = await mongoose.connect(mongoURL);
// console.log("Connected to MongoDB", connectionUrl.connection.host);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },

    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
