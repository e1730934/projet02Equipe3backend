const express = require('express');

const request = require('../requetesKnex');

const router = express.Router();

router.get('/:idCondition', (req, res) => {
    res.send(`Réponse à la route GET /conditions/${req.params.idCondition}`);
});

module.exports = router;
