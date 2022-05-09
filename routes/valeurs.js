const express = require('express');

const request = require('../database/valeurs');
const { testRegex } = require('../fonctionReutilisable');

const router = express.Router();

// eslint-disable-next-line consistent-return
function errorNumEvent(validationEvent, res) {
    if (validationEvent === false) {
        return res.status(400).json({ message: 'Numéro d\'événement invalide' });
    }
}

router.get('/:idValeur', async (req, res) => {
    let resultat;
    const id = req.params.idValeur;
    try { // Si le numéro d'événement est valide
        if (id === undefined) { // Si le numéro d'événement est vide
            return res.status(400).json({ message: 'Paramètre manquant' });
        }
        resultat = await request.getIBVAbyId(id); // Récupération de la valeur IBVA
        if (resultat.length === 0) { // Si la valeur IBVA n'existe pas
            return res.status(404).json({ message: 'Cette valeur n\'est pas répertoriée' });
        }
        return res.status(200).json(resultat); // Retourne la valeur IBVA
    } catch (error) { // Si le numéro d'événement est invalide
        return res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const {
        identifiant, auteur, typeValeur, typeEvenement,
    } = req.body; // Récupération des données du formulaire
    const noEvenement = `${req.body.NoCours}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`; // Création du numéro d'événement
    const validationEvent = testRegex( // Vérification du numéro d'événement
        req.body.JJ,
        req.body.MM,
        req.body.AA,
        req.body.sequenceChiffres,
    );
    errorNumEvent(validationEvent, res); // Si le numéro d'événement est invalide
    if (identifiant === undefined || auteur === undefined || typeValeur === undefined
        || typeEvenement === undefined || req.body.NoCours === undefined) {
        return res.status(400).json({ // Si les données sont manquantes
            success: false,
            message: 'Valeur manquant(es)',
        });
    }
    try { // Si le numéro d'événement est valide
        const resultatRequete = await // Récupération de la valeur IBVA
        request.ajoutIBVA(identifiant, auteur, typeValeur, typeEvenement, noEvenement);
        if (resultatRequete === true) { // Si la valeur IBVA a été ajoutée
            return res.status(200).json({
                success: true,
                message: 'L\'action a bien été effectuée',
            });
        }
        return res.status(500).json({ // Si la valeur IBVA n'a pas été ajoutée
            success: false,
            message: 'Une erreur est survenue, l\'identifiant existe déjà dans la base de données.',
        });
    } catch (error) {
        return res.status(500).json({ // Si le numéro d'événement est invalide
            success: false,
            message: `Une erreur est survenue, l'action n'a pas été effectuée, ${error.message}`,
        });
    }
});

router.put('/', async (req, res) => {
    const {
        idValeur, identifiant, auteur, typeValeur, typeEvenement,
    } = req.body; // Récupération des données du formulaire
    const noEvenement = `${req.body.NoCours}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`; // Création du numéro d'événement
    const validationEvent = testRegex( // Vérification du numéro d'événement
        req.body.JJ,
        req.body.MM,
        req.body.AA,
        req.body.sequenceChiffres,
    );
    errorNumEvent(validationEvent, res); // Si le numéro d'événement est invalide
    if (identifiant === undefined || auteur === undefined || typeValeur === undefined
        || typeEvenement === undefined || req.body.NoCours === undefined) {
        return res.status(400).json({ // Si les données sont manquantes
            success: false,
            message: 'Valeur manquant(es)',
        });
    }
    try {
        const resultatRequete = await
        request.modificationIBVA(
            idValeur,
            identifiant,
            auteur,
            typeValeur,
            typeEvenement,
            noEvenement,
        ); // Modification de la valeur IBVA
        if (resultatRequete === true) { // Si la valeur IBVA a été modifiée
            return res.status(200).json({
                success: true,
                message: 'L\'action a bien été effectuée',
            });
        }
        return res.status(404).json({ // Si la valeur IBVA n'a pas été modifiée
            success: false,
            message: 'Une erreur est survenue, l\'action n\'a pas été effectuée',
        });
    } catch (error) { // Si le numéro d'événement est invalide
        return res.status(500).json({
            success: false,
            message: `Une erreur est survenue, l'action n'a pas été effectuée: \n${error.message}`,
        });
    }
});

router.delete('/:idValeur', async (req, res) => {
    const id = req.params.idValeur; // Récupération du numéro d'événement
    if (id !== '' || id !== undefined) {
        try {
            const resultatRequete = await request.suppresionIBVAById(id);
            if (resultatRequete === true) { // Si la valeur IBVA a été supprimée
                res.status(200).json({
                    success: true,
                    message: 'L\'élément a bien été supprimé',
                });
            } else {
                res.status(404).json({ // Si la valeur IBVA n'a pas été supprimée
                    success: false,
                    message: 'Une erreur est survenue, l\'élément n\'a pas été supprimé',
                });
            }
        } catch (err) {
            res.status(400).json({ // Si la valeur IBVA n'a pas été supprimée
                success: false,
                message: `Une erreur est survenue: \n ${err}`,
            });
        }
    } else {
        res.status(500).json({ // Si la valeur IBVA n'a pas été supprimée
            success: false,
            message: 'Une erreur est survenue, l\'élément n\'a pas été supprimé',
        });
    }
});

module.exports = router;
