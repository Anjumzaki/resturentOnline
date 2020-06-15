const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SubCategorySchema = new Schema({
    superCategory: {
        type: String
    },
    subCategory: {
        type: String
    },
    storeId: {
        type: String
    }
});

module.exports = SubCategory = mongoose.model('SubCategory', SubCategorySchema);