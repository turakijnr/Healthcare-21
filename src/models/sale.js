// const {User, validate} = require('/models/user');
// const {Drug} = require('/models/user');
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
// const Joi = require("joi");

const Sale = new mongoose.Schema(
  {
    _drug: {
      type: ObjectId,
      required: true,
      ref: "Drug",
    },
    soldBy: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    qty: Number,
    total: Number,
  },
  {
    timestamps: true,
  }
);

// function validateSale(sale) {
//   const schema = Joi.Object({
//     // _drugId: Joi.string().required(),
//     qty: Joi.number().required(),
//     total: Joi.number().required(),
//   });

//   return schema.validate(sale);

// module.exports.Sale = Sale;

module.exports = mongoose.model("Sale", Sale);
// exports.validate = validateSale;
