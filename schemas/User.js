const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  "email": { type: String, required: true },
  "name": { type: String, required: true },
  "password": { type: String, required: true },
  "bookings": [{ type: Schema.Types.ObjectId, ref: 'Booking', required: true }]
});

module.exports = db.model('User', userSchema)
