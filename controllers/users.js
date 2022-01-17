const { v4: uuidv4 } = require('uuid');
const Users = require('../models/users.js');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get("/users", async function(req, res){
    try {
        const getU = await Users.find();
                
        res.status(200).json(getU);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post("/users", async function(req, res){

    const { firstName, lastName, password, age } = req.body;

    const newUser = new Users({ firstName, lastName, password, age, id: uuidv4()})

    try {
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

});

router.get("/users/:id",async function(req, res){
    const id  = req.params.id;

    try {
        const u = await Users.findById(id);
        
        res.status(200).json(u);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  });

router.delete("/users/:id",async function(req, res){
    const id  = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await Users.findByIdAndRemove(id);

    res.json({ message: "User deleted successfully." });
});

router.put("/users/:id",async function(req, res){
    const id  = req.params.id;
    const { firstName, lastName, password, age } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = { firstName, lastName, password, age , _id: id };

    await Users.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser)

});

module.exports = router;
