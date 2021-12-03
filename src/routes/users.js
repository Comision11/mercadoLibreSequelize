// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get('/register', usersController.register); 
router.post('/register', usersController.processRegister); 
router.get('/login', usersController.login); 
router.post('/login', usersController.processLogin); 
module.exports = router;
