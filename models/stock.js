const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const stockSchema = new Schema({
    foodCatalogueId: {
        type: mongoose.Schema.ObjectId,
        ref: "FoodCatalogue",
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Stock", stockSchema);