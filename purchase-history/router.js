'use strict';

const express = require('express');

const bodyParser = require('body-parser');
//need to pass this into the route handler
const jsonParser = bodyParser.json();

const {PurchaseHistory} = require('./models');

const router = express.Router();

const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

router.post('/', jsonParser, jwtAuth, (req, res) => {
	PurchaseHistory.create({
		id: req.body.id,
		classes: req.body.classes,
		date: req.body.date,
		userId: req.body.userId,
		stripeToken: req.body.stripeToken,
		amount: req.body.amount
	})
	.then((post) => {
	    res.json(post.serialize())
	  }) 
	.catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'});
	});

});

router.get('/:userId', jwtAuth, (req, res) => {
	PurchaseHistory
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

