const db = require('../models/database');

const bookingController = {};

// date & time format '2014-08-18T21:11:54' ~ time is in GMT (+4 for EST)

bookingController.createBooking = async (req, res, next) => {
  console.log('bookingController.createBooking invoked');
  try {
    // how MUI date format interacts w/ PostgreSQL date format
    const { bookerId, bookerType, artistId, bookingStart, bookingEnd } = req.body;
    // search for whether an overlapping booking exists
    const availabilityCheck = ``;

    // create CUSTOMER - artist booking
    console.log("bookingController -> createBooking", bookingStart, new Date(bookingStart), bookingEnd, new Date(bookingEnd))
    console.log("date diff", new Date(bookingEnd) - new Date(bookingStart), typeof (new Date(bookingEnd) - new Date(bookingStart)));
    const amount = (new Date(bookingEnd) - new Date(bookingStart)) / 3600000;
    const createBooking = `
      INSERT INTO bookings (booker_id, booker_type, artist_id, amount, booking_start, booking_end)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    console.log([bookerId, bookerType, artistId, amount, bookingStart, bookingEnd])
    const newBooking = await db.query(createBooking, [bookerId, bookerType, artistId, amount, bookingStart, bookingEnd]);
    console.log("bookingController -> createBooking -> newBooking.rows[0]", newBooking.rows[0])
    res.locals.newBooking = newBooking.rows[0];
    return next();
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
