var express = require('express'); 
var app = express(); 
 const session = require("express-session"); 
const passport = require("passport"); 
const LocalStrategy = require('passport-local').Strategy;

const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
var expressBodyParser = require('body-parser');
const User = require('./models/User.js');
const accountController = require('./controllers/accountController.js')
const path = require('path')
app.use(cors());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
	next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/dist/index.html'));
  });


require('./middleware/auth1.js')()

app.use(expressBodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(expressBodyParser.json({ 
  limit: '10mb' ,
  type: ['application/json', 'application/csp-report']
})); 

app.use(session({ 
	secret: "long secret key", 
	resave: false, 
	saveUninitialized: false
})); 


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 


// Initializing Passport 
app.use(passport.initialize()); 

// Starting the session 
app.use(passport.session()); 

app.use('/', authRoutes);

app.get('/profile', passport.authenticate('jwt', { session: false }), accountController.profile)

// Allowing app to listen on port 3000 
app.listen(3000, function () { 
	console.log("server started successfully"); 
}) 
