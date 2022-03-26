const reqKnex = require('./requetesKnex');

// eslint-disable-next-line jest/no-commented-out-tests
// test('Réponse ***RECHERCHÉ***', async () => {
//     const resultat = [{
//         idPersonne: 3,
//         idIPPE: 8,
//         nomFamille: 'Ducharme',
//         prenom1: 'Benoit',
//         prenom2: null,
//         masculin: true,
//         dateNaissance: new Date('1975-08-31'),
//         mandat: 'Arrestation',
//         cour: 'Municipale de Longueuil',
//         noMandat: 'CM-LGL-A-26840',
//         natureCrime: 'Agression armée',
//         noEvenement: '108-220208-0031',
//     }];
//     const ippe = await reqKnex.getIPPE(resultat[0].nomFamille, resultat[0].prenom1,
// resultat[0].prenom2, resultat[0].masculin, resultat[0].dateNaissance);

//     expect(ippe).toEqual(resultat);
// });
test('suppresionIBOBByNoSerie dans database', async () => {
    await reqKnex.ajoutIBOB('Test', 'Test', 'Test', 'Test', '123456789123456');
    await reqKnex.suppresionIBOByNoSerie('Test');
    const expectedResult = [];
    const result = await reqKnex.getIBOBbyNoSerie('Test');
    expect(expectedResult).toEqual(result);
});

test('ajoutIBOB dans database', async () => {
    await reqKnex.ajoutIBOB('Test', 'Test', 'Test', 'Test', '123456789123456');
    const expectedResult = [{
        NoSerie: 'Test',
        Marque: 'Test',
        Modele: 'Test',
        TypeObjet: 'Test',
        NoEvenement: '123456789123456',

    }];
    const result = await reqKnex.getIBOBbyNoSerie('Test');
    await reqKnex.suppresionIBOByNoSerie('Test');
    expect(expectedResult).toEqual(result);
});

test('modificationIBOB dans database', async () => {
    await reqKnex.ajoutIBOB('Test', 'Tes', 'Tes', 'Tes', '99999999999999');
    await reqKnex.modificationIBOB('Test', 'Test', 'Test', 'Test', '123456789123456');
    const expectedResult = [{
        NoSerie: 'Test',
        Marque: 'Test',
        Modele: 'Test',
        TypeObjet: 'Test',
        NoEvenement: '123456789123456',

    }];
    const result = await reqKnex.getIBOBbyNoSerie('Test');
    await reqKnex.suppresionIBOByNoSerie('Test');
    expect(expectedResult).toEqual(result);
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
    await reqKnex.modificationIBAF('Test', 'Test', '9999999999', 'Test', '123456789123456');
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
    await reqKnex.modificationIBVA('Test', 'Test', 'Test', 'Test', '123456789123457');
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
    await reqKnex.getIBOBbyId(5);
    const expectedResult = [{
        NoSerie: '410MXBPVF637',
        Marque: 'LG',
        Modele: '32LB5600-UZ',
        TypeObjet: 'RA',
        NoEvenement: '123-220301-0007',
    }];
    const result = await reqKnex.getIBOBbyNoSerie('410MXBPVF637');
    expect(expectedResult).toEqual(result);
});

test('get IBVA by id dans database', async () => {
    await reqKnex.getIBVAbyId(5);
    const expectedResult = [{
        Identifiant: '628181-4249-96708',
        Auteur: 'MASTERCARD',
        TypeValeur: 'Carte de crédit / débit',
        TypeEvenement: 'Perdu',
        NoEvenement: '123-220301-0007',
    }];
    const result = await reqKnex.getIBVAbyIdentifiant('628181-4249-96708');
    expect(expectedResult).toEqual(result);
});

test('get IBAF by id dans database', async () => {
    await reqKnex.getIBVAbyId(1);
    const expectedResult = [{
        NoSerie: '1597538',
        Marque: 'SMITH & WESSON',
        Calibre: '357       ',
        TypeArme: 'Révolver',
        NoEvenement: '108-220304-0006',
    }];
    const result = await reqKnex.getIBAFByNoSerie('1597538');
    expect(expectedResult).toEqual(result);
});