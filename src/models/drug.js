const mongoose = require('mongoose')
const Joi = require('joi');
const Drug = mongoose.model('Drug', new mongoose.Schema({
    drugName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        
    },
    price:{
        type: Number,
        required: true,
        
    },
    sellingPrice:{
        type: Number,
        required: true,
    },
    drugType:{
        type: String,
        required: true,
        
    },
    quantity:{
        type: Number,
        required: true,
        
    },
    availability:{
        type: String,
        required: true,
        
    },
},{
    timestamps: true
}))

function validateDrug(drug) {
    const schema = Joi.object({
      drugName: Joi.string().min(5).max(50).required(),
      location: Joi.string().min(5).max(50).required(),
      price: Joi.number().min(0).required(),
      sellingPrice: Joi.number().min(0).required(),
      drugType: Joi.string().min(5).max(50).required(),
      quantity: Joi.number().min(0).required(),
      availability: Joi.string().min(5).max(50).required(),
    });
  
    return schema.validate(drug);
}
exports.Drug = Drug
exports.validateDrug = validateDrug