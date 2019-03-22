/* eslint-disable */
$(document).ready(function () {
  $('#submit-issue').submit((e) => {
    e.preventDefault();
    $.ajax({
      url: '/api/issues/test_project',
      method: 'POST',
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

  $('#update-issue').submit((e) => {
    e.preventDefault();
    let data = {};
    $('#update-issue').serializeArray().forEach((elem) => {
      data[elem['name']] = elem['value'];
    });
    data.open = data.open === 'on' ? true : false;
    Object.keys(data).forEach((key) => {
      if (data[key] === '') {
        delete data[key];
      }
    });

    $.ajax({
      url: '/api/issues/test_project',
      method: 'PUT',
      data,
      success: function (res) {
        alert('done');
      },
      error: function (err) {
        console.log(err);
        alert(JSON.stringify(err.statusText));
      }
    });
  });

  $("#delete-issue").submit((e) => {
    e.preventDefault();
    $.ajax({
      url: '/api/issues/test_project',
      method: 'DELETE',
      data: $("#delete-issue").serialize(),
      success: function () {
        alert('Issue Deleted!');
      },
      error: function(err) {
        alert(err.statusText);
      }
    })
  })
});
