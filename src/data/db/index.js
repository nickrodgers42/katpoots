import mongoose from "mongoose";

export async function connect(options) {
  let url = "mongodb://localhost:27017/group10";
  if (process.env.MONGODB_URI) {
    console.log(process.env.MONGODB_URI);
    url = process.env.MONGODB_URI;
  }
  return mongoose.connect(
    url,
    options
  );
}
