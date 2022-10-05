  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(40),
    password VARCHAR(50),
    location VARCHAR(50),
    UNIQUE (email)
  );

  CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    bio_short VARCHAR(220),
    email VARCHAR(50),
    password VARCHAR(50),
    location VARCHAR(80),
    hourly_rate INTEGER
  );

  CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(40)
  );

  CREATE TABLE artist_categories (
    id SERIAL PRIMARY KEY,
    artist_id INTEGER NOT NULL REFERENCES artists(id) ,
    category_id INTEGER NOT NULL REFERENCES categories(id)
  );


  CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    artist_id INTEGER NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    bio VARCHAR(400),
    profile_image_url VARCHAR(400)
  );

  CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    text VARCHAR(200),
    portfolios_id INTEGER NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE
  );


  CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    -- user_id INTEGER NOT NULL REFERENCES users(id),
    booker_id INTEGER NOT NULL,
    booker_type VARCHAR(50) NOT NULL,
    artist_id INTEGER NOT NULL REFERENCES artists(id),
    amount INTEGER NOT NULL, 
    booking_start TIMESTAMP WITH TIME ZONE NOT NULL,
    booking_end TIMESTAMP WITH TIME ZONE NOT NULL
  );

