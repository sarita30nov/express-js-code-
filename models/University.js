var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UniversitySchema = new Schema({
    university_name:{ type: String , unique: true },
	is_active:{ type: Boolean, default: true },
	updated_at: { type: Date, default: Date.now },
});
exports.University = mongoose.model('University', UniversitySchema);