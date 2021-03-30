const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User , validateUser} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/users/me', auth,  async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});
router.post('/users', async (req, res) => {
    try
    {
        const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
  
    user = new User(_.pick(req.body, ['name', 'email', 'password','phone']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
  
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email','phone']));
    }
    catch(e){
        console.log(e)
        res.send(e)
    }
});
router.patch('/users/:id', [auth,admin],async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email', 'password', 'phone']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if (!isValidOperation){
        return res.status(400).send({error: 'invalid updates!'})
    }
    try{
       const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators: true})
       if (!user){
           return res.status(404).send('User not found')
       }
       res.send(user)
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
        
    }
});
router.delete('/users/:id',[auth,admin], async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
  
    if (!user) return res.status(404).send('The User with the given ID was not found.');
  
    res.send(user);
});
  
module.exports = router; 