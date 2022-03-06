const knex = require("knex")({
    client: "mssql",
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: '4D1EQUIPE03',
        password: 'bue522',
        database: '4D1Equipe03'
    },
    useNullAsDefault: false
})

async function getIBAF() {
    return await knex("IBAF");
}

async function getIBOB() {
    return await knex("IBOB");
}

async function getIBVA() {
    return await knex("IBVA");
}


async function getIPPE(NomFamille, Prenom1, Prenom2, Masculin, DateNaissance) {
    return knex("Personnes")
    .select("*")
    .where("NomFamille", NomFamille)
    .andWhere("Prenom1", Prenom1)
    .andWhere("Prenom2", Prenom2)
    .andWhere("Masculin", Masculin)
    .andWhere("DateNaissance", DateNaissance)
        .leftJoin('FPS','Personnes.ID','FPS.IdPersonne')
        .leftJoin('IPPE','Personnes.ID','IPPE.IdPersonne')
        .leftJoin('Conditions','IPPE.Id','Conditions.IdIPPE')
}
//
// async function getInfosPersonnes(NomFamille, Prenom1, Prenom2, Masculin, DateNaissance) {
//     return knex("Personnes")
//         .select("*")
//         .where("NomFamille", NomFamille)
//         .andWhere("Prenom1", Prenom1)
//         .andWhere("Prenom2", Prenom2)
//         .andWhere("Masculin", Masculin)
//         .andWhere("DateNaissance", DateNaissance);
//
// }

async function getUtilisateurs() {
    return await knex("Utilisateurs");
}

// async function adduser(id, donnes){
//     return await knex("Utilisateurs")
// }

module.exports = {
    getIBAF,
    getIBOB,
    getIBVA,
    getIPPE,
    getUtilisateurs,
    // getInfosPersonnes
    // adduser
}
