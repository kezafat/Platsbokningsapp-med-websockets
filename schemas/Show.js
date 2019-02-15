const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema for an a show
let showSchema = new Schema({
  "auditorium": { type: Schema.Types.ObjectId, ref: 'Auditorium', required: true, autopopulate: { maxDepth: 1 } },
  "movie": { type: Schema.Types.ObjectId, ref: 'Movie', required: true, autopopulate: { maxDepth: 3 } },
  "date": { type: String, required: true },
  "time": { type: String, required: true }
}, { toJSON: { virtuals: true } });

// virtually reference bookings

showSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'show',
  autopopulate: { maxDepth: 1 }
});

showSchema.plugin(require('mongoose-autopopulate'));

module.exports = db.model('Show', showSchema);

