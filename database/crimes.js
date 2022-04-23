const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getCrimesAll() {
    return knex('Crimes');
}

module.exports = {
    getCrimesAll,
};
