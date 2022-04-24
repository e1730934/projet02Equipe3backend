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

test('suppresionIBAFByNoSerie dans database', async () => {
    await reqKnex.ajoutIBAF('Test', 'Test', 'Test', 'Test', '123456789123456');
    await reqKnex.suppresionIBAFByNoSerie('Test');
    const expectedResult = [];
    const result = await reqKnex.getIBAFByNoSerie('Test');
    expect(expectedResult).toEqual(result);
});

test('ajoutIBAF dans database', async () => {
    await reqKnex.ajoutIBAF('Test', 'Test', '9999999999', 'Test', '123456789123456');
    const expectedResult = [{
        NoSerie: 'Test',
        Marque: 'Test',
        Calibre: '9999999999',
        TypeArme: 'Test',
        NoEvenement: '123456789123456',
    }];
    const result = await reqKnex.getIBAFByNoSerie('Test');
    await reqKnex.suppresionIBAFByNoSerie('Test');
    expect(expectedResult).toEqual(result);
});

test('modificationIBAF dans database', async () => {
    await reqKnex.ajoutIBAF('Test', 'Tes', '9999999998', 'Tes', '99999999999999');
    await reqKnex.modificationIBAFByNoSerie('Test', 'Test', '9999999999', 'Test', '123456789123456');
    const expectedResult = [{
        NoSerie: 'Test',
        Marque: 'Test',
        Calibre: '9999999999',
        TypeArme: 'Test',
        NoEvenement: '123456789123456',
    }];
    const result = await reqKnex.getIBAFByNoSerie('Test');
    await reqKnex.suppresionIBAFByNoSerie('Test');
    expect(expectedResult).toEqual(result);
});

test('suppresionIBVAByIdentifiant dans database', async () => {
    await reqKnex.ajoutIBVA('Test', 'Test', 'Test', 'Test', '123456');
    await reqKnex.suppresionIBVAByIdentifiant('Test');
    const expectedResult = [];
    const result = await reqKnex.getIBVAbyIdentifiant('Test');
    expect(expectedResult).toEqual(result);
});

test('ajoutIBVA dans database', async () => {
    await reqKnex.ajoutIBVA('Testt', 'Testt', 'Testt', 'Testt', '123456789123456');
    const expectedResult = [{
        Identifiant: 'Testt',
        Auteur: 'Testt',
        TypeValeur: 'Testt',
        TypeEvenement: 'Testt',
        NoEvenement: '123456789123456',
    }];
    const result = await reqKnex.getIBVAbyIdentifiant('Testt');
    await reqKnex.suppresionIBVAByIdentifiant('Testt');
    expect(expectedResult).toEqual(result);
});

test('modificationIBVA dans database', async () => {
    await reqKnex.ajoutIBVA('Test', 'Tes', 'Tes', 'Tes', '123456789123456');
    await reqKnex.modificationIBVAByIdentifiant('Test', 'Test', 'Test', 'Test', '123456789123457');
    const expectedResult = [{
        Identifiant: 'Test',
        Auteur: 'Test',
        TypeValeur: 'Test',
        TypeEvenement: 'Test',
        NoEvenement: '123456789123457',

    }];
    const result = await reqKnex.getIBVAbyIdentifiant('Test');
    await reqKnex.suppresionIBVAByIdentifiant('Test');
    expect(expectedResult).toEqual(result);
});

test('get IBOB by id dans database', async () => {
    const expectedResult = [{
        Marque: 'LG',
        Modele: '32LB5600-UZ',
        NoEvenement: '123-220301-0007',
        NoSerie: '410MXBPVF637',
        TypeObjet: 'RA',
    }];
    const result = await reqKnex.getIBOBbyId(1);
    expect(expectedResult).toEqual(result);
});

test('get IBVA by id dans database', async () => {
    const expectedResult = [{
        Identifiant: '628181-4249-96708',
        Auteur: 'MASTERCARD',
        TypeValeur: 'Carte de crédit / débit',
        TypeEvenement: 'Perdu',
        NoEvenement: '123-220301-0007',
    }];
    const result = await reqKnex.getIBVAbyId(5);
    expect(expectedResult).toEqual(result);
});

test('get IBAF by id dans database', async () => {
    const expectedResult = [{
        NoSerie: '1597538',
        Marque: 'SMITH & WESSON',
        Calibre: '357       ',
        TypeArme: 'Révolver',
        NoEvenement: '108-220304-0006',
    }];
    const result = await reqKnex.getIBAFById(1);
    expect(expectedResult).toEqual(result);
});
