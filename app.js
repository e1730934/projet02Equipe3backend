const express = require('express');

const app = express();
const cors = require('cors');
const requeteKnex = require('./requetesKnex');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        const { identifiant, motDePasse } = req.body;
        resultat = await requeteKnex.connexion(identifiant, motDePasse);
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
        resultat = await requeteKnex.getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (resultat.length === 0) {
        res.send({ result: 'Negatif' });
    } else {
        res.send(resultat);
    }
});

app.get('/IBOB/:id', async (req, res) => {
    try {
        const IBOB = await requeteKnex.getIBOBbyId(req.params.id);
        res.status(200).json(IBOB);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.post('/IBOB', async (req, res) => {
    try {
        const { NoSerie } = req.body;
        const { Marque } = req.body;
        const { Modele } = req.body;
        const { TypeObjet } = req.body;
        const { TypeEvenement } = req.body;
        const { NoEvenement } = req.body;
        const IBOB = await requeteKnex
            .ajoutIBOB(NoSerie, Marque, Modele, TypeObjet, TypeEvenement, NoEvenement);
        res.status(200).json(IBOB);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.put('/IBOB', async (req, res) => {
    try {
        const { NoSerie } = req.body;
        const { Marque } = req.body;
        const { Modele } = req.body;
        const { TypeObjet } = req.body;
        const { TypeEvenement } = req.body;
        const { NoEvenement } = req.body;
        const IBOB = await requeteKnex
            .modificationIBOB(NoSerie, Marque, Modele, TypeObjet, TypeEvenement, NoEvenement);
        res.status(200).json(IBOB);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.delete('/IBOB/:id', async (req, res) => {
    try {
        const IBOB = await requeteKnex.suppresionIBOB(req.params.id);
        res.status(200).json(IBOB);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.get('/IBAF/:id', async (req, res) => {
    try {
        const IBAF = await requeteKnex.getIBAFbyId(req.params.id);
        res.status(200).json(IBAF);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.post('/IBAF', async (req, res) => {
    try {
        const { NoSerie } = req.body;
        const { Marque } = req.body;
        const { Calibre } = req.body;
        const { TypeArme } = req.body;
        const { TypeEvenement } = req.body;
        const { NoEvenement } = req.body;
        const IBAF = await requeteKnex
            .ajoutIBAF(NoSerie, Marque, Calibre, TypeArme, TypeEvenement, NoEvenement);
        res.status(200).json(IBAF);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.put('/IBAF', async (req, res) => {
    try {
        const { NoSerie } = req.body;
        const { Marque } = req.body;
        const { Calibre } = req.body;
        const { TypeArme } = req.body;
        const { TypeEvenement } = req.body;
        const { NoEvenement } = req.body;
        const IBAF = await requeteKnex
            .modificationIBAF(NoSerie, Marque, Calibre, TypeArme, TypeEvenement, NoEvenement);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.delete('/IBAF/:id', async (req, res) => {
    try {
        const IBAF = await requeteKnex.suppresionIBAF(req.params.id);
        res.status(200).json(IBAF);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.get('/IBVA/:id', async (req, res) => {
    try {
        const IBVA = await requeteKnex.getIBVAbyId(req.params.id);
        res.status(200).json(IBVA);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.post('/IBVA', async (req, res) => {
    try {
        const { Identifiant } = req.body;
        const { Auteur } = req.body;
        const { TypeValeur } = req.body;
        const { TypeEvenement } = req.body;
        const { NoEvenement } = req.body;
        const IBVA = await requeteKnex
            .ajoutIBVA(Identifiant, Auteur, TypeValeur, TypeEvenement, NoEvenement);
        res.status(200).json(IBVA);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.put('/IBVA', async (req, res) => {
    try {
        const { Identifiant } = req.body;
        const { Auteur } = req.body;
        const { TypeValeur } = req.body;
        const { TypeEvenement } = req.body;
        const { NoEvenement } = req.body;
        const IBVA = await requeteKnex
            .modificationIBVA(Identifiant, Auteur, TypeValeur, TypeEvenement, NoEvenement);
        res.status(200).json(IBVA);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.delete('/IBVA/:id', async (req, res) => {
    try {
        const IBVA = await requeteKnex.suppresionIBVA(req.params.id);
        res.status(200).json(IBVA);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
