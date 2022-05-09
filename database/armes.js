const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

async function getIBAFById(id) {
    return knex('IBAF')
        .where('IdIBAF', id)
        .select(
            'NoSerie',
            'Marque',
            'Calibre',
            'TypeArme',
            'NoEvenement',
        );
}

async function getIBAFByNoSerie(noSerie) {
    return knex('IBAF')
        .where('NoSerie', noSerie)
        .select(
            'IdIBAF',
            'NoSerie',
            'Marque',
            'Calibre',
            'TypeArme',
            'NoEvenement',
        );
}

async function getCountIBAFById(id) {
    return knex('IBAF')
        .where('IdIBAF', id)
        .count('* as nbrLigne');
}
async function getCountIBAF(noSerie) {
    return knex('IBAF')
        .where('NoSerie', noSerie)
        .count('* as nbrLigne');
}

async function ajoutIBAF(noSerie, marque, calibre, typeArme, noEvenement) {
    let success = false;
    const count = await getCountIBAF(noSerie);
    if (count[0].nbrLigne === 0) {
        await knex('IBAF')
            .insert(
                {
                    NoSerie: noSerie,
                    Marque: marque,
                    Calibre: calibre,
                    TypeArme: typeArme,
                    NoEvenement: noEvenement,
                },
            );
        success = true;
    }
    return success;
}

async function modificationIBAF(id, noSerie, marque, calibre, typeArme, noEvenement) {
    let success = false;
    const count = await getCountIBAFById(id);
    if (count[0].nbrLigne !== 0) {
        await knex('IBAF')
            .update(
                {
                    NoSerie: noSerie,
                    Marque: marque,
                    Calibre: calibre,
                    TypeArme: typeArme,
                    NoEvenement: noEvenement,
                },
            )
            .where('IdIBAF', id);
        success = true;
    }
    return success;
}

async function suppresionIBAFById(idArme) {
    let success = false;
    const count = await getCountIBAFById(idArme);
    if (count[0].nbrLigne !== 0) {
        await knex('IBAF')
            .where('IdIBAF', idArme)
            .del();
        success = true;
    }
    return success;
}

module.exports = {
    getIBAFByNoSerie,
    getIBAFById,
    ajoutIBAF,
    modificationIBAF,
    suppresionIBAFById,
};
