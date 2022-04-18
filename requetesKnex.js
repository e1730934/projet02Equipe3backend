const knex = require('knex')({
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: '4D1EQUIPE04',
        password: 'otn984',
        database: '4D1Equipe04',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
    useNullAsDefault: true,
});

// Requete knex qui retourne les informations de connexion
function connexion(identifiant, motDePasse) {
    return knex('Utilisateurs')
        .where('Identifiant', identifiant)
        .andWhere('MotDePasse', motDePasse);
}


function getFPS(DataIdPersonne) {
    return knex('FPS')
        .where('FPS.IdPersonne', DataIdPersonne)
        .join('Personnes', 'FPS.IdPersonne', 'Personnes.IdPersonne')
        .select('FPS.*');
}

// Fonction qui manie l'affichage de la reponse IPPE
function formatterIPPE(IPPEs) {
    const resultat = [];

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
//function get Nature crime
function natCrime(IdNatureCrime){
    return knex('Crimes')
    .where('Crimes.IdCrime', IdNatureCrime)
}
// Permet d'aller chercher les conditions d'un IPPE pour l'afficher
function getCondition(IdIPPE) {
    return knex('Conditions')
        .where('Conditions.IdIPPE', IdIPPE)
        .select('*');
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

// Permet d'aller chercher une personne dans personne ainsi que son ippe pour l'afficher
function getPersonne(IdPersonne) {
    return knex('Personnes')
        .where('Personnes.IdPersonne', IdPersonne)
        .select('*');
}
// Permet d'ajouter une personne à la base de donnée
function postPersonne(TypePersonne, NomFamille, Prenom1, Prenom2, Masculin, DateNaissance) {
    return knex('Personnes')
        .insert({
            TypePersonne,
            NomFamille,
            Prenom1,
            Prenom2,
            Masculin,
            DateNaissance,
        }, ['IdPersonne'])
        .returning('IdPersonne');
}
// Info necessaire pour le tableau de la page personne
async function getIppePersonne(IdPersonne) {
    const resultat = await knex('Personnes')
        .where('Personnes.IdPersonne', IdPersonne)
        .leftJoin('PersonnesIPPE', 'Personnes.IdPersonne', 'PersonnesIPPE.IdPersonne')
        .leftJoin('IPPE', 'PersonnesIPPE.IdIPPE', 'IPPE.IdIPPE');

    return resultat;
}
// Permet de modifer une personne
async function putPersonne(
    IdPersonne,
    TypePersonne,
    NomFamille,
    Prenom1,
    Prenom2,
    Masculin,
    DateNaissance,
) {
    await knex('Personnes')
        .where('IdPersonne', IdPersonne)
        .update({
            TypePersonne,
            NomFamille,
            Prenom1,
            Prenom2,
            Masculin,
            DateNaissance,
        });
}

// Supprime une personne ainsi que son IPPE et ses Conditions
async function deletePersonne(IdPersonne) {
    const IPPE = [];
    const reponseIPPE = await knex('PersonnesIPPE')
        .where('IdPersonne', IdPersonne)
        .select('IdIPPE');
    IPPE.push(reponseIPPE);

    if (reponseIPPE.length !== 0) {
        reponseIPPE.forEach(async (element) => {
            await knex('Conditions')
                .where('IdIPPE', element.IdIPPE)
                .del();
            await knex('PersonnesIPPE')
                .where('IdIPPE', element.IdIPPE)
                .del();
            await knex('IPPE')
                .where('IdIPPE', element.IdIPPE)
                .del();
            await knex('Personnes')
                .where('IdPersonne', IdPersonne)
                .del();
        });
    } else {
        await knex('Personnes')
            .where('IdPersonne', IdPersonne)
            .del();
    }
}

// Permet de modifer les description d'une personne
async function putDescription(
    IdPersonne,
    telephone,
    noPermis,
    adresseUn,
    adresseDeux,
    ville,
    province,
    CP,
    race,
    taille,
    poids,
    yeux,
    cheveux,
    marques,
    gilet,
    pantalon,
    Autre,
    toxicomanie,
    desorganise,
    suicidaire,
    violent,
    depressif) {
    await knex('Personnes')
        .where('IdPersonne', IdPersonne)
        .update({
            Telephone:telephone,
            NoPermis:noPermis,
            Adresse1:adresseUn,
            Adresse2:adresseDeux,
            Ville:ville,
            Province:province,
            CodePostal:CP,
            Race:race,
            Taille:taille,
            Poids:poids,
            Yeux:yeux,
            Cheveux:cheveux,
            Marques:marques,
            Gilet:gilet,
            Pantalon:pantalon,
            AutreVetement:Autre,
            Toxicomanie:toxicomanie,
            Desorganise:desorganise,
            Suicidaire:suicidaire,
            Violent:violent,
            Depressif:depressif
        });
}


module.exports = {
    connexion,
    natCrime,
    getIPPE,
    getFPS,
    postPersonne,
    getPersonne,
    putPersonne,
    getCondition,
    deletePersonne,
    getIppePersonne,
    putDescription,
};
