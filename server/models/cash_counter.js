// importing the mongoose.
const mongoose = require("mongoose"); 
// 

const schema = mongoose.Schema;

const cashCounterSchema = new schema({
  date:{
    type:String,
    required:true
  },
  suplierId: {
    type: schema.Types.ObjectId,
    ref: "Suplier",
  },
  customerId: {
    type: schema.Types.ObjectId,
    ref: "Customer",
  },
  subName: {
    type: String,
  },
  lotNo: {
    type: Number,
    required: true,
  },
  boxNo: {
    type: Number,
    required: true,
  },
  pieces: {
    type: Number,
    default: 0,
    required: true,
  },
  fishId: {
    type: schema.Types.ObjectId,
    ref: "Fish",
  },
  kg: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  cash: {
    type: Boolean,
    required: true,
  },
  credit: {
    type: Boolean,
    required: true,
  },
});

// creating the collection.
const CashCounter = mongoose.model("CashCounter",cashCounterSchema);
// 

// exporting the collection so that we use in our app.js
module.exports = CashCounter;
// 