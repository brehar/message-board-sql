'use strict';

var path = require('path');
var sqlite3 = require('sqlite3').verbose();

var dbPath = path.join(__dirname, '../data/messages.db');

var db = new sqlite3.Database(dbPath);

module.exports = db;