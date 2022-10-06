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
    const createUserQuery = `
      INSERT INTO artists (email, name, password, location)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    // const createUser = `
    // select *
    // from users
    // `
    const newUser = await db.query(createUserQuery, [email, displayName, password, loc]);
    res.locals.artistData = newUser.rows[0];
    const createPortfolioQuery = `
      INSERT INTO portfolios (artist_id)
      values ($1)
      RETURNING *
    `;
    const newPortfolio = await db.query(createPortfolioQuery, [newUser.rows[0].id]);
  }
  return next();
  } catch (err) {
    next(err);
  }
}

artistController.getAllArtists = (req, res, next) => {
  console.log("getAllArtists")
  const query = 'SELECT artists.id as artist_id, artists.name, artists.email, artists.location, artists.hourly_rate, portfolios.bio, portfolios.profile_image_url, portfolios.homepage_url, artcat.categories_array FROM artists JOIN portfolios ON artists.id = portfolios.artist_id JOIN (select artists.id, array_agg(categories.category) as categories_array from artists JOIN artist_categories ON artists.id = artist_categories.artist_id JOIN categories ON categories.id = artist_categories.category_id group by artists.id) artcat ON artists.id = artcat.id';
  db.query(query)
    .then(data => {
      res.locals.artists = data.rows;
      return next();
    })
    .catch(error => {
      console.error('error in artistController.getAllArtists:', error);
      return next(error)
    })
};

// artistController.createProfile = async (req, res, next) => {
//   console.log("createProfile")
//   return next();
// };

artistController.getProfile = (req, res, next) => {
  console.log("getProfile")
  const id = req.query.id;
  const query = `SELECT artists.id as artist_id, artists.name, artists.email, artists.location, artists.hourly_rate, portfolios.bio, portfolios.profile_image_url, portfolios.homepage_url, artcat.categories_array
  FROM artists
  JOIN portfolios ON artists.id = portfolios.artist_id
  JOIN (
    select artists.id, array_agg(categories.category) as categories_array from artists
    JOIN artist_categories ON artists.id = artist_categories.artist_id JOIN categories ON categories.id = artist_categories.category_id group by artists.id
  ) artcat ON artists.id = artcat.id WHERE artists.id = ${id}`;
  db.query(query)
  .then(data => {
    res.locals.artistProfile = data.rows[0];
    return next();
  })
  .catch(error => {
    console.error('error in artistController.getProfile:', error);
    return next(error);
  })
};

artistController.editProfile = async (req, res, next) => {
  const {name} = req.body.name;
  console.log("editProfile")
  return next();
};

artistController.getPortfolioGalleryLinks = async (req, res, next) => {
  console.log("getPortfolioLinks")
  const id = req.query.id;
  const query = `SELECT artists.id as artist_id, urls.id as galleryPiece_id, urls.gallerypiece_url, urls.gallerypiece_text
  FROM portfolios
  JOIN artists
  ON portfolios.artist_id = artists.id
  JOIN urls
  ON urls.portfolios_id = portfolios.id
  WHERE artists.id = ${id}`;
  db.query(query)
  .then(data => {
    res.locals.artistGalleryLinks = data.rows;
    return next();
  })
};


module.exports = artistController;