var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var Users = require('./models/users.js');
var session = require('express-session');


//Configure our app
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true})); //for parsing application/x-www-form-urlencoded 

//if using secret session, type:
//SESSION_SECRET='foo123' nodemon ./index.js
//into bash console to run it properly
app.use(session({
  secret: process.env.SESSION_SECRET_HAXOR,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}))

app.use(function(req, res, next){
  
  if(req.session.userID){
    Users.findById(req.session.userID, function(err, user){
      if(!err){
        res.locals.currentUser = user;
      }
      next();
    })
  }else{
    next();  
  }
})

//middleware. WILL NOT show up if put after app.post
// app.use(function(req,res,next){
//   console.log('lololol');
//   next();
// })


  //this relates to the UserSchema.static.count function in users.js
app.get('/', function (req, res){
  Users.count(function (err, users) {
    if(err){
      res.send("Error getting users");
    }else{
      res.render('index', {
        userCount: users.length,
        currentUser: res.locals.currentUser
      });       //userCount relates to the syntax in indexhandlebars
    }
  });
});

app.post('/user/register', function (req, res){
  
  if(req.body.password != req.body.password_confirmation){
    return res.render('index', {errors: "Password and password confirmation do not match"})
  }
  var newUser = new Users();
  newUser.hashed_password = req.body.password;
  newUser.email = req.body.email;
  newUser.name = req.body.fl_name;
  newUser.save(function(err,user){
    req.session.userID = user._id;
    console.log('Added new user', user);
    if(err){
      res.render('index', {errors: err});
    }else{
      res.redirect('/');
    }

  })
  // res.send(req.body);
  console.log("user has the email address:", req.body.email);
});





app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT);
});