// requiring the cash counter schema.
const CashCounter = require("../models/cash_counter");

const Fish = require("../models/fish");

const suplier = require("../models/suplier");
//

module.exports.generateBill = async (req, res) => {
  // const data = await CashCounter.aggregate([
  //   {
  //     $group: {
  //       _id: { suplier: "$suplierId", fish: "$fishId" },
  //       totalsaleweigth: { $sum: "$kg" },
  //       totalaveragerate: { $avg: "$rate" },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$_id.suplier",
  //       fish: {
  //         $push: {
  //           fish: "$_id.fish",
  //           totalsaleweigth: "$totalsaleweigth",
  //           totalaveragerate: "$totalaveragerate",
  //         },
  //       },
  //     },
  //   },
  // ]);

  const data = await CashCounter.aggregate([
    {
      $lookup: {
        from: "supliers",
        localField: "suplierId",
        foreignField: "_id",
        as: "suplier",
      },
    },
    {
      $unwind: "$suplier",
    },
    {
      $lookup: {
        from: "fish",
        localField: "fishId",
        foreignField: "_id",
        as: "fish",
      },
    },
    {
      $unwind: "$fish",
    },
    {
      $group: {
        _id: { suplier: "$suplier", fish: "$fish" },
        totalsaleweigth: { $sum: "$kg" },
        totalaveragerate: { $avg: "$rate" },
      },
    },
    {
      $group: {
        _id: "$_id.suplier",
        supplierDetails: { $first: "$_id.suplier" }, // Include supplier details
        fish: {
          $push: {
            fishDetails: "$_id.fish", // Include fish details
            totalsaleweigth: "$totalsaleweigth",
            totalaveragerate: "$totalaveragerate",
          },
        },
      },
    },
  ]);

  // for (d of data) {
  //   console.log(d._id.suplierName);
  //   for (f of d.fish) {
  //     console.log(
  //       `${f.fishDetails.fishName} ${f.totalsaleweigth} ${f.totalaveragerate} ${
  //         f.totalaveragerate * f.totalsaleweigth
  //       }`
  //     );
  //   }
  // }

  res.render("../views/billing/billing.ejs",{data});
};
