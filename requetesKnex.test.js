const reqKnex = require('./requetesKnex');

test('Réponse ***RECHERCHÉ***', async () => {
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
        Depressif: null,
    }];
    const fps = await reqKnex.FPS(resultat[0].IdPersonne);
    // Assert
    expect(fps).toEqual(resultat);
});
