#CPSC113 social todo app

This is my app. it is gonna be sick

## How to run this

You can run the server with
    
    node index.js

or if you prefer automatically

    nodemon index.js
    
    
if using a secret session, rmb to type sth like this in the bash console

    SESSION_SECRET='foo123' nodemon ./index.js

if using mongoose.connect(process.env.MONGO_URL), rmb to type this into bash console

    MONGO_URL='mongodb://localhost:27017/social-todo' SESSION_SECRET='foo123' nodemon ./index.js