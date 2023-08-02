const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // 1. Get all tours from collection
  const tours = await Tour.find();

  // 2. Build the template

  // 3. Render the template
  res.status(200).render('overview', {
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate(
    {
      path: 'reviews',
      fields: 'review rating user',
    }
  );

  res.status(200).render('tour', {
    title: tour.name,
    tour: tour,
  });
});
