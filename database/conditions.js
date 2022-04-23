const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getConditionsAll() {
    return knex('Conditions');
}

module.exports = {
    getConditionsAll,
};
