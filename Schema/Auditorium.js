const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let auditoriumSchema = new Schema( {
  "name": String, required: true,
  "seats": [ Number ], required: true
});

module.exports = db.model('Auditorium', auditoriumSchema);
