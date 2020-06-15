const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StoreSchema = new Schema({
  
name: {
  type: String
},
category: {
    type: String,
  },
phoneNumber: {
    type: String,
  },
storeAddress: {
    type: String,
  },
stempPrice: {
    type: String,
},
inviteCode: String,
description: String,
address: String,
lat: String,
lng: String

});

module.exports = Store = mongoose.model('Store', StoreSchema);