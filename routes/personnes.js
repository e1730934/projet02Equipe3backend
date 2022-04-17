const express = require('express');

const request = require('../requetesKnex');

const router = express.Router();

router.get('/:idPersonne', (req, res) => {
    res.send(`Réponse à la route GET /personnes/${req.params.idPersonne}`);
});

module.exports = router;
