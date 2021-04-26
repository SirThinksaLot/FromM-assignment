const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const foodCatalogueSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    cusine: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("FoodCatalogue", foodCatalogueSchema);