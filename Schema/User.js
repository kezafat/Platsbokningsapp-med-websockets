const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  "email": String,
  "name": String,
  "password": String,
  "booking": [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});

module.exports = db.model('User', userSchema)
