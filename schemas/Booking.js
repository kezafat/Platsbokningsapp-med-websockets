const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
  "show": { type: Schema.Types.ObjectId, ref: 'Show', required: true },
  "user": { type: Schema.Types.ObjectId, ref: 'User', required: true },
  "seats": [{ type: Number, required: true }],
  "tickets": { "kids": Number, "senior": Number, "adult": Number }
});

boookingSchema.pre('find', function() {
  this.populate({
    path: 'show',
    populate:{
      path: 'movie',
      select: 'title images -_id',
    }
  })
});

module.exports = db.model('Booking', bookingSchema);
