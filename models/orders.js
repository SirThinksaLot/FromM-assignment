const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const ordersSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
   itemList : [
       {
           foodCatalogueId : {
               type : mongoose.Schema.ObjectId,
               required : true,
               ref : "FoodCatalogue"
           },
           count : {
               type : Number ,
               required : true
           }
       }
   ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Orders", ordersSchema);