const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getObjetsAll() {
    return knex('IBOB');
}

module.exports = {
    getObjetsAll,
};
