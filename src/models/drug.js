const mongoose = require('mongoose')
const Joi = require('joi');
const Drug = mongoose.model('Drug',new mongoose.schema({
    name: {
        type: String,
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
    drugType:{
        type: string,
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
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      location: Joi.string().min(5).max(50).required(),
      price: Joi.number().min(0).required(),
      drugType: Joi.string().min(5).max(50).required(),
      quantity: Joi.string().min(5).max(50).required(),
      availability: Joi.string().min(5).max(50).required(),
    };
  
    return Joi.validate(drug, schema);
}
module.exports = Drug
module.exports = validateDrug