const { v4: uuidv4 } = require('uuid');
const Games = require('../models/game.js');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get("/games", async function(req, res){
    try {
        const getG = await Games.find();
                
        res.status(200).json(getG);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post("/games", async function(req, res){

    const { location, gameDate} = req.body;

    const newGame = new Games({location, gameDate, players:1, id: uuidv4()})

    try {
        await newGame.save();
        res.status(201).json(newGame);
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

});

router.get("/games/:id",async function(req, res){
    const id  = req.params.id;

    try {
        const g = await Games.findById(id);
        
        res.status(200).json(g);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  });

router.delete("/games/:id",async function(req, res){
    const id  = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No game with id: ${id}`);

    await Games.findByIdAndRemove(id);

    res.json({ message: "Game deleted successfully." });
});

router.put("/games/:id",async function(req, res){
    const id  = req.params.id;
    const { location, gameDate, players} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No game with id: ${id}`);

    const updatedGames = { location, gameDate, players, _id: id };

    await Games.findByIdAndUpdate(id, updatedGames, { new: true });

    res.json(updatedGames)

});

module.exports = router;
