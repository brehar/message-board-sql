'use strict';

const PORT = process.env.PORT || 3000;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var Message = require('./models/message');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'jade');

app.use('/api', require('./routes/api'));

app.get('/', (req, res, next) => {
    res.render('index', {
        indexRoute: true
    });
});

app.get('/messages', (req, res, next) => {
    Message.findAll((err, messages) => {
        if (err) {
            return res.status(400).send(err);
        }

        messages.reverse();

        res.render('messages', {
            messagesRoute: true,
            messages: messages
        });
    });
});

app.listen(PORT, err => {
    console.log(err || `Server listening on port ${PORT}`);
});