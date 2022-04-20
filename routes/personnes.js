const express = require('express');

const request = require('../requetesKnex');

const router = express.Router();

router.get('/:idPersonne', async (req, res) => {
    // Pour quand on uilisera les tokens
    /* if(sessionStorage.getItem('Etudiant')){
        res.status(401).json(error.message, 'le client n’a pas les autorisations nécessaires
            pour accéder à la ressource.');
    } */

    const { idPersonne } = req.params;
    let resultat;

    if (Number.isNaN(idPersonne)) {
        res.status(400).send('la requête est mal formée ou les paramètres sont invalides.');
    } else {
        try {
            resultat = await request.getPersonne(idPersonne);
            if (resultat.length === 0 || resultat === undefined) {
                res.status(404).send('La personne n\'existe pas!');
            } else {
                res.status(200).send(resultat);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

router.post('/', async (req, res) => {
    // Pour quand on uilisera les tokens
    /* if(sessionStorage.getItem('Etudiant')){
        res.status(401).json(error.message, 'le client n’a pas les autorisations nécessaires
            pour ajouter la ressource.');
    } */

    const { TypePersonne } = req.body;
    const { NomFamille } = req.body;
    const { Prenom1 } = req.body;
    const { Prenom2 } = req.body;
    const { Masculin } = req.body;
    const { DateNaissance } = req.body;
    if (!TypePersonne || !NomFamille || !Prenom1 || Masculin === null || !DateNaissance) {
        console.log({ message: 'ce champs ne peut etre vide' });
    }

    try {
        const id = await request.postPersonne(
            TypePersonne,
            NomFamille,
            Prenom1,
            Prenom2,
            Masculin,
            DateNaissance,
        );
        res.status(200).json({
            message: 'Personne ajoutée',
            IdPersonne: id,
        });
    } catch (error) {
        res.status(500).json(error.message);
    }

    /* {
        "TypePersonne": "Test",
        "NomFamille":"Test",
        "Prenom1":"test",
        "Prenom2":"test",
        "Masculin":1,
        "DateNaissance":"114445"
    }   */
});

router.put('/:idPersonne', async (req, res) => {
    // Pour quand on uilisera les tokens
    /* if(sessionStorage.getItem('Etudiant')){
        res.status(401).json(error.message, 'le client n’a pas les autorisations nécessaires
            pour ajouter la ressource.');
    } */

    const { idPersonne } = req.params;
    const { TypePersonne } = req.body;
    const { NomFamille } = req.body;
    const { Prenom1 } = req.body;
    const { Prenom2 } = req.body;
    const { Masculin } = req.body;
    const { DateNaissance } = req.body;

    if (Number.isNaN(idPersonne)) {
        res.status(400).send('la requête est mal formée ou les paramètres sont invalides.');
    }

    try {
        await request.putPersonne(
            idPersonne,
            TypePersonne,
            NomFamille,
            Prenom1,
            Prenom2,
            Masculin,
            DateNaissance,
        );
        res.status(200).json('Personne modifiée');
    } catch (error) {
        res.status(500).json('Valeurs transmises invalides (veuillez vérifier la date)');
    }
    /* {
        "TypePersonne": "Enseignant",
        "NomFamille":"Test1",
        "Prenom1":"test1",
        "Prenom2":"test1",
        "Masculin":1,
        "DateNaissance": "2014-01-01"

    } */
});

router.delete('/:idPersonne', async (req, res) => {
    // Pour quand on uilisera les tokens
    /* if(sessionStorage.getItem('Etudiant')){
        res.status(401).json(error.message, 'le client n’a pas les autorisations nécessaires
        pour supprimer la ressource.');
    } */

    const { idPersonne } = req.params;
    let resultat;

    if (Number.isNaN(idPersonne)) {
        return res.status(400).send('la requête est mal formée ou les paramètres sont invalides.');
    }
    try {
        resultat = await request.getPersonne(idPersonne);
    } catch (error) {
        return res.status(500).json(error.message);
    }
    if (resultat.length === 0) {
        return res.status(404).send('La personne que vous voulez supprimer n\'existe pas!');
    }
    try {
        // Supprime les conditions, les IPPE et la personne de la BD
        await request.deletePersonne(idPersonne);
        return res.status(200).send({ deleted: true });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});
router.put('/:idPersonne/description', async (req, res) => {
    const { idPersonne } = req.params;
    const { Telephone } = req.body;
    const { NoPermis } = req.body;
    const { AdresseUn } = req.body;
    const { AdresseDeux } = req.body;
    const { Ville } = req.body;
    const { Province } = req.body;
    const { CP } = req.body;
    const { Race } = req.body;
    const { Taille } = req.body;
    const { Poids } = req.body;
    const { Yeux } = req.body;
    const { Cheveux } = req.body;
    const { Marques } = req.body;
    const { Gilet } = req.body;
    const { Pantalon } = req.body;
    const { Autre } = req.body;
    const { Toxicomanie } = req.body;
    const { Desorganise } = req.body;
    const { Suicidaire } = req.body;
    const { Violent } = req.body;
    const { Depressif } = req.body;

    if (Number.isNaN(idPersonne)) {
        return res.status(400).send('la requête est mal formée ou les paramètres sont invalides.');
    }

    try {
        await request.putDescription(
            idPersonne,
            Telephone,
            NoPermis,
            AdresseUn,
            AdresseDeux,
            Ville,
            Province,
            CP,
            Race,
            Taille,
            Poids,
            Yeux,
            Cheveux,
            Marques,
            Gilet,
            Pantalon,
            Autre,
            Toxicomanie,
            Desorganise,
            Suicidaire,
            Violent,
            Depressif,
        );
        return res.status(200).json('Description modifiée');
    } catch (error) {
        return res.status(500).json('Les valeurs ne sont pas conforme.');
    }
});
router.get('/:idPersonne/ippes', async (req, res) => {
    const { idPersonne } = req.params;
    if (Number.isNaN(idPersonne)) {
        return res.status(400).send('les paramètres sont invalides.');
    } else {
        try {
            const resultat = await request.getIppePersonne(idPersonne);
            if (resultat.length === 0 || resultat === undefined) {
                return res.status(404).send('La personne ne possède pas d\'IPPE!');
            } else {
                return res.status(200).send(resultat);
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
});
module.exports = router;
