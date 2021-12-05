const db = require('../../database/models')
const path = require('path');
const fs = require('fs');

module.exports = {
    deleteImage : async (req,res) => {
        try {
            let image = await db.Image.findByPk(req.params.id)

            fs.existsSync(path.join(__dirname, '../../public/images/' +image.file)) ? fs.unlinkSync(path.join(__dirname, '../../public/images/' +image.file)) : null

            await db.Image.destroy(
                {
                    where : {
                        id : req.params.id
                    }
                }
            )
            let images = await db.Image.findAll({
                where : {
                    productId : image.productId
                }
            })
            let response = {
                status : 200,
                message : 'Imagen eliminada',
                images
            }
            return res.status(201).json(response)
        
        } catch (error) {
            return res.status(400).json({
                status : 400,
                message : error
            })
        }
    },
    addImage : async (req,res) => {
        
        try {
            let files = req.files.map(image => {
                let img = {
                    file : image.filename,
                    productId : req.params.id
                }
                return img
            })
            await db.Image.bulkCreate(files,{validate :  true})
            let images = await db.Image.findAll({
                where : {
                    productId : req.params.id
                }
            })
            let response = {
                status : 200,
                message : 'Imagenes agregadas',
                images
            }
            return res.status(201).json(response)
        } catch (error) {
            return res.status(400).json({
                status : 400,
                message : error
            })
        }
    },
}