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
});

app.get('/ippeInfo', async (req, res) => {
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

app.post('/IBOB', async (req, res) => {
    try {
        const NoSerie = req.body.NoSerie;
        const Marque = req.body.Marque;
        const Modele = req.body.Modele;
        const TypeObjet = req.body.TypeObjet;
        const TypeEvenement = req.body.TypeEvenement;
        const NoEvenement = req.body.NoEvenement;
        let IBOB = await requeteKnex.postIBOB(NoSerie, Marque, Modele, TypeObjet, TypeEvenement, NoEvenement);
         res.status(200).json(IBOB);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.put('/IBOB', async (req, res) => {
    try {
        const NoSerie = req.body.NoSerie;
        const Marque = req.body.Marque;
        const Modele = req.body.Modele;
        const TypeObjet = req.body.TypeObjet;
        const TypeEvenement = req.body.TypeEvenement;
        const NoEvenement = req.body.NoEvenement;
        let IBOB = await requeteKnex.putIBOB(NoSerie, Marque, Modele, TypeObjet, TypeEvenement, NoEvenement);
         res.status(200).json(IBOB);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.delete('/IBOB', async (req, res) => {
    try {
        const NoSerie = req.body.NoSerie;
        const Marque = req.body.Marque;
        const Modele = req.body.Modele;
        const TypeObjet = req.body.TypeObjet;
        const TypeEvenement = req.body.TypeEvenement;
        const NoEvenement = req.body.NoEvenement;
        let IBOB = await requeteKnex.deleteIBOB(NoSerie, Marque, Modele, TypeObjet, TypeEvenement, NoEvenement);
         res.status(200).json(IBOB);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.post('/IBAF', async (req, res) => {
    try {
        const NoSerie = req.body.NoSerie;
        const Marque = req.body.Marque;
        const Calibre = req.body.Calibre;
        const TypeArme = req.body.TypeArme;
        const TypeEvenement = req.body.TypeEvenement;
        const NoEvenement = req.body.NoEvenement;
        let IBAF = await requeteKnex.postIBAF(NoSerie, Marque, Calibre, TypeArme, TypeEvenement, NoEvenement);
         res.status(200).json(IBAF);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.put('/IBAF', async (req, res) => {
    try {
        const NoSerie = req.body.NoSerie;
        const Marque = req.body.Marque;
        const Calibre = req.body.Calibre;
        const TypeArme = req.body.TypeArme;
        const TypeEvenement = req.body.TypeEvenement;
        const NoEvenement = req.body.NoEvenement;
        let IBAF = await requeteKnex.putIBAF(NoSerie, Marque, Calibre, TypeArme, TypeEvenement, NoEvenement);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.delete('/IBAF', async (req, res) => {
    try {
        const NoSerie = req.body.NoSerie;
        const Marque = req.body.Marque;
        const Calibre = req.body.Calibre;
        const TypeArme = req.body.TypeArme;
        const TypeEvenement = req.body.TypeEvenement;
        const NoEvenement = req.body.NoEvenement;
        let IBAF = await requeteKnex.deleteIBAF(NoSerie, Marque, Calibre, TypeArme, TypeEvenement, NoEvenement);
         res.status(200).json(IBAF);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});



app.post('/IBVA', async (req, res) => {
    try {
        const Identifiant = req.body.Identifiant;
        const Auteur = req.body.Auteur;
        const TypeValeur = req.body.TypeValeur;
        const TypeEvenement = req.body.TypeEvenement;
        const NoEvenement = req.body.NoEvenement;
        let IBVA = await requeteKnex.postIBVA(Identifiant, Auteur, TypeValeur, TypeEvenement, NoEvenement);
         res.status(200).json(IBVA);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.put('/IBVA', async (req, res) => {
    try {
        const Identifiant = req.body.Identifiant;
        const Auteur = req.body.Auteur;
        const TypeValeur = req.body.TypeValeur;
        const TypeEvenement = req.body.TypeEvenement;
        const NoEvenement = req.body.NoEvenement;
        let IBVA = await requeteKnex.putIBVA(Identifiant, Auteur, TypeValeur, TypeEvenement, NoEvenement);
         res.status(200).json(IBVA);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.delete('/IBVA', async (req, res) => {
    try {
        const Identifiant = req.body.Identifiant;
        const Auteur = req.body.Auteur;
        const TypeValeur = req.body.TypeValeur;
        const TypeEvenement = req.body.TypeEvenement;
        const NoEvenement = req.body.NoEvenement;
        let IBVA = await requeteKnex.deleteIBVA(Identifiant, Auteur, TypeValeur, TypeEvenement, NoEvenement);
         res.status(200).json(IBVA);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
