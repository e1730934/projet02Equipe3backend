const reqKnex = require('./requestKnex.js');

test('RequêteKnex FPS', async () => {
	// Arrange les resultat qui sortirons avant d'etre trier
	const resultat = [{
		Id: 2,
		IdPersonne: 43,
		NoFPS: '438761F',
		DateMesure: new Date('2020-02-25'),
		CD: 'W08,W03,W08,W08,W07,W07,W01,W06,W03,U08',
		Antecedents: 'Tentative de meurtre',
		Violent: true,
		Echappe: null,
		Suicidaire: null,
		Desequilibre: null,
		Desorganise: null,
		Contagieux: null,
		Race: null,
		Taille: null,
		Poids: null,
		Yeux: null,
		Cheveux: null,
		Marques: null,
		Toxicomanie: null,
		Depressif: null
	}];
	const fps = await reqKnex.getFPS(resultat[0].IdPersonne);
	// Assert
	expect(fps).toEqual(resultat);
    
});

test('RequêteKnex, verification connection coconcluante', async () => {
	// Arrange les infos fournis par le client
	let loginInfo = {
		'username': 1234,
		'password': 'etud'
	};
	//reultat retourner temporaire jusqu'aux temps d'instoration du token
	let resultat = [{
		Id: 1,
		Identifiant: '1234',
		MotDePasse: 'etud',
		Etudiant: true,
		NomFamille: 'etudiant'
	}];

	const conn = await reqKnex.connexion(loginInfo);

	// Assert
	expect(conn).toEqual(resultat);
    
});

test('RequêteKnex, verification connection sans mot de passe valide', async () => {
	// Arrange les infos fournis par le client
	let loginErrorPwd = {
		'username': 1234,
		'password': null
	};

	let resultatError = [];

	const connErrorPwd = await reqKnex.connexion(loginErrorPwd);

	// Assert
	expect(connErrorPwd).toEqual(resultatError);
     
});

test('RequêteKnex, verification connection sans User et Password valide', async () => {
	// Arrange les infos fournis par le client
	let loginEmpty = {
		'username': null,
		'password': null
	};

	let resultatError = [];

	const connEmpty = await reqKnex.connexion(loginEmpty); 

	// Assert
	expect(connEmpty).toEqual(resultatError);
    
});

test('RequêteKnex, verification connection sans utilisateur valide', async () => {
	// Arrange les infos fournis par le client
	let loginErrorUser = {
		'username': null,
		'password': 'etud'
	};

	let resultatError = [];

	const connErrorUser = await reqKnex.connexion(loginErrorUser);

	// Assert
	expect(connErrorUser).toEqual(resultatError);
    
});
//
test('Réponse ***RECHERCHÉ*** avec la fonction affichage', async () => {
	//resultat filtrer pour etre envoyer
	const resultat = [{
		titre: 'Recherché',
		mandat: 'Arrestation',
		cour: 'Municipale de Longueuil',
		numMandat: 'CM-LGL-A-26840',
		natureCrime: 'Agression armée',
		noEvenement: '108-220208-0031'
	}];
	//requete non filtrer pour test de la fonction
	const requeteInfo = [{
		Id: [ 39, 37, null ],
		NomFamille: 'Ducharme',
		Prenom1: 'Benoit',
		Prenom2: null,
		Masculin: true,
		DateNaissance: 19750831,
		Telephone: null,
		NoPermis: null,
		Adresse1: null,
		Adresse2: null,
		Ville: null,
		Province: null,
		CodePostal: null,
		Race: null,
		Taille: null,
		Poids: null,
		Yeux: null,
		Cheveux: null,
		Marques: null,
		Toxicomanie: null,
		Desorganise: null,
		Depressif: null,
		Suicidaire: null,
		Violent: null,
		Gilet: null,
		Pantalon: null,
		AutreVetement: null,
		IdPersonne: 39,
		NoEvenement: '108-220208-0031',
		TypeEvenement: 'Recherché',
		Raison: 'Arrestation',
		DossierEnquete: null,
		Cour: 'Municipale de Longueuil',
		NoCour: 'CM-LGL-A-26840',
		NatureCrime: 'Agression armée',
		LieuDetention: null,
		FinSentence: null,
		VuDerniereFois: null,
		Agent: null,
		Poste: null,
		IdIPPE: null,
		Libelle: null
	}];

	const recherche = await reqKnex.IPPEDisp(requeteInfo);
	//Assert
	expect(recherche).toEqual(resultat);

});

test('Réponse ***Sous observation*** avec la fonction affichage', async () => {
	//requete non filtrer pour test de la fonction 
	let requeteInfo = [
		{
			Id: [ 40, 38, null ],
			NomFamille: 'Sirois',
			Prenom1: 'Danielle',
			Prenom2: null,
			Masculin: false,
			DateNaissance: 19800214,
			Telephone: null,
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			IdPersonne: 40,
			NoEvenement: '302-220131-0056',
			TypeEvenement: 'Sous observation',
			Raison: 'Fréquentation criminelle',
			DossierEnquete: 'LVL-RENS-468259',
			Cour: null,
			NoCour: null,
			NatureCrime: 'Fraude et prêts usuraires',
			LieuDetention: null,
			FinSentence: null,
			VuDerniereFois: null,
			Agent: null,
			Poste: null,
			IdIPPE: null,
			Libelle: null
		}
	];
	//resultat filtrer pour etre envoyer 
	const resultat = [
		{
			titre: 'Sous Observation',
			motif: 'Fréquentation criminelle',
			cour: null,
			natureCrime: 'Fraude et prêts usuraires',
			noEvenement: '302-220131-0056',
			dossierEnq: 'LVL-RENS-468259'
		}
	];

	const sousObs = await reqKnex.IPPEDisp(requeteInfo);

	expect(sousObs).toEqual(resultat);

});

test('Réponse ***Accusé*** avec la fonction affichage', async () => {
	////resultat filtrer pour etre envoyer au client
	const resultat = [
		{
			titre: 'Accusé',
			cour: 'Municipale de Montréal',
			numCause: 'CM- MTL-57931-852',
			natureCrime: 'Voies de fait',
			noEvenement: '123-220115-0014',
			condition: [
				'Ne pas entrer en contact avec Julie Lapierre.'
			]
		}
	];
	//requete non filtrer pour test de la fonction
	let requeteInfo =[
		{
			Id: [ 41, 39, 1 ],
			NomFamille: 'Bélanger',
			Prenom1: 'Claude',
			Prenom2: null,
			Masculin: true,
			DateNaissance: 19760712,
			Telephone: null,
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			IdPersonne: 41,
			NoEvenement: '123-220115-0014',
			TypeEvenement: 'Accusé',
			Raison: null,
			DossierEnquete: null,
			Cour: 'Municipale de Montréal',
			NoCour: 'CM- MTL-57931-852',
			NatureCrime: 'Voies de fait',
			LieuDetention: null,
			FinSentence: null,
			VuDerniereFois: null,
			Agent: null,
			Poste: null,
			IdIPPE: 39,
			Libelle: 'Ne pas entrer en contact avec Julie Lapierre.'
		}
	];

	const accuse = await reqKnex.IPPEDisp(requeteInfo);

	expect(accuse).toEqual(resultat);

});

test('Réponse ***Probation*** avec la fonction affichage', async () => {
	////resultat filtrer pour etre envoyer au client
	const resultat =[
		{
			titre: 'Probation',
			cour: 'Municipale de Montréal',
			numCause: 'CM- MTL-58246-829',
			natureCrime: 'Intimidation',
			noEvenement: '123-200303-0026',
			finSentence: '2022-03-01T00:00:00.000Z',
			condition: [
				'Ne pas entrer en contact avec Alain Coutu',
				'Aucune consommation d alcool ou de drogue non prescrite'
			],
			agent: 'David Chapdelaine',
			telephone: '5142547131',
			poste: '222'
		}
	];

	//requete non filtrer pour test de la fonction
	let requeteInfo =[
		{
			Id: [ 42, 40, 2 ],
			NomFamille: 'Levasseur',
			Prenom1: 'Marc',
			Prenom2: null,
			Masculin: true,
			DateNaissance: '1971-11-07T00:00:00.000Z',
			Telephone: '5142547131',
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			IdPersonne: 42,
			NoEvenement: '123-200303-0026',
			TypeEvenement: 'Probation',
			Raison: null,
			DossierEnquete: null,
			Cour: 'Municipale de Montréal',
			NoCour: 'CM- MTL-58246-829',
			NatureCrime: 'Intimidation',
			LieuDetention: null,
			FinSentence: '2022-03-01T00:00:00.000Z',
			VuDerniereFois: null,
			Agent: 'David Chapdelaine',
			Poste: '222',
			IdIPPE: 40,
			Libelle: 'Ne pas entrer en contact avec Alain Coutu'
		},
		{
			Id: [ 42, 40, 3 ],
			NomFamille: 'Levasseur',
			Prenom1: 'Marc',
			Prenom2: null,
			Masculin: true,
			DateNaissance: '1971-11-07T00:00:00.000Z',
			Telephone: '5142547131',
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			IdPersonne: 42,
			NoEvenement: '123-200303-0026',
			TypeEvenement: 'Probation',
			Raison: null,
			DossierEnquete: null,
			Cour: 'Municipale de Montréal',
			NoCour: 'CM- MTL-58246-829',
			NatureCrime: 'Intimidation',
			LieuDetention: null,
			FinSentence: '2022-03-01T00:00:00.000Z',
			VuDerniereFois: null,
			Agent: 'David Chapdelaine',
			Poste: '222',
			IdIPPE: 40,
			Libelle: 'Aucune consommation d alcool ou de drogue non prescrite'
		}
	];

	const probation = await reqKnex.IPPEDisp(requeteInfo);

	expect(probation).toEqual(resultat);

});

test('Réponse ***Libération Conditionnelle*** avec la fonction affichage', async () => {
	////resultat filtrer pour etre envoyer au client
	const resultat = [
		{
			titre: 'Libération Conditionnelle',
			cour: 'Cours du Québec',
			numCause: '500-01-310-35719-654',
			natureCrime: 'Tentative de meurtre',
			noEvenement: '108-110525-0003',
			fps: '438761F',
			lieuDetention: 'Prison de Port-Cartier',
			finSentence: '2022-09-19T00:00:00.000Z',
			condition: [
				'Ne pas fréquenter des gens ayant des dossiers criminels',
				'Aucune consommation d alcool ou de drogue non prescrite'
			],
			agent: 'Benoit Ducharme',
			telephone: '5142745131',
			poste: null
		}
	];
	//requete Fps non filtrer pour test de la fonction 
	let fpsInfo = [
		{
			Id: 2,
			IdPersonne: 43,
			NoFPS: '438761F',
			DateMesure: '2020-02-25T00:00:00.000Z',
			CD: 'W08,W03,W08,W08,W07,W07,W01,W06,W03,U08',
			Antecedents: 'Tentative de meurtre',
			Violent: true,
			Echappe: null,
			Suicidaire: null,
			Desequilibre: null,
			Contagieux: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null
		}
	];
	//requete non filtrer pour test de la fonction
	let requeteInfo = [
		{
			Id: [ 43, 41, 4 ],
			NomFamille: 'Hébert',
			Prenom1: 'Francis',
			Prenom2: null,
			Masculin: true,
			DateNaissance: '1992-10-19T00:00:00.000Z',
			Telephone: '5142745131',
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			IdPersonne: 43,
			NoEvenement: '108-110525-0003',
			TypeEvenement: 'Libération Conditionnelle',
			Raison: null,
			DossierEnquete: null,
			Cour: 'Cours du Québec',
			NoCour: '500-01-310-35719-654',
			NatureCrime: 'Tentative de meurtre',
			LieuDetention: 'Prison de Port-Cartier',
			FinSentence: '2022-09-19T00:00:00.000Z',
			VuDerniereFois: null,
			Agent: 'Benoit Ducharme',
			Poste: null,
			IdIPPE: 41,
			Libelle: 'Ne pas fréquenter des gens ayant des dossiers criminels'
		},
		{
			Id: [ 43, 41, 5 ],
			NomFamille: 'Hébert',
			Prenom1: 'Francis',
			Prenom2: null,
			Masculin: true,
			DateNaissance: '1992-10-19T00:00:00.000Z',
			Telephone: '5142745131',
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			IdPersonne: 43,
			NoEvenement: '108-110525-0003',
			TypeEvenement: 'Libération Conditionnelle',
			Raison: null,
			DossierEnquete: null,
			Cour: 'Cours du Québec',
			NoCour: '500-01-310-35719-654',
			NatureCrime: 'Tentative de meurtre',
			LieuDetention: 'Prison de Port-Cartier',
			FinSentence: '2022-09-19T00:00:00.000Z',
			VuDerniereFois: null,
			Agent: 'Benoit Ducharme',
			Poste: null,
			IdIPPE: 41,
			Libelle: 'Aucune consommation d alcool ou de drogue non prescrite'
		}
	];

	const LibCond = await reqKnex.IPPEDisp(requeteInfo, fpsInfo);

	expect(LibCond).toEqual(resultat);

});

test('Réponse ***Disparu*** avec la fonction affichage', async () => {
	//requete non filtrer pour test de la fonction
	let requeteInfo =
	[
		{
			Id: [ 44, 42, null ],
			NomFamille: 'Amoussougbo',
			Prenom1: 'Yaken',
			Prenom2: null,
			Masculin: true,
			DateNaissance: '2000-01-14T00:00:00.000Z',
			Telephone: null,
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: 'Noir',
			Taille: 175,
			Poids: 75,
			Yeux: 'Noir',
			Cheveux: 'Noir',
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: true,
			Suicidaire: null,
			Violent: null,
			Gilet: 'T-shit vert',
			Pantalon: 'Jeans bleu',
			AutreVetement: 'Espadrille fluo',
			IdPersonne: 44,
			NoEvenement: '302-220208-0016',
			TypeEvenement: 'Disparu',
			Raison: 'Disparition',
			DossierEnquete: null,
			Cour: null,
			NoCour: null,
			NatureCrime: null,
			LieuDetention: null,
			FinSentence: null,
			VuDerniereFois: '3546 boul. De la Concorde Est, Laval',
			Agent: null,
			Poste: null,
			IdIPPE: null,
			Libelle: null
		}
	];

	////resultat filtrer pour etre envoyer au client    
	const resultat = [
		{
			titre: 'Disparu',
			noEvenement: '302-220208-0016',
			motif: 'Disparition',
			derniereVu: '3546 boul. De la Concorde Est, Laval',
			descrPhys: {
				race: 'Noir',
				taille: 175,
				poids: 75,
				yeux: 'Noir',
				cheveux: 'Noir',
				marques: null
			},
			descrVest: {
				gilet: 'T-shit vert',
				pantalon: 'Jeans bleu',
				autreVetements: 'Espadrille fluo'
			},
			problemeSante: {
				toxicomanie: null,
				desorganise: null,
				depressif: true,
				suicidaire: null,
				violent: null
			}
		}
	];
	const disp = await reqKnex.IPPEDisp(requeteInfo);

	expect(disp).toEqual(resultat);

});

test('Réponse ***Interdit*** avec la fonction affichage', async () => {
	//requete non filtrer pour test de la fonction
	const requeteInfo = [
		{
			Id: [ 45, 43, null ],
			NomFamille: 'Lemire',
			Prenom1: 'Jessy',
			Prenom2: null,
			Masculin: false,
			DateNaissance: '1985-10-28T00:00:00.000Z',
			Telephone: null,
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			IdPersonne: 45,
			NoEvenement: '123-201225-0016',
			TypeEvenement: 'Interdit',
			Raison: 'Conduite de véhicule',
			DossierEnquete: null,
			Cour: 'Municipale de Montréal',
			NoCour: 'CM-MTL-16794-356',
			NatureCrime: 'Capacité de conduire affaiblie',
			LieuDetention: null,
			FinSentence: '2022-10-29T00:00:00.000Z',
			VuDerniereFois: null,
			Agent: null,
			Poste: null,
			IdIPPE: null,
			Libelle: null
		}
	];
	////resultat filtrer pour etre envoyer au client
	const resultat = [
		{
			titre: 'Interdit',
			nature: 'Conduite de véhicule',
			cour: 'Municipale de Montréal',
			numCour: 'CM-MTL-16794-356',
			natureCrime: 'Capacité de conduire affaiblie',
			noEvenement: '123-201225-0016',
			expiration: '2022-10-29T00:00:00.000Z'
		}
	];
	const interdit = await reqKnex.IPPEDisp(requeteInfo);

	expect(interdit).toEqual(resultat);

});


test('Réponse ***FPS*** avec la fonction affichage', async () => {
	//requete non filtrer pour test de la fonction
	let requeteInfo = [
		{
			Id: 2,
			IdPersonne: 43,
			NoFPS: '438761F',
			DateMesure: '2020-02-25T00:00:00.000Z',
			CD: 'W08,W03,W08,W08,W07,W07,W01,W06,W03,U08',
			Antecedents: 'Tentative de meurtre',
			Violent: true,
			Echappe: null,
			Suicidaire: null,
			Desequilibre: null,
			Contagieux: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null
		}
	];
	////resultat filtrer pour etre envoyer au client
	const resultat = [{
		titre: 'FPS',
		NoFPS: '438761F',
		DateMesure: '2020-02-25T00:00:00.000Z',
		CD: 'W08,W03,W08,W08,W07,W07,W01,W06,W03,U08',
		Antecedents: 'Tentative de meurtre',
		Violent: true,
		Echappe: null,
		Suicidaire: null,
		Desequilibre: null,
		Contagieux: null,
		Race: null,
		Taille: null,
		Poids: null,
		Yeux: null,
		Cheveux: null,
		Marques: null,
		Toxicomanie: null,
		Desorganise: null,
		Depressif: null
	}];
	const FPS = reqKnex.FPSDisp(requeteInfo);

	expect(FPS).toEqual(resultat);

});
