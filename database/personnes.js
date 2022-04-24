const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getPersonnesAll() {
    return knex('Personnes');
}

module.exports = {
    getPersonnesAll,
};
