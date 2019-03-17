const schema = require('./schema.js');
const Project = schema.Project;

module.exports = {
  // Returns TRUE if a given { project_name } exists
  projectExists: (projectName, cb) => {
    Project.findOne({ project_name: projectName }, (err, doc) => {
      if (err || !doc) { return cb(false); }
      return cb(true);
    });
  }
};
