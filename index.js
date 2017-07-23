var express = require('express');
var bodyParse = require('body-parser');
var app = express();
app.use(bodyParse.json({ strict: false }));

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
	res.send('test');
});

var routes = require('./api/routes/foodRoutes');
routes(app);

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
