const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/database');
const userController = require('./controllers/userController');
const artistController = require('./controllers/artistController');
const bookingController = require('./controllers/bookingController');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);


const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
const port = process.env.PORT || 3000;

console.log("hello world");

const testFunction = async () => {
  const add = `INSERT INTO users (name, email, password, location) VALUES ('Yirou', 'yirou@gmail.com', '6789', 'new york city')`
  await db.query(add)
  console.log('textFunction executed')
}
// testFunction();


// USER STUFF
// WE NEED SPECIFIC NAMES / URIs
// get/post/patch...


// /api/signup
app.post('/api/signup', userController.saveUser, (req, res) => {
  //save user/artist in corresponding database
  return res.status(200);
});
//signup
  // post
  // save name, email, password in user tabele if user type if individual
  // save bio_short, email, password, locatiion, hourly rate in artist table if individual

//login
app.post('/api/login', userController.loginUser, (req, res) => {
  //join user and artist table
  //authenticate user with email
  //login user
  // {userType: artist}
  return res.status(200);
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


//backend send a full list of artist
app.get('/api/artists', artistController.getAllArtists, (req, res) => {
  return res.status(200).json(res.locals.artists);
})


// booking (user / artist)
  //post request, time slot, user id, artist id will be passed through request body
app.post('api/booking', bookingController.createBooking, (req, res) => {
  // create a booking in booking table
  return res.status(200).json('api/booking');
})

app.get('api/booking', bookingController.getBookings, (req, res) => {
  // display bookings
  return res.status(200).json('api/booking');
});


// ARTIST STUFF and PROFILES
app.post('api/profile/:artist', artistController.createProfile, (req, res) => {
  // create artist profile
  return res.status(200).json('api/artist');
});

app.get('api/profile/:artist', artistController.getProfile, (req, res) => {
  // display artist profile
  return res.status(200);
});

app.put('api/profile/:artist', artistController.editProfile, (req, res) => {
  // edit artist profile
  return res.status(200);
})

app.get('api/profile/:/artist/links', artistController.getPortfolioLinks, (req, res) => {
  // display all URLs on artists's portfolio
  return res.status(200);
});



app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});


//Stripe API
app.post('/api/checkout', async(req, res) => {
  //get artistid from booking controller
  const artistRate = req.body.hourly_rate;
  const hours = req.body.hours;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'artist_booking'},
            // unit_amount: artistRate * 100,
            unit_amount: 50 * 100,
          },
          // quantity: hours,
          quantity: 1,
        }
      ],
      success_url:`${process.env.SERVER_URL}/bookings.html`,
      cancel_url:`${process.env.SERVER_URL}/home.html`,
    })
    res.json({ url: session.url })
    console.log(res.json({ url: session.url }))
  } catch(e) {
    res.status(500).json({error: e.message});
  }

})




app.listen(port, console.log(`Listening on port ${port}`));