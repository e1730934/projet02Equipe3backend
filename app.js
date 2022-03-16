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

app.get('/IBOB/:NoSerie', async (req, res) => {
    try {
        const IBOB = await requeteKnex.getIBOBbyNoSerie(req.params.NoSerie);
        if (IBOB !== null) {
            res.status(200).json(IBOB);
        } else {
            res.status(404).send('Not found.');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.post('/IBOB', async (req, res) => {
    try {
        const noSerie = req.body.NoSerie;
        const marque = req.body.Marque;
        const modele = req.body.Modele;
        const typeObjet = req.body.TypeObjet;
        const typeEvenement = req.body.TypeEvenement;
        const noEvenement = req.body.NoEvenement;
        const IBOB = await requeteKnex
            .ajoutIBOB(noSerie, marque, modele, typeObjet, typeEvenement, noEvenement);
        if (IBOB !== null) {
            res.status(200).json(IBOB);
        } else {
            res.status(404).send('Not found.');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.put('/IBOB', async (req, res) => {
    try {
        const noSerie = req.body.NoSerie;
        const marque = req.body.Marque;
        const modele = req.body.Modele;
        const typeObjet = req.body.TypeObjet;
        const typeEvenement = req.body.TypeEvenement;
        const noEvenement = req.body.NoEvenement;
        const IBOB = await requeteKnex
            .modificationIBOB(noSerie, marque, modele, typeObjet, typeEvenement, noEvenement);
        if (IBOB !== null) {
            res.status(200).json(IBOB);
        } else {
            res.status(404).send('Not found.');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.delete('/IBOB/:NoSerie', async (req, res) => {
    try {
        const IBOB = await requeteKnex.suppresionIBOBByNoSerie(req.params.NoSerie);
        if (IBOB !== null) {
            res.status(200).json(IBOB);
        } else {
            res.status(404).send('Not found.');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.get('/IBAF/:NoSerie', async (req, res) => {
    try {
        const IBAF = await requeteKnex.getIBAFByNoSerie(req.params.NoSerie);
        if (IBAF !== null) {
            res.status(200).json(IBAF);
        } else {
            res.status(404).send('Not found.');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.post('/IBAF', async (req, res) => {
    try {
        const noSerie = req.body.NoSerie;
        const marque = req.body.Marque;
        const calibre = req.body.Calibre;
        const typeArme = req.body.TypeArme;
        const typeEvenement = req.body.TypeEvenement;
        const noEvenement = req.body.NoEvenement;
        const IBAF = await requeteKnex
            .ajoutIBAF(noSerie, marque, calibre, typeArme, typeEvenement, noEvenement);
        if (IBAF !== null) {
            res.status(200).json(IBAF);
        } else {
            res.status(404).send('Not found.');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.put('/IBAF', async (req, res) => {
    try {
        const noSerie = req.body.NoSerie;
        const marque = req.body.Marque;
        const calibre = req.body.Calibre;
        const typeArme = req.body.TypeArme;
        const typeEvenement = req.body.TypeEvenement;
        const noEvenement = req.body.NoEvenement;
        const IBAF = await requeteKnex
            .modificationIBAF(noSerie, marque, calibre, typeArme, typeEvenement, noEvenement);
        if (IBAF !== null) {
            res.status(200).json(IBAF);
        } else {
            res.status(404).send('Not found.');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.delete('/IBAF/:NoSerie', async (req, res) => {
    try {
        const IBAF = await requeteKnex.suppresionIBAFByNoSerie(req.params.NoSerie);
        if (IBAF !== null) {
            res.status(200).json(IBAF);
        } else {
            res.status(404).send('Not found.');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.get('/IBVA/:identifiant', async (req, res) => {
    try {
        const IBVA = await requeteKnex.getIBVAbyIdentifiant(req.params.identifiant);
        if (IBVA !== null) {
            res.status(200).json(IBVA);
        } else {
            res.status(404).send('Not found.');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.post('/IBVA', async (req, res) => {
    try {
        const identifiant = req.body.Identifiant;
        const auteur = req.body.Auteur;
        const typeValeur = req.body.TypeValeur;
        const typeEvenement = req.body.TypeEvenement;
        const noEvenement = req.body.NoEvenement;
        const IBVA = await requeteKnex
            .ajoutIBVA(identifiant, auteur, typeValeur, typeEvenement, noEvenement);
        if (IBVA !== null) {
            res.status(200).json(IBVA);
        } else {
            res.status(404).send('Not found.');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.put('/IBVA', async (req, res) => {
    try {
        const identifiant = req.body.Identifiant;
        const auteur = req.body.Auteur;
        const typeValeur = req.body.TypeValeur;
        const typeEvenement = req.body.TypeEvenement;
        const noEvenement = req.body.NoEvenement;
        const IBVA = await requeteKnex
            .modificationIBVA(identifiant, auteur, typeValeur, typeEvenement, noEvenement);
        if (IBVA !== null) {
            res.status(200).json(IBVA);
        } else {
            res.status(404).send('Not found.');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error,
        });
    }
});

app.delete('/IBVA/:identifiant', async (req, res) => {
    try {
        const IBVA = await requeteKnex.suppresionIBVAByIdentifiant(req.params.identifiant);
        if (IBVA !== null) {
            res.status(200).json(IBVA);
        } else {
            res.status(404).send('Not found.');
        }
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
