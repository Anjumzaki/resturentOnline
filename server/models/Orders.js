const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
    storeId: {
        type: String
    },
    products: [ {
        product: {
            _id: {
                type: String
            },
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
            quantity: String,
            expDate: String,
            favourites: [{
                userId: String
            }]
    },
    quantity: String,
    amount: String
    }
    ],
    totalAmount: {
        type: String
    },
    tax: String,
    orderNumber: String,
    storeName: String,
    storeAddress: String,
    storePhone: String,
    userId: String,
    isSomeOneElse: Boolean,
    someoneElseFirstName: String,
    someoneElseLastName: String,
    someoneElseEmail: String,
    someoneElseMobile: String,
    name: {
        type: String
    },
    firstName: String,
    lastName: String,
    phone: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    orderTime :{
        type: String
    },
    orderDate :{
        type: String
    },
    orderTimeZone :{
        type: String
    },
    postDate: String,
    postTime: String,
    isGuest: Boolean,
    isInPreparation: Boolean,
    isReady: Boolean,
    isPicked: Boolean,
    isAccepted: Boolean, 
    isRejected: Boolean
});

module.exports = Order = mongoose.model('Order', OrderSchema);