const express = require('express');

const app = express();
const cors = require('cors');
const request = require('./requetesKnex');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        const { identifiant, motDePasse } = req.body;
        resultat = await request.connexion(identifiant, motDePasse);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (resultat.length === 0) {
        // envoi du message contenant les information pour le login
        /** ** TEMPORAIRE JUSQU'A TEMPS QUE L'ON VOIT LES NOTION DE TOKEN**** */

        return res.status(404).json({ succes: false });
    }

    return res.status(200).json({
        succes: true,
        Etudiant: resultat[0].Etudiant,
        Matricule: resultat[0].Identifiant,
        Nom: resultat[0].NomFamille,

    });
    // Pour quand on uilisera les tokens
    /* if(resultat[0].Etudiant){
        return sessionStorage.setItem('Etudiant', token);
    } */
});

app.get('/ippeInfo', async (req, res) => {
    // Pour quand on uilisera les tokens
    /* if(sessionStorage.getItem('Etudiant')){
        res.status(401).json(error.message, 'le client n’a pas les autorisations nécessaires
            pour accéder à la ressource.');
    } */

    let resultat;

    try {
        const { nomFamille, prenom1 } = req.query;
        const prenom2 = (req.query.prenom2 === '') ? null : req.query.prenom2;
        const masculin = (req.query.masculin === 'true');
        const dateNaissance = new Date(req.query.dateNaissance);
        resultat = await request.getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (resultat.length === 0) {
        res.send({ result: 'Negatif' });
    } else {
        res.send(resultat);
    }
});

app.get('/personnes', async (req, res) => {
    // Pour quand on uilisera les tokens
    /* if(sessionStorage.getItem('Etudiant')){
        res.status(401).json(error.message, 'le client n’a pas les autorisations nécessaires
            pour accéder à la ressource.');
    } */

    const { IdPersonne } = req.query;
    let resultat;

    if (Number.isNaN(IdPersonne)) {
        res.status(400).send('la requête est mal formée ou les paramètres sont invalides.');
    } else {
        try {
            resultat = await request.getPersonne(IdPersonne);
        } catch (error) {
            res.status(500).json({ succes: false });
        }
        if (resultat.length === 0) {
            res.status(404).send('La personne n\'existe pas!');
        } else {
            res.status(200).send(resultat);
        }
    }
});

app.post('/personnes', async (req, res) => {
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

    if (!TypePersonne || !NomFamille || !Prenom1 || !Prenom2 || !Masculin || !DateNaissance) {
        console.log({ message: 'ce champs ne peut etre vide' });
    }

    try {
        await request.postPersonne(
            TypePersonne,
            NomFamille,
            Prenom1,
            Prenom2,
            Masculin,
            DateNaissance,
        );
        res.status(200).json('Personne ajoutée :)');
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

app.put('/personnes', async (req, res) => {
    // Pour quand on uilisera les tokens
    /* if(sessionStorage.getItem('Etudiant')){
        res.status(401).json(error.message, 'le client n’a pas les autorisations nécessaires
            pour ajouter la ressource.');
    } */

    const { IdPersonne } = req.query;
    const { TypePersonne } = req.body;
    const { NomFamille } = req.body;
    const { Prenom1 } = req.body;
    const { Prenom2 } = req.body;
    const { Masculin } = req.body;
    const { DateNaissance } = req.body;

    if (Number.isNaN(IdPersonne)) {
        res.status(400).send('la requête est mal formée ou les paramètres sont invalides.');
    }

    try {
        await request.putPersonne(
            IdPersonne,
            TypePersonne,
            NomFamille,
            Prenom1,
            Prenom2,
            Masculin,
            DateNaissance,
        );
        res.status(200).json('Personne modifiée :)');
    } catch (error) {
        res.status(500).json(error.message);
        res.status(404).send('La personne n\'existe pas!');
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

app.delete('/personnes', async (req, res) => {
    // Pour quand on uilisera les tokens
    /* if(sessionStorage.getItem('Etudiant')){
        res.status(401).json(error.message, 'le client n’a pas les autorisations nécessaires
        pour supprimer la ressource.');
    } */

    const { IdPersonne } = req.query;
    let resultat;

    if (Number.isNaN(IdPersonne)) {
        res.status(400).send('la requête est mal formée ou les paramètres sont invalides.');
    } else {
        try {
            resultat = await request.getPersonne(IdPersonne);
        } catch (error) {
            res.status(500).json(error.message);
        }
        if (resultat.length === 0) {
            res.status(404).send('La personne que vous voulez supprimer n\'existe pas!');
        } else {
            try {
                resultat = await request.deletePersonne(IdPersonne);
                if (resultat === false) {
                    res.status(400).send('Vous ne pouvez pas supprimer une personne avec un IPPE');
                }
                res.status(200).send({ deleted: true });
            } catch (error) {
                res.status(500).json(error.message);
            }
        }
    }
});

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
