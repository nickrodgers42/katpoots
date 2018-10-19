import glob from "glob-promise";

async function load(server) {
  const filePaths = await glob("*.js", { cwd: __dirname });
  filePaths.forEach(path => {
    const file = `${__dirname}/${path}`;
    if (__filename === file) return;
    const controller = require(file);
    controller(server);
  });
}

module.exports = load;
