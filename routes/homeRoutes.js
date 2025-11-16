const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

// Routes
router.get('/', homeController.index);
//router.get('/users', homeController.users);

module.exports = router;
