const router = require('express').Router();
const { projectExists, requireProjectName } = require('./utils.js');
const ObjectID = require('mongodb').ObjectID;
const schema = require('./schema.js');
const project = schema.Project;

// POST project {issue_title, issue_text, created_by, assigned_to, status_text}
router.post('/issues/:project_name', requireProjectName, (req, res) => {
  // Add { created_on, updated_on, open }
  req.body.created_on = Date.now();
  req.body.updated_on = req.body.created_on;
  req.body.open = true;

  projectExists(req.params.project_name, (err, exists) => {
    if (err) { return res.status(500).send('Internal Server error.'); }
    if (exists) {
      // Add Issue to Project
      project.updateOne({ project_name: req.params.project_name }, { $addToSet: { issues: req.body } }, (err) => {
        if (err) { return res.status(500).send(err); }
        return res.sendStatus(200);
      });
    } else {
      // Add Issue to NEW Project
      const data = {
        project_name: req.params.project_name,
        issues: [req.body]
      };

      project.create(data, (err, doc) => {
        if (err) { return res.status(500).send('Internal Server Error.'); }
        return res.json(doc.issues[doc.issues.length - 1]);
      });
    }
  });
});

// EDIT project given { _id }
router.put('/issues/:project_name', requireProjectName, (req, res) => {
  console.log('updating...');
  console.log(req.body);
  const _id = new ObjectID(req.body._id);
  delete req.body._id;
  project.updateOne({ project_name: req.params.project_name, 'issues._id': _id }, { $set: bodyToSet(req.body) }, (err) => {
    if (err) { return res.status(500).send(err); }
    return res.sendStatus(200);
  });
});

// DELETE project given { _id }
router.delete('/issues/:project_name', requireProjectName, (req, res) => {
  const _id = new ObjectID(req.body._id);
  delete req.body._id;
  project.updateOne({ project_name: req.params.project_name, 'issues._id': _id }, { $pull: { 'issues': { _id } } }, (err) => {
    if (err) { return res.status(500).send(err); }
    return res.sendStatus(200);
  });
});

// GET project given { project_name }
// FILTER via query "?field=value&&"
router.get('/issues/:project_name', (req, res) => {
  project.findOne({ project_name: req.params.project_name }, (err, doc) => {
    if (err) { return res.status(500).send('Internal Server Error.'); }
    if (!doc) { return res.status(404).send('Project not found'); }
    return res.json(doc);
  });
});

const bodyToSet = function (body) {
  var setObj = {};
  Object.keys(body).forEach((key) => {
    setObj['issues.$.' + key] = body[key];
  });
  console.log(setObj);
  return setObj;
};

module.exports = router;
