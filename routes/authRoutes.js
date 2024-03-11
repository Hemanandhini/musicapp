// // authRoutes.js
// const express = require('express');
// const passport = require('../auth1');

// const router = express.Router();

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/profile',
//   failureRedirect: '/login',
//   failureFlash: true
// }));

// router.get('/profile', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send('This is the profile page');
//   } else {
//     res.redirect('/login');
//   }
// });

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });



// routes/auth.js
const express = require('express');
const path = require('path')
const User = require('../models/User');
const router = express.Router();
const passport = require('passport')

const config = require("../config/config.js")
const jwt = require("jwt-simple");

// const auth = require('../middleware/auth1')

// Handling get request on the home route 
router.get("/", function (req, res) { 
	if (req.isAuthenticated()) { 

		/* if request is already authenticated, i.e. user has already logged in and there is no need to login again or 
		we can say, session is running.*/
		res.send( "You have already logged in. No need to login again"); 
	} else { 
		// If the user is new and no session is Running already 
		res.sendFile(path.join(__dirname, '..', 'index.html')); 
	} 
}) 

// Handling get request on login route 
router.get("/login", function (req, res) { 
	if (req.isAuthenticated()) { 

		/* If request is already authenticated,  i.e. user has already logged in and 
		there is no need to login again. */
		res.send("You have already logged in. No need to login again"); 
	} else { 

		/* if session has expired, then user need to login back again and we will send the Login.html */
		res.sendFile(path.join(__dirname, '..', 'login.html')); 
	} 
}) 

router.post('/register', async (req, res) => {
  // const { username, password } = req.body;
 
  console.log(req.body); 
  // var email1 = req.body.username; 
  var email = req.body.username; 

  var password = req.body.password; 
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  // Register a new user
  User.register({ username: email }, password, async (err, user) => {
    try {
      var payload = { 
        id: user.id, 
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7 
      }
      var token = jwt.encode(payload, config.jwtSecret)

      // Authenticate the user
      passport.authenticate('local')(req, res, () => {
        console.log("rq", res)
        // res.send('Successfully registered and authenticated!');
        res.status(201).send({ message: 'User registered successfully and authenticated!', token });
      });

    } catch (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ message: 'Failed to register user', error: err.message });
   
    }
  });
});


// Handling the post request on /login route 
router.post("/login", function (req, res) {
  console.log(req.body);
  const userToBeChecked = new User({
    username: req.body.username,
    password: req.body.password
  });

  // Checking if user if correct or not 
  req.login(userToBeChecked, function (err) {
    if (err) {
      console.log(err);
      res.redirect("/login");
    }
    else {
      passport.authenticate("local")
        (req, res, async function () {


          // User.findOne({ email: req.body.username }, (err, user) => {
          //   if (err) {
          //     console.log("Error");
          //   } else {
          //     var payload = { 
          //       id: user.id, 
          //       expire: Date.now() + 1000 * 60 * 60 * 24 * 7 
          //     }
        
          //     var token = jwt.encode(payload, config.jwtSecret)
        
          //     res.status(200).json({ message: 'Logged in successfully' , token: token});
          //     console.log(users);
          //     // res.json({ token: token })
          //   }
          // });
          try {
            const users = await User.findOne({ username: req.body.username });


            console.log("credentials are correct");

            var payload = { 
              id: users.id, 
              expire: Date.now() + 1000 * 60 * 60 * 24 * 7 
            }
      
            var token = jwt.encode(payload, config.jwtSecret)
      
           
            // res.send("login successful"); 
            // res.status(200).json({ message: 'Logged in successfully' });

            res.status(200).json({ message: 'Logged in successfully' , token: token});

            console.log(users);
          } catch (err) {
            console.error(err);
            res.status(404).json({message: 'Incorrect email or password'})
          }
        });
    }
  })
})


module.exports = router;

