'use strict';

const mongoose = require('mongoose');

//A schema specifies how all documents in a particular collection should look. 
//We specify the properties the document has, along with their schema type, 
//and other additional settings (like if they're required, if they have default values, etc.):
const purchaseHistorySchema = mongoose.Schema({
	classes: {type: String},
	date: {type: String},
	amount: {type: String},
  stripeToken: {type: String},
  userId: {type: String}
});


//This code gives each instance of our Purchase History model a serialize method, 
//which lets us specify how purchases are represented outside of our application via our API. 
//Things like passwords can be left out of the serialize method so they are inaccessble via our API.
purchaseHistorySchema.methods.serialize = function() {

  return {
  classes: this.classes,
  date: this.date,
  amount: this.amount,
  stripeToken: this.stripeToken,
  userId: this.userId
  };
};


const PurchaseHistory = mongoose.model('Purchase', purchaseHistorySchema);
 
module.exports = {PurchaseHistory};