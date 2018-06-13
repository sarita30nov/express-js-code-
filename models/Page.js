var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PageSchema = new Schema({
	page_name:{ type: String},
    url:{ type: String , unique: true },
	page_description:{ type: String},
	updated_at: { type: Date, default: Date.now },
});

exports.Page = mongoose.model('Page', PageSchema);