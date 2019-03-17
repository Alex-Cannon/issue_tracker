const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var issueSchema = new Schema({
  project_name: { type: String, required: true },
  issue_title: { type: String, required: true },
  issue_test: { type: String, required: true },
  created_by: { type: String, required: true },
  created_on: { type: Date, required: true },
  updated_on: { type: Date, required: true },
  open: { type: Boolean, required: true },
  assigned_to: { type: String },
  status_text: { type: String }
}, { collection: 'issues' });

module.exports = {
  Issue: mongoose.model('Project', issueSchema),
};
