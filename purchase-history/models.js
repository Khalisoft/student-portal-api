'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//A schema specifies how all documents in a particular collection should look. 
//We specify the properties the document has, along with their schema type, 
//and other additional settings (like if they're required, if they have default values, etc.):
const PurchaseSchema = mongoose.Schema({
  package: {type: String},
  purchaseDate: {type: String},
  userId: {type: String}
});

//This code gives each instance of our Purchase History model a serialize method, 
//which lets us specify how purchases are represented outside of our application via our API. 
//Things like passwords can be left out of the serialize method so they are inaccessble via our API.
PurchaseSchema.methods.serialize = function() {
  return {
    package: this.package,
    purchaseDate: this.purchaseDate,
    userId: this.userId
  };
};


const PurchaseItems = mongoose.model('PurchaseItems', PurchaseSchema);

module.exports = {PurchaseItems};