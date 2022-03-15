const reqKnex = require('./requetesKnex');

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
//     const ippe = await reqKnex.getIPPE(resultat[0].nomFamille, resultat[0].prenom1, resultat[0].prenom2, resultat[0].masculin, resultat[0].dateNaissance);
//
//     expect(ippe).toEqual(resultat);
// });
test('suppresionIBOBByNoSerie dans database', async () => {
    await reqKnex.ajoutIBOB('Test', 'Test', 'Test', 'Test', 'Test', '123456789123456');
    await reqKnex.suppresionIBOBByNoSerie('Test');
    const expectedResult = [];
    const result = await reqKnex.getIBOBbyNoSerie('Test');
    expect(expectedResult).toEqual(result);
});

test('ajoutIBOB dans database', async () => {
    await reqKnex.ajoutIBOB('Test', 'Test', 'Test', 'Test', 'Test', '123456789123456');
    const expectedResult = [{
        NoSerie: 'Test',
        Marque: 'Test',
        Modele: 'Test',
        TypeObjet: 'Test',
        TypeEvenement: 'Test',
        NoEvenement: '123456789123456',

    }];
    const result = await reqKnex.getIBOBbyNoSerie('Test');
    await reqKnex.suppresionIBOBByNoSerie('Test');
    expect(expectedResult).toEqual(result);
});

test('modificationIBOB dans database', async () => {
    await reqKnex.ajoutIBOB('Test', 'Tes', 'Tes', 'Tes', 'Tes', '99999999999999');
    await reqKnex.modificationIBOB('Test', 'Test', 'Test', 'Test', 'Test', '123456789123456');
    const expectedResult = [{
        NoSerie: 'Test',
        Marque: 'Test',
        Modele: 'Test',
        TypeObjet: 'Test',
        TypeEvenement: 'Test',
        NoEvenement: '123456789123456',

    }];
    const result = await reqKnex.getIBOBbyNoSerie('Test');
    await reqKnex.suppresionIBOBByNoSerie('Test');
    expect(expectedResult).toEqual(result);
});

test('suppresionIBAFByNoSerie dans database', async () => {
    await reqKnex.ajoutIBAF('Test', 'Test', 'Test', 'Test', 'Test', '123456789123456');
    await reqKnex.suppresionIBAFByNoSerie('Test');
    const expectedResult = [];
    const result = await reqKnex.getIBAFByNoSerie('Test');
    expect(expectedResult).toEqual(result);
});

test('ajoutIBAF dans database', async () => {
    await reqKnex.ajoutIBAF('Test', 'Test', '9999999999', 'Test', 'Test', '123456789123456');
    const expectedResult = [{
        NoSerie: 'Test',
        Marque: 'Test',
        Calibre: '9999999999',
        TypeArme: 'Test',
        TypeEvenement: 'Test',
        NoEvenement: '123456789123456',
    }];
    const result = await reqKnex.getIBAFByNoSerie('Test');
    await reqKnex.suppresionIBAFByNoSerie('Test');
    expect(expectedResult).toEqual(result);
});

test('modificationIBAF dans database', async () => {
    await reqKnex.ajoutIBAF('Test', 'Tes', '9999999998', 'Tes', 'Tes', '99999999999999');
    await reqKnex.modificationIBAF('Test', 'Test', '9999999999', 'Test', 'Test', '123456789123456');
    const expectedResult = [{
        NoSerie: 'Test',
        Marque: 'Test',
        Calibre: '9999999999',
        TypeArme: 'Test',
        TypeEvenement: 'Test',
        NoEvenement: '123456789123456',
    }];
    const result = await reqKnex.getIBAFByNoSerie('Test');
    await reqKnex.suppresionIBAFByNoSerie('Test');
    expect(expectedResult).toEqual(result);
});
