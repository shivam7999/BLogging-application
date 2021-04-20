const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Routes
const userRoute = require('./routes/userRouter.js');
const articleRoute = require('./routes/articleRouter.js');


//Database Connect
mongoose.connect('mongodb+srv://shivam:1111@clusterreactapp.7bd7n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser : true, useUnifiedTopology: true}, ()=>{
    console.log('Connected To Database')
});
mongoose.set("useCreateIndex", true);


//Middleware
app.use(express.json());

app.use('/api/users',userRoute);
app.use('/api/articles',articleRoute);

app.listen(5000, ()=>{console.log("Server Running at Port 5000")});