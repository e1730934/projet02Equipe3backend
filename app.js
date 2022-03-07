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

		if(resultat.length!==0){
			//envoi du message contenant les information pour le login
			/**** TEMPORAIRE JUSQU'A TEMPS QUE L'ON VOIT LES NOTION DE TOKEN*****/
			return res.status(200).json({
				'succes' : true,
				'Etudiant': resultat[0].Etudiant,
				'Matricule': resultat[0].Identifiant,
				'Nom': resultat[0].NomFamille });

		} else
			return res.status(404).json({'succes' : false});
	} catch (error) {
		res.status(500).json(error.message);
	}



});

app.get('/ippeInfo', async (req, res) => {
	try {
		const { nomFamille, prenom1} = req.query;
		const prenom2 = (req.query.prenom2 === '') ? null : req.query.prenom2;
		const masculin = (req.query.masculin === 'true');
		const dateNaissance = new Date(req.query.dateNaissance);
		const resultat = await request.getIPPE(nomFamille, dateNaissance, prenom1, prenom2, masculin);

		if(resultat.length!==0)
		{
			//retourne que les valeurs au client; necessaire a la recherche IPPE
			res.send(resultat);
		} else {
			//retourne la valeur negative si la personne na pas de fichier IPPE
			res.send({result : 'Negatif'});
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
});

app.post('/IBAF', async (req, res) => {
    try {
        let IBAF = await requeteKnex.postIBAF(req.body.Id, req.body.Noserie, req.body.NoEvenement, req.body.Description);
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
        let IBAF = await requeteKnex.putIBAF(req.body.Id, req.body.Noserie, req.body.NoEvenement, req.body.Description);
         res.status(200).json(IBAF);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.delete('/IBAF', async (req, res) => {
    try {
        let IBAF = await requeteKnex.deleteIBAF(req.body.Id, req.body.Noserie, req.body.NoEvenement, req.body.Description);
         res.status(200).json(IBAF);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.post('/IBOB', async (req, res) => {
    try {
        let IBOB = await requeteKnex.postIBOB(req.body.Id, req.body.Noserie, req.body.NoEvenement, req.body.Description);
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
        let IBOB = await requeteKnex.putIBOB(req.body.Id, req.body.Noserie, req.body.NoEvenement, req.body.Description);
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
        let IBOB = await requeteKnex.deleteIBOB(req.body.Id, req.body.Noserie, req.body.NoEvenement, req.body.Description);
         res.status(200).json(IBOB);
    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.post('/IBVA', async (req, res) => {
    try {
        let IBVA = await requeteKnex.postIBVA(req.body.Id, req.body.NoSerie, req.body.Titre, req.body.Auteur, req.body.Inscription, req.body.NoEvenement, req.body.Description);
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
        let IBVA = await requeteKnex.putIBVA(req.body.Id, req.body.NoSerie, req.body.Titre, req.body.Auteur, req.body.Inscription, req.body.NoEvenement, req.body.Description);
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
        let IBVA = await requeteKnex.deleteIBVA(req.body.Id, req.body.NoSerie, req.body.Titre, req.body.Auteur, req.body.Inscription, req.body.NoEvenement, req.body.Description);
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
