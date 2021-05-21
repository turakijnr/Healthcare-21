const express = require("express");
const router = express.Router();
const { Sale } = require("../models/sale");
const { Drug } = require("../models/drug");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { set } = require("mongoose");

router.post("/sales", auth, async (req, res) => {
  //   console.log(req.body);
  //   const { error } = validate(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  try {
    // const sale = new Sale({
    //   _drug: req.body._drug,
    //   soldBy: req.user._id,
    //   qty: req.body.qty,
    //   total: req.body.total,
    // });
    const sale = new Sale({ ...req.body, soldBy: req.user._id });

    // console.log(sale);
    await sale.save();

    //Update Drug quantity Automatically
    const qty = new Number(req.body.qty);
    await Drug.updateOne({ _id: req.body._drug }, { $inc: { quantity: -qty } });
    // let dg = await Drug.findOne({ _id: req.body._drug });
    // console.log({ dg });

    res.status(201).send(sale);
  } catch (e) {
    // console.log(e);
    res.status(400).send(e);
  }
});

router.get("/sales/:id", auth, async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).sort({'createdAt': -1})
      .populate("_drug", "-price")
      .populate("soldBy", "-password");
    if (!sale) {
      return res.status(404).send("The Drug with the given id was not found");
    }
    res.send(sale);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/sales-user", auth, async (req, res) => {
  try {
    const sale = await Sale.find({ soldBy: req.user._id })
      .populate("_drug", "-price")
      .populate("soldBy", "-password");
    if (!sale) {
      return res.status(404).send("The Drug with the given id was not found");
    }
    res.send(sale);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/sales/:id", [auth, admin], async (req, res) => {
  try {
    const sale = await Sale.findByIdAndRemove(req.params.id);
    if (!sale) {
      return res.status(404).send("The sale with the given ID was not found.");
    }
    res.send(sale);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});
module.exports = router;
