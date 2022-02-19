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

async function getConditions() {
    return await knex("Conditions");
}

async function getFPS() {
    return await knex("FPS");
}

async function getIBAF() {
    return await knex("IBAF");
}

async function getIBOB() {
    return await knex("IBOB");
}

async function getIBVA() {
    return await knex("IBVA");
}

async function getIPPE(id) {
    return await knex("IPPE");
}

async function getIdPersonnes(NomFamille, Prenom1, Masculin, DateNaissance, NoPermis) {
    return await knex("Personnes")
    .select("id")
    .where("NomFamille", NomFamille, "Prenom1", Prenom1, "Masculin", Masculin, "DateNaissance", DateNaissance, "NoPermis", NoPermis)
}

async function getUtilisateurs() {
    return await knex("Utilisateurs");
}

// async function adduser(id, donnes){
//     return await knex("Utilisateurs")
// }

module.exports = {
    getConditions,
    getFPS,
    getIBAF,
    getIBOB,
    getIBVA,
    getIPPE,
    getIdPersonnes,
    getUtilisateurs,
    // adduser
}