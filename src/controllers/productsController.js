const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand');
const finalPrice = require('../utils/finalPrice')

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		return res.render('products',{
			products,
			finalPrice,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(product => product.id === +req.params.id);
		return res.render('detail',{
			product,
			finalPrice,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name, price, discount,category, description} = req.body;
		let product = {
			id : products[products.length - 1].id + 1,
			name,
			price : +price,
			discount : +discount,
			category,
			description,
			image : 'default-image.png'
		}
		products.push(product)
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),'utf-8');
		res.redirect('/products')
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