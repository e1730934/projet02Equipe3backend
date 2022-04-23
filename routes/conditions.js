const express = require('express');

const request = require('../database/conditions');

const router = express.Router();

router.get('/:idCondition', async (req, res) => {
    res.send(`Réponse à la route GET /conditions/${req.params.idCondition}`);
});

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getConditionsAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

module.exports = router;
