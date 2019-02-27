const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
  "show": { type: Schema.Types.ObjectId, ref: 'Show', required: true, autopopulate: { maxDepth: 3 } },
  "user": { type: Schema.Types.ObjectId, ref: 'User', required: true },
  "seats": [{ type: Number, required: true }],
  "tickets": { "kids": Number, "senior": Number, "adult": Number },
  "ticketID": { type: String, required: true }
});

bookingSchema.plugin(require('mongoose-autopopulate'));

// pre hook to make sure no double bookings are possible
bookingSchema.pre('save', async function (next) {
  const show = await global.models.shows.findById(this.show);
  const bookedSeats = show.bookings.map(booking => booking.seats);
  // array.flat is not supported in node v.10.x.x.x which is what we are using, so we have to use a custom .flat()
  let flatSeats = [];
  for (let seats of bookedSeats) {
    flatSeats = flatSeats.concat(seats);
  }
  for (let seat of this.seats) {
    if (flatSeats.includes(seat)) {
      const err = new Error('DOUBLE BOOKING DETECTED');
      // calling next with an argument is assumed to be an error and so the save will not happen
      next(err);
    }
  }
  // the schema emits an event that we listen for in the socket.io controller
  bookingSchema.emit('newBooking', this);
  next();
})

module.exports = db.model('Booking', bookingSchema);
