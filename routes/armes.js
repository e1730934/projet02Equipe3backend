const express = require('express');

const request = require('../database/armes');
const { testRegex } = require('../fonctionReutilisable');

const router = express.Router();

// eslint-disable-next-line consistent-return
function errorNumEvent(validationEvent, res) {
    if (validationEvent === false) {
        return res.status(400).json({ message: 'Numéro d\'événement invalide' });
    }
}
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
    const validationEvent = testRegex(
        req.body.JJ,
        req.body.MM,
        req.body.AA,
        req.body.sequenceChiffres,
    );
    errorNumEvent(validationEvent, res);
    if (noSerie === undefined || marque === undefined || calibre === undefined
        || typeArme === undefined || req.body.NoCours === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Valeur manquant(es)',
        });
    }
    try {
        const resultatRequete = await
        request.ajoutIBAF(noSerie, marque, calibre, typeArme, noEvenement);
        if (resultatRequete === true) {
            return res.status(200).json({
                success: true,
                message: 'L\'action a bien été effectuée',
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Une erreur est survenue, Le numéro de série existe déjà dans la base de données.',
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
        idArme, noSerie, marque, calibre, typeArme,
    } = req.body;
    const noEvenement = `${req.body.NoCours}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`;
    const validationEvent = testRegex(
        req.body.JJ,
        req.body.MM,
        req.body.AA,
        req.body.sequenceChiffres,
    );
    errorNumEvent(validationEvent, res);
    if (noSerie === undefined || marque === undefined || calibre === undefined
        || typeArme === undefined || req.body.NoCours === undefined) {
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
