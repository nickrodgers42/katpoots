require("@babel/polyfill");
import mongoose from "mongoose";

export async function connect(options) {
  let url = "mongodb://localhost:27017/group10";
  if (process.env.MONGOLAB_GREEN_URI) {
    console.log(process.env.MONGOLAB_GREEN_URI);
    url = process.env.MONGOLAB_GREEN_URI;
  }
  return mongoose.connect(
    url,
    options
  );
}
