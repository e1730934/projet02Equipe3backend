const express = require('express');

const request = require('../database/personnes');

const router = express.Router();

router.get('/:idPersonne', async (req, res) => {
    res.send(`Réponse à la route GET /personnes/${req.params.idPersonne}`);
});

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getPersonnesAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

module.exports = router;
