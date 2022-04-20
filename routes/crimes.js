const express = require('express');

const request = require('../database/requetesKnex');

const router = express.Router();

router.get('/:idCrime', (req, res) => {
    res.send(`Réponse à la route GET /crimes/${req.params.idCrime}`);
});

module.exports = router;
