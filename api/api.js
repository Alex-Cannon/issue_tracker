const router = require('express').Router();

// POST project {issue_title, issue_text, created_by, assigned_to, status_text}
router.post('/issues/:project_name', (req, res) => {
  // add {created_on, updated_on, open, and _id}
  if (!projectExists()) {

  }
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

// Returns TRUE if a given { project_name } exists
const projectExists = (projectName) => {

};

module.exports = router;
