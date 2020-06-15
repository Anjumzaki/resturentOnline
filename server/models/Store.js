const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StoreSchema = new Schema({
  
storeName: {
  type: String
},
ownerName: {
    type: String,
  },
emailAddress: {
    type: String,
  },
companyName: {
    type: String,
},
companyId: {
  type: String
},
phoneNumber: {
    type: String,
  },
storeAddress: {
    type: String,
  },
city: {
    type: String,
  },
county: {
    type: String,
  },
zipCode: {
    type: String,
  },
userName: {
    type: String,
  },
password: {
    type: String,
  },
aboutStore: {
    type: String,
  },
  tax: {
    type: String,
  },
  isActive: {
      type: Boolean,
  },
  storeTimings: [
    {
      day: String,
      openTime: String,
      ClosingTime: String,
      isClosed: Boolean
    }
  ],
  c_info_: [{
      c_uName_: String,
      c_passWd_: String,
  }],
  lat: String,
  lng: String,
  messageFromStore: {
    type: String
  },
  orderCancellationPolicy: {
    type: String
  },
  termsAndCondition: {
    type: String
  },
  storeId: String,
  orderNum: String,

});

module.exports = Store = mongoose.model('Store', StoreSchema);