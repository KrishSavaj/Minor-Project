// requiring the cash counter schema.
const CashCounter = require("../models/cash_counter");
const Customer = require("../models/customer");
const Suplier = require("../models/suplier");
const Fish = require("../models/fish");
//

// renderring new form.
module.exports.renderAddForm = (req, res) => {
  res.render("../views/cashcounter/cash_counter.ejs");
};
//

// adding the complete data entry to database.
module.exports.AddEntry = async (req, res) => {
  const cash = req.body.cash;

  let entry = new CashCounter();

  const sup = await Suplier.findOne({ suplierName: cash.supname });
  const cust = await Customer.findOne({ customerName: cash.custname });
  const fish = await Fish.findOne({ fishName: cash.fishname });

  entry.date = new Date().toLocaleDateString("de-DE");
  entry.suplierId = sup._id;
  entry.customerId = cust._id;
  entry.fishId = fish._id;
  entry.kg = cash.kg;
  entry.rate = cash.rate;
  entry.amount = cash.kg * cash.rate;

  if (cust._id != "65d6c52be679795fbe3def03") {
    await Customer.findByIdAndUpdate(entry.customerId, {
      $inc: { credit: entry.amount },
    });
  }

  await entry.save();

  res.redirect("/");
};
//

// read operation.
module.exports.showCashCounter = async (req, res) => {
  const cc = await CashCounter.find()
    .populate("suplierId")
    .populate("customerId")
    .populate("fishId");
  res.render("../views/cashcounter/cash_counter_show.ejs", { cc });
};
//

// edit operation.
// edit form renderring.
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const cash = await CashCounter.findById(id)
    .populate("suplierId")
    .populate("customerId")
    .populate("fishId");

  res.render("../views/cashcounter/cash_counter_edit.ejs", {cash});
};
//

// updating the entry.
module.exports.editEntry = async (req, res) => {};
//
//

// deleting particular entry.
module.exports.deleteEntry = async (req, res) => {
  let { id } = req.params;
  const deleteObject = await CashCounter.findByIdAndDelete(id);

  if (deleteObject.customerId != "65d6c52be679795fbe3def03") {
    await Customer.updateOne(
      { _id: deleteObject.customerId },
      { $inc: { credit: -deleteObject.amount } }
    );
  }

  res.redirect("/");
};
//
