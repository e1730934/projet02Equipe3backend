const reqKnex = require('./requetesKnex');

test('Réponse IPPE', async () => {
    const resultat = [{
        Adresse1: null,
        Adresse2: null,
        AutreVetement: null,
        Cheveux: null,
        CodePostal: null,
        DateNaissance: new Date('1975-08-31T00:00:00.000Z'),
        Depressif: null,
        Desorganise: null,
        FPS: null,
        Gilet: null,
        IPPE: [
            {
                agentLiberation: null,
                agentProbation: null,
                conditions: [],
                cour: 'Municipale de Longueuil',
                dossierEnquête: null,
                finSentence: null,
                idIPPE: 8,
                idNatureCrime: 14,
                lieuDetention: null,
                mandat: 'Arrestation',
                motif: null,
                nature: null,
                noCause: null,
                noEvenement: '108-220208-0031',
                noMandat: 'CM-LGL-A-26840',
                poste: null,
                telephone: null,
                typeEvenement: 'Recherché',
                vuDerniereFois: null,
            },
        ],
        IdPersonne: 3,
        Marques: null,
        Masculin: true,
        NoPermis: null,
        NomFamille: 'Ducharme',
        Pantalon: null,
        Poids: null,
        Prenom1: 'Benoit',
        Prenom2: null,
        Province: null,
        Race: null,
        Suicidaire: null,
        Taille: null,
        Telephone: null,
        Toxicomanie: null,
        TypePersonne: 'Enseignant',
        Ville: null,
        Violent: null,
        Yeux: null,
    }];
    const ippe = await reqKnex.getIPPE(
        resultat[0].NomFamille,
        resultat[0].Prenom1,
        resultat[0].Prenom2,
        resultat[0].Masculin,
        resultat[0].DateNaissance,
    );

    expect(ippe).toEqual(resultat);
});
test('RequêteKnex FPS', async () => {
    // Arrange les resultat qui sortirons avant d'etre trier
    const resultat = [{
        Antecedents: 'Voie de fait',
        CD: 'W01',
        Contagieux: null,
        DateMesure: new Date('2020-01-01T00:00:00.000Z'),
        Desequilibre: null,
        Echappe: null,
        IdFPS: 4,
        IdPersonne: 7,
        NoFPS: '438761F',
        Suicidaire: null,
        Violent: null,

    },
    ];
    const fps = await reqKnex.getFPS(resultat[0].IdPersonne);
    // Assert
    expect(fps).toEqual(resultat);
});

test('RequêteKnex, verification connection concluante', async () => {
    // Arrange les infos fournis par le client
    const identifiant = 'e1233772';
    const password = 'bonjour';
    // reultat retourner temporaire jusqu'aux temps d'instoration du token
    const resultat = [{
        Etudiant: true,
        IdUtilisateur: 1,
        Identifiant: 'e1233772',
        MotDePasse: 'bonjour',
        NomFamille: 'Aganier',
    }];

    const conn = await reqKnex.connexion(identifiant, password);

    // Assert
    expect(conn).toEqual(resultat);
});
test('RequêteKnex, verification connection sans mot de passe valide', async () => {
    // Arrange les infos fournis par le client
    const identifiant = 'e1233772';
    const password = null;

    const resultatError = [];

    const connErrorPwd = await reqKnex.connexion(identifiant, password);

    // Assert
    expect(connErrorPwd).toEqual(resultatError);
});

test('RequêteKnex, verification connection sans User et Password valide', async () => {
    // Arrange les infos fournis par le client
    const identifiant = null;
    const password = null;

    const resultatError = [];

    const connEmpty = await reqKnex.connexion(identifiant, password);

    // Assert
    expect(connEmpty).toEqual(resultatError);
});

test('RequêteKnex, verification connection sans utilisateur valide', async () => {
    // Arrange les infos fournis par le client
    const identifiant = null;
    const password = 'bonjour';

    const resultatError = [];

    const connErrorUser = await reqKnex.connexion(identifiant, password);

    // Assert
    expect(connErrorUser).toEqual(resultatError);
});

test('RequêteKnex, voir une personne de la base de donnée', async () => {
    const IdPersonne = 4;

    const resultat = [{
        IdPersonne: 4,
        TypePersonne: 'Personnage',
        NomFamille: 'Sirois',
        Prenom1: 'Danielle',
        Prenom2: null,
        Masculin: false,
        DateNaissance: new Date('1980-02-14T00:00:00.000Z'),
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
    }];

    const voirPersonne = await reqKnex.getPersonne(
        IdPersonne,
    );

    expect(voirPersonne).toEqual(resultat);
});

test('RequêteKnex, ajout de personne dans la base de donnée', async () => {
    const TypePersonne = 'Enseignant';
    const NomFamille = 'Knex';
    const Prenom1 = 'Test';
    const Prenom2 = null;
    const Masculin = 0;
    const DateNaissance = '20100504';

    const creationPersonne = await reqKnex.postPersonne(
        TypePersonne,
        NomFamille,
        Prenom1,
        Prenom2,
        Masculin,
        DateNaissance,
    );

    expect(creationPersonne).toHaveLength(1);
});

test('RequêteKnex, modification de personne dans la base de donnée', async () => {
    const IdPersonne = 66;
    const TypePersonne = 'Enseignant';
    const NomFamille = 'Knex';
    const Prenom1 = 'Test';
    const Prenom2 = 'modification';
    const Masculin = false;
    const DateNaissance = new Date('2010-05-04T00:00:00.000Z');

    await reqKnex.putPersonne(
        IdPersonne,
        TypePersonne,
        NomFamille,
        Prenom1,
        Prenom2,
        Masculin,
        DateNaissance,
    );

    const allezChercherLaPersonneModifiee = await reqKnex.getPersonne(IdPersonne);

    expect(allezChercherLaPersonneModifiee[0].IdPersonne).toEqual(IdPersonne);
    expect(allezChercherLaPersonneModifiee[0].TypePersonne).toEqual(TypePersonne);
    expect(allezChercherLaPersonneModifiee[0].NomFamille).toEqual(NomFamille);
    expect(allezChercherLaPersonneModifiee[0].Prenom1).toEqual(Prenom1);
    expect(allezChercherLaPersonneModifiee[0].Prenom2).toEqual(Prenom2);
    expect(allezChercherLaPersonneModifiee[0].Masculin).toEqual(Masculin);
    expect(allezChercherLaPersonneModifiee[0].DateNaissance).toEqual(DateNaissance);
});

test('RequêteKnex, suppression de personne dans la base de donnée', async () => {
    const IdPersonne = 65;

    await reqKnex.deletePersonne(IdPersonne);

    const allezChercherLaPersonneSupprime = await reqKnex.getPersonne(IdPersonne);

    expect(allezChercherLaPersonneSupprime).toHaveLength(0);
});
