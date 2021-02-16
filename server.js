const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const parser = require('body-parser');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);

const port = process.env.PORT || 4000;

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public/'));
app.set('views', path.join(__dirname,'/views'));

// Endpoint imported
const apiAuthentication = require('./router/auth');
const apiDepartment = require('./router/department');
const apiPosition = require('./router/position');
const apiPlantCategory = require('./router/plantCategory');
const apiDiseases = require('./router/diseases');
const admin = require('./router/admin');

// Mongoose Connect
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true}, () => console.log("Database connected"));

const redisClient = redis.createClient(17573, process.env.REDIS_ID, {no_ready_check: true});

redisClient.auth(process.env.REDIS_PWD, function (err) {
    if (err) {
        throw err;
    }
});
redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});
redisClient.on('connect', function () {
    console.log('Connected to Redis');
});




app.use(parser.urlencoded({ extended: false }))
app.use(express.json());


app.use(session({
    store: new redisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET, saveUninitialized: false, resave: false
}));

// Endpoints
app.use('/',admin);
app.use('/api/v1', apiAuthentication);
app.use('/api/v1', apiDepartment);
app.use('/api/v1', apiPosition);
app.use('/api/v1', apiPlantCategory);
app.use('/api/v1', apiDiseases);




app.listen(port, () => console.log("Server is running"));