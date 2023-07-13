const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
////////////////////////////////////////

const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', 'qwerty123');

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected successfully'));

// Read tours-simple.json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`)
);

// Export the Data to DB
const exportTours = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log(
      'Tours, users and reviews are exported to the Database'
    );
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all Tour's data from DB
const deleteAllTours = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('All collections are deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--export') exportTours();

if (process.argv[2] === '--delete') deleteAllTours();
