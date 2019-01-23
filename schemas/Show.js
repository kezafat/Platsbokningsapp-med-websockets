const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema for an a show
let showSchema = new Schema({
  "auditorium": { type: String, required: true },
  "movie": { type: Schema.Types.ObjectId, ref: 'Movie', required: true},
  "date": {type:String, required: true},
  "time": {type:String, required: true},
});

module.exports = db.model('Show', showSchema);