const express = require('express');

const app = express();
const cors = require('cors');
const request = require('./requestKnex');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    try {
        const { identifiant, motDePasse } = req.body;
        const resultat = await request.connexion(identifiant, motDePasse);

        if (resultat.length != 0) {
            // envoi du message contenant les information pour le login
            /** ** TEMPORAIRE JUSQU'A TEMPS QUE L'ON VOIT LES NOTION DE TOKEN**** */
            return res.status(200).json({
                succes: true,
                Etudiant: resultat[0].Etudiant,
                Matricule: resultat[0].Identifiant,
                Nom: resultat[0].NomFamille,
            });
        } return res.status(404).json({ succes: false });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.get('/ippeInfo', async (req, res) => {
    try {
        const { nomFamille, prenom1 } = req.query;
        const prenom2 = (req.query.prenom2 === '') ? null : req.query.prenom2;
        const masculin = (req.query.masculin === 'true');
        const dateNaissance = new Date(req.query.dateNaissance);
        const resultat = await request.getIPPE(nomFamille, dateNaissance, prenom1, prenom2, masculin);

        if (resultat.length != 0) {
            // retourne que les valeurs au client; necessaire a la recherche IPPE
            res.send(resultat);
        } else {
            // retourne la valeur negative si la personne na pas de fichier IPPE
            res.send({ result: 'Negatif' });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
