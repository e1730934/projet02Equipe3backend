const express = require('express');
const app = express();
const cors = require('cors');
const request = require('./requestKnex');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	//Creation du body pour l'envois
	let loginInfo = {
		'username': req.body.username,
		'password': req.body.password
	};

	let data = await request.connectionCheck(loginInfo);

	if(data.length!=0){
		//envoi du message contenant les information pour le login
		/**** TEMPORAIRE JUSQU'A TEMPS QUE L'ON VOIT LES NOTION DE TOKEN*****/
		return res.status(200).json({
			'succes' : true,
			'Etudiant': data[0].Etudiant,
			'Matricule': data[0].Identifiant,
			'Nom': data[0].NomFamille });

	} else 
		return res.status(500).json({'succes' : false});
	
    
});

app.get('/ippeInfo', async (req, res) => {
	//reception des parametres de recherche dans la BD
	const prenomDeux = (req.query.prenomDeux === '') ? null : req.query.prenomDeux;
	const nom = req.query.nom;
	const prenomUn = req.query.prenomUn; 
	const sexe = req.query.sexe;
	const ddn = req.query.ddn;
	const result= new Array();
	const dataIPPE = await request.ippeData(nom,ddn, prenomUn, prenomDeux, sexe);
    
	if(dataIPPE.length!=0)
	{   

		//Recherche si la personne possede un dossier FPS et le push a la reponse
		const dataFPS = await request.dataFPS(dataIPPE[0].IdPersonne);
		let IPPEresult = request.IPPEDisp(dataIPPE, dataFPS);
		IPPEresult.forEach(element => {
			result.push(element);	
		});
		if(dataFPS.length !=0 ){
			const FPSresult =  request.FPSDisp(dataFPS);
			FPSresult.forEach(element => {
				result.push(element);	
			});
		}
		console.log('testFPS' + dataFPS.length);
		//retourne que les valeurs au client; necessaire a la recherche IPPE
		res.send(result);
	} else {
		//retourne la valeur negative si la personne na pas de fichier IPPE
		res.send({result : 'Negatif'});
	}
});

app.listen(PORT, () => {
	console.log(`Mon application roule sur http://localhost:${PORT}`);
});