var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var imageSchema = new Schema({
    img: Buffer,
    name: String,
    size: String,
});

module.exports = mongoose.model('ImageModel', imageSchema);

