const router = require('express').Router();
const { projectExists } = require('./utils.js');
const schema = require('./schema.js');
const issue = schema.Issue;

// POST project {issue_title, issue_text, created_by, assigned_to, status_text}
router.post('/issues/:project_name', (req, res) => {
  // Valid POST
  if (!req.params.project_name) {
    return res.status(400).send('Project name required');
  }

  projectExists(req.params.project_name, (exists) => {
    if (!exists) {
      req.body.created_on = Date.now();
      req.body.updated_on = req.body.created_on;
      issue.create(req.body, (err, doc) => {
        if (err) { return res.status(500).send(err); }
        return res.json(doc);
      });
    } else {
      return res.status(409).send('Project name already exists.');
    }
  });
});

// EDIT project given { _id }
router.put('/issues/:project_name', (req, res) => {
  // Update {updated_on}
});

// DELETE project given { _id }
router.delete('/issues/:project_name', (req, res) => {

});

// GET project given { project_name }
// FILTER via query "?field=value&&"
router.get('/issues/:project_name', (req, res) => {
  res.send('hi');
});

module.exports = router;
