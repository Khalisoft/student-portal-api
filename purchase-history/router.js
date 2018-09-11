'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {PurchaseItems} = require('./models');

const router = express.Router();

const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

router.post('/', jwtAuth, (req, res) => {
	PurchaseItems.create({
		id: req.body.id,
		package: req.body.package,
		purchaseDate: req.body.purchaseDate,
		userId: req.body.userId
	})
	.then((item) => {
		res.status(201).json(item.serialize())
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'});
	});

});

router.get('/:userId', jwtAuth, (req, res) => {
	PurchaseItems
	.find({userId: req.params.userId})

    .then( items => {
      res.json(items.map(item => item.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong' });
    });
});

module.exports = {router};