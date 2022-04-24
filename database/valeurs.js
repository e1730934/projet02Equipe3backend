const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getValeursAll() {
    return knex('IBVA');
}

module.exports = {
    getValeursAll,
};
