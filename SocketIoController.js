const socketIo = require('socket.io');

module.exports = class SocketIoController {
  constructor(server) {
    this.io = socketIo(server);
    this.listenToSocketConnections()
  }

  listenToSocketConnections() {

    // when a new booking occurs, the schema emits an event
    // when this happens, notify all clients
    global.models.bookings.schema.on('newBooking', (booking) => {
      const eventName = 'newBooking' + booking.show;
      this.io.emit(eventName, booking);
    });
  }
}