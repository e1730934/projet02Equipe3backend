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

async function getIBOBbyNoSerie(noSerie) {
    return knex('IBOB')
        .where('NoSerie', noSerie)
        .select(
            'NoSerie',
            'Marque',
            'Modele',
            'TypeObjet',
            'TypeEvenement',
            'NoEvenement',
        );
}
async function getCountIBOB(noSerie) {
    return knex('IBOB')
        .where('NoSerie', noSerie)
        .count('* as nbrLigne');
}
async function ajoutIBOB(noSerie, marque, modele, typeObjet, typeEvenement, noEvenement) {
    const count = await getCountIBOB(noSerie);
    if (count[0].nbrLigne === 0) {
        await knex('IBOB')
            .insert(
                {
                    NoSerie: noSerie,
                    Marque: marque,
                    Modele: modele,
                    TypeObjet: typeObjet,
                    TypeEvenement: typeEvenement,
                    NoEvenement: noEvenement,
                },
            );
    } else {
        console.log('NoSerie existe deja dans table IBOB'); // TODO: IMPLEMENTER SI EXISTE DEJA DNS DB
    }
}

async function modificationIBOB(noSerie, marque, modele, typeObjet, typeEvenement, noEvenement) {
    const count = await getCountIBOB(noSerie);
    if (count[0].nbrLigne !== 0) {
        await knex('IBOB')
            .update(
                {
                    Marque: marque,
                    Modele: modele,
                    TypeObjet: typeObjet,
                    TypeEvenement: typeEvenement,
                    NoEvenement: noEvenement,
                },
            )
            .where('NoSerie', noSerie);
    } else {
        console.log('N\'existe pas dans DB');
        // TODO: IMPLEMENTER SI EXISTE PAS DNS DB
    }
}

async function suppresionIBOBByNoSerie(noSerie) {
    return knex('IBOB')
        .where('NoSerie', noSerie)
        .del();
}

async function getIBAFbyId(idIBAF) {
    return knex('IBAF')
        .where('IdIBAF', idIBAF)
        .select('*');
}

async function getIBAFByNoSerie(noSerie) {
    return knex('IBAF')
        .where('NoSerie', noSerie)
        .select(
            'NoSerie',
            'Marque',
            'Calibre',
            'TypeArme',
            'TypeEvenement',
            'NoEvenement',
        );
}
async function getCountIBAF(noSerie) {
    return knex('IBAF')
        .where('NoSerie', noSerie)
        .count('* as nbrLigne');
}

async function ajoutIBAF(noSerie, marque, calibre, typeArme, typeEvenement, noEvenement) {
    const count = await getCountIBAF(noSerie);
    if (count[0].nbrLigne === 0) {
        await knex('IBAF')
            .insert(
                {
                    NoSerie: noSerie,
                    Marque: marque,
                    Calibre: calibre,
                    TypeArme: typeArme,
                    TypeEvenement: typeEvenement,
                    NoEvenement: noEvenement,
                },
            );
    } else {
        console.log('NoSerie existe deja dans table IBAF'); // TODO: IMPLEMENTER SI EXISTE DEJA DNS DB
    }
}

async function modificationIBAF(noSerie, marque, calibre, typeArme, typeEvenement, noEvenement) {
    const count = await getCountIBAF(noSerie);
    if (count[0].nbrLigne !== 0) {
        await knex('IBAF')
            .update(
                {
                    Marque: marque,
                    Calibre: calibre,
                    TypeArme: typeArme,
                    TypeEvenement: typeEvenement,
                    NoEvenement: noEvenement,
                },
            )
            .where('NoSerie', noSerie);
    } else {
        console.log('N\'existe pas dans DB'); // TODO: IMPLEMENTER SI EXISTE PAS DNS DB
    }
}

async function suppresionIBAFByNoSerie(noSerie) {
    return knex('IBAF')
        .where('NoSerie', noSerie)
        .del();
}

module.exports = {
    connexion,
    getIPPE,
    getIBOBbyNoSerie,
    ajoutIBOB,
    modificationIBOB,
    suppresionIBOBByNoSerie,
    getIBAFbyId,
    getIBAFByNoSerie,
    ajoutIBAF,
    modificationIBAF,
    suppresionIBAFByNoSerie,
};
