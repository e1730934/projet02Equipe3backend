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

    const { nomFamille, prenom1 } = req.query;
    const prenom2 = (req.query.prenom2 === '') ? null : req.query.prenom2;
    const masculin = (req.query.masculin === '1');
    const { dateNaissance } = req.query;

    if (nomFamille === undefined || prenom1 === undefined || prenom2 === undefined
        || masculin === undefined || dateNaissance === undefined) {
        return res.status(400).json('paramètre manquant');
    }
    try {
        resultat = await request.getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance);
    } catch (error) {
        return res.status(500).json(error.message);
    }

    if (resultat.length === 0) {
        return res.status(404).json('Cette personne n\'est pas répertoriée');
    }

    return res.status(200).json(resultat);
});

app.get('/natcrime', async (req,res) => {
    const { IdNatureCrime } = req.query;
    let resultat;
    if (Number.isNaN(IdNatureCrime)) {
        res.status(400).send('la requête est mal formée ou les paramètres sont invalides.');
    } else {
        try {
            resultat = await request.natCrime(IdNatureCrime);
            if (resultat.length === 0 || resultat === undefined) {
                res.status(404).send('La personne n\'existe pas!');
            } else {
                res.status(200).send(resultat);
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
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
            if (resultat.length === 0 || resultat === undefined) {
                res.status(404).send('La personne n\'existe pas!');
            } else {
                res.status(200).send(resultat);
            }
        } catch (error) {
            res.status(500).json({ succes: false });
        }
}});

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
            message : 'Personne ajoutée :)',
            IdPersonne : id});
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
                //Supprime les conditions, les IPPE et la personne de la BD
                await request.deletePersonne(IdPersonne);
                return res.status(200).send({ deleted: true });
            } catch (error) {
                res.status(500).json(error.message);
                
            }
        }
    }
});

app.get('/IppePersonnes', async (req,res)=>{
    try{
        const { IdPersonne } = req.query;
        const ippeResult = await request.getIppePersonne(IdPersonne)
        res.status(200).send(ippeResult) 
    }catch (error){
        res.status(404).json(error.message)
    }
})
app.listen(PORT, () => {
	console.log(`Mon application roule sur http://localhost:${PORT}`);
});