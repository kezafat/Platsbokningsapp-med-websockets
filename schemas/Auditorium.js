const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let auditoriumSchema = new Schema({
  "name": { type: String, required: true },
  "seats": [{ type: Number, required: true }]
});

module.exports = db.model('Auditorium', auditoriumSchema);
