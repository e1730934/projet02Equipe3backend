const express = require('express');

const request = require('../database/valeurs');

const router = express.Router();

router.get('/:idValeur', async (req, res) => {
    res.send(`Réponse à la route GET /valeurs/${req.params.idValeur}`);
});

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getValeursAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

module.exports = router;
