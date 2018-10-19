import * as glob from "glob-promise";
import * as mongoose from "mongoose";


export async function loadModels() {
  const modelPaths = await glob("*.js");
  const models;
  
  modelPaths.forEach(async (path) => {
    const modelName = path.split('.')[0];
    models[modelName] = await mongoose.model(modelName, require(modelName));
  });

  return models;
}
