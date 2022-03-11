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


app.get('/voirPersonne', async(req,res) => {
    let resultat;

    try{
        const {IdPersonne} = req.query;
        
        resultat = await request.getPersonne(IdPersonne);
    
     } catch(error){
        res.status(500).json(error.message);
    }

     if (resultat.length === 0) {
        res.send({ result: 'Personne inexistate' });
    } else {
        res.send(resultat);
    }
})

/*app.post('/creerPersonne', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');

	try {
		const { IdPersonne } = req.body;
		const resultat = await request.ajoutPersonne(IdPersonne);

		if(resultat.length!=0){
			//envoi du message contenant les information pour le post de personne dans base de donnee

			return res.status(200).json({
				'succes' : true,
				'Nom': resultat[0].NomFamille,
				'Prenom1': resultat[0].Prenom1,
				'Prenom2': resultat[0].Prenom2,
				'Sexe': resultat[0].Masculin,
				'DateNaissance': resultat[0].DateNaissance,
				'Sexe': resultat[0].Masculin,
				'Catégorie': resultat[0].TypePersonne			
				
			 });
	
		} else 
			return res.status(404).json({'succes' : false});
	} catch (error) {
		res.status(500).json(error.message);
	}
   
});*/



app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
