const express = require('express');

const request = require('../requetesKnex');

const router = express.Router();

router.get('/:idArme', async (req, res) => {
    let resultat;
    const id = req.params.idArme;
    try {
        if (id === undefined) {
            return res.status(400).json({ message: 'Paramètre manquant' });
        }
        resultat = await request.getIBAFById(id);
        if (resultat.length === 0) {
            return res.status(404).json({ message: 'Cette arme n\'est pas répertoriée' });
        }
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const {
        noSerie, marque, calibre, typeArme,
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
    if (noSerie === undefined || marque === undefined || calibre === undefined
        || typeArme === undefined || req.body.NoCours === undefined
        || req.body.AA === undefined || req.body.MM === undefined
        || req.body.JJ === undefined || req.body.sequenceChiffres === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Valeur manquant(es)',
        });
    }
    try {
        const resultatRequete = await
        request.ajoutIBAF(noSerie, marque, calibre, typeArme, noEvenement);
        if (resultatRequete === true) {
            res.status(200).json({
                success: true,
                message: 'L\'action a bien été effectuée',
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Une erreur est survenue, Le numéro de série existe déjà dans la base de données.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Une erreur est survenue, l'action n'a pas été effectuée, ${error.message}`,
        });
    }
});

router.put('/', async (req, res) => {
    const {
        idArme, noSerie, marque, calibre, typeArme,
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
    if (noSerie === undefined || marque === undefined || calibre === undefined
        || typeArme === undefined || req.body.NoCours === undefined
        || req.body.AA === undefined || req.body.MM === undefined
        || req.body.JJ === undefined || req.body.sequenceChiffres === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Valeur manquant(es)',
        });
    }
    try {
        // eslint-disable-next-line max-len
        const resultatRequete = await request.modificationIBAF(idArme, noSerie, marque, calibre, typeArme, noEvenement);
        if (resultatRequete === true) {
            return res.status(200).json({
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

router.delete('/:idArme', async (req, res) => {
    const id = req.params.idArme;
    if (id !== '' || id !== undefined) {
        try {
            const resultatRequete = await request.suppresionIBAFById(id);
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
