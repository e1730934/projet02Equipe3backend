const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getArmesAll() {
    return knex('IBAF');
}

module.exports = {
    getArmesAll,
};
