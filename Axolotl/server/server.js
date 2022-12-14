const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/database');
const userController = require('./controllers/userController');
const artistController = require('./controllers/artistController');
const bookingController = require('./controllers/bookingController');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const cookieParser = require('cookie-parser');



const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(bodyParser.json());
const port = process.env.PORT || 3000;

// const testFunction = async () => {
//   const add = `INSERT INTO users (name, email, password, location) VALUES ('Yirou', 'yirou@gmail.com', '6789', 'new york city')`
//   await db.query(add)
//   console.log('textFunction executed')
// }
// testFunction();


// USER STUFF

app.post('/api/test', (req, res) => {
  console.log("TEST");
  res.json("xd")
});

// SIGNUP
app.post('/api/saveUser', userController.saveUser, (req, res) => {
  //save user/artist in corresponding database
  return res.status(200).send({ newUserData: res.locals.userData });
});

// LOGIN
app.post('/api/login', userController.loginUser, (req, res, next) => {
  //authenticate user or artist with email
  return res.status(200).json({ has_account: res.locals.doesUserExist, isArtist: res.locals.isArtist, userId: res.locals.userId, userType: res.locals.userType });
});

// LOGOUT
app.get('/api/logout', (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      // expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});

// Checking if the user / artist is Logged In
app.get('/api/isLoggedIn', (req, res, next) => {
  try {
    console.log("server.js -> isLoggedIn -> req.cookies.token", req.cookies.token)
    console.log("server.js -> isLoggedIn -> req.cookies", req.cookies)
    console.log("server.js -> isLoggedIn -> req.headers.cookie", req.headers.cookie)

    const token = req.cookies.token;
    if (!token) {
      res.status(200).json({ user: '', userType: '' })
    } else {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log("isLoggedIn -> token body?", verified);
      res.status(200).json({ user: verified.user, userType: verified.usertype })
    }
  } catch (err) {
    return next(err);
  }
});

// app.post('/api/checkout', , async(req, res) => {
// BOOKINGS
// Create booking + Stripe API
app.post('/api/checkout', bookingController.createBooking, async(req, res) => {
  //get artistid from booking controller
  const artistRate = res.locals.hourlyRate;
  const hours = res.locals.hours;
  const artistName = res.locals.artistName;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: artistName },
            // unit_amount: artistRate * 100,
            unit_amount: artistRate * 100,
          },
          // quantity: hours,
          quantity: hours,
        }
      ],
      success_url:`${process.env.SERVER_URL}/booking`,
      cancel_url:`${process.env.SERVER_URL}/`,
    })
    res.json({ url: session.url })
    // console.log(res.json({ url: session.url }))
  } catch(e) {
    res.status(500).json({error: e.message});
  }
});


  // app.post('/api/booking', bookingController.createBooking, (req, res) => {
  //   // create a booking in booking table
  //   return res.status(200).json({ newBooking: res.locals.newBooking });
  // });


  //changed get request to post request to pass req.body, changed end point to differentiate above endpoint
  app.post('/api/getBooking', bookingController.getBookings, (req, res) => {
    // display bookings
    return res.status(200).json({ bookings: res.locals.bookings });
  });


// get categories (for the dropdown) (have artist and category tables joint)
  //
app.get('/api/categories', artistController.getCategories, (req, res) => {
  // return all category names from the db, expand in the dropdown
  return res.status(200).json(res.locals)
})

// /api/filter
//request body, we see if category is filtered, rate is filtered, query the joined table with joined filter)
// res.body(): list of artists with filters selected
// app.post('/api/filter', artistController.queryOnFilterCriteria, (req, res) => {
//   //check if category is filtered, and booking rate is filtered
//   //filter joined table with the filter
//   //return list of artist met criteria
// })


//user search
  // get request, filter condition will be passed through request body
    // depends on
// app.get('/api/search', artistController.queryOnSeachCriteria, (req, res) => {
//   //search criteria will be passed through request params
// });

app.post('/api/saveArtist', artistController.saveArtist, (req, res) => {
  return res.status(200).json({ artistData: res.locals.artistData });
});

// TODO send endpoint with all artist categories


//backend send a full list of artist
app.get('/api/artists', artistController.getAllArtists, (req, res) => {
  return res.status(200).json(res.locals.artists);
});


// ARTIST STUFF and PROFILES
// not currently needed. profile will automatically get created in /api/saveArtist
// app.post('/api/profile/artist', artistController.createProfile, (req, res) => {
//   // create artist profile
//   return res.status(200).json('api/artist');
// });

// display artist profile
app.get('/api/profile/artist', artistController.getProfile, artistController.getPortfolioGalleryLinks, (req, res) => {
  return res.status(200).json(res.locals);
});


// edit artist profile
app.put('/api/profile/artist', artistController.editProfile, artistController.getProfile, artistController.getPortfolioGalleryLinks, (req, res) => {
  return res.status(200).json(res.locals);
})


// display all URLs on artists's portfolio
// Not being used right now. Sending galleryLinks with /api/profile/artist
app.get('/api/profile/artist/links', artistController.getPortfolioGalleryLinks, (req, res) => {
  return res.status(200).json(res.locals.artistGalleryLinks);
});


// add single new gallery link
app.post('/api/profile/artist/single-link', artistController.addPortfolioGalleryLink, (req, res) => {
  return res.status(200).json(res.locals.newGalleryPiece)
});


// delete single gallery link
app.delete('/api/profile/artist/single-link', artistController.deletePortfolioGalleryLink, (req, res) => {
  return res.status(200).json(res.locals.deletedPiece)
});


app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});


// catch-all route handler for any requests to an unknown route
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// configure express global error handler
app.use((err, req, res, next) => {
  res.status(err.code || 500);
  console.log("global error handling ", err.message )
  res.json({ message: err.message || 'An unknown error occurred!' });
});







app.listen(port, console.log(`Listening on port ${port}`));