const express = require('express');

const request = require('../database/armes');

const router = express.Router();

router.get('/:idArme', async (req, res) => {
    res.send(`Réponse à la route GET /armes/${req.params.idArme}`);
});

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getArmesAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

module.exports = router;
