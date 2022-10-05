const db = require('../models/database');

const artistController = {};

artistController.saveArtist = async (req, res, next) => {
  console.log("saveArtist")
  try {
  const { email, displayName, loc, password } = req.body;
  console.log(email, displayName, loc, password);
  // checking if a user with such an email already exists
  const artistExistenceCheckerQuery = `
    select *
    from artists as a
    where email = $1
  `;
  const artistExistenceCheck = await db.query(artistExistenceCheckerQuery, [email]);
  console.log("artistController -> artistUser -> artistExistenceCheck", artistExistenceCheck.rows)
  if ( artistExistenceCheck.rowCount > 0 ) {
    throw new Error ('A user with this email already exists');
  } else {
    // creating a new user in the DB
    const createUser = `
      INSERT INTO artists (email, name, password, location)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    // const createUser = `
    // select *
    // from users
    // `
    const newUser = await db.query(createUser, [email, displayName, password, loc]);
    res.locals.artistData = newUser.rows[0];
  }
  return next();
  } catch (err) {
    next(err);
  }
}

artistController.getAllArtists = (req, res, next) => {
  console.log("getAllArtists")
  const query = 'SELECT artists.name, artists.bio_short, artists.email, artists.location, artists.hourly_rate, portfolios.*, artcat.categories_array FROM artists JOIN portfolios ON artists.id = portfolios.artist_id JOIN (select artists.id, array_agg(categories.category) as categories_array from artists JOIN artist_categories on artists.id = artist_categories.artist_id JOIN categories ON categories.id = artist_categories.category_id group by artists.id) artcat ON artists.id = artcat.id';
  db.query(query)
    .then(data => {
      res.locals.artists = data.rows;
      return next();
    })
};

artistController.createProfile = async (req, res, next) => {
  console.log("createProfile")
  return next();
};

artistController.getProfile = async (req, res, next) => {
  console.log("getProfile")
  const id = req.query.id;
  const query = 'SELECT artists.name, artists.bio_short, artists.email, artists.location, artists.hourly_rate, portfolios.* FROM artists JOIN portfolios ON artists.id = portfolios.artist_id';
  return next();
};

artistController.editProfile = async (req, res, next) => {
  console.log("editProfile")
  return next();
};

artistController.getPortfolioLinks = async (req, res, next) => {
  console.log("getPortfolioLinks")
  return next();
};


module.exports = artistController;