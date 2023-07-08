const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
////////////////////////////////////////

const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModels');

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

// Export the Data to DB
const exportTours = async () => {
  try {
    await Tour.create(tours);
    console.log('Tours are exported to the Database');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all Tour's data from DB
const deleteAllTours = async () => {
  try {
    await Tour.deleteMany();
    console.log('All tours deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--export') exportTours();

if (process.argv[2] === '--delete') deleteAllTours();
