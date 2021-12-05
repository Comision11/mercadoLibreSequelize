const db = require('../database/models');
const {Op} = require('sequelize');

const toThousand = require('../utils/toThousand');
const finalPrice = require('../utils/finalPrice');

const controller = {
	index: (req, res) => {
		let novedades = db.Section.findByPk(1, {
			include: [
				{ 
					association: 'products',
					include: [{ all: true }]
				}
			]
		})
		let ofertas = db.Section.findByPk(2, {
			include: [
				{ 
					association: 'products',
					include: [{ all: true }]
				}
			]
		})

		Promise.all([novedades,ofertas])
			.then(([novedades,ofertas]) => {
				return res.render('index', {
					novedades : novedades.products,
					ofertas,
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
