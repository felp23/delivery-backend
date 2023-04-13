const express = require('express');
const app = express();
require ('dotenv').config();
app.use('/images', express.static('public/images'));

app.use(express.json({
    limit: "50mb"
}));
app.use(express.urlencoded({
  limit: "50mb",
  extended: false
}));
const path = require('path');

const protocol = process.env.PROTOCOL || "http";
const ip = require('ip').address();
const port = process.env.PORT || 3030;
app.use('/images', express.static('public/images'));

const routes = require('./routes');


app.listen(port, () => console.log(`
    Server started in http://localhost:${port} or ${protocol}://${ip}:${port}
`))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(routes);

