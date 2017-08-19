var express = require('express');
var firebaseAdmin = require('firebase-admin');
var http = require('http');
var Particle = require('particle-api-js');
var bodyParse = require('body-parser');
var app = express();

var privateKey = (process.env.FIREBASE_PRIVATE_KEY).replace(/\\n/g,'\n');
var clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        "private_key": privateKey,
        "client_email": clientEmail
    }),
    databaseURL: "https://iot-dormroom-9558c.firebaseio.com/"
});

app.use(bodyParse.json({ strict: false }));

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
    res.send('test');
});

var foodRoutes = require('./api/routes/foodRoutes');
var recipeRoutes = require('./api/routes/recipeRoutes');
var keyhookRoutes = require('./api/routes/keyhookRoutes');
foodRoutes(app);
recipeRoutes(app);
keyhookRoutes(app);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
