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
    const artistHourlyQuery = `
    select artists.hourly_rate
    from artists
    where artists.id = $1
    `;
    const artistHourly = await db.query(artistHourlyQuery, [artistId]);

    // create CUSTOMER - artist booking
    // console.log("bookingController -> createBooking", bookingStart, new Date(bookingStart), bookingEnd, new Date(bookingEnd))
    // console.log("date diff", new Date(bookingEnd) - new Date(bookingStart), typeof (new Date(bookingEnd) - new Date(bookingStart)));
    // can add amount * HOURLY RATE but we are not displaying that info anywhere yet
    const amount = (new Date(bookingEnd) - new Date(bookingStart)) / 3600000 * artistHourly.rows[0]['hourly_rate'];
    console.log("hourly", artistHourly, amount);
    const createBookingQuery = `
      INSERT INTO bookings (booker_id, booker_type, artist_id, amount, booking_start, booking_end)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    // console.log([bookerId, bookerType, artistId, amount, bookingStart, bookingEnd]);
    const newBooking = await db.query(createBookingQuery, [bookerId, 'user', artistId, amount, bookingStart, bookingEnd]);
    // console.log("bookingController -> createBooking -> newBooking.rows[0]", newBooking.rows[0])
    res.locals.newBooking = newBooking.rows[0];
    return next();
  } catch (err) {
    return next(err);
  }
}

bookingController.getBookings = async (req, res, next) => {
  console.log('bookingController.getBookings invoked');
  try {
    const { bookerId, bookerType } = req.body;
    // THIS ASSUMES THAT ONLY USERS CAN MAKE BOOKINGS
    const bookingsByUserIdQuery = `
      select
      b.id, b.artist_id, art.name as artist_name, b.amount, b.booking_start, b.booking_end, b.booker_id, b.booker_type, u.name as booker_name
      from bookings as b
      inner join artists as art on b.artist_id = art.id
      inner join users as u on b.booker_id = u.id
      where b.booker_id = $1 and b.booker_type = $2
    `;
    let bookingsByUserId;
    if (bookerType === 'artist') {
      bookingsByUserId = await db.query(bookingsByUserIdQuery, [bookerId, 'artist']);
    } else {
      bookingsByUserId = await db.query(bookingsByUserIdQuery, [bookerId, 'user']);
    }
    res.locals.bookingsByUser = bookingsByUserId.rows;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = bookingController;
