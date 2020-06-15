const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CompanySchema = new Schema({
  
companyName: {
    type: String
  },
ownerName: {
    type: String,
  },
emailAddress: { 
    type: String,
  },
phoneNumber: {
    type: String,
},
aboutCompany: {
    type: String,
  }
});

module.exports = Company = mongoose.model('Company', CompanySchema);