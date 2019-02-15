const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let auditoriumSchema = new Schema({
  "name": { type: String, required: true },
  "seats": [{ type: Number, required: true }]
}, { toJSON: { virtuals: true } });

auditoriumSchema.virtual('shows', {
  ref: 'Show',
  localField: '_id',
  foreignField: 'auditorium',
  autopopulate: { maxDepth: 2 }
});

auditoriumSchema.plugin(require('mongoose-autopopulate'));

module.exports = db.model('Auditorium', auditoriumSchema);
