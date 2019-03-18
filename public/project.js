/* eslint-disable */
$(document).ready(function () {
  $.ajax({
    url: '/api/issues' + window.location.pathname,
    type: 'get',
    success: function (data) {
      $("#title").text('Issue Tracker - ' + data.project_name);
      $("#project-issues").empty();
      data.issues.map((issue) => {
        $("#project-issues").append(
          '<div class="card">' +
            '<div class="card-body">' +
              '<h3 class="card-title">' + issue.issue_title + '</h3>' +
              '<h5 class="card-subtitle text-muted">Created By ' + issue.created_by + '</h5><br/>' +
              '<p>' + (issue.issue_text || 'No Description') + '</p>' +
              (issue.assigned_to ? '<p>Assigned To: ' + issue.assigned_to + '</p>': '') +
              (issue.status_text ? '<p> Status: ' + issue.status_text + '</p>' : '') +
              '<div class="badge ' + (issue.open ? 'badge-primary' : 'badge-success') + '">' + (issue.open ? 'Open' : 'Closed') + '</div><br/>' +
              '<button class="btn btn-warning">Close Issue</button>' +
              '<button class="btn btn-danger">Delete Issue</button>' +
            '</div>' +
          '</div>');
      });
    },
    error: function (err) {
      alert(err.statusText + '\nPlease reload the page.');
    }
  })
});