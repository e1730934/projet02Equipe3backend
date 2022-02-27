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
	console.log(req.body);
	let data = await request.connectionCheck(loginInfo);
	console.log(data);
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
	const result= new Array()
	const dataIPPE = await request.ippeData(nom,ddn, prenomUn, prenomDeux, sexe);
    
	//creation du constante qui sert a stocker les Num de fps 
	//console.log(dataFPS)
	console.log(dataIPPE);

	if(dataIPPE.length!=0)
	{   
		//Recherche si la personne possede un dossier FPS et le push a la reponse
		const dataFPS = await request.dataFPS(dataIPPE[0].IdPersonne);
		let IPPEresult = request.IPPEDisp(dataIPPE, dataFPS)
		result.push(IPPEresult)
		if(dataFPS.length !=0 ){
			let FPSresult =  request.FPSDisp(dataFPS)
			result.push(FPSresult) 
		}
		//retroune que les valeurs au client; necessaire a la recherche IPPE
		res.send(result);
	} else {
		res.send({result : 'Negatif'});
	}
	});

app.listen(PORT, () => {
	console.log(`Mon application roule sur http://localhost:${PORT}`);
});