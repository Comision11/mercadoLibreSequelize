// ************ Require's ************
const express = require('express');
const router = express.Router();

const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator')
const upFileAvatar = require('../middlewares/upFileAvatar');


// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get('/register', usersController.register); 
router.post('/register',registerValidator, usersController.processRegister); 
router.get('/login', usersController.login); 
router.post('/login',loginValidator, usersController.processLogin); 
router.get('/logout', usersController.logout);
router.get('/profile', usersController.profile);
router.put('/update', upFileAvatar.single('avatar'), usersController.update)
module.exports = router;
