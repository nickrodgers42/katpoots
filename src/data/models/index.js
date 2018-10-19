import glob from 'glob-promise';
import mongoose from 'mongoose';

export async function loadModels() {
  const modelPaths = await glob('*.js', { cwd: __dirname });
  const models = {};

  modelPaths.forEach(async path => {
    const file = `${__dirname}/${path}`;
    if (__filename === file) {return;}
    const modelName = path.split('.')[0];
    models[modelName] = await mongoose.model(modelName, require(file));
  });

  return models;
}
