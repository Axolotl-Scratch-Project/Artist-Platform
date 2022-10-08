const db = require('../models/database');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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
  if ( artistExistenceCheck.rowCount > 0 ) {
    throw new Error ('A user with this email already exists');
  } else {
    // creating a new artist in the DB
    const createArtistQuery = `
      INSERT INTO artists (email, name, password, location)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    // create a bcrypt hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password.toString(), salt);
    const newArtist = await db.query(createArtistQuery, [email, displayName, passwordHash, loc]);
    // create a JWT token
    const token = jwt.sign(
      {
        user: newArtist.rows[0].id,
        usertype: 'artist'
      },
      process.env.JWT_SECRET
    );
    // create a cookie w/ JWT token
    res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.locals.artistData = newArtist.rows[0];
    // create an artist portfolio
    const createPortfolioQuery = `
      INSERT INTO portfolios (artist_id)
      values ($1)
      RETURNING *
    `;
    const newPortfolio = await db.query(createPortfolioQuery, [newArtist.rows[0].id]);
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

    --DELETE FROM artist_categories WHERE artist_id = ${artist_id};
    COMMIT;
    `;

    console.log("editProfile")

    try {
      // update main profile info
      const result = await db.query(query);

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


artistController.addPortfolioGalleryLink = async (req, res, next) => {
  console.log('addPortfolioGalleryLink')
  const artist_id = req.query.id;
  // console.log('req.body', req.body)
  // console.log('req.body[0]', req.body[0])
  const { gallerypiece_id, gallerypiece_url, gallerypiece_text , portfolio_id } = req.body[0];

  const queryCheck = `SELECT * FROM urls 
  WHERE urls.portfolios_id = ${portfolio_id}
  AND urls.id = ${gallerypiece_id}`;

  const queryInsert = `
    INSERT INTO urls(gallerypiece_url, gallerypiece_text, portfolios_id)
    VALUES ('${gallerypiece_url}', '${gallerypiece_text}', ${portfolio_id})
    RETURNING *
  `;

  try {
    if (gallerypiece_id !== null) {
      const oldGalleryLinks = await db.query(queryCheck);
      // console.log('result1', oldGalleryLinks.rows)

      if (oldGalleryLinks.rows.length > 0) {
        throw new Error ('That gallerypiece_id already exists');
      }
    }
    // if no previous links exist in db, add new link
    else {
      const newRow = await db.query(queryInsert);
      res.locals.newGalleryPiece = newRow.rows;
      console.log('added new gallery piece', res.locals.newGalleryPiece)
      return next();
    }
  } 
  catch (error) {
    console.error('error in artistController.addPortfolioGalleryLink:', error);
    return next(error);
  }
}


artistController.deletePortfolioGalleryLink = async (req, res, next) => {
  console.log('deletePortfolioGalleryLink')
  const artist_id = req.query.id;
  console.log('req.body', req.body)
  console.log('req.body[0]', req.body[0])
  const { gallerypiece_id, gallerypiece_url, gallerypiece_text , portfolio_id } = req.body[0];

  const queryDelete = `
    DELETE FROM urls WHERE urls.id = ${gallerypiece_id}
    RETURNING *`;

  try {
    console.log('entering try')
   
    const deletedPiece = await db.query(queryDelete);
    console.log('deletedPiece', deletedPiece.rows)
    res.locals.deletedPiece = deletedPiece.rows;
    console.log('deleted gallery piece', res.locals.deletedPiece)
    return next();
  } 
  catch (error) {
    console.error('error in artistController.addPortfolioGalleryLink:', error);
    return next(error);
  }
}


// artistController.editPortfolioGalleryLinks = async (req, res, next) => {
//   console.log("editPortfolioGalleryLinks")
//   const id = req.query.id;
//   const oldGalleryLinks = res.locals.artistGalleryLinks;
//   const newGalleryLinks = req.body;
//   const portfolio_id = newGalleryLinks[0].portfolio_id;
//   console.log('newGalleryLinks', newGalleryLinks)
//   console.log('porfolio id', portfolio_id)

//   // add oldGalleryLinks ids into cache as key and index as value
//   const oldGalleryLinksIdCache = {};
//   for (let i = 0; i < oldGalleryLinks.length; i++) {
//     oldGalleryLinksIdCache[oldGalleryLinks[i].gallerypiece_id] = i;
//   }
//   console.log('oldGalleryLinksIdCache', oldGalleryLinksIdCache)

//   // add newGalleryLinks ids into cache as key and index as value
//   const newGalleryLinksIdCache = {};
//   for (let i = 0; i < newGalleryLinks.length; i++) {
//     console.log(`newGalleryLinks[${i}]`, newGalleryLinks[i])
//     if (newGalleryLinks[i].hasOwnProperty('gallerypiece_id')) {
//       newGalleryLinksIdCache[newGalleryLinks[i].gallerypiece_id] = i;
//     }
//   }

//   console.log('newGalleryLinksIdCache', newGalleryLinksIdCache)

//   // iterate through new collection to see if gallery link is already in cache. if not add it.
//   for (let i = 0; i < newGalleryLinks.length; i++) {
//     const query = `
//       INSERT INTO urls(gallerypiece_url, gallerypiece_text, portfolios_id)
//       VALUES ('${newGalleryLinks[i].gallerypiece_url}', '${newGalleryLinks[i].gallerypiece_text}', ${newGalleryLinks[i].portfolio_id})
//       `;
//     // if new link does not have an id, add new link
//     if (!newGalleryLinks[i].gallerypiece_id) {
//       // insert link
//     } 
//     else {
//       // verify id doesn't already exist in db
//       let newPieceId = newGalleryLinks[i].gallerypiece_id;
//       console.log('newPieceId', newPieceId)
//       if (!newPieceId in oldGalleryLinksIdCache) {
//         // insert link
//       }
//     }
//   }

//   //

//   return next();
// }


module.exports = artistController;