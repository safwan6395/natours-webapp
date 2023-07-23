const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
////////////////////////////////////////

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION SHUTTING DOWN 💥');
  process.exit(1);
});
////////////////////////////////////////

const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', 'qwerty123');

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected successfully'))
  .catch((err) => {
    console.log(
      'connection to the db the failed SERVER SHUTTING DOWN'
    );
    throw err;
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`listening on ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION SHUTTING DOWN 💥');
  server.close(() => {
    process.exit(1);
  });
});
