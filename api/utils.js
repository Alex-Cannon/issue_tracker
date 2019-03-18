const schema = require('./schema.js');
const Project = schema.Project;

module.exports = {
  projectExists: function (projectName, cb) {
    Project.findOne({ project_name: projectName }, { _id: 1 }, (err, doc) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, doc);
      }
    });
  },
  requireProjectName: function (req, res, next) {
    if (req.params.project_name) {
      next();
    } else {
      res.status(400).send('Project Name Required');
    }
  }
};
