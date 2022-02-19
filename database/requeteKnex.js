const knex = require("knex")({
    client: "mysql",
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        port : 3306,
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

async function getIPPE() {
    return await knex("IPPE");
}

async function getPersonnes() {
    return await knex("Personnes");
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
    getPersonnes,
    getUtilisateurs,
    // adduser
}