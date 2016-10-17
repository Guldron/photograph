var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subTabs = new Schema({  first: String, 
							second: String, 
							third: String }, 
						{ _id: false });

var tabsSchema = new Schema({ tabs: [subTabs] });

var Tabs = mongoose.model('Tabs', tabsSchema);

var tabs = new Tabs({tabs: [{first:"about", second: "gallery", third: "services"}]});

module.exports = tabs;