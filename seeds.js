const mongoose = require("mongoose");
const FoodCatalogue = require("./models/foodcatalogue");
const Stock = require("./models/stock");

const data = [{
        name: "Aloo Paratha",
        type: "Breakfast",
        cusine: "Punjabi",
        cost: 100,
        stock: 5
    },
    {
        name: "Baigan Ka Bartha",
        type: "Dinner",
        cusine: "Marathi",
        cost: 100,
        stock: 4

    }
];


function seedDB() {
    let stockMap = new Map();
    Promise.all([
            FoodCatalogue.deleteMany({}),
            Stock.deleteMany({})
        ])
        .then(([emptyCatalogue,emptyStock]) => {
            let insertFoodItemQueryArray = [];
            data.forEach(foodItem => {
                stockMap.set(foodItem.name, foodItem.stock);
                delete foodItem.stock;
                let insertQuery = FoodCatalogue.create(foodItem);
                insertFoodItemQueryArray.push(insertQuery);
            });

            return Promise.all([
                Promise.all(insertFoodItemQueryArray),
                Promise.resolve(stockMap)
            ])
        })
        .then(([updatedFoodCatalogue, stockMap]) => {
            let stockInsertQueryArray = [];
            updatedFoodCatalogue.forEach(item => {
                let insertQuery = Stock.create({
                    foodCatalogueId: item.id,
                    stock: stockMap.get(item.name)
                });

                stockInsertQueryArray.push(insertQuery);
            })
            console.log("updated foodCatalogue", updatedFoodCatalogue);
            return Promise.all(stockInsertQueryArray);
        })
        .then(insertedStockData => {
            console.log("inserted stock data", insertedStockData);
        })
        .catch(err => {
            console.log("error in seeding the footcatalogue db", err);
        })
}


module.exports = seedDB;