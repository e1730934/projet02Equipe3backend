const express = require('express');

const request = require('../database/objets');
const { testRegex } = require('../fonctionReutilisable');

const router = express.Router();

// eslint-disable-next-line consistent-return
function errorNumEvent(validationEvent, res) {
    if (validationEvent === false) {
        return res.status(400).json({ message: 'Numéro d\'événement invalide' });
    }
}

router.get('/:idObjet', async (req, res) => {
    let resultat;
    const id = req.params.idObjet;
    try {
        if (id === undefined) { // Si l'id est undefined, on renvoie une erreur
            return res.status(400).json({ message: 'Paramètre manquant' });
        }
        resultat = await request.getIBOBbyId(id); // On récupère les informations de l'objet
        if (resultat.length === 0) { // Si l'objet n'existe pas, on renvoie une erreur
            return res.status(404).json({ message: 'Cet objet n\'est pas répertorié' });
        }
        return res.status(200).json(resultat); // On renvoie les informations de l'objet
    } catch (error) {
        // Si une erreur est survenue, on renvoie une erreur
        return res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const {
        noSerie, marque, modele, typeObjet,
    } = req.body; // On récupère les informations de l'objet
    const noEvenement = `${req.body.NoCours}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`; // On crée le numéro d'événement
    const validationEvent = testRegex( // On vérifie que le numéro d'événement est valide
        req.body.JJ,
        req.body.MM,
        req.body.AA,
        req.body.sequenceChiffres,
    );
    // On renvoie une erreur si le numéro d'événement est invalide
    errorNumEvent(validationEvent, res);
    if (noSerie === undefined || marque === undefined || typeObjet === undefined
        || modele === undefined || req.body.NoCours === undefined) {
        // Si un des paramètres est undefined, on renvoie une erreur
        return res.status(400).json({
            success: false,
            message: 'Valeur manquant(es)',
        });
    }
    try { // On essaye de créer l'objet
        const resultatRequete = await
        request.ajoutIBOB(noSerie, marque, modele, typeObjet, noEvenement); // On crée l'objet
        if (resultatRequete === true) { // Si l'objet a été créé
            return res.status(200).json({ // On renvoie un message de succès
                success: true,
                message: 'L\'action a bien été effectuée',
            });
        }
        return res.status(500).json({ // Si une erreur est survenue, on renvoie une erreur
            success: false,
            message: 'Une erreur est survenue, l\'identifiant existe déjà dans la base de données.',
        });
    } catch (error) { // Si une erreur est survenue, on renvoie une erreur
        return res.status(500).json({
            success: false,
            message: `Une erreur est survenue, l'action n'a pas été effectuée, ${error.message}`,
        });
    }
});

router.put('/', async (req, res) => {
    const {
        idObjet, noSerie, marque, typeObjet, modele,
    } = req.body; // On récupère les informations de l'objet
    const noEvenement = `${req.body.NoCours}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`; // On crée le numéro d'événement
    const validationEvent = testRegex( // On vérifie que le numéro d'événement est valide
        req.body.JJ,
        req.body.MM,
        req.body.AA,
        req.body.sequenceChiffres,
    );
    // On renvoie une erreur si le numéro d'événement est invalide
    errorNumEvent(validationEvent, res);
    // Si un des paramètres est undefined, on renvoie une erreur
    if (noSerie === undefined || marque === undefined || typeObjet === undefined
        || modele === undefined || req.body.NoCours === undefined) {
        return res.status(400).json({ // Si un des paramètres est undefined, on renvoie une erreur
            success: false,
            message: 'Valeur manquant(es)',
        });
    }
    try { // On essaye de modifier l'objet
        const resultatRequete = await
        request.modificationIBOB(idObjet, noSerie, marque, typeObjet, modele, noEvenement);
        // On modifie l'objet
        if (resultatRequete === true) { // Si l'objet a été modifié
            return res.status(200).json({
                success: true,
                message: 'L\'action a bien été effectuée',
            });
        }
        return res.status(404).json({ // Si l'objet n'existe pas, on renvoie une erreur
            success: false,
            message: 'Une erreur est survenue, l\'action n\'a pas été effectuée',
        });
    } catch (error) {
        return res.status(500).json({ // Si une erreur est survenue, on renvoie une erreur
            success: false,
            message: `Une erreur est survenue, l'action n'a pas été effectuée: \n${error.message}`,
        });
    }
});

router.delete('/:idObjet', async (req, res) => {
    const id = req.params.idObjet; // On récupère l'id de l'objet
    if (id !== '' || id !== undefined) { // Si l'id est undefined, on renvoie une erreur
        try { // On essaye de supprimer l'objet
            const resultatRequete = await request.suppresionIBOById(id); // On supprime l'objet
            if (resultatRequete === true) { // Si l'objet a été supprimé
                res.status(200).json({ // On renvoie un message de succès
                    success: true,
                    message: 'L\'élément a bien été supprimé',
                });
            } else { // Si l'objet n'existe pas, on renvoie une erreur
                res.status(404).json({
                    success: false,
                    message: 'Une erreur est survenue, l\'élément n\'a pas été supprimé',
                });
            }
        } catch (err) { // Si une erreur est survenue, on renvoie une erreur
            res.status(400).json({
                success: false,
                message: `Une erreur est survenue: \n ${err}`,
            });
        }
    } else { // Si l'id est undefined, on renvoie une erreur
        res.status(500).json({
            success: false,
            message: 'Une erreur est survenue, l\'élément n\'a pas été supprimé',
        });
    }
});

module.exports = router;
