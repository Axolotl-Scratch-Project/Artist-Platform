const db = require('../models/database');

const bookingController = {};

// date & time format '2014-08-18T21:11:54' ~ time is in GMT (+4 for EST)

bookingController.createBooking = async (req, res, next) => {
  console.log('bookingController.createBooking invoked');
  try {
    // how MUI date format interacts w/ PostgreSQL date format
    let { bookerId, bookerType, artistID, bookingsStart, bookingsEnd } = req.body.infor;
    // search for whether an overlapping booking exists
    // console.log("bookingController -> createBooking -> req body infor", bookerId, bookerType, artistID, bookingStart, bookingEnd)
    console.log("createBooking -> bookerType", bookerType)
    bookerType = bookerType.replace(/\"/g, "");
    console.log("createBooking -> bookerType", bookerType)
    const availabilityCheck = ``;
    const artistHourlyQuery = `
    select artists.hourly_rate, artists.name
    from artists
    where artists.id = $1
    `;
    const artistHourly = await db.query(artistHourlyQuery, [artistID]);
    console.log("bookingController -> createBooking -> artistHourly", artistHourly.rows, "request body", req.body, "req body infor???", req.body.infor, "booker type", bookerType)
    // create CUSTOMER - artist booking
    // console.log("bookingController -> createBooking", bookingStart, new Date(bookingStart), bookingEnd, new Date(bookingEnd))
    // console.log("date diff", new Date(bookingEnd) - new Date(bookingStart), typeof (new Date(bookingEnd) - new Date(bookingStart)));
    // can add amount * HOURLY RATE but we are not displaying that info anywhere yet
    // console.log("hourly_rate", artistHourly.rows[0]['hourly_rate'], typeof artistHourly.rows[0]['hourly_rate']);
    // console.log("DATES???????", (new Date(bookingEnd) - new Date(bookingStart)), typeof (new Date(bookingEnd) - new Date(bookingStart)))
    // console.log("ok dates again", new Date(bookingsEnd), typeof new Date(bookingsEnd), "bookingEnd", bookingsEnd, typeof bookingsEnd)
    // console.log("hourly_rate", Number((new Date(bookingsEnd) - new Date(bookingsStart)) / 3600000),
    //   typeof Number((new Date(bookingsEnd) - new Date(bookingsStart)) / 3600000));

    const amount = Number(new Date(bookingsEnd) - new Date(bookingsStart)) / 3600000 * parseInt(artistHourly.rows[0]['hourly_rate']);
    // console.log("hourly", artistHourly, amount);
    const createBookingQuery = `
      INSERT INTO bookings (booker_id, booker_type, artist_id, amount, booking_start, booking_end)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    console.log("amount", typeof amount, amount);
    const newBooking = await db.query(createBookingQuery, [bookerId, bookerType, artistID, amount, bookingsStart, bookingsEnd]);
    console.log("bookingController -> createBooking -> newBooking.rows[0]", newBooking.rows[0])
    const hours = (new Date(bookingsEnd) - new Date(bookingsStart)) / 3600000;

    res.locals.newBooking = newBooking.rows[0];
    res.locals.hours = (new Date(bookingsEnd) - new Date(bookingsStart)) / 3600000
    res.locals.hourlyRate = artistHourly.rows[0]['hourly_rate']
    res.locals.artistName = artistHourly.rows[0]['name']
    return next();
  } catch (err) {
    return next(err);
  }
}

bookingController.getBookings = async (req, res, next) => {
  console.log('bookingController.getBookings invoked');
  try {
    let { bookerId, bookerType } = req.body;
    console.log("bookerType", bookerType)
    bookerType = bookerType.replace(/\"/g, "");
    console.log("bookerType", bookerType)
    if (bookerType === 'artist') {
      const artistBusinessBookingsQuery = `
      with bookings as (
        select
        b.id, b.artist_id, b.amount, b.booking_start, b.booking_end, b.booker_id, b.booker_type, artists.name as booker_name
        from bookings as b
        inner join artists on b.booker_id = artists.id and b.booker_type = 'artist'
        where b.artist_id = $1

        union all

        select
        b.id, b.artist_id, b.amount, b.booking_start, b.booking_end, b.booker_id, b.booker_type, users.name as booker_name
        from bookings as b
        inner join users on b.booker_id = users.id and b.booker_type = 'user'
        inner join artists on b.artist_id = artists.id
        where b.artist_id = $1
        )

        select
        bookings.*,
        artists.name as artist_name
        from bookings
        inner join artists on bookings.artist_id = artists.id
      `;
      const artistBusinessBookings = await db.query(artistBusinessBookingsQuery, [bookerId]);
      const artistPersonalBookingsQuery = `
      with bookings as (
        select
        b.id, b.artist_id, art.name as artist_name, b.amount, b.booking_start, b.booking_end, b.booker_id, b.booker_type
        from bookings as b
        inner join artists as art on b.artist_id = art.id
        where b.booker_id = $1 and b.booker_type = $2
      )
      select
      bookings.*,
      artists.name as booker_name
      from bookings
      inner join artists on bookings.booker_id = artists.id
      `;
      const artistPersonalBookings = await db.query(artistPersonalBookingsQuery, [bookerId, bookerType]);
      res.locals.bookings = { personalBookings: artistPersonalBookings.rows, businessBookings: artistBusinessBookings.rows };
    } else {
        const userPersonalBookingsQuery = `
        select
        b.id, b.artist_id, art.name as artist_name, b.amount, b.booking_start, b.booking_end, b.booker_id, b.booker_type, u.name as booker_name
        from bookings as b
        inner join artists as art on b.artist_id = art.id
        inner join users as u on b.booker_id = u.id
        where b.booker_id = $1 and b.booker_type = $2
        `;

        // bookerType = bookerType.slice(1, bookerType.length - 1);
        const userPersonalBookings = await db.query(userPersonalBookingsQuery, [bookerId, bookerType]);
        console.log("getBookings -> userPersonalBookings", userPersonalBookings)
        res.locals.bookings = { personalBookings: userPersonalBookings.rows, businessBookings: {} };
        console.log("bookingController -> getBookings", userPersonalBookings.rows)
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = bookingController;
