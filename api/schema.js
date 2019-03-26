const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var issueSchema = new Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  created_on: { type: Date, required: true },
  updated_on: { type: Date, required: true },
  open: { type: Boolean, required: true },
  assigned_to: { type: String },
  status_text: { type: String }
});

var projectSchema = new Schema({
  project_name: { type: String, required: true },
  issues: [issueSchema]
}, { collection: 'projects' });

module.exports = {
  Project: mongoose.model('Project', projectSchema),
  Issue: mongoose.model('Issue', issueSchema)
};
