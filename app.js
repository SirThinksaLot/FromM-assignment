const express = require('express');
const mongoose = require("mongoose");
const app = express();
const foodCatalogueRoutes = require("./routes/foodcatalogue") ;
const orderFoodRoutes = require("./routes/orderfood");
const seedDB = require("./seeds");

seedDB() ;


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

mongoose.connect("mongodb://localhost:27017/fromM", {
    useNewUrlParser: true,
    useUnifiedTopology : true
});

//Base route

app.use(foodCatalogueRoutes) ;
app.use(orderFoodRoutes) ;

app.listen(5000, function () {
    console.log("FromM assignment");
});
