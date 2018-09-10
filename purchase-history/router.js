'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {PurchaseItem} = require('./models');

const router = express.Router();

const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.post('/', jwtAuth, (req, res) => {
	PurchaseItem.create({
		id: req.body.id,
		package: req.body.package,
		purchaseDate: req.body.purchaseDate
	})
	.then((item) => {
		res.status(201).json(item.serialize())
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'});
	});

});


module.exports = {router};