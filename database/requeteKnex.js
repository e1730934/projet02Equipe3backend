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




async function getIPPE(NomFamille, Prenom1, Prenom2, Masculin, DateNaissance) {
    let data = await knex("Personnes")
    .select("id")
    .where("NomFamille", NomFamille)
    .andWhere("Prenom1", Prenom1)
    .andWhere("Prenom2", Prenom2)
    .andWhere("Masculin", Masculin)
    .andWhere("DateNaissance", DateNaissance)
    // console.log(data)
    return getIPPEbyid(3)
}

async function getIPPEbyid(id) {
    let condition = await conditionofid(id)
    if (condition[0].ligne > 0){
        console.log("conditions")
        return await knex("IPPE")
        .join('Conditions', 'IPPE.Id', 'Conditions.IdIPPE')
        .select("*")
        .where("Conditions.IdIPPE", id)
    }
    else {
        return await knex("IPPE")
        .select("*")
        .where("IPPE.IdPersonne", id)
    }
}

async function conditionofid(id){
    return await knex("Conditions")
    .count("* as ligne")
    .where("IdIPPE", id)
}

async function getInfosPersonnes(NomFamille, Prenom1, Prenom2, Masculin, DateNaissance) {
    return await knex("Personnes")
    .select("*")
    .where("NomFamille", NomFamille)
    .andWhere("Prenom1", Prenom1)
    .andWhere("Prenom2", Prenom2)
    .andWhere("Masculin", Masculin)
    .andWhere("DateNaissance", DateNaissance)

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
    getUtilisateurs,
    getIPPEbyid,
    getPersonnes,
    getInfosPersonnes
    // adduser
}