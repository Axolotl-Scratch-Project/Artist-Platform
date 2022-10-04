const db = require('../models/database');

const bookingController = {};

// date & time format '2014-08-18T21:11:54' ~ time is in GMT (+4 for EST)

bookingController.createBooking = async (req, res, next) => {
  console.log('bookingController.createBooking invoked');
  try {
    // const { id, artist_id,  }

  } catch (err) {
    return next(err);
  }
}

bookingController.getBookings = async (req, res, next) => {
  console.log('bookingController.getBookings invoked');
  try {

  } catch (err) {
    return next(err);
  }
}

module.exports = bookingController;
