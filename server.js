var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
var Tabs = require('./tabsModel');
var bodyParser = require('body-parser');
var multer = require('multer');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/data/db');
var bodyParser = require('body-parser');
var multer = require('multer');

var Schema = mongoose.Schema;
var pictureSchema = new Schema({
                            value: Number,
                            img: Buffer,
                            contentType: String   
                        });

var PictureModel = db.model('pictureModel', pictureSchema);

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});
app.use(express.static('./public'));
app.use(bodyParser.json());

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

app.post('/upload', upload.any(), function(req, res) {
        console.log(req.files[0])
        var picture = new PictureModel ({
                value: 5, 
                img: fileBuffer = req.files[0].buffer,
                contentType: "image/png"
        });

        picture.save();
});

app.get('/', function(req, res) {
    res.sendFile('D:/Work/photograph/public/index.html');
});

app.get('/tabs', function(req, res) {

    res.json(Tabs);
});

app.get("/images", function(req,res) {
    PictureModel.find({}, function (err, doc) {
        console.log(doc)
            res.send(doc);
    });
});

app.listen('3000', function(){
        console.log('running on 3000...');
    });


