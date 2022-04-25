const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Permet d'aller chercher une personne dans personne ainsi que son ippe pour l'afficher
function getPersonne(IdPersonne) {
    return knex('Personnes')
        .where('Personnes.IdPersonne', IdPersonne)
        .select('*');
}
// Permet d'ajouter une personne à la base de donnée
function postPersonne(TypePersonne, NomFamille, Prenom1, Prenom2, Masculin, DateNaissance) {
    return knex('Personnes')
        .insert({
            TypePersonne,
            NomFamille,
            Prenom1,
            Prenom2,
            Masculin,
            DateNaissance,
        }, ['IdPersonne'])
        .returning('IdPersonne');
}
// Info necessaire pour le tableau de la page personne
async function getIppePersonne(IdPersonne) {
    const resultat = await knex('IPPE')
        .select('IPPE.*')
        .where('PersonnesIPPE.IdPersonne', IdPersonne)
        .join('PersonnesIPPE', 'IPPE.IdIPPE', 'PersonnesIPPE.IdIPPE')
        .join('Personnes', 'PersonnesIPPE.IdPersonne', 'Personnes.IdPersonne');

    return resultat;
}
// Permet de modifer une personne
async function putPersonne(
    IdPersonne,
    TypePersonne,
    NomFamille,
    Prenom1,
    Prenom2,
    Masculin,
    DateNaissance,
) {
    await knex('Personnes')
        .where('IdPersonne', IdPersonne)
        .update({
            TypePersonne,
            NomFamille,
            Prenom1,
            Prenom2,
            Masculin,
            DateNaissance,
        });
}

// Supprime une personne ainsi que son IPPE et ses Conditions
async function deletePersonne(IdPersonne) {
    const reponseIPPE = await knex('PersonnesIPPE')
        .where('IdPersonne', IdPersonne)
        .select('IdIPPE');

    if (reponseIPPE.length !== 0) {
        reponseIPPE.forEach(async (element) => {
            await knex('FPS')
                .where('IdPersonne', IdPersonne)
                .del();
            await knex('Conditions')
                .where('IdIPPE', element.IdIPPE)
                .del();
            await knex('PersonnesIPPE')
                .where('IdIPPE', element.IdIPPE)
                .del();
            await knex('IPPE')
                .where('IdIPPE', element.IdIPPE)
                .del();
            await knex('FPS')
                .where('IdPersonne', IdPersonne)
                .del();
            await knex('Personnes')
                .where('IdPersonne', IdPersonne)
                .del();
        });
    } else {
        await knex('FPS')
            .where('IdPersonne', IdPersonne)
            .del();
        await knex('Personnes')
            .where('IdPersonne', IdPersonne)
            .del();
    }
}

// Permet de modifer les description d'une personne
async function putDescription(
    IdPersonne,
    telephone,
    noPermis,
    adresseUn,
    adresseDeux,
    ville,
    province,
    CP,
    race,
    taille,
    poids,
    yeux,
    cheveux,
    marques,
    gilet,
    pantalon,
    Autre,
    toxicomanie,
    desorganise,
    suicidaire,
    violent,
    depressif,
) {
    await knex('Personnes')
        .where('IdPersonne', IdPersonne)
        .update({
            Telephone: telephone,
            NoPermis: noPermis,
            Adresse1: adresseUn,
            Adresse2: adresseDeux,
            Ville: ville,
            Province: province,
            CodePostal: CP,
            Race: race,
            Taille: taille,
            Poids: poids,
            Yeux: yeux,
            Cheveux: cheveux,
            Marques: marques,
            Gilet: gilet,
            Pantalon: pantalon,
            AutreVetement: Autre,
            Toxicomanie: toxicomanie,
            Desorganise: desorganise,
            Suicidaire: suicidaire,
            Violent: violent,
            Depressif: depressif,
        });
}
module.exports = {
    postPersonne,
    getPersonne,
    putPersonne,
    deletePersonne,
    getIppePersonne,
    putDescription,
};
