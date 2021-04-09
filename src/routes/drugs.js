const {Drug, validateDrug} = require('../models/drug');
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/drugs',auth, async (req, res) => {
    const drugs = await Drug.find()
    res.send(drugs);
});
router.post('/drugs',[auth, admin], async (req, res) => {
    const { error } = validateDrug(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let drug = await Drug.findOne({ drugName: req.body.drugName });
    if (drug) return res.status(400).send('Drug already Exist.');

 
    drug = new Drug({ 
        drugName: req.body.drugName,
        location: req.body.location,
        price: req.body.price,
        sellingPrice: req.body.sellingPrice,
        drugType: req.body.drugType,
        quantity: req.body.quantity,
        availability: req.body.availability,
        
    });
    drug = await drug.save();
    
    res.send(drug);
});
router.patch('/drugs/:id',[auth,admin], async (req, res) => {
    const { error } = validateDrug(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const drug = await Drug.findByIdAndUpdate(req.params.id,
        { 
            drugName: req.body.drugName,
            location: req.body.location,
            price: req.body.price,
            sellingPrice: req.body.sellingPrice,
            drugType: req.body.drugType,
            quantity: req.body.quantity,
            availability: req.body.availability,
        
        }, { new: true });
  
    if (!drug) return res.status(404).send('The drug with the given ID was not found.');
    
    res.send(drug);
});
router.patch('/quantity/:id',auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['quantity']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if (!isValidOperation){
        return res.status(400).send({error: 'invalid updates!'})
    }
    try{
       const drug = await Drug.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators: true})
       if (!drug){
           return res.status(404).send('drug not found')
       }
       res.send(drug)
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
        
    }
});
router.delete('/drugs/:id',[auth,admin], async (req, res) => {
    const drug = await Drug.findByIdAndRemove(req.params.id);
  
    if (!drug) return res.status(404).send('The drug with the given ID was not found.');
  
    res.send(drug);
});
router.get('/drugs/:id',auth, async (req, res) => {
    const drug = await Drug.findById(req.params.id);
  
    if (!drug) return res.status(404).send('The drug with the given ID was not found.');
 
    res.send(drug);
});
  
module.exports = router;
  
  