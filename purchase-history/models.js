'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const PurchaseSchema = mongoose.Schema({
  package: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true
  }
});

PurchaseSchema.methods.serialize = function() {
  return {
    package: this.package || '',
    purchaseDate: this.purchaseDate || ''
  };
};


const PurchaseItem = mongoose.model('PurchaseItem', PurchaseSchema);

module.exports = {PurchaseItem};