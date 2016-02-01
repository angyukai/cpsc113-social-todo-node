var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var Users = require('./models/users.js');



//Configure our app
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true})); //for parsing application/x-www-form-urlencoded  

  //this relates to the UserSchema.static.count function in users.js
app.get('/', function (req, res){
  Users.count(function (err, users) {
    if(err){
      res.send("Error getting users");
    }else{
      res.render('index', {userCount: users.length});       //userCount relates to the syntax in indexhandlebars
    }
  });
});

app.post('/user/register', function (req, res){
  var newUser = new Users();
  newUser.hashed_password = req.body.password;
  newUser.email = req.body.email;
  newUser.name = req.body.fl_name;
  newUser.save(function(err){
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