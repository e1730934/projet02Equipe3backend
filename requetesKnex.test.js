const reqKnex = require('./requetesKnex');

test('Réponse ***RECHERCHÉ***', async () => {
    const resultat = [{
        idPersonne: 3,
        idIPPE: 8,
        nomFamille: 'Ducharme',
        prenom1: 'Benoit',
        prenom2: null,
        masculin: true,
        dateNaissance: new Date('1975-08-31'),
        mandat: 'Arrestation',
        cour: 'Municipale de Longueuil',
        noMandat: 'CM-LGL-A-26840',
        natureCrime: 'Agression armée',
        noEvenement: '108-220208-0031',
    }];
    const ippe = await reqKnex.getIPPE(
        resultat[0].nomFamille,
        resultat[0].prenom1,
        resultat[0].prenom2,
        resultat[0].masculin,
        resultat[0].dateNaissance,
    );

    expect(ippe).toEqual(resultat);
});
