import glob from 'glob-promise';
import { node } from 'prop-types';

async function load(server) {
  const filePaths = await glob('*.js', { cwd: __dirname });
  filePaths.forEach(path => {
    let file = `${__dirname}/${path}`;
    if(process.platform == "win32"){
      file = `${__dirname}\\${path}`;
    }
    if (__filename === file) {return;}
    const controller = require(file);
    controller(server);
  });
}

module.exports = load;
