const fs = require('fs');
const path = require('path');

const db = require('../database/models')

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand');
const finalPrice = require('../utils/finalPrice')

const controller = {
	// Root - Show all products
	index: (req, res) => {
		db.Product.findAll({
			include: [{ all: true }]
		})
			.then(products => {
				return res.render('products', {
					products,
					toThousand,
					finalPrice
				})
			})
			.catch(error => console.log(error))
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		
		db.Product.findByPk(req.params.id, {
			include : [{all:true}]
		})
			.then(product => {
				return res.render('detail',{
					product,
					finalPrice,
					toThousand
				})
			})
			.catch(error => console.log(error))

	},

	// Create - Form to create
	create: (req, res) => {
		
		const categories = db.Category.findAll();
		const sections = db.Section.findAll();

		Promise.all([categories, sections])
			.then(([categories,sections]) => {
				return res.render('product-create-form',{
					categories,
					sections
				})
			})
			.catch(error => console.log(error))



	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name, price, discount,category, section, description} = req.body;

		db.Product.create({
			name : name.trim(),
			price,
			discount,
			description: description.trim(),
			categoryId : category,
			sectionId : section
		})
			.then(product => {
				if(req.files.length > 0){

					const images = req.files.map(image => {
						let img = {
							file : image.filename,
							productId : product.id
						}
						return img
					})

					db.Image.bulkCreate(images,{validate: true})
						.then( () => console.log('imagenes agregadas'))
				}
				res.redirect('/products')
			})
	
		
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(product => product.id === +req.params.id);
		return res.render('product-edit-form',{
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		const {name, price, discount, category, description} = req.body;

		products.map(product => {
			if(product.id === +req.params.id){
				product.name = name;
				product.price = +price;
				product.discount = +discount;
				product.category = category;
				product.description = description;
			}
		})
		
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),'utf-8');
		res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productsModify = products.filter(product => product.id !== +req.params.id);
		fs.writeFileSync(productsFilePath,JSON.stringify(productsModify,null,2),'utf-8');
		res.redirect('/products')
	}
};

module.exports = controller;