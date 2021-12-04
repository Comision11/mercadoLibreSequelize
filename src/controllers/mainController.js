const db = require('../database/models');
const {Op} = require('sequelize');

const toThousand = require('../utils/toThousand');
const finalPrice = require('../utils/finalPrice');

const controller = {
	index: (req, res) => {

		db.Product.findAll({
			include: [{ all: true }]
		})
			.then(products => {
				return res.render('index', {
					products,
					toThousand,
					finalPrice
				})
			})
			.catch(error => console.log(error))
	},
	search: (req, res) => {

		db.Product.findAll({
			include : [{all:true}],
			where :{
				[Op.or] : [
					{
						name : {
							[Op.substring] : req.query.keywords.trim()
						}
					},
					{
						description : {
							[Op.substring] : req.query.keywords.trim()
						}
					}
				]
			}
		})
			.then(products => {
				return res.render('results', {
					products,
					toThousand,
					finalPrice,
					busqueda: req.query.keywords.trim()
				})
		
			})
			.catch(error =>console.log(error))
		
	
	},
};

module.exports = controller;
