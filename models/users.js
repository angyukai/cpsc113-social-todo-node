var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/social-todo');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    email: String,
    name: String,
    hashed_password: String,

});

//why 'statics' instaed of 'methods'
//why when the var of (statics."string") is the same as (Users."String") under app.get in index.js, webpage cannot load)
UserSchema.statics.count = function (cb) {
  return this.model('Users').find({}, cb);
}

//READ UP MORE ON MODE DOCUMENTATION TO LEARN WHY YOU NEED 'module' infront of exports
module.exports = mongoose.model('Users', UserSchema);