const express = require('express');

const request = require('../database/requetesKnex');

const router = express.Router();

router.get('/:idArme', (req, res) => {
    res.send(`Réponse à la route GET /armes/${req.params.idArme}`);
});

module.exports = router;
