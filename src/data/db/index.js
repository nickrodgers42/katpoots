import * as models from '../models';
import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/group10');
    return models.loadModels();
  } catch (e) {
    console.log(e);
  }
}
