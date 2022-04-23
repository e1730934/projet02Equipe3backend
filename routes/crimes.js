const express = require('express');

const request = require('../database/crimes');

const router = express.Router();

router.get('/:idCrime', async (req, res) => {
    res.send(`Réponse à la route GET /crimes/${req.params.idCrime}`);
});

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getCrimesAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

module.exports = router;
