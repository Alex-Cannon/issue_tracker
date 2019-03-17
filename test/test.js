require('dotenv').config();
var mongoose = require('mongoose');
var assert = require('chai').assert;
var utils = require('../api/utils.js');

// Connection Test
describe('Connection OK?', function () {
  this.timeout(5000);
  mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
  const db = mongoose.connection;
  it('should connect without error', function (done) {
    db.once('open', function () {
      done();
      mongoose.connection.close();
    });
  });
});
