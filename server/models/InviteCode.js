const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const InviteCode = new Schema({
  
inviteCode: {
    type: String
}
});

module.exports = InviteCode = mongoose.model('InviteCode', InviteCode);