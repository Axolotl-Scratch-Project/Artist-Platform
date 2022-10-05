const db = require('../models/database');

const bookingController = {};

bookingController.createBooking = async (req, res, next) => {
  console.log('bookingController.createBooking invoked');
  return next();
}

bookingController.getBookings = async (req, res, next) => {
  console.log('bookingController.getBookings invoked');
  return next();
}

module.exports = bookingController;
