
const express = require('express');
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport")
const app = express();
const User = require("./models/User");
const authRoutes = require("./routes/auth");
require("dotenv").config()
const port = 3000;

app.use(express.json());


mongoose.connect(
    "mongodb+srv://Kavya:"+process.env.MONGO_PASSWORD+"@cluster0.rfbhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'thisKeyisSupposedToBeSecrete';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/",(req,res)=>{

    res.send("Hello World");
});
app.use("/auth",authRoutes);
app.listen(port,() => {
    console.log(`App is running on port : http://localhost:${port}`);
});