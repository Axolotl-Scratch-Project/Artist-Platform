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


artistController.getCategories = (req, res, next) => {
  console.log('getCategories')
  const query = `SELECT * from categories`;
  db.query(query)
    .then(data => {
      res.locals.categories = data.rows;
      return next();
    })
    .catch(error => {
      console.error('error in artistController.getCategories:', error);
      return next(error)
    })
}


artistController.getAllArtists = (req, res, next) => {
  console.log("getAllArtists")
  const query = `
    SELECT artists.id as artist_id, artists.name, artists.email, artists.location, artists.hourly_rate, portfolios.bio, portfolios.profile_image_url, portfolios.homepage_url, artcat.categories_array 
    FROM artists 
    JOIN portfolios 
    ON artists.id = portfolios.artist_id 
    JOIN (
      SELECT artists.id, array_agg(categories.category) as categories_array FROM artists 
      JOIN artist_categories 
      ON artists.id = artist_categories.artist_id 
      JOIN categories 
      ON categories.id = artist_categories.category_id group by artists.id) artcat 
      ON artists.id = artcat.id`;

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


artistController.getProfile = (req, res, next) => {
  console.log("getProfile")
  const id = req.query.id;
  const query = `SELECT artists.id as artist_id, artists.name, artists.email, artists.location, artists.hourly_rate, portfolios.bio, portfolios.profile_image_url, portfolios.homepage_url, portfolios.id as portfolio_id, artcat.categories_array
  FROM artists
  JOIN portfolios ON artists.id = portfolios.artist_id
  JOIN (
    SELECT artists.id, array_agg(categories.category) as categories_array FROM artists
    JOIN artist_categories 
    ON artists.id = artist_categories.artist_id 
    JOIN categories 
    ON categories.id = artist_categories.category_id 
    GROUP BY artists.id
  ) artcat 
  ON artists.id = artcat.id 
  WHERE artists.id = ${id}`;

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
  console.log('req.query', req.query)
  const { artist_id, name, email, location, hourly_rate, bio, profile_image_url, homepage_url, portfolio_id, categories_array } = req.body.artistProfile;
  const artistGalleryLinks = req.body.artistGalleryLinks;
  // console.log('artistGalleryLinks', artistGalleryLinks)

  const query = `
    BEGIN;
    UPDATE portfolios
    SET bio = '${bio}',
    profile_image_url = '${profile_image_url}',
    homepage_url = '${homepage_url}'
    WHERE artist_id = ${artist_id};
    
    UPDATE artists
    SET hourly_rate = '${hourly_rate}',
    location = '${location}'
    WHERE id = ${artist_id};

    DELETE FROM urls WHERE portfolios_id = ${portfolio_id};
    DELETE FROM artist_categories WHERE artist_id = ${artist_id};
    COMMIT;
    `;

    console.log("editProfile")

    try {
      // update main profile info
      const result = await db.query(query);

      // add updated gallery links
      for (let i = 0; i < artistGalleryLinks.length; i++) {
        const currentPiece = artistGalleryLinks[i];
        // console.log('currentpiece', currentPiece)
        const query2 = `
          INSERT INTO urls (portfolios_id, gallerypiece_url, gallerypiece_text)
          VALUES (${portfolio_id}, '${currentPiece.gallerypiece_url}', '${currentPiece.gallerypiece_text}');
        `
        const result2 = await db.query(query2);
        // console.log('result2', result2)
      }

      console.log('categories_array', categories_array)
      for (let i = 0; i < categories_array.length; i++) {
        const current = categories_array[i];
        console.log('current category', current)
        const queryCheck = `SELECT EXISTS(SELECT 1 FROM artist_categories 
          WHERE artist_id = ${artist_id})`;

        const isValidCategory = await db.query(queryCheck);

        if (isValidCategory) {
          const query = `
            INSERT INTO artist_categories(artist_id, category_id)
            VALUES (${artist_id}, (
              SELECT categories.id FROM categories
              WHERE categories.category = '${current}'
            ))`;

          const newCategoryEntry = await db.query(query);
          console.log('categoryExists', newCategoryEntry)
        }
      }

      req.query.id = artist_id;
      // console.log('req.query.id', req.query.id)
      return next();

    } catch (error) {
      console.error('error in artistController.editProfile:', error);
      return next(error);
    }
};


artistController.getPortfolioGalleryLinks = async (req, res, next) => {
  console.log("getPortfolioLinks")
  const id = req.query.id;
  const query = `SELECT artists.id as artist_id, urls.id as galleryPiece_id, urls.gallerypiece_url, urls.gallerypiece_text, urls.portfolios_id as portfolio_id
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