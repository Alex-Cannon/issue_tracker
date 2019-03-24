require('dotenv').config();
const { describe, it, after } = require('mocha');
var mongoose = require('mongoose');
var assert = require('chai').assert;
var utils = require('../api/utils.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const routes = require('../api/api.js');
const axios = require('axios');

const PORT = process.env.PORT || 80;
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;

describe('Connection OK?', function () {
  this.timeout(5000);
  it('Should connect without error.', function (done) {
    db.once('open', function () {
      done();
    });
  });
});

describe('projectExists()', function () {
  it('projectExists("test_project") Should return an Object.', function (done) {
    utils.projectExists('test_project', function (err, doc) {
      if (err) { return assert.fail('Internal Server Error.'); }
      assert.isNotNull(doc);
      done();
    });
  });
});

describe('requireProjectName()', function () {
  it('requireProjectName({params: { project_name }}) should return true', function (done) {
    utils.requireProjectName({ params: { project_name: 'test_project' } }, null, done);
  });

  it('requireProjectNames({ params: {} }) should call res.status().send(); .', function (done) {
    utils.requireProjectName({ params: {} }, { status: function () { return { send: () => { done(); } }; } }, () => {
      assert.fail('Expected res.sendStatus(400); Got next();');
    });
  });
});

describe('API Endpoints OK?', function () {
  app.use(bodyParser.json({ extended: false }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/api', routes);
  it('Should Run OK.', function (done) {
    app.listen(PORT, function () {
      done();
    });
  });

  it('GET /api/issues/:project_name should return an Object.', function (done) {
    axios.get('/api/issues/test_project')
      .then(function (res) {
        assert.isObject(res);
        done();
      })
      .catch(function (err) {
        assert.fail(err.statusMessage);
      });
  });

  after(function () {
    mongoose.connection.close();
  });
});
