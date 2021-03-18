const express = require("express");
const mongoose = require('mongoose')
const {Sale} = require("../models/sale");
const {User} = require("../models/user");
const {Drug} = require("../models/drug");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();
router.get("/dashboard/drugs", [auth,admin], async (req, res) => {
  try{
    const totaldrugs = await Drug.find();
  res.send(totaldrugs);
  }
  catch(e){
    console.log(e)
    res.send(e)
  }
});

router.get("/dashboard/sales",[auth,admin], async (req, res) => {
  const totalsales = await Sale.find();
  res.send(totalsales);
});

router.get("/dashboard/users", [auth,admin], async (req, res) => {
  const totalusers = await User.find();
  res.send(totalusers);
});

router.get("/dashboard/daily-sales", [auth,admin], async (req, res) => {
  const now = new Date();
  // getting Current Date
  const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // Getting the next Day
  const dayAfter = new Date(now.getFullYear(), now.getMonth()).setDate(
    currentDay.getDate() + 1
  );
  // Getting Daily sales
  const totalsales = await Sale.find({
    createdAt: { $gte: currentDay, $lt: dayAfter },
  });

  //Calculate total sales amount
  const sumSales = totalsales.reduce(
    (prevItem, item) => prevItem + item.total,
    0
  );

  res.send({ totalsales, sumSales });
});
router.get("/dashboard/weekly-sales", [auth,admin], async (req, res) => {
  //Getting Current Week
  const now = new Date();
  const currentWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay() + 1
  );
  //Getting week After
  const weekAfter = new Date(now.getFullYear(), now.getMonth()).setDate(
    currentWeek.getDate() + 6
  );
  // Getting weekly Sales
  const totalsales = await Sale.find({
    createdAt: { $gte: currentWeek, $lt: weekAfter },
  });

  //Calculate total sales amount
  const sumSales = totalsales.reduce(
    (prevItem, item) => prevItem + item.total,
    0
  );

  res.send({ totalsales, sumSales });
});
router.get("/dashboard/monthly-sales", [auth,admin], async (req, res) => {
  //Getting monthly Week
  const now = new Date();
  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  //Getting week After
  const monthAfter = new Date(now.getFullYear(), currentMonth.getMonth()+1, 1)
  // Getting weekly Sales
  const totalsales = await Sale.find({
    createdAt: { $gte: currentMonth, $lt: monthAfter },
  });

  //Calculate total sales amount
  const sumSales = totalsales.reduce(
    (prevItem, item) => prevItem + item.total,
    0
  );

  res.send({ totalsales, sumSales });
});
module.exports = router;
