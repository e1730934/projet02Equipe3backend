const reqKnex = require('./requetesKnex');

test('connexion étudiant', async () => {
    const resultat = [{
        identifiant: 'e1233772',
        motDePasse: 'bonjour'
    }];
    const connect = await reqKnex.connexion(
        resultat[0].identifiant,
        resultat[0].motDePasse
    );
    expect(connect).toContain(resultat);
})

test('get fps', async () => {
    const resultat = [{
        idFPS : 4,
        idPersonne: 7,
        noFPS: '438761F',
        dateMesure: '2020-01-01',
        CD: 'W01',
        antecedents: 'Voie de fait',
        violent: null,
        echappe: null,
        suicidaire: null,
        desequilibre: null,
        contagieux: null
    }];
    const fps = await reqKnex.getFPS(
        resultat.idFPS,
        resultat.idPersonne,
        resultat.noFPS,
        resultat.dateMesure,
        resultat.CD,
        resultat.antecedents,
        resultat.violent,
        resultat.echappe,
        resultat.suicidaire,
        resultat.desequilibre,
        resultat.contagieux
    );
    expect(fps).toContain(resultat);
})

/*test('Réponse ***RECHERCHÉ***', async () => {
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
});*/

test('Ajouter personne', async () => {
    const resultat = [{
        typePersonne: 'Enseignant',
        nomFamille: 'Ajout',
        prenom1: 'Personne',
        prenom2: 'Test',
        masculin: false,
        dateNaissance: new Date('2001-09-15'),
    }];
    const ajout = await reqKnex.postPersonne(
        resultat[0].typePersonne,
        resultat[0].nomFamille,
        resultat[0].prenom1,
        resultat[0].prenom2,
        resultat[0].masculin,
        resultat[0].dateNaissance,
    );

    expect(ajout).toEqual(resultat);
})

/*test('modifier personne', async () => {
    const resultat = [{
        typePersonne: 'Enseignant',
        nomFamille: 'modification',
        prenom1: 'Personne',
        prenom2: 'Test',
        masculin: false,
        dateNaissance: new Date('2001-09-15'),
    }];
    const modification = await reqKnex.postPersonne(
        resultat[0].typePersonne,
        resultat[0].nomFamille,
        resultat[0].prenom1,
        resultat[0].prenom2,
        resultat[0].masculin,
        resultat[0].dateNaissance,
    );

    expect(modification).toEqual(resultat);
})*/

