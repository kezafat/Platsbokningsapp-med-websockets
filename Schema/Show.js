const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema for an a show
let showSchema = new Schema({
  "auditorium": { type: String, required: true },
  "movie": [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
  "date": String,
  "time": String
});

module.exports = db.model('Show', showSchema);