const db = require('../models/database');

const artistController = {};

artistController.getAllArtists = (req, res, next) => {
  console.log("getAllArtists")
  const query = 'SELECT artists.id as artist_id, artists.name, artists.email, artists.location, artists.hourly_rate, portfolios.bio, portfolios.profile_image_url, portfolios.homepage_url, artcat.categories_array FROM artists JOIN portfolios ON artists.id = portfolios.artist_id JOIN (select artists.id, array_agg(categories.category) as categories_array from artists JOIN artist_categories ON artists.id = artist_categories.artist_id JOIN categories ON categories.id = artist_categories.category_id group by artists.id) artcat ON artists.id = artcat.id';
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

artistController.getProfile = (req, res, next) => {
  console.log("getProfile")
  // WIP
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
};

artistController.editProfile = async (req, res, next) => {
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