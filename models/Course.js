var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    course_name:{ type: String , unique: true },
	course_code:{ type: String , unique: true },
	is_active:{ type: Boolean, default: true },
	updated_at: { type: Date, default: Date.now },
});
exports.Course = mongoose.model('Course', CourseSchema);