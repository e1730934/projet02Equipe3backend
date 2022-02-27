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
	//creation de liste pour stocker plusieur condition et pour stocker l'information a envoyer
	let libelleList =  new Array();
	let dataToSend =  new Array();
	//Variable qui va stocker le Num de FPS
	let noFps;

	const dataIPPE = await request.ippeData(nom,ddn, prenomUn, prenomDeux, sexe);
    
	//creation du constante qui sert a stocker les Num de fps 
	//console.log(dataFPS)
	console.log(dataIPPE);

	if(dataIPPE.length!=0)
	{   
		//Recherche si la personne possede un dossier FPS et le push a la reponse
		const dataFPS = await request.dataFPS(dataIPPE[0].IdPersonne);
		if(dataFPS.length !=0 ){
			dataToSend.push({
                titre: 'FPS',
				NoFPS: dataFPS[0].NoFPS,
				DateMesure: dataFPS[0].DateMesure,
				CD: dataFPS[0].CD,
				Antecedents: dataFPS[0].Antecedents,
				Violent: dataFPS[0].Violent,
				Echappe: dataFPS[0].Echappe,
				Suicidaire: dataFPS[0].Suicidaire,
				Desequilibre:dataFPS[0].Desequilibre,
				Contagieux: dataFPS[0].Contagieux,
			    Race: dataFPS[0].Race,
				Taille: dataFPS[0].Taille,
				Poids: dataFPS[0].Poids,
				Yeux: dataFPS[0].Yeux,
				Cheveux: dataFPS[0].Cheveux,
				Marques: dataFPS[0].Marques,
				Toxicomanie: dataFPS[0].Toxicomanie,
				Desorganise: dataFPS[0].Desorganise,
				Depressif: dataFPS[0].Depressif});
			noFps = dataFPS[0].NoFPS; 
		}
		console.log(dataFPS)

		dataIPPE.forEach((data)=>{
			//Verifie si l'information IPPE se trouve deja dans les datas a envoyer
			const dupCheck = dataToSend.some(element => {element.IdIPPE === data.IdIPPE;} );
			if(dupCheck){
				//ajoute les conditions aux tableau afin de les afficher plus tard
				libelleList.push(data.Libelle); 
			} else {
				//si aucunes conditions n'est presente rien est envoyer dans le tableau de conditions
				libelleList.push(data.Libelle ? data.Libelle:null);
				//console.log(dataToSend)
				//trie les elements a envoyer pour ne pas envoyer d'information inutile
				switch(data.TypeEvenement){
				case 'Recherché':
					dataToSend.push(
						{
							titre:'Recherché',
							mandat: data.Raison,
							cour: data.Cour,
							numMandat: data.NoCour,
							natureCrime: data.NatureCrime,
							noEvenement: data.NoEvenement
						});
					break;
				case 'Sous-observation':
					dataToSend.push(
						{
							titre:'Sous-Observation',
							motif: data.Raison,
							cour: data.Cour,
							natureCrime: data.NatureCrime,
							noEvenement: data.NoEvenement,
							dossierEnq: data.DossierEnquete

						});
					break;
				case 'Accusé':
					dataToSend.push(
						{
							titre:'Accusé',
							cour: data.Cour,
							numCause: data.NoCour,
							natureCrime: data.NatureCrime,
							noEvenement: data.NoEvenement,
							condition: libelleList
						});
					break;
				case 'Probation':
					dataToSend.push(
						{
							titre:'Probation',
							cour: data.Cour,
							numCause: data.NoCour,
							natureCrime: data.NatureCrime,
							noEvenement: data.NoEvenement,
							finSentence: data.FinSentence,
							condition: libelleList,
							agent: data.Agent,
							telephone: data.Telephone,
							poste: data.Poste
						});
					break;
				case 'Libération Conditionnelle':
					dataToSend.push(
						{
							titre:'Libération Conditionnelle',
							cour: data.Cour,
							numCause: data.NoCour,
							natureCrime: data.NatureCrime,
							noEvenement: data.NoEvenement,
							fps: noFps,
							lieuDetention: data.LieuDetention,
							finSentence: data.FinSentence,
							condition: libelleList,
							agent: data.Agent,
							telephone: data.Telephone,
							poste: data.Poste
						});
					break;
				case 'Disparu':
					dataToSend.push(
						{
							titre:'Disparu',
							noEvenement: data.NoEvenement,
							motif: data.Raison,
							derniereVu: data.VuDerniereFois,
							descrPhys:{ 
								race: data.Race, 
								taille: data.Taille, 
								poids: data.Poids,
								yeux: data.Yeux,
								cheveux: data.Cheveux,
								marques: data.Marques},
							descrVest:{
								gilet: data.Gilet,
								pantalon: data.Pantalon,
								autreVetements: data.AutreVetement},
							problemeSante:{
								toxicomanie: data.Toxicomanie,
								desorganise: data.Desorganise,
								depressif: data.Depressif,
								suicidaire: data.Suicidaire,
								violent: data.Violent}
						});
					break;
				case 'Interdit':
					dataToSend.push(
						{
							titre:'Interdit',
							nature: data.Raison,
							cour: data.Cour,
							numCour: data.NoCour,
							natureCrime: data.NatureCrime,
							noEvenement: data.NoEvenement,
							expiration: data.FinSentence
						});
					break;
				}
			}
		});
		//gere les doublons en les supprimants
		let result = dataToSend.reduce((unique, o) => {
			if(!unique.some(obj => obj.noEvenement === o.noEvenement && obj.value === o.value)) 
				unique.push(o);
            
			return unique;
		},[]);

		//retroune que les valeurs necessaire a la recherche IPPE
		res.send(result);   
	}else
		res.send({result : 'Negatif'});
    
});

app.listen(PORT, () => {
	console.log(`Mon application roule sur http://localhost:${PORT}`);
});