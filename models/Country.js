var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CountrySchema = new Schema({
    country_name:{ type: String , unique: true },
	country_code:{ type: String , unique: true },
	is_active:{ type: Boolean, default: true },
	updated_at: { type: Date, default: Date.now },
});
exports.Country = mongoose.model('Country', CountrySchema);