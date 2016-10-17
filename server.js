var express = require('express');
var mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/data/db');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
        console.log('connect to db')
});

var Tabs = require('./models/tabsModel');
var ImageModel = require('./models/ImageModel');

app.use(require('connect-livereload')());

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});
app.use(express.static('./public'));
app.use(bodyParser.json());

//---------------------------
//image gallery upload routes
//---------------------------
app.get('/admin/gallery', function(req, res) {
        ImageModel.find({size: 'small'}, function (err, doc) {
                if(!err) {
                        res.send(doc);
                } else {
                        res.send(err);
                };
        });
});

app.post('/admin/gallery', upload.any(), function(req, res) {
        var image = new ImageModel({
                img: fileBuffer = req.files[0].buffer,
                name: req.body.otherInfo.name,
                size: req.body.otherInfo.size
        });
        image.save(function (err) {
                if(!err) {
                        res.send(req.body.otherInfo.name + " is saved in DB");
                } else {
                        res.send(err);
                };
        });
});

app.delete('/admin/gallery/', function(req, res) {
                ImageModel.remove({}, function (err) {
                        if(!err) {
                                res.send('All images in gallery are deleted');
                        } else {
                                res.send(err);
                        };
                });                  
});

app.delete('/admin/gallery/:name', function(req, res) {                           
                ImageModel.remove({name: req.params.name}, function(err, suc){
                        if(!err) {
                                res.send({
                                        name: req.params.name,
                                        doc: suc   
                                    });
                        } else {
                                res.send(err);
                        };
                });
               
});
//----------------------------------
//end of image gallery upload routes
//----------------------------------



app.get('/', function(req, res) {
    res.sendFile('D:/Work/photograph/public/index.html');
});

app.get('/tabs', function(req, res) {

    res.json(Tabs);
});

app.get('/gallery', function(req, res) {
        ImageModel.find({size: 'small'}, function (err, doc) {
                if(!err) {
                        res.send(doc);
                } else {
                        res.send(err);
                };
        });
});

app.get('/gallery/:name', function(req, res) {
        ImageModel.find({name: req.params.name,size: 'normal'}, function (err, doc) {
                if(!err) {
                        res.send(doc);
                } else {
                        res.send(err);
                };
        });
});

app.listen('3000', function(){
        console.log('running on 3000...');
});
