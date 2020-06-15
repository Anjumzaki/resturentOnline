const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RestaurentSchema = new Schema({
  
name:  String,
category: String,
phoneNumber: String,
stempPrice: String,
inviteCode: String,
description: String,
address: String,
lat: String,
lng: String

});

module.exports = Restaurent = mongoose.model('Restaurent', RestaurentSchema);