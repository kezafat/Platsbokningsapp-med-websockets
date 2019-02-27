const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let auditoriumSchema = new Schema({
  "name": { type: String, required: true },
  "seats": [{ type: Number, required: true }],
  "imageSmall": String,
  "imageBig": String,
  "descriptionShort": String,
  "descriptionLong": String,
  "soundSystem": String,
  "projector": String,
  "candyStore": String,
  "alcohol": String
}, { toJSON: { virtuals: true } });

auditoriumSchema.virtual('shows', {
  ref: 'Show',
  localField: '_id',
  foreignField: 'auditorium',
  autopopulate: { maxDepth: 2 }
});

auditoriumSchema.plugin(require('mongoose-autopopulate'));

module.exports = db.model('Auditorium', auditoriumSchema);
