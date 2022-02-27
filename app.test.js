const ex = require('./app.js');

test('Réponse ***RECHERCHÉ***', async () => {

    const resultat = {
    nomFamille : 'Ducharme',
    prenom1 : 'Benoit',
    prenom2 : null,
    masculin : true,
    dateNaissance : new Date('1975-08-31'),
    mandat: 'Arrestation',
    cour: 'Municipale de Longueuil',
    noMandat: 'CM-LGL-A-26840',
    natureCrime: 'Agression armée',
    noEvenement: '108-220208-0031'
    }
    const ippe = await requeteKnex.getIPPE(resultat.nomFamille, resultat.prenom1, resultat.prenom2, resultat.masculin, resultat.dateNaissance);

    expect(ippe).toEqual(resultat);

    });

test('Réponse ***Sous-observation***', async () => {

    const resultat = {
    nomFamille : 'Ducharme',
    prenom1 : 'Benoit',
    prenom2 : null,
    masculin : true,
    dateNaissance : new Date('1975-08-31'),
    mandat: 'Arrestation',
    cour: 'Municipale de Longueuil',
    noMandat: 'CM-LGL-A-26840',
    natureCrime: 'Agression armée',
    noEvenement: '108-220208-0031'
    }
    const ippe = await requeteKnex.getIPPE(resultat.nomFamille, resultat.prenom1, resultat.prenom2, resultat.masculin, resultat.dateNaissance);

    expect(ippe).toEqual(resultat);

    });

test('Réponse ***Accusé***', async () => {

    const resultat = {
    nomFamille : 'Ducharme',
    prenom1 : 'Benoit',
    prenom2 : null,
    masculin : true,
    dateNaissance : new Date('1975-08-31'),
    mandat: 'Arrestation',
    cour: 'Municipale de Longueuil',
    noMandat: 'CM-LGL-A-26840',
    natureCrime: 'Agression armée',
    noEvenement: '108-220208-0031'
    }
    const ippe = await requeteKnex.getIPPE(resultat.nomFamille, resultat.prenom1, resultat.prenom2, resultat.masculin, resultat.dateNaissance);

    expect(ippe).toEqual(resultat);

    });

test('Réponse ***Probation***', async () => {

    const resultat = {
    nomFamille : 'Ducharme',
    prenom1 : 'Benoit',
    prenom2 : null,
    masculin : true,
    dateNaissance : new Date('1975-08-31'),
    mandat: 'Arrestation',
    cour: 'Municipale de Longueuil',
    noMandat: 'CM-LGL-A-26840',
    natureCrime: 'Agression armée',
    noEvenement: '108-220208-0031'
    }
    const ippe = await requeteKnex.getIPPE(resultat.nomFamille, resultat.prenom1, resultat.prenom2, resultat.masculin, resultat.dateNaissance);

    expect(ippe).toEqual(resultat);

    });

test('Réponse ***Libération Conditionnelle***', async () => {

    const resultat = {
    nomFamille : 'Ducharme',
    prenom1 : 'Benoit',
    prenom2 : null,
    masculin : true,
    dateNaissance : new Date('1975-08-31'),
    mandat: 'Arrestation',
    cour: 'Municipale de Longueuil',
    noMandat: 'CM-LGL-A-26840',
    natureCrime: 'Agression armée',
    noEvenement: '108-220208-0031'
    }
    const ippe = await requeteKnex.getIPPE(resultat.nomFamille, resultat.prenom1, resultat.prenom2, resultat.masculin, resultat.dateNaissance);

    expect(ippe).toEqual(resultat);

    });

test('Réponse ***Disparu***', async () => {

    const resultat = {
    nomFamille : 'Ducharme',
    prenom1 : 'Benoit',
    prenom2 : null,
    masculin : true,
    dateNaissance : new Date('1975-08-31'),
    mandat: 'Arrestation',
    cour: 'Municipale de Longueuil',
    noMandat: 'CM-LGL-A-26840',
    natureCrime: 'Agression armée',
    noEvenement: '108-220208-0031'
    }
    const ippe = await requeteKnex.getIPPE(resultat.nomFamille, resultat.prenom1, resultat.prenom2, resultat.masculin, resultat.dateNaissance);

    expect(ippe).toEqual(resultat);

    });

test('Réponse ***Interdit***', async () => {

    const resultat = {
    nomFamille : 'Ducharme',
    prenom1 : 'Benoit',
    prenom2 : null,
    masculin : true,
    dateNaissance : new Date('1975-08-31'),
    mandat: 'Arrestation',
    cour: 'Municipale de Longueuil',
    noMandat: 'CM-LGL-A-26840',
    natureCrime: 'Agression armée',
    noEvenement: '108-220208-0031'
    }
    const ippe = await requeteKnex.getIPPE(resultat.nomFamille, resultat.prenom1, resultat.prenom2, resultat.masculin, resultat.dateNaissance);

    expect(ippe).toEqual(resultat);

    });


test('Réponse ***FPS***', async () => {

    const resultat = {
    nomFamille : 'Ducharme',
    prenom1 : 'Benoit',
    prenom2 : null,
    masculin : true,
    dateNaissance : new Date('1975-08-31'),
    mandat: 'Arrestation',
    cour: 'Municipale de Longueuil',
    noMandat: 'CM-LGL-A-26840',
    natureCrime: 'Agression armée',
    noEvenement: '108-220208-0031'
    }
    const ippe = await requeteKnex.getIPPE(resultat.nomFamille, resultat.prenom1, resultat.prenom2, resultat.masculin, resultat.dateNaissance);

    expect(ippe).toEqual(resultat);

        });
    