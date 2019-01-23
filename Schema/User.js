const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  "email": String, required: true,
  "name": String, required: true,
  "password": String,required: true,
  "bookings": [{ type: Schema.Types.ObjectId, ref: 'Booking', required: true }]
});

module.exports = db.model('User', userSchema)
