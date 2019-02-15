const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
  "show": { type: Schema.Types.ObjectId, ref: 'Show', required: true, autopopulate: { maxDepth: 3 } },
  "user": { type: Schema.Types.ObjectId, ref: 'User', required: true },
  "seats": [{ type: Number, required: true }],
  "tickets": { "kids": Number, "senior": Number, "adult": Number },
  "ticketID": {type: String, required: true}
});

bookingSchema.plugin(require('mongoose-autopopulate'));

module.exports = db.model('Booking', bookingSchema);
