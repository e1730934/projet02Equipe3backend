const express = require('express');

const request = require('../database/requetesKnex');

const router = express.Router();

router.get('/:idValeur', (req, res) => {
    res.send(`Réponse à la route GET /valeurs/${req.params.idValeur}`);
});

module.exports = router;
