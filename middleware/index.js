
const fs = require("fs");
let middlewareObj = {};

middlewareObj.logGetRequest = function(req,res,next){
    let current_datetime = new Date();
    let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();
    
    let queryParams = [] ;
    for(let prop in req.query){
        queryParams.push(prop) ;
        queryParams.push(req.query[prop]) ;
        console.log(req.query[prop]) ;
    }
    let log = `[${formatted_date}] query parameters ${queryParams}`;
    fs.appendFile("searchApiLogs.txt", log + "\n", err => {
        if (err) {
            console.log(err);
        }
    });
    next() ;
}

module.exports = middlewareObj;