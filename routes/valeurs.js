const express = require('express');

const request = require('../database/requetesKnex');

const router = express.Router();

router.get('/:idValeur', async (req, res) => {
    let resultat;
    const id = req.params.idValeur;
    try {
        if (id === undefined) {
            return res.status(400).json({ message: 'Paramètre manquant' });
        }
        resultat = await request.getIBVAbyId(id);
        if (resultat.length === 0) {
            return res.status(404).json({ message: 'Cette valeur n\'est pas répertoriée' });
        }
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const {
        identifiant, auteur, typeValeur, typeEvenement,
    } = req.body;
    const noEvenement = `${req.body.NoCours}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`;
    const regexJJ = /^0[1-9]|[12]\d|3[01]$/;
    const regexMM = /^0[1-9]|1[0-2]$/;
    const regexAA = /^\d{2}$/;
    const regexSChiffres = /^\d{4}$/;
    const validationEvent = (
        regexJJ.test(req.body.JJ)
        && regexMM.test(req.body.MM)
        && regexAA.test(req.body.AA)
        && regexSChiffres.test(req.body.sequenceChiffres)
    );
    if (validationEvent === false) {
        return res.status(400).json({ message: 'Numéro d\'événement invalide' });
    }
    if (identifiant === undefined || auteur === undefined || typeValeur === undefined
        || typeEvenement === undefined || req.body.NoCours === undefined
        || req.body.AA === undefined || req.body.MM === undefined
        || req.body.JJ === undefined || req.body.sequenceChiffres === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Valeur manquant(es)',
        });
    }
    try {
        const resultatRequete = await
        request.ajoutIBVA(identifiant, auteur, typeValeur, typeEvenement, noEvenement);
        if (resultatRequete === true) {
            return res.status(200).json({
                success: true,
                message: 'L\'action a bien été effectuée',
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Une erreur est survenue, l\'identifiant existe déjà dans la base de données.',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Une erreur est survenue, l'action n'a pas été effectuée, ${error.message}`,
        });
    }
});

router.put('/', async (req, res) => {
    const {
        idValeur, identifiant, auteur, typeValeur, typeEvenement,
    } = req.body;
    const noEvenement = `${req.body.NoCours}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`;
    const regexJJ = /^0[1-9]|[12]\d|3[01]$/;
    const regexMM = /^0[1-9]|1[0-2]$/;
    const regexAA = /^\d{2}$/;
    const regexSChiffres = /^\d{4}$/;
    const validationEvent = (
        regexJJ.test(req.body.JJ)
        && regexMM.test(req.body.MM)
        && regexAA.test(req.body.AA)
        && regexSChiffres.test(req.body.sequenceChiffres)
    );
    if (validationEvent === false) {
        return res.status(400).json({ message: 'Numéro d\'événement invalide' });
    }
    if (identifiant === undefined || auteur === undefined || typeValeur === undefined
        || typeEvenement === undefined || req.body.NoCours === undefined
        || req.body.AA === undefined || req.body.MM === undefined
        || req.body.JJ === undefined || req.body.sequenceChiffres === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Valeur manquant(es)',
        });
    }
    try {
        const resultatRequete = await
        request.modificationIBVA(idValeur, identifiant, auteur, typeValeur, typeEvenement, noEvenement);
        if (resultatRequete === true) {
            return res.status(200).son({
                success: true,
                message: 'L\'action a bien été effectuée',
            });
        }
        return res.status(404).json({
            success: false,
            message: 'Une erreur est survenue, l\'action n\'a pas été effectuée',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Une erreur est survenue, l'action n'a pas été effectuée: \n${error.message}`,
        });
    }
});

router.delete('/:idValeur', async (req, res) => {
    const id = req.params.idValeur;
    if (id !== '' || id !== undefined) {
        try {
            const resultatRequete = await request.suppresionIBVAById(id);
            if (resultatRequete === true) {
                res.status(200).json({
                    success: true,
                    message: 'L\'élément a bien été supprimé',
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Une erreur est survenue, l\'élément n\'a pas été supprimé',
                });
            }
        } catch (err) {
            res.status(400).json({
                success: false,
                message: `Une erreur est survenue: \n ${err}`,
            });
        }
    } else {
        res.status(500).json({
            success: false,
            message: 'Une erreur est survenue, l\'élément n\'a pas été supprimé',
        });
    }
});

module.exports = router;
