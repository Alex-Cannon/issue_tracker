/* eslint-disable */
$(document).ready(function () {
  const loadIssues = function () {
    $.ajax({
      url: '/api/issues' + window.location.pathname,
      type: 'get',
      success: function (data) {
        $("#title").text('Issue Tracker - ' + data.project_name);
        $("#project-issues").empty();
        data.issues.map((issue) => {
          alert(JSON.stringify(issue));
          $("#project-issues").append(
            '<div class="card">' +
              '<div class="card-body">' +
                '<h3 class="card-title">' + issue.issue_title + '</h3>' +
                '<h5 class="card-subtitle text-muted">Created By ' + issue.created_by + '</h5><br/>' +
                '<p>' + (issue.issue_text ? issue.issue_text : 'No Description') + '</p>' +
                (issue.assigned_to ? '<p>Assigned To: ' + issue.assigned_to + '</p>': '') +
                '<p>' + (issue.open ? 'OPEN' : 'CLOSED') + ' - Status: ' + issue.status_text +  ' - ID: ' + issue._id + '</p>' +
                (issue.open ? '<button class="btn btn-warning" id="edit-' + issue._id + '">Close Issue</button>' : '') +
                '<button class="btn btn-danger" id="delete-' + issue._id + '">Delete Issue</button>' +
              '</div>' +
            '</div><br/>');
          $('#edit-' + issue._id).click(() => {
            $.ajax({
              url: '/api/issues' + window.location.pathname,
              method: 'PUT',
              data: { _id: issue._id, open: false },
              success: function (data) {
                alert('ok');
              },
              error: function (err) {
                alert(err.statusText);
              }
            });
          });
          $('#delete-' + issue._id).click(() => {
            $.ajax({
              url: '/api/issues' + window.location.pathname,
              method: 'DELETE',
              data: { _id: issue._id },
              success: function (data) {
                loadIssues();
              },
              error: function (err) {
                alert(err.statusText);
              }
            });
          });
        });
      },
      error: function (err) {
        alert(err.statusText + '\nPlease reload the page.');
      }
    });
  }
  loadIssues();
});