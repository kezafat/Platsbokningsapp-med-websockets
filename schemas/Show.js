const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema for an a show
let showSchema = new Schema({
  "auditorium": { type: Schema.Types.ObjectId, ref: 'Auditorium', required: true },
  "movie": { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  "date": { type: String, required: true },
  "time": { type: String, required: true },
  // "bookings": [{ type: Schema.Types.ObjectId, ref: 'Booking', required: true }]
}, { toJSON: { virtuals: true } });

// virtually reference bookings

showSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'show'
});

// automatically populate so we can stay true to REST
// (this works for FindById because FindById calls FindOne "under the hood")

showSchema.pre('findOne', function() {
  this.populate({
    path: 'auditorium',
    select: 'name seats -_id'
  })
  .populate({
    path: 'movie',
    select: 'title -_id'
  })
  .populate({
    path: 'bookings',
    select: 'seats -_id'
  });
});

module.exports = db.model('Show', showSchema);

