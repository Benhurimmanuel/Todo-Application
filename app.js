const path = require('path');
require('dotenv').config({ path: `${__dirname}/config/config.env` });
const session = require('express-session');
const cookieParser = require('cookie-parser');
const express = require('express');
const Firestore = require('@google-cloud/firestore');
const { FirestoreStore } = require('@google-cloud/connect-firestore');
const toDoRoutes = require('./modules/todo/todo-routes');
const loginRoutes = require('./modules/auth/login-routes');


const dev = true;
const app = express();
const cors = require("cors");
app.use(cors());

const sessionObject={
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 3 },
}

if(!dev)sessionObject.store=new FirestoreStore({
    dataset: new Firestore(),
    kind: 'express-sessions',
  }),
// middlewares

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/public",express.static(path.join(__dirname, 'build')));
app.use( session(sessionObject));
const logger= (req,res,next)=>{
  console.log("the path is",req.path)
  console.log("method type is",req.method)
  next();
}

//  Routes  
app.get("/checkAuth",logger,(req,res)=>{
  if(req.session.user) res.send({status:true} )
  res.send({status:false})
})


const authMiddleware = (req, res, next) => {
  // if (dev)next();
  if (req.session.user) {
    next();
  } else {
    res.redirect('/auth/google');
  }
};


app.use('/auth',logger, loginRoutes) 
app.use('/api/v1',logger,toDoRoutes);
app.get('/application',[authMiddleware,logger], (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
    });
app.get("*",logger,(req,res)=>{
  res.redirect("/application")
})

// error Handleing
app.use((error, req, res, next) => {
  const response = {
    status: false,
  };  
  if (error) {
    if (error.name) response.errName = error.name;
    response.message = error.message;
    console.error(error.stack);
    res.send(response);
  }
});


app.listen(process.env.PORT || 3000, () => {
  console.log('server is running');
});
