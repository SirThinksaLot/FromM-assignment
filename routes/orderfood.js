const express = require("express");
const router = express.Router();
const FoodCatalogue = require("../models/foodcatalogue");
const Stock = require("../models/stock");
const Orders = require("../models/orders");

router.post("/orderFoodItems", function (req, res) {
    let opts = req.body;
    let randomNumber = Math.floor(Math.random() * 10);
    if (!opts.hasOwnProperty('itemList')) return res.status(400).json({
        message: "ItemList not sent"
    });
    if (randomNumber) {
        process.nextTick(function () {
            return orderFood(opts)
                .then(response => {
                    return res.json({
                        message: "Order successfully placed"
                    });
                })
                .catch(err => {
                    return res.status(400).json({
                        message: "Items out of stock ,Please try again"
                    });
                })
        })
    } else {
        setImmediate(function () {
            return orderFood(opts)
                .then(response => {
                    return res.json({
                        message: "Order successfully placed"
                    });
                })
                .catch(err => {
                    return res.status(400).json({
                        message: "Please try again"
                    });
                })
        })
    }

    function orderFood(opts) {
        if (opts.itemList.length == 0) return Promise.reject(false);

        let queryFoodItemsArray = [];
        let optsFoodListMap = new Map();
        opts.itemList.forEach(item => {
            let query = Stock.findOne({
                foodCatalogueId: item.foodCatalogueId,
            });
            queryFoodItemsArray.push(query);
            optsFoodListMap.set(item.foodCatalogueId, item.count);
        });

        return Promise.all(queryFoodItemsArray)
            .then(foodItems => {
                let updateQueryArray = [];
                for (const item of foodItems) {
                    item.delete
                    if (item.stock < optsFoodListMap.get(item.foodCatalogueId))
                        return Promise.reject("Break here");

                    let updateQuery = Stock.findOneAndUpdate({
                        foodCatalogueId: item.foodCatalogueId
                    }, {
                        "$inc": {
                            stock: Math.abs(optsFoodListMap.get(item.foodCatalogueId.toString())) * -1
                        }
                    })

                    updateQueryArray.push(updateQuery);

                }

                return Promise.all(updateQueryArray)

            })
            .then(updatedFoodItems => {
                if (updatedFoodItems.length > 0) {
                    Orders.create(opts)
                    return Promise.resolve(true)
                };
                return Promise.reject(false);
            })
            .catch(err => {
                return Promise.reject(false);
            })
    }

})

module.exports = router;
