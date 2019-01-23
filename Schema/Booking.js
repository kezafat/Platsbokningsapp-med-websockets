const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
  "show": { type: Schema.Types.ObjectId, ref: 'Show', required: true },
  "user": { type: Schema.Types.ObjectId, ref: 'User', required: true },
  "seat": [ Number ], required: true,
  "tickets": { "kids": Number, "senior": Number, "adult": Number }
});

module.exports = db.model('Booking', bookingSchema);
