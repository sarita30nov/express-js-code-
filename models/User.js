var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	user_type:{ type: String},
    email:{ type: String , unique: true },
	user_name:{ type: String , unique: true },
	password:{ type: String},
	first_name:{ type: String},
	last_name:{ type: String},
	gender:{ type: String},
	screen_name:{ type: String},
	university_id : { type: Schema.Types.ObjectId, ref: 'University' },
	country_id : { type: Schema.Types.ObjectId, ref: 'Country' },
	course_id : { type: Schema.Types.ObjectId, ref: 'Course' },
	city_name:{ type: String},
	street:{ type: String},
	zip:{ type: Number},
	dob:{ type: Date},
	user_image:{ type: String},
	contact_number:{ type: String},
	verification_code:{ type: String},
	is_verified:{ type: Boolean},
	agree_terms:{ type: Boolean},
	created_date: { type: Date,default: Date.now},
	modified_date: { type: Date, default: Date.now },
	is_active:{ type: Boolean, default: false},
});

exports.User = mongoose.model('User', UserSchema);