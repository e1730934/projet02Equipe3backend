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
