const usersRoute = require('express').Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const verify = require('../verify');

//Signup User
usersRoute.post('/', (req,res)=>{

    //Validate Req Body
    if(req.body===null || req.body.username===null || req.body.email===null || req.body.password===null){
        res.status(400).send({error : "Invalid Input"});
    }

    User.create({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    })
    .then((user)=>{
        res.send(user);
    }).catch((err)=>{
        res.status(400).send(err);
    });
    
});


//Signin User
usersRoute.post('/login', (req,res)=>{
    
    //Validate Req Body
    if(req.body===null || req.body.email===null || req.body.password===null){
        res.status(400).send({error : "Invalid Input"});
    }

    User.findOne({email : req.body.email }, (err,user)=>{
        if(!user){
            res.status(400).send("No User Found");
        }
        else if(user && (user.password != req.body.password)){
            res.status(400).send("Invalid Password");
        }else{
            //Assign Token
            const token = jwt.sign({_id : user._id}, "token_secret");

            res.header('auth-token', token).send("Logged In");
        }
    });

});


//Get User
usersRoute.get('/',verify, (req,res)=>{
    const user = jwt.decode(req.header('auth-token'));
    User.findOne({_id : user._id}, (err,data)=>{
        if(!err){
            res.send({
                username : data.username,
                email : data.email
            });
        }else{
            res.status(400).send(err);
        }
    });
});


module.exports = usersRoute;