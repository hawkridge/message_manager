const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', routes);

app.listen(5000, err => {
	if (err) throw new Error(err);
	
	console.log(`Listening on 5000 port`);
});



