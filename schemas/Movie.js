const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
  "title": { type: String, required: true },
  "productionCountries": [{ type: String }],
  "productionYear": Number,
  "length": Number,
  "genre": { type: String, required: true },
  "distributor": String,
  "language": String,
  "subtitles": String,
  "director": { type: String, required: true },
  "actors": [{ type: String, require: true }],
  "description": String,
  "images": [{ type: String }],
  "youtubeTrailers": [{ type: String }],
  "reviews": [{
    "source": String,
    "quote": String,
    "stars": Number,
    "max": Number,
  }]
}, { toJSON: { virtuals: true }});

movieSchema.virtual('shows', {
  ref: 'Show',
  localField: '_id',
  foreignField: 'movie',
  autopopulate: { maxDepth: 2 }
});

movieSchema.plugin(require('mongoose-autopopulate'));

module.exports = db.model("Movie", movieSchema);