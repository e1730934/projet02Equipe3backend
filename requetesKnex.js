// noinspection JSNonASCIINames

const knex = require('knex')({
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: '4D1EQUIPE03',
        password: 'bue522',
        database: '4D1Equipe03',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
});

// Requete knex qui retourne les informations de connexion
function connexion(identifiant, motDePasse) {
    return knex('Utilisateurs')
        .where('Identifiant', identifiant)
        .andWhere('MotDePasse', motDePasse);
}

// Fonction qui manie l'affichage de la reponse IPPE
function formatterIPPE(IPPEs) {
    const resultat = [];
    const libelleList = [];

    IPPEs.forEach((ippe) => {
        // Verifie si l'information IPPE se trouve deja dans les datas a envoyer
        if (!resultat.some((element) => element.idIPPE === ippe.IdIPPE[0])) {
            // Nouvel événement IPPE, on ajoute un objet IPPE au résultat
            resultat.push(
                {
                    idIPPE: ippe.IdIPPE[0],
                    noEvenement: ippe.NoEvenement,
                    typeEvenement: ippe.TypeEvenement,
                    mandat: ippe.Mandat,
                    motif: ippe.Motif,
                    nature: ippe.Nature,
                    dossierEnquête: ippe.dossierEnquete,
                    cour: ippe.Cour,
                    noMandat: ippe.NoMandat,
                    noCause: ippe.NoCause,
                    idNatureCrime: ippe.idNatureCrime,
                    lieuDetention: ippe.LieuDetention,
                    finSentence: ippe.FinSentence,
                    vuDerniereFois: ippe.VuDerniereFois,
                    conditions: libelleList,
                    agentProbation: ippe.AgentProbation,
                    agentLiberation: ippe.AgentLiberation,
                    telephone: ippe.Telephone,
                    poste: ippe.Poste,
                    // eslint-disable-next-line no-dupe-keys
                    conditions: [],
                },
            );
        } else {
            resultat[resultat.length - 1].conditions.push(
                {
                    idCondition: ippe.IdCondition,
                    libelle: ippe.Libelle,
                    heureDebut: ippe.HeureDebut,
                    heureFin: ippe.HeureFin,
                    victime: ippe.Victime,
                    frequentation: ippe.Frequentation,
                },
            );
        }
    });

    return resultat;
}

async function getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance) {
    const resultat = await knex('Personnes')
        .where({
            NomFamille: nomFamille,
            Prenom1: prenom1,
            Prenom2: prenom2,
            Masculin: masculin,
            DateNaissance: dateNaissance,
        });

    if (resultat.length === 0) return resultat;

    // La personne existe: on récupère sa signalisation FPS si elle en a une
    const FPS = await knex('FPS')
        .where('FPS.IdPersonne', resultat[0].IdPersonne);
    // eslint-disable-next-line prefer-destructuring
    resultat[0].FPS = FPS.length === 0 ? null : FPS[0];

    // On récupère les événements IPPE associés si elle en a
    resultat[0].IPPE = await knex('PersonnesIPPE')
        .join('IPPE', 'PersonnesIPPE.IdIPPE', 'IPPE.IdIPPE')
        .leftJoin('Conditions', 'Conditions.IdIPPE', 'IPPE.IdIPPE')
        .where('PersonnesIPPE.IdPersonne', resultat[0].IdPersonne);

    if (resultat[0].IPPE.length === 0) return resultat;

    // La personne a des événements IPPE associés: on les formate
    resultat[0].IPPE = formatterIPPE(resultat[0].IPPE);

    return resultat;
}

async function getIBOBbyId(Id) {
    return knex('IBOB')
        .where('IdBOB', Id)
        .select(
            'NoSerie',
            'Marque',
            'Modele',
            'TypeObjet',
            'NoEvenement',
        );
}

async function getIBOBbyNoSerie(noSerie) {
    return knex('IBOB')
        .where('NoSerie', noSerie)
        .select(
            'NoSerie',
            'Marque',
            'Modele',
            'TypeObjet',
            'NoEvenement',
        );
}

async function getCountIBOB(noSerie) {
    return knex('IBOB')
        .where('NoSerie', noSerie)
        .count('* as nbrLigne');
}
async function ajoutIBOB(noSerie, marque, modele, typeObjet, noEvenement) {
    let success = false;
    const count = await getCountIBOB(noSerie);
    if (count[0].nbrLigne === 0) {
        await knex('IBOB')
            .insert(
                {
                    NoSerie: noSerie,
                    Marque: marque,
                    Modele: modele,
                    TypeObjet: typeObjet,
                    NoEvenement: noEvenement,
                },
            );
        success = true;
    }
    return success;
}

async function modificationIBOB(noSerie, marque, modele, typeObjet, noEvenement) {
    let success = false;
    const count = await getCountIBOB(noSerie);
    if (count[0].nbrLigne !== 0) {
        await knex('IBOB')
            .update(
                {
                    Marque: marque,
                    Modele: modele,
                    TypeObjet: typeObjet,
                    NoEvenement: noEvenement,
                },
            )
            .where('NoSerie', noSerie);
        success = true;
    }
    return success;
}

async function suppresionIBOByNoSerie(noSerie) {
    let success = false;
    const count = await getCountIBOB(noSerie);
    if (count[0].nbrLigne !== 0) {
        await knex('IBOB')
            .where('NoSerie', noSerie)
            .del();
        success = true;
    }
    return success;
}

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
            'NoSerie',
            'Marque',
            'Calibre',
            'TypeArme',
            'NoEvenement',
        );
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

async function modificationIBAF(noSerie, marque, calibre, typeArme, noEvenement) {
    let success = false;
    const count = await getCountIBAF(noSerie);
    if (count[0].nbrLigne !== 0) {
        await knex('IBAF')
            .update(
                {
                    Marque: marque,
                    Calibre: calibre,
                    TypeArme: typeArme,
                    NoEvenement: noEvenement,
                },
            )
            .where('NoSerie', noSerie);
        success = true;
    }
    return success;
}

async function suppresionIBAFByNoSerie(noSerie) {
    let success = false;
    const count = await getCountIBAF(noSerie);
    if (count[0].nbrLigne !== 0) {
        await knex('IBAF')
            .where('NoSerie', noSerie)
            .del();
        success = true;
    }
    return success;
}

async function getIBVAbyId(id) {
    return knex('IBVA')
        .where('IdIBVA', id)
        .select(
            'Identifiant',
            'Auteur',
            'TypeValeur',
            'TypeEvenement',
            'NoEvenement',
        );
}

async function getIBVAbyIdentifiant(identifiant) {
    return knex('IBVA')
        .where('Identifiant', identifiant)
        .select(
            'Identifiant',
            'Auteur',
            'TypeValeur',
            'TypeEvenement',
            'NoEvenement',
        );
}

async function getCountIBVA(identifiant) {
    return knex('IBVA')
        .where('Identifiant', identifiant)
        .count('* as nbrLigne');
}

async function ajoutIBVA(identifiant, auteur, typeValeur, typeEvenement, noEvenement) {
    let success = false;
    const count = await getCountIBVA(identifiant);
    if (count[0].nbrLigne === 0) {
        await knex('IBVA')
            .insert(
                {
                    Identifiant: identifiant,
                    Auteur: auteur,
                    TypeValeur: typeValeur,
                    TypeEvenement: typeEvenement,
                    NoEvenement: noEvenement,
                },
            );
        success = true;
    }
    return success;
}

async function modificationIBVA(identifiant, auteur, typeValeur, typeEvenement, noEvenement) {
    let success = false;
    const count = await getCountIBVA(identifiant);
    if (count[0].nbrLigne !== 0) {
        await knex('IBVA')
            .update(
                {
                    Identifiant: identifiant,
                    Auteur: auteur,
                    TypeValeur: typeValeur,
                    TypeEvenement: typeEvenement,
                    NoEvenement: noEvenement,
                },
            )
            .where('Identifiant', identifiant);
        success = true;
    }
    return success;
}

async function suppresionIBVAByIdentifiant(identifiant) {
    let success = false;
    const count = await getCountIBVA(identifiant);
    if (count[0].nbrLigne !== 0) {
        await knex('IBVA')
            .where('Identifiant', identifiant)
            .del();
        success = true;
    }
    return success;
}

module.exports = {
    connexion,
    getIPPE,
    getIBOBbyId,
    ajoutIBOB,
    modificationIBOB,
    suppresionIBOByNoSerie,
    getIBAFById,
    ajoutIBAF,
    modificationIBAF,
    suppresionIBAFByNoSerie,
    getIBVAbyId,
    ajoutIBVA,
    modificationIBVA,
    suppresionIBVAByIdentifiant,
    getIBVAbyIdentifiant,
    getIBAFByNoSerie,
    getIBOBbyNoSerie,
};
