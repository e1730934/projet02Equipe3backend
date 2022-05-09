const { TestWatcher } = require('jest');
const reqKnex = require('./ippes');
const reqKnexArme = require('./armes');
const reqKnexObjet = require('./objets');
const reqKnexValeur = require('./valeurs');

// test('Réponse ***RECHERCHÉ***', async () => {
//     jest.setTimeout(10000);
//     const expected = [{
//         idIPPE: 8,
//         noEvenement: '108-220208-0031',
//         typeEvenement: 'Recherché',
//         mandat: 'Arrestation',
//         motif: null,
//         nature: null,
//         dossierEnquete: undefined,
//         cour: 'Municipale de Longueuil',
//         noMandat: 'CM-LGL-A-26840',
//         noCause: null,
//         idNatureCrime: undefined,
//         lieuDetention: null,
//         finSentence: null,
//         vuDerniereFois: null,
//         agentProbation: null,
//         agentLiberation: null,
//         telephone: null,
//         poste: null,
//         conditions: [],
//         idPersonne: 3,
//         nomFamille: 'Ducharme',
//         prenom1: 'Benoit',
//         prenom2: null,
//         masculin: true,
//         dateNaissance: new Date('1975-08-31T00:00:00.000Z'),

//     }];
//     const result = await reqKnex.getIPPE(
//         expected[0].nomFamille,
//         expected[0].prenom1,
//         expected[0].prenom2,
//         expected[0].masculin,
//         expected[0].dateNaissance,
//     );

//     expect(result[0].IPPE).toEqual(expected);
// });

test('get IBOB by id dans database', async () => {
    const expectedResult = [{
        Marque: 'LG',
        Modele: '32LB5600-UZ',
        NoEvenement: '123-220301-0007',
        NoSerie: '410MXBPVF637',
        TypeObjet: 'RA',
    }];
    const result = await reqKnexObjet.getIBOBbyId(1);
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
    const result = await reqKnexValeur.getIBVAbyId(5);
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
    const result = await reqKnexArme.getIBAFById(1);
    expect(expectedResult).toEqual(result);
});

test('ajoutIBAF dans database', async () => {
    await reqKnexArme.ajoutIBAF('Test', 'Test', '9999999999', 'Test', '123456789123456');
    const expectedResult = [{
        NoSerie: 'Test',
        Marque: 'Test',
        Calibre: '9999999999',
        TypeArme: 'Test',
        NoEvenement: '123456789123456',
    }];
    const IBAF = await reqKnexArme.getIBAFByNoSerie('Test');
    const idIBAF = IBAF[0].IdIBAF;
    const result = await reqKnexArme.getIBAFById(idIBAF);
    await reqKnexArme.suppresionIBAFById(idIBAF);
    expect(expectedResult).toEqual(result);
});

test('modificationIBAF dans database', async () => {
    await reqKnexArme.ajoutIBAF('Test', 'Tes', '9999999998', 'Tes', '99999999999999');
    const IBAF = await reqKnexArme.getIBAFByNoSerie('Test');
    const idIBAF = IBAF[0].IdIBAF;
    await reqKnexArme.modificationIBAF(idIBAF, 'Test', 'Test', '9999999999', 'Test', '123456789123456');
    const expectedResult = [{
        NoSerie: 'Test',
        Marque: 'Test',
        Calibre: '9999999999',
        TypeArme: 'Test',
        NoEvenement: '123456789123456',
    }];
    const result = await reqKnexArme.getIBAFById(idIBAF);
    await reqKnexArme.suppresionIBAFById(idIBAF);
    expect(expectedResult).toEqual(result);
});

test('ajoutIBVA dans database', async () => {
    await reqKnexValeur.ajoutIBVA('Testt', 'Testt', 'Testt', 'Testt', '123456789123456');
    const expectedResult = [{
        Identifiant: 'Testt',
        Auteur: 'Testt',
        TypeValeur: 'Testt',
        TypeEvenement: 'Testt',
        NoEvenement: '123456789123456',
    }];
    const IBVA = await reqKnexValeur.getIBVAbyIdentifiant('Testt');
    const idIBVA = IBVA[0].IdIBVA;
    const result = await reqKnexValeur.getIBVAbyId(idIBVA);
    await reqKnexValeur.suppresionIBVAById(idIBVA);
    expect(expectedResult).toEqual(result);
});

test('modificationIBVA dans database', async () => {
    await reqKnexValeur.ajoutIBVA('Test', 'Tes', 'Tes', 'Tes', '123456789123456');
    const IBVA = await reqKnexValeur.getIBVAbyIdentifiant('Test');
    const idIBVA = IBVA[0].IdIBVA;
    await reqKnexValeur.modificationIBVA(idIBVA, 'Test', 'Test', 'Test', 'Test', '123456789123457');
    const expectedResult = [{
        Identifiant: 'Test',
        Auteur: 'Test',
        TypeValeur: 'Test',
        TypeEvenement: 'Test',
        NoEvenement: '123456789123457',

    }];
    const result = await reqKnexValeur.getIBVAbyId(idIBVA);
    await reqKnexValeur.suppresionIBVAById(idIBVA);
    expect(expectedResult).toEqual(result);
});

test('ajoutIBOB dans database', async () => {
    await reqKnexObjet.ajoutIBOB('Testt', 'Testt', 'Testt', 'Testt', '123456789123456');
    const expectedResult = [{
        NoSerie: 'Testt',
        Marque: 'Testt',
        Modele: 'Testt',
        TypeObjet: 'Testt',
        NoEvenement: '123456789123456',
    }];
    const IBOB = await reqKnexObjet.getIBOBbyNoSerie('Testt');
    const idIBOB = IBOB[0].IdBOB;
    const result = await reqKnexObjet.getIBOBbyId(idIBOB);
    await reqKnexObjet.suppresionIBOById(idIBOB);
    expect(expectedResult).toEqual(result);
});

test('modificationIBOB dans database', async () => {
    await reqKnexObjet.ajoutIBOB('Test', 'Tes', 'Tes', 'Tes', '123456789123456');
    const IBOB = await reqKnexObjet.getIBOBbyNoSerie('Test');
    const idIBOB = IBOB[0].IdBOB;
    await reqKnexObjet.modificationIBOB(idIBOB, 'Test', 'Test', 'Test', 'Test', '123456789123457');
    const expectedResult = [{
        NoSerie: 'Test',
        Marque: 'Test',
        Modele: 'Test',
        TypeObjet: 'Test',
        NoEvenement: '123456789123457',

    }];
    const result = await reqKnexObjet.getIBOBbyId(idIBOB);
    await reqKnexObjet.suppresionIBOById(idIBOB);
    expect(expectedResult).toEqual(result);
});
