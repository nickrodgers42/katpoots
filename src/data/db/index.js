import { loadModels } from "../models";
import * as mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/group10");
    return loadModels();
  } catch (e) {
    console.log(e);
  }
}
