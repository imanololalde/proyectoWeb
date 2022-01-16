const uuidv4  = require ('uuid');
const Users = require('../models/users.js');
const express = require('express');
const router = express.Router();


router.get("/users", function(req, res){
    try {
        const getU = Users.find();
                
        res.status(200).json(getU);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post("/users", function(req, res){

    const { firstName, lastName, password, age } = req.body;

    const newUser = new Users({ firstName, lastName, password, age, id: uuidv4()})

    try {
         newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

});

router.get("/users", function(req, res){
    const { id } = req.params;

    try {
        const u =  Users.findById(id);
        
        res.status(200).json(u);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  });

router.delete("/users", function(req, res){
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

     Users.findByIdAndRemove(id);

    res.json({ message: "User deleted successfully." });
});

router.put("/users", function(req, res){
    const { id } = req.params;
    const { firstName, lastName, password, age } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = { firstName, lastName, password, age , _id: id };

    Users.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser)

});

module.exports = router;
