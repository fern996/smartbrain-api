const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const port = process.env.PORT || 3000;

const db = knex({
	client: 'pg',
	connection: {
		host : 'dpg-ce9mnt6n6mpgqu9qaf40-a.oregon-postgres.render.com',
		user : 'smart_brain_x3hg_user',
		password : 'pcSv1kb0ftQX85WTCpouKaTuDUO6QvUx',
		database : 'smart_brain_x3hg'
	}
});

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {res.send('it is working!')})
app.post('/signin', signin.handleSignin(db,bcrypt)) // Cleaner function call. More confusing. Might want  to adopt as standard.
app.post('/register',(req,res) => {register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req,res)=> {profile.handleProfileGet(req,res, db)})
app.put('/image', (req,res) => {image.handleImage(req, res, db )})
app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})

app.listen(port, () => {
	console.log(`app is running on port ${port}`);
})
/*
--Delete when done with
Design before code
/ --> res = this is working
/signin --> POST = success/fail
/register ==> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/