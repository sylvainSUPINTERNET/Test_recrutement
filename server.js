'use strict';
//debug
const morgan = require('morgan');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// set the view engine to ejs
app.set('view engine', 'ejs');
// use combined preset, see https://github.com/expressjs/morgan#combined
app.use(morgan('combined'));


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



let articlesList =
    [
        {
            _id: 0,
            title: "Article1",
            description: "ERIAIEZAIZEJKAIEJAJE",
            date_publicated : new Date()
        },
        {
            _id:1,
            title: "Article2",
            description: "Z.?AZQ.ZELA.EL.AE.AZL.ELA.E.L",
            date_publicated : new Date()
        },
        {
            _id:2,
            title: "Article3",
            description: "?AZezaeL",
            date_publicated : new Date()
        },

];


//list
app.get('/', (req, res)  => {
    res.status(200).render('index', {error:false, message: articlesList})
});

//add
app.post('/article/add', function(req,res){
    let formattedArticle = {
        _id: articlesList.length + 1,
        title: req.body.article_data.title,
        description: req.body.article_data.description,
        date_publicated: new Date()
    };
    articlesList.push(formattedArticle)
    res.json({error:false, message:articlesList})
});


//delete
app.delete('/article/:article_id/delete', function(req,res){
    let indexToRemove = req.params.article_id;
    articlesList.splice(indexToRemove, 1);
    res.json({error:false, message:articlesList})
});


//put
app.get('/article/:article_id/edit', function(req,res){
    let article_id = req.params.article_id; //its index in array of data

    res.render('article_edit', {message: articlesList[article_id]})
});

app.put('/article/:article_id/update', function(req,res){
    let article_id = req.params.article_id;

    let newTitle = req.body.title;
    let newDescription = req.body.description;

    articlesList[article_id].title = newTitle;
    articlesList[article_id].description = newDescription;

    res.json({error:false, message:articlesList})
});




const port = process.env.port || 8000;

// run the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});