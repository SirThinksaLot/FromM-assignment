const mongoose = require("mongoose");
const FoodCatalogue = require("./models/foodcatalogue");

const data = [{
        name: "Aloo Paratha",
        type: "Breakfast",
        cusine: "Punjabi",
        cost : 100,
        stock : 5
    },
    {
        name: "Baigan Ka Bartha",
        type: "Dinner",
        cusine: "Marathi",
        cost: 100,
        stock : 4

    }
];


function seedDB(){
    FoodCatalogue.deleteMany({})
        .then(emptyCatalogue=>{
            let insertFoodItemQueryArray = [] ;
             data.forEach(foodItem=>{
                let insertQuery = FoodCatalogue.create(foodItem) ;
                insertFoodItemQueryArray.push(insertQuery) ;
            })  ;
            
            return Promise.allSettled(insertFoodItemQueryArray) ;
        })
        .then(updatedFoodCatalogue=>{
            console.log("updated foodCatalogue",updatedFoodCatalogue) ;
        })
        .catch(err=>{
            console.log("error in seeding the footcatalogue db", err) ;
        })
}


module.exports = seedDB;