const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const InviteCodeSchema = new Schema({
  
inviteCode: {
    type: String
}
});

module.exports = InviteCode = mongoose.model('InviteCode', InviteCodeSchema);