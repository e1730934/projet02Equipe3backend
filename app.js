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
        const Noserie = req.body.noserie;
        const Marque = req.body.marque;
        const Modele = req.body.modele;
        const Typeobjet = req.body.typeobjet;
        const ReponseIBOB = req.body.reponseIBOB;
        const Noevenement = req.body.Noevenement;
        let IBOB = await requeteKnex.postIBOB(Noserie, Marque, Modele, Typeobjet, ReponseIBOB, Noevenement);
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
        const Noserie = req.body.noserie;
        const Marque = req.body.marque;
        const Modele = req.body.modele;
        const Typeobjet = req.body.typeobjet;
        const ReponseIBOB = req.body.reponseIBOB;
        const Noevenement = req.body.Noevenement;
        let IBOB = await requeteKnex.putIBOB(Noserie, Marque, Modele, Typeobjet, ReponseIBOB, Noevenement);
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
        const Noserie = req.body.noserie;
        const Marque = req.body.marque;
        const Modele = req.body.modele;
        const Typeobjet = req.body.typeobjet;
        const ReponseIBOB = req.body.reponseIBOB;
        const Noevenement = req.body.Noevenement;
        let IBOB = await requeteKnex.deleteIBOB(Noserie, Marque, Modele, Typeobjet, ReponseIBOB, Noevenement);
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
        const Noserie = req.body.noserie;
        const Marque = req.body.marque;
        const Calibre = req.body.modele;
        const Typearme = req.body.typeobjet;
        const ReponseIBAF = req.body.reponseIBAF;
        const Noevenement = req.body.Noevenement;
        let IBAF = await requeteKnex.postIBAF(Noserie, Marque, Calibre, Typearme, ReponseIBAF, Noevenement);         res.status(200).json(IBAF);
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
        const Noserie = req.body.noserie;
        const Marque = req.body.marque;
        const Calibre = req.body.modele;
        const Typearme = req.body.typeobjet;
        const ReponseIBAF = req.body.reponseIBAF;
        const Noevenement = req.body.Noevenement;
        let IBAF = await requeteKnex.putIBAF(Noserie, Marque, Calibre, Typearme, ReponseIBAF, Noevenement);         res.status(200).json(IBAF);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.delete('/IBAF', async (req, res) => {
    try {
        const Noserie = req.body.noserie;
        const Marque = req.body.marque;
        const Calibre = req.body.modele;
        const Typearme = req.body.typeobjet;
        const ReponseIBAF = req.body.reponseIBAF;
        const Noevenement = req.body.Noevenement;
        let IBAF = await requeteKnex.deleteIBAF(Noserie, Marque, Calibre, Typearme, ReponseIBAF, Noevenement);         res.status(200).json(IBAF);
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
        const Noserie = req.body.noserie;
        const Auteur = req.body.marque;
        const Typevaleur = req.body.modele;
        const ReponseIBVA = req.body.typeobjet;
        const ReponseIBAF = req.body.typeevenement;
        const Noevenement = req.body.typeevenement;
        let IBVA = await requeteKnex.postIBVA(Noserie, Auteur, Typevaleur, ReponseIBVA, ReponseIBAF, Noevenement);
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
        const Noserie = req.body.noserie;
        const Auteur = req.body.marque;
        const Typevaleur = req.body.modele;
        const ReponseIBVA = req.body.typeobjet;
        const ReponseIBAF = req.body.typeevenement;
        const Noevenement = req.body.typeevenement;
        let IBVA = await requeteKnex.putIBVA(Noserie, Auteur, Typevaleur, ReponseIBVA, ReponseIBAF, Noevenement);
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
        const Noserie = req.body.noserie;
        const Auteur = req.body.marque;
        const Typevaleur = req.body.modele;
        const ReponseIBVA = req.body.typeobjet;
        const ReponseIBAF = req.body.typeevenement;
        const Noevenement = req.body.typeevenement;
        let IBVA = await requeteKnex.deleteIBVA(Noserie, Auteur, Typevaleur, ReponseIBVA, ReponseIBAF, Noevenement);
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
