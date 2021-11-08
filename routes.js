const express = require('express');

const { environment } = require('./config/index');
const db = require('./db/models');

const router = express.Router();

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/parks', asyncHandler(async (req, res) => {
  const parks = await db.Park.findAll({ order: [['parkName', 'ASC']] });
  res.render('park-list', { title: 'Parks', parks });
}));

router.get('/park/:id(\\d+)', asyncHandler(async (req, res) => {
  const parkId = parseInt(req.params.id, 10);
  const park = await db.Park.findByPk(parkId);
  res.render('park-detail', { title: 'Park Detail', park });
}))

if (environment !== 'production') {
  router.get('/error-test', () => {
    throw new Error('This is a test error.');
  });
}

module.exports = router;