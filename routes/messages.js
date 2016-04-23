'use strict';

var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.get('/', (req, res, next) => {
    Message.findAll((err, messages) => {
        if (err) {
            return res.status(400).send(err);
        }

        res.send(messages);
    });
});

router.post('/', (req, res, next) => {
    Message.create(req.body, err => {
        if (err) return res.status(400).send(err);

        res.send();
    });
});

router.get('/:id', (req, res, next) => {
    var id = req.params.id;

    Message.findById(id, (err, message) => {
        if (err || !message) {
            return res.status(400).send(err || 'Message not found.');
        }

        res.send(message);
    });
});

router.put('/:id', (req, res, next) => {
    var id = req.params.id;

    Message.updateById(id, req.body, err => {
        res.send();
    });
});

router.delete('/:id', (req, res, next) => {
    var id = req.params.id;

    Message.removeById(id, err => {
        if (err) return res.status(400).send(err);

        res.send();
    });
});

module.exports = router;