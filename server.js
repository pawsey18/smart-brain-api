const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');



const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({ 
    client: 'pg',
    connection: { 
        host: process.env.DATABASE_URL,
        ssl: true,
    }
});


const app = express();

app.use(cors())
app.use(bodyParser.json())



app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

/* // storing hash in your password db
bcrypt.hash('bacon', null, null, function(err,hash) { 

});

// load hash from your password db
bcrypt.compare('bacon', hash, function(err,res) { 
// res == true
});

bcrypt.compare('pussy', hash, function(err,res) { 
// res = false
}); */

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/