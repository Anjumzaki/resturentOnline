const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LocationSchema = new Schema({
  
refId: {
  type: String
},
type: String,
address1: {
    type: String,
  },
address2: {
    type: String,
    },
city: {
    type: String,
},
country: {
    type: String,
},
zipCode: {
    type: String,
},
latitude: String,
longitude: String

});

module.exports = Location = mongoose.model('Location', LocationSchema);