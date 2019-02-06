const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  "email": { type: String, required: true },
  "name": { type: String, required: true },
  "password": { type: String, required: true },
  // "bookings": [{ type: Schema.Types.ObjectId, ref: 'Booking', required: true }]
},
  { toJSON: { virtuals: true } });
userSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'user',
});

userSchema.pre('find', function () {
  this.populate({
    path: 'bookings',
    populate: {
      path: 'show',
      populate: {
        path: 'movie',
        select: 'title images -_id',
      }
    }
  }).populate({
    path: 'bookings',
    populate: {
      path: 'show',
      populate: {
        path: 'auditorium',
        select: 'name -_id',
      }
    }
  }).populate({
    path: 'bookings',
    populate: {
      path: 'show',
      populate: {
        path: 'tickets',
      }
    }
  })
})


module.exports = db.model('User', userSchema)