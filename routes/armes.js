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
// Route pour récupérer les armes
router.get('/:idArme', async (req, res) => {
    let resultat;
    const id = req.params.idArme; // Récupération de l'id de l'arme
    try {
        if (id === undefined) { // Si l'id est undefined
            return res.status(400).json({ message: 'Paramètre manquant' });
        }
        resultat = await request.getIBAFById(id); // Récupération de l'arme
        if (resultat.length === 0) { // Si l'arme n'existe pas
            return res.status(404).json({ message: 'Cette arme n\'est pas répertoriée' });
        }
        return res.status(200).json(resultat); // Retourne l'arme
    } catch (error) {
        return res.status(500).json({ message: error.message }); // Retourne une erreur
    }
});

// Route pour post les armes
router.post('/', async (req, res) => {
    const {
        noSerie, marque, calibre, typeArme,
    } = req.body; // Récupération des données de l'arme
    const noEvenement = `${req.body.NoCours}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`; // Récupération du numéro d'événement
    const validationEvent = testRegex(
        req.body.JJ,
        req.body.MM,
        req.body.AA,
        req.body.sequenceChiffres,
    ); // Validation du numéro d'événement
    errorNumEvent(validationEvent, res); // Erreur si le numéro d'événement est invalide
    if (noSerie === undefined || marque === undefined || calibre === undefined
        || typeArme === undefined || req.body.NoCours === undefined) {
        // Si les données sont manquantes
        return res.status(400).json({
            success: false,
            message: 'Valeur manquant(es)',
        }); // Retourne une erreur
    }
    try {
        const resultatRequete = await
        request.ajoutIBAF(noSerie, marque, calibre, typeArme, noEvenement); // Ajout de l'arme
        if (resultatRequete === true) { // Si l'arme a été ajoutée
            return res.status(200).json({ // Retourne un message de succès
                success: true,
                message: 'L\'action a bien été effectuée',
            });
        }
        return res.status(500).json({ // Retourne une erreur
            success: false,
            message: 'Une erreur est survenue, Le numéro de série existe déjà dans la base de données.',
        });
    } catch (error) {
        return res.status(500).json({ // Retourne une erreur
            success: false,
            message: `Une erreur est survenue, l'action n'a pas été effectuée, ${error.message}`,
        });
    }
});
// Route pour mettre à jour les armes
router.put('/', async (req, res) => {
    const {
        idArme, noSerie, marque, calibre, typeArme,
    } = req.body; // Récupération des données de l'arme
    const noEvenement = `${req.body.NoCours}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`; // Récupération du numéro d'événement
    const validationEvent = testRegex(
        req.body.JJ,
        req.body.MM,
        req.body.AA,
        req.body.sequenceChiffres,
    ); // Validation du numéro d'événement
    errorNumEvent(validationEvent, res); // Erreur si le numéro d'événement est invalide
    if (noSerie === undefined || marque === undefined || calibre === undefined
        || typeArme === undefined || req.body.NoCours === undefined) {
        return res.status(400).json({ // Retourne une erreur
            success: false,
            message: 'Valeur manquant(es)',
        });
    }
    try {
        const resultatRequete = await request.modificationIBAF(
            idArme,
            noSerie,
            marque,
            calibre,
            typeArme,
            noEvenement,
        ); // Modification de l'arme
        if (resultatRequete === true) { // Si l'arme a été modifiée
            return res.status(200).json({ // Retourne un message de succès
                success: true,
                message: 'L\'action a bien été effectuée',
            });
        }
        return res.status(404).json({ // Retourne une erreur
            success: false,
            message: 'Une erreur est survenue, l\'action n\'a pas été effectuée',
        });
    } catch (error) {
        return res.status(500).json({ // Retourne une erreur
            success: false,
            message: `Une erreur est survenue, l'action n'a pas été effectuée: \n${error.message}`,
        });
    }
});

router.delete('/:idArme', async (req, res) => {
    const id = req.params.idArme; // Récupération de l'id de l'arme
    if (id !== '' || id !== undefined) { // Si l'id est non vide
        try { // Tentative de suppression de l'arme
            const resultatRequete = await request.suppresionIBAFById(id); // Suppression de l'arme
            if (resultatRequete === true) { // Si l'arme a été supprimée
                res.status(200).json({ // Retourne un message de succès
                    success: true,
                    message: 'L\'élément a bien été supprimé',
                });
            } else {
                res.status(404).json({ // Retourne une erreur
                    success: false,
                    message: 'Une erreur est survenue, l\'élément n\'a pas été supprimé',
                });
            }
        } catch (err) {
            res.status(400).json({ // Retourne une erreur
                success: false,
                message: `Une erreur est survenue: \n ${err}`,
            });
        }
    } else {
        res.status(500).json({ // Retourne une erreur
            success: false,
            message: 'Une erreur est survenue, l\'élément n\'a pas été supprimé',
        });
    }
});

module.exports = router;
