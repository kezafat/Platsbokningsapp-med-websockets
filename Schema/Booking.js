const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
  "show": [{ type: Schema.Types.ObjectId, ref: 'Show' }],
  "user": [{ type: Schema.Types.ObjectId, ref: 'User' }],
  "seat": [],
  "ticket": { "kids": Number, "senior": Number, "adult": Number }
});

module.exports = db.model('Booking', bookingSchema);
