const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let auditoriumSchema = new Schema( {
  "name": String,
  "seat": [ Number ]
});

module.exports = db.model('Auditorium', auditoriumSchema);
