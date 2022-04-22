const reqKnex = require('./ippes');

test('Réponse ***RECHERCHÉ***', async () => {
    jest.setTimeout(10000);
    const expected = [{
        idIPPE: 8,
        noEvenement: '108-220208-0031',
        typeEvenement: 'Recherché',
        mandat: 'Arrestation',
        motif: null,
        nature: 'Agression armée',
        dossierEnquete: null,
        cour: 'Municipale de Longueuil',
        noMandat: 'CM-LGL-A-26840',
        noCause: null,
        idNatureCrime: null,
        lieuDetention: null,
        finSentence: null,
        vuDerniereFois: null,
        agentProbation: null,
        agentLiberation: null,
        telephone: null,
        poste: null,
        conditions: [],

        idPersonne: 3,
        nomFamille: 'Ducharme',
        prenom1: 'Benoit',
        prenom2: null,
        masculin: true,
        dateNaissance: new Date('1975-08-31'),

    }];
    const result = await reqKnex.getIPPE(
        expected[0].nomFamille,
        expected[0].prenom1,
        expected[0].prenom2,
        expected[0].masculin,
        expected[0].dateNaissance,
    );

    expect(result[0].IPPE).toEqual(expected);
});
