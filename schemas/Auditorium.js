const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let auditoriumSchema = new Schema({
  "name": { type: String, required: true },
  "seats": [{ type: Number, required: true }],
  "shows": [{ type: Schema.Types.ObjectId, ref: 'Show', required: true }]
});

module.exports = db.model('Auditorium', auditoriumSchema);
