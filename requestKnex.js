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

function getFPS(DataIdPersonne) {
    return knex('FPS')
        .where('FPS.IdPersonne', DataIdPersonne)
        .join('Personnes', 'FPS.IdPersonne', 'Personnes.Id')
        .select(
            'FPS.*',
            'Personnes.Race',
            'Personnes.Taille',
            'Personnes.Poids',
            'Personnes.Yeux',
            'Personnes.Cheveux',
            'Personnes.Marques',
            'Personnes.Toxicomanie',
            'Personnes.Desorganise',
            'Personnes.Depressif',
        );
}

// Fonction qui manie l'affichage de la reponse IPPE
function formatterIPPE(dataIPPE, dataFps) {
    const dataToSend = [];
    const libelleList = [];

    dataIPPE.forEach((data) => {
        // Verifie si l'information IPPE se trouve deja dans les datas a envoyer
        const dupCheck = dataToSend.some((element) => element.IdIPPE === data.IdIPPE);
        if (dupCheck) {
            // ajoute les conditions aux tableau afin de les afficher plus tard
            libelleList.push(data.Libelle);
        } else {
            // si aucunes conditions n'est presente rien est envoyer dans le tableau de conditions
            libelleList.push(data.Libelle ? data.Libelle : null);

            // le switch trie les elements a envoyer pour ne pas envoyer d'information inutile
            switch (data.TypeEvenement) {
            case 'Recherché':
                dataToSend.push(
                    {
                        titre: 'Recherché',
                        mandat: data.Mandat,
                        cour: data.Cour,
                        noMandat: data.NoMandat,
                        natureCrime: data.NatureCrime,
                        noEvenement: data.NoEvenement,
                    },
                );
                break;
            case 'Sous observation':
                dataToSend.push(
                    {
                        titre: 'Sous Observation',
                        motif: data.Motif,
                        natureCrime: data.NatureCrime,
                        noEvenement: data.NoEvenement,
                        DossierEnquete: data.DossierEnquete,

                    },
                );
                break;
            case 'Accusé':
                dataToSend.push(
                    {
                        titre: 'Accusé',
                        cour: data.Cour,
                        noCause: data.NoCause,
                        natureCrime: data.NatureCrime,
                        noEvenement: data.NoEvenement,
                        conditions: libelleList,
                    },
                );
                break;
            case 'Probation':
                dataToSend.push(
                    {
                        titre: 'Probation',
                        cour: data.Cour,
                        noCause: data.NoCause,
                        natureCrime: data.NatureCrime,
                        noEvenement: data.NoEvenement,
                        finSentence: data.FinSentence,
                        conditions: libelleList,
                        agentProbation: data.AgentProbation,
                        telephone: data.Telephone,
                        poste: data.Poste,
                    },
                );
                break;
            case 'Libération Conditionnelle':
                dataToSend.push(
                    {
                        titre: 'Libération Conditionnelle',
                        cour: data.Cour,
                        noCause: data.NoCause,
                        natureCrime: data.NatureCrime,
                        noEvenement: data.NoEvenement,
                        fps: dataFps[0].NoFPS,
                        lieuDetention: data.LieuDetention,
                        finSentence: data.FinSentence,
                        conditions: libelleList,
                        agentLiberation: data.AgentLiberation,
                        telephone: data.Telephone,
                        poste: data.Poste,
                    },
                );
                break;
            case 'Disparu':
                dataToSend.push(
                    {
                        titre: 'Disparu',
                        noEvenement: data.NoEvenement,
                        nature: data.Nature,
                        VuDerniereFois: data.VuDerniereFois,
                        descrPhysique: {
                            race: data.Race,
                            taille: data.Taille,
                            poids: data.Poids,
                            yeux: data.Yeux,
                            cheveux: data.Cheveux,
                            marques: data.Marques,
                        },
                        descrVestimentaire: {
                            gilet: data.Gilet,
                            pantalon: data.Pantalon,
                            autreVetements: data.AutreVetement,
                        },
                        problemesSante: {
                            toxicomanie: data.Toxicomanie,
                            desorganise: data.Desorganise,
                            depressif: data.Depressif,
                            suicidaire: data.Suicidaire,
                            violent: data.Violent,
                        },
                    },
                );
                break;
            case 'Interdit':
                dataToSend.push(
                    {
                        titre: 'Interdit',
                        nature: data.Nature,
                        cour: data.Cour,
                        noCause: data.NoCause,
                        natureCrime: data.NatureCrime,
                        noEvenement: data.NoEvenement,
                        expiration: data.FinSentence,
                    },
                );
                break;
            default:
            }
        }
    });

    // gere les doublons en les supprimants
    const result = dataToSend.reduce((unique, o) => {
        if (!unique.some((obj) => obj.noEvenement === o.noEvenement && obj.value === o.value)) {
            unique.push(o);
        }
        return unique;
    }, []);

    return result;
}

// Fonction qui prend en charge l'affichage des FPS
function formatterFPS(dataFPS) {
    const dataToSend = [];
    dataToSend.push({
        titre: 'FPS',
        NoFPS: dataFPS[0].NoFPS,
        DateMesure: dataFPS[0].DateMesure,
        CD: dataFPS[0].CD,
        Antecedents: dataFPS[0].Antecedents,
        Violent: dataFPS[0].Violent,
        Echappe: dataFPS[0].Echappe,
        Suicidaire: dataFPS[0].Suicidaire,
        Desequilibre: dataFPS[0].Desequilibre,
        Contagieux: dataFPS[0].Contagieux,
        Race: dataFPS[0].Race,
        Taille: dataFPS[0].Taille,
        Poids: dataFPS[0].Poids,
        Yeux: dataFPS[0].Yeux,
        Cheveux: dataFPS[0].Cheveux,
        Marques: dataFPS[0].Marques,
        Toxicomanie: dataFPS[0].Toxicomanie,
        Desorganise: dataFPS[0].Desorganise,
        Depressif: dataFPS[0].Depressif,
    });

    return dataToSend;
}

// eslint-disable-next-line no-unused-vars
async function getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance) {
    const resultat = [];
    const reponseIPPE = await knex('Personnes')
        .where('NomFamille', nomFamille)
        .andWhere('Prenom1', prenom1)
        // .andWhere('Prenom2', prenom2)
        // .andWhere('Masculin', masculin)
        // .andWhere('DateNaissance', dateNaissance)
        .leftJoin('PersonnesIPPE', 'Personnes.Id', 'PersonnesIPPE.IdPersonne')
        .leftJoin('IPPE', 'PersonnesIPPE.IdIPPE', 'IPPE.Id')
        .leftJoin('Conditions', 'Conditions.IdIPPE', 'IPPE.Id')
        .select('*');

    // Recherche si la personne possede un dossier FPS et le push a la reponse
    const reponseFPS = await getFPS(reponseIPPE[0].IdPersonne);
    const IPPEresult = formatterIPPE(reponseIPPE, reponseFPS);
    IPPEresult.forEach((element) => {
        resultat.push(element);
    });
    if (reponseFPS.length !== 0) {
        const FPSresult = formatterFPS(reponseFPS);

        FPSresult.forEach((element) => {
            resultat.push(element);
        });
    }
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
    getFPS,
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
