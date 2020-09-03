const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signing = require('./controllers/signing');
const profile = require('./controllers/profile'); 
const image = require('./controllers/image'); 

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'damilare95',
    database : 'detector'
  }
});



const app = express();


app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {res.send(database.users) })

app.post('/signing', signing.handleSigning( db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })




// // Load hash from your password DB.
// 	bcrypt.hash(password, null, null, function(err, hash) {
//     // Store hash in your password DB.
//     console.log(hash);
// });
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
	console.log("my app is running on port 3000");
});

