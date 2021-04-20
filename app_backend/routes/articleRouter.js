const articleRoute = require('express').Router();
const Article = require('../models/articles');
const verify = require('../verify');

//Get List of Articles
articleRoute.get('/', verify ,(req,res)=>{
    Article.find().limit(10).exec((err,articles)=>{
        if(!err){
            res.send(articles);
        }else{
            res.status(400).send(err);
        }
    });
});

//Get particular article
articleRoute.get('/:id', verify, (req,res)=>{
    Article.findById({_id : req.params.id}, (err,article)=>{
        if(!err && article){
            res.send(article);
        }else{
            res.status(400).send(err);
        }
    })
});


//Post an Article
articleRoute.post('/', verify, (req,res)=>{
    if(!req.body || !req.body.title){
        res.status(400).send("Invalid Input");
    }

    Article.create(req.body)
    .then((article)=>{
        res.send(article);
    }).catch((err)=>{
        res.status(400).send(err);
    });

});


//Delete particular article
articleRoute.delete('/:id', verify, (req,res)=>{
    Article.findOneAndDelete({_id : req.params.id}, (err,article)=>{
        if(!err){
            res.send(article);
        }else{
            res.status(400).send(err);
        }
    })
})

module.exports = articleRoute;