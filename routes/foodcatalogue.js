const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const FoodCatalogue = require("../models/foodcatalogue");


router.get("/fooditems", middleware.logGetRequest, function (req, res) {
    let {
        foodName,
        cusine,
        cost
    } = req.query;

    let page = req.query.page?req.query.page:1 ;
    let limit = req.query.limit?req.query.limit:5 ;
    let sort = "desc" ;
    if(req.query.sort && req.query.sort == "asc")
    sort = "asc" ;

    let skip = (page - 1) * limit ;
    let query = {};
    if (foodName) {
        let foodNameSubStringRegex = foodName;
        query["name"] = {
            "$regex": foodNameSubStringRegex,
            "$options": "i"
        }
    }

    if (cusine) {
        let cusineSubStringRegex = cusine
        query["cusine"] = {
            "$regex": cusineSubStringRegex,
            "$options": "i"
        }
    }

    if (cost != undefined || cost != null) {
        query["cost"] = {
            $lte: cost
        }
    }


    FoodCatalogue.find(query)
        .sort({updatedAt : sort})
        .then(foodItems => {
            let totalCount = foodItems.length ;
            foodItems = foodItems.slice(skip,limit * page) ;
            return res.json({
                foodItems: foodItems,
                totalCount : totalCount
            })
        })
        .catch(err => {
            console.log("Error in finding data", err);
            return res.status(400).json({
                message: "An error occurred , Please try again"
            })
        })
})

module.exports = router;