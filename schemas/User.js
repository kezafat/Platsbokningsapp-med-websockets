const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  "email": { type: String, required: true },
  "name": { type: String, required: true },
  "password": { type: String, required: true },
},
  { toJSON: { virtuals: true } });

userSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'user',
  autopopulate: { maxDepth: 2 }
});

userSchema.plugin(require('mongoose-autopopulate'));


module.exports = db.model('User', userSchema)