const mysql           = require('mysql');
const profileService  = require('./ProfileService');
const express         = require('express');
const app             = express();
const bodyParser	  = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// Global con for connecting to DB.
con = mysql.createConnection({
	host: 'localhost',
  	user: 'root',
  	password: '',
  	database: 'saptmprofile'
});

// Initialize GET service for Profile.
app.get('/loginUser', profileService.getLoginUser);
app.post('/loginUser', profileService.postLoginUser);
app.delete('/loginUser/:id', profileService.deleteLoginUser);
app.put('/loginUser/:id', profileService.editLoginUser);

// Listen to port 4000 : This is where we access the rest service.
app.listen(4000, () => console.log('Example app listening on port 4000!'));
