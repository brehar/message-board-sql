'use strict';

var db = require('../config/db');

db.run('CREATE TABLE IF NOT EXISTS messages (message TEXT, name TEXT, email TEXT, image TEXT, timestamp TEXT, id TEXT)');

exports.findAll = function(cb) {
    db.all('SELECT * FROM messages', function(err, messages) {
        cb(err, messages);
    });
};

exports.create = function(message, cb) {
    if (!message.message || !message.name || !message.email) {
        return cb('A message, your name, and your email are required.');
    }
    
    db.serialize(function() {
        var stmt = db.prepare('INSERT INTO messages VALUES (?, ?, ?, ?, ?, ?)');
        stmt.run(message.message, message.name, message.email, message.image, message.timestamp, message.id);
        
        stmt.finalize(function(err) {
            cb(err);
        });
    });
};

exports.findById = function(id, cb) {
    if (!id) return cb('Message id required.');

    db.all(`SELECT * FROM messages WHERE id='${id}'`, function(err, message) {
        cb(err, message);
    });
};

exports.removeById = function(id, cb) {
    if (!id) return cb('Message id required.');
    
    db.run(`DELETE FROM messages WHERE id='${id}'`, function(err) {
        cb(err);
    });
};

exports.updateById = function(id, newMessage, cb) {
    if (!id) return cb('Message id required.');

    if (!newMessage.message || !newMessage.name || !newMessage.email) {
        return cb('A message, your name, and your email are required.');
    }

    db.run('UPDATE messages SET message = $message, name = $name, email = $email, image = $image, timestamp = $timestamp WHERE id = $id', {
        $message: newMessage.message,
        $name: newMessage.name,
        $email: newMessage.email,
        $image: newMessage.image,
        $timestamp: newMessage.timestamp,
        $id: newMessage.id
    }, cb);
};