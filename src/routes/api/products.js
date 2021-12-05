var express = require('express');
var router = express.Router();

const upload = require('../../middlewares/upLoadImagesProduct');


const {deleteImage, addImage} = require('../../controllers/api/productsController')

router
    .get('/delete-image/:id', deleteImage)
    .post('/add-images/:id',upload.any(), addImage)


module.exports = router