const express = require('express');

const request = require('../database/objets');

const router = express.Router();

router.get('/:idObjet', async (req, res) => {
    res.send(`Réponse à la route GET /objets/${req.params.idObjet}`);
});

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getObjetsAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

module.exports = router;
