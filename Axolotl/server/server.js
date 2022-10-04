const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/database');
const userController = require('./controllers/userController');
const artistController = require('./controllers/artistController');
const bookingController = require('./controllers/bookingController');


const dotenv = require('dotenv');
const { application } = require('express');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
const port = process.env.PORT || 3000;

// const testFunction = async () => {
//   const add = `INSERT INTO users (name, email, password, location) VALUES ('Yirou', 'yirou@gmail.com', '6789', 'new york city')`
//   await db.query(add)
//   console.log('textFunction executed')
// }
// testFunction();


// USER STUFF
// WE NEED SPECIFIC NAMES / URIs
// get/post/patch...

console.log(userController);
app.post('/api/test', (req, res) => {
  console.log("TEST");
  res.json("xd")
}); 

// SIGNUP
app.post('/api/saveUser', userController.saveUser, (req, res) => {
  //save user/artist in corresponding database
  return res.status(200).json({ newUserData: res.locals.userData });
});

// LOGIN
app.post('/api/login', userController.loginUser, (req, res, next) => {
  //authenticate user or artist with email
  return res.status(200).json({ has_account: res.locals.doesUserExist });
})


// get categories (for the dropdown) (have artist and category tables joint)
  // 
// app.get('/api/categories', artistController.showCategories, (req, res) => {
//   // return all category names from the db, expand in the dropdown
// })

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
  return res.status(200).json();
})


//backend send a full list of artist
app.get('/api/artists', artistController.getAllArtists, (req, res) => {
  return res.status(200).json();
})


// booking (user / artist)
  //post request, time slot, user id, artist id will be passed through request body
app.post('/api/booking', bookingController.createBooking, (req, res) => {
  // create a booking in booking table
  return res.status(200).json('api/booking');
})

app.get('/api/booking', bookingController.getBookings, (req, res) => {
  // display bookings
  return res.status(200).json('api/booking');
});


// ARTIST STUFF and PROFILES
app.post('/api/profile/:artist', artistController.createProfile, (req, res) => {
  // create artist profile
  return res.status(200).json('api/artist');
});

app.get('/api/profile/:artist', artistController.getProfile, (req, res) => {
  // display artist profile
  return res.status(200);
});

app.put('/api/profile/:artist', artistController.editProfile, (req, res) => {
  // edit artist profile
  return res.status(200);
})

app.get('/api/profile/:artist/links', artistController.getPortfolioLinks, (req, res) => {
  // display all URLs on artists's portfolio
  return res.status(200);
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