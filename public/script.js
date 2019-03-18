/* eslint-disable */
$(document).ready(function () {
  $('#submit-issue').submit((e) => {
    e.preventDefault();
    $.ajax({
      url: '/api/issues/test_project',
      type: 'post',
      data: $('#submit-issue').serialize(),
      success: function (res) {
        alert('done');
        console.log(res.data);
      },
      error: function (err) {
        alert(JSON.stringify(err.statusText));
      }
    });
  });
});
