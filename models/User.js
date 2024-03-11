const mongoose = require("mongoose");


const passportLocalMongoose =
    require("passport-local-mongoose");



// Connecting mongoose to our database 
mongoose.connect(
    'mongodb://127.0.0.1:27017/auth_demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* Creating the schema of user which now 
include only email and password for 
simplicity.*/
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

/* Just after the creation of userSchema, 
we add passportLocalMongoose plugin 
to our Schema */
userSchema.plugin(passportLocalMongoose);

// Creating the User model 
const User = new mongoose.model("User", userSchema); 

module.exports = User;
