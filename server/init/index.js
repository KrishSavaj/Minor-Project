const mongoose = require ("mongoose");

const Suplier = require("../models/suplier.js");

// creating connection to database.
const mongo = "mongodb://127.0.0.1:27017/FishShop";

main().then((res) => {
    console.log("connected to the database");
}).catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(mongo); 
}
// 