var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var SubscriberSchema = new Schema({
    email:{ type: String , unique: true },
	updated_at: { type: Date, default: Date.now },
});
exports.Subscriber = mongoose.model('Subscriber', SubscriberSchema);