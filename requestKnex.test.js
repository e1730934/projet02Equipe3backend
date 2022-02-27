const reqKnex = require('./requestKnex.js');

test('RequêteKnex IPPE', async () => {
    // Arrange
    const resultat = [{
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
      }
    ]
      const ippe = await reqKnex.ippeData(resultat[0].NomFamille, 
        resultat[0].Prenom1, 
        resultat[0].Prenom2, 
        resultat[0].Masculin, 
        resultat[0].DateNaissance);
      // Assert
      expect(ippe).toEqual(resultat);
    
    });

test('RequêteKnex FPS', async () => {
    // Arrange
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
        }]
        const fps = await reqKnex.dataFPS(resultat[0].IdPersonne);
        // Assert
        expect(fps).toEqual(resultat);
    
    });

test('RequêteKnex, verification connection coconcluante ', async () => {
    // Arrange
	let loginInfo = {
		'username': 1234,
		'password': 'etud'
	};

    let resultat = [{
        Id: 1,
        Identifiant: '1234',
        MotDePasse: 'etud',
        Etudiant: true,
        NomFamille: 'etudiant'
    }]



    const conn = await reqKnex.connectionCheck(loginInfo);

    // Assert
    expect(conn).toEqual(resultat);
    
});

test('RequêteKnex, verification connection sans mot de passe valide', async () => {
    // Arrange
    let loginErrorPwd = {
		'username': 1234,
		'password': null
	};

    let resultatError = []

    const connErrorPwd = await reqKnex.connectionCheck(loginErrorPwd)

    // Assert
    expect(connErrorPwd).toEqual(resultatError);
     
});

test('RequêteKnex, verification connection sans User et Password valide ', async () => {
    // Arrange
    let loginEmpty = {
		'username': null,
		'password': null
	};

    let resultatError = []

    const connEmpty = await reqKnex.connectionCheck(loginEmpty) 

    // Assert
    expect(connEmpty).toEqual(resultatError);
    
});

test('RequêteKnex, verification connection sans utilisateur valide ', async () => {
    // Arrange
    let loginErrorUser = {
		'username': null,
		'password': 'etud'
	};

    let resultatError = []

    const connErrorUser = await reqKnex.connectionCheck(loginErrorUser)

    // Assert
    expect(connErrorUser).toEqual(resultatError);
    
});


