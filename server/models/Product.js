const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    storeId: {
        type: String
    },
    productType: {
        type: String
    },
    productName: {
        type: String
    },
    price: {
        type: String
    },
    discount: {
        type: String
    },
    productDescription: {
        type: String
    },
    specialInstruction: {
        type: String
    },
    servingSize: {
        type: String
    },
    servingPerContainer: {
        type: String
    },
    calories: {
        type: String
    },
    fatInGm: {
        type: String
    },
    saturatedFatInGm: {
        type: String
    },
    polyunsaturatedFatInGm: {
        type: String
    },
    monounsaturatedFatInGm: {
        type: String
    },
    transFatInGm: {
        type: String
    },
    protienInGm: {
        type: String
    },
    cholesterol: {
        type: String
    },
    sodium: {
        type: String
    },
    potassium: {
        type: String
    },
    totalCarbs: {
        type: String
    },
    dietaryFiber: {
        type: String
    },
    sugar: {
        type: String
    },
    noOfImages: {
        type: String
    },
    disclaimer : {
        type: String
    },
    quantity: String,
    expDate: String,
    isFeatured: Boolean,
    featuredQuantity: String,
    featuredPrice: String,
    featuredSaving: String,
    featuredUnit: String,
    featuredDetails: String,
    isOutOfStock: Boolean,
    outOfStockDate: String,
    favourites: [{
        userId: String
    }]
});
 
module.exports = Product = mongoose.model('Product', ProductSchema);