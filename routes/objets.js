const express = require('express');

const request = require('../requetesKnex');

const router = express.Router();

router.get('/:idObjet', (req, res) => {
    res.send(`Réponse à la route GET /objets/${req.params.idObjet}`);
});

module.exports = router;
