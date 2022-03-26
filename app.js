const express = require('express');

const app = express();
const cors = require('cors');
const requeteKnex = require('./requetesKnex');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/login', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        const { identifiant, motDePasse } = req.body;
        resultat = await requeteKnex.connexion(identifiant, motDePasse);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (resultat.length === 0) {
        // envoi du message contenant les information pour le login
        /** ** TEMPORAIRE JUSQU'A TEMPS QUE L'ON VOIT LES NOTION DE TOKEN**** */

        return res.status(404).json({ succes: false });
    }

    return res.status(200).json({
        succes: true,
        Etudiant: resultat[0].Etudiant,
        Matricule: resultat[0].Identifiant,
        Nom: resultat[0].NomFamille,
    });
});

app.get('/ippeInfo', async (req, res) => {
    let resultat;

    const { nomFamille, prenom1 } = req.query;
    const prenom2 = (req.query.prenom2 === '') ? null : req.query.prenom2;
    const masculin = (req.query.masculin === 'true');
    const { dateNaissance } = req.query;

    if (nomFamille === undefined || prenom1 === undefined || prenom2 === undefined
        || masculin === undefined || dateNaissance === undefined) {
        return res.status(400).json('paramètre manquant');
    }
    try {
        resultat = await requeteKnex.getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance);
    } catch (error) {
        return res.status(500).json(error.message);
    }

    if (resultat.length === 0) {
        return res.status(404).json('Cette personne n\'est pas répertoriée');
    }

    return res.status(200).json(resultat);
});
app.get('/IBOB/:NoSerie', async (req, res) => {
    let resultat;
    const noSerie = req.params.NoSerie;
    if (noSerie === undefined) {
        return res.status(400).json('paramètre manquant');
    }
    try {
        resultat = await requeteKnex.getIBOBbyNoSerie(noSerie);
    } catch (error) {
        return res.status(500).json(error.message);
    }
    if (resultat.length === 0) {
        return res.status(404).json('Cette objet n\'est pas répertoriée');
    }
    return res.status(200).json(resultat);
});

app.post('/IBOB', async (req, res) => {
    const noSerie = req.body.NoSerie;
    const marque = req.body.Marque;
    const modele = req.body.Modele;
    const typeObjet = req.body.TypeObjet;
    const noEvenement = `${req.body.NoEvenement}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`;
    if (noSerie === undefined || marque === undefined || modele === undefined
        || typeObjet === undefined || req.body.NoEvenement === undefined
        || req.body.AA === undefined || req.body.MM === undefined
        || req.body.JJ === undefined || req.body.sequenceChiffres === undefined) {
        return res.status(400).json({
            success: false,
            message: 'POST FAILED, Valeur manquant(es)',
        });
    }
    try {
        const resultatRequete = await
        requeteKnex.ajoutIBOB(noSerie, marque, modele, typeObjet, noEvenement);
        if (resultatRequete === true) {
            res.status(200).json({
                success: true,
                message: 'POST SUCCESS',
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'POST FAILED',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `POST FAILED, ${error.message}`,
        });
    }
});

app.put('/IBOB', async (req, res) => {
    const noSerie = req.body.NoSerie;
    const marque = req.body.Marque;
    const modele = req.body.Modele;
    const typeObjet = req.body.TypeObjet;
    const noEvenement = `${req.body.NoEvenement}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`;
    if (noSerie === undefined || marque === undefined || modele === undefined
        || typeObjet === undefined || req.body.NoEvenement === undefined
        || req.body.AA === undefined || req.body.MM === undefined
        || req.body.JJ === undefined || req.body.sequenceChiffres === undefined) {
        return res.status(400).json({
            success: false,
            message: 'PUT FAILED, Valeur manquant(es)',
        });
    }
    try {
        const resultatRequete = await
        requeteKnex.modificationIBOB(noSerie, marque, modele, typeObjet, noEvenement);
        if (resultatRequete === true) {
            return res.status(200).json({
                success: true,
                message: 'PUT SUCCESS',
            });
        }
        return res.status(404).json({
            success: false,
            message: 'PUT FAILED, l\'objet est introuvable,',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `PUT FAILED, ${error.message}`,
        });
    }
});

app.delete('/IBOB/supression/:NoSerie', async (req, res) => {
    const id = req.params.NoSerie;
    if (id !== '' || id !== undefined) {
        try {
            const resultatRequete = await requeteKnex.suppresionIBOByNoSerie(id);
            if (resultatRequete === true) {
                res.json({
                    success: true,
                    message: 'Delete OK',
                });
            } else {
                res.json({
                    success: false,
                    message: `Delete failed, No Série incorrecte: ${id}`,
                });
            }
        } catch (err) {
            res.json({
                success: false,
                message: err,
            });
        }
    } else {
        res.json({
            success: false,
            message: 'Aucun No de Série insérer',
        });
    }
});

app.get('/IBAF/:NoSerie', async (req, res) => {
    let resultat;
    const noSerie = req.params.NoSerie;
    if (noSerie === undefined) {
        return res.status(400).json('paramètre manquant');
    }
    try {
        resultat = await requeteKnex.getIBAFByNoSerie(noSerie);
    } catch (error) {
        return res.status(500).json(error.message);
    }
    if (resultat.length === 0) {
        return res.status(404).json('Cette arme n\'est pas répertoriée');
    }
    return res.status(200).json(resultat);
});

app.post('/IBAF', async (req, res) => {
    const noSerie = req.body.NoSerie;
    const marque = req.body.Marque;
    const calibre = req.body.Calibre;
    const typeArme = req.body.TypeArme;
    const noEvenement = `${req.body.NoEvenement}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`;
    if (noSerie === undefined || marque === undefined || calibre === undefined
        || typeArme === undefined || req.body.NoEvenement === undefined
        || req.body.AA === undefined || req.body.MM === undefined
        || req.body.JJ === undefined || req.body.sequenceChiffres === undefined) {
        return res.status(400).json({
            success: false,
            message: 'POST FAILED, Valeur manquant(es)',
        });
    }
    try {
        const resultatRequete = await
        requeteKnex.ajoutIBAF(noSerie, marque, calibre, typeArme, noEvenement);
        if (resultatRequete === true) {
            res.status(200).json({
                success: true,
                message: 'POST SUCCESS',
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'POST FAILED',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `POST FAILED, ${error.message}`,
        });
    }
});

app.put('/IBAF', async (req, res) => {
    const noSerie = req.body.NoSerie;
    const marque = req.body.Marque;
    const calibre = req.body.Calibre;
    const typeArme = req.body.TypeArme;
    const noEvenement = `${req.body.NoEvenement}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`;
    if (noSerie === undefined || marque === undefined || calibre === undefined
        || typeArme === undefined || req.body.NoEvenement === undefined
        || req.body.AA === undefined || req.body.MM === undefined
        || req.body.JJ === undefined || req.body.sequenceChiffres === undefined) {
        return res.status(400).json({
            success: false,
            message: 'PUT FAILED, Valeur manquant(es)',
        });
    }
    try {
        // eslint-disable-next-line max-len
        const resultatRequete = await requeteKnex.modificationIBAF(noSerie, marque, calibre, typeArme, noEvenement);
        if (resultatRequete === true) {
            return res.status(200).json({
                success: true,
                message: 'PUT SUCCESS',
            });
        }
        return res.status(404).json({
            success: false,
            message: 'PUT FAILED, l\'objet est introuvable,',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `PUT FAILED, ${error.message}`,
        });
    }
});

app.delete('/IBAF/supression/:NoSerie', async (req, res) => {
    const id = req.params.NoSerie;
    if (id !== '' || id !== undefined) {
        try {
            const resultatRequete = await requeteKnex.suppresionIBAFByNoSerie(id);
            if (resultatRequete === true) {
                res.status(200).json({
                    success: true,
                    message: 'Delete OK',
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Delete failed, No Série incorrecte: ${id}`,
                });
            }
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err,
            });
        }
    } else {
        res.status(500).json({
            success: false,
            message: 'Aucun No de Série insérer',
        });
    }
});

app.get('/IBVA/:Identifiant', async (req, res) => {
    let resultat;
    const identifiant = req.params.Identifiant;
    if (identifiant === undefined) {
        res.status(400).json('paramètre manquant');
    }
    try {
        resultat = await requeteKnex.getIBVAbyIdentifiant(identifiant);
    } catch (error) {
        res.status(500).json(error.message);
    }
    if (resultat.length === 0) {
        res.status(404).json('Cette objet de valeur n\'est pas répertoriée');
    }
    res.status(200).json(resultat);
});

app.post('/IBVA', async (req, res) => {
    const identifiant = req.body.Identifiant;
    const auteur = req.body.Auteur;
    const typeValeur = req.body.TypeValeur;
    const typeEvenement = req.body.TypeEvenement;
    const noEvenement = `${req.body.NoEvenement}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`;
    if (identifiant === undefined || auteur === undefined || typeValeur === undefined
        || typeEvenement === undefined || req.body.NoEvenement === undefined
        || req.body.AA === undefined || req.body.MM === undefined
        || req.body.JJ === undefined || req.body.sequenceChiffres === undefined) {
        return res.status(400).json({
            success: false,
            message: 'POST FAILED, Valeur manquant(es)',
        });
    }
    try {
        const resultatRequete = await
        requeteKnex.ajoutIBVA(identifiant, auteur, typeValeur, typeEvenement, noEvenement);
        if (resultatRequete === true) {
            res.status(200).json({
                success: true,
                message: 'POST SUCCESS',
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'POST FAILED',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `POST FAILED, ${error.message}`,
        });
    }
});

app.put('/IBVA', async (req, res) => {
    const identifiant = req.body.Identifiant;
    const auteur = req.body.Auteur;
    const typeValeur = req.body.TypeValeur;
    const typeEvenement = req.body.TypeEvenement;
    const noEvenement = `${req.body.NoEvenement}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`;
    if (identifiant === undefined || auteur === undefined || typeValeur === undefined
        || typeEvenement === undefined || req.body.NoEvenement === undefined
        || req.body.AA === undefined || req.body.MM === undefined
        || req.body.JJ === undefined || req.body.sequenceChiffres === undefined) {
        return res.status(400).json({
            success: false,
            message: 'PUT FAILED, Valeur manquant(es)',
        });
    }
    try {
        // eslint-disable-next-line max-len
        const resultatRequete = await requeteKnex.modificationIBVA(identifiant, auteur, typeValeur, typeEvenement, noEvenement);
        if (resultatRequete === true) {
            return res.status(200).json({
                success: true,
                message: 'PUT SUCCESS',
            });
        }
        return res.status(404).json({
            success: false,
            message: 'PUT FAILED, l\'objet est introuvable,',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `PUT FAILED, ${error.message}`,
        });
    }
});

app.delete('/IBVA/supression/:Identifiant', async (req, res) => {
    const id = req.params.Identifiant;
    if (id !== '' || id !== undefined) {
        try {
            const resultatRequete = await requeteKnex.suppresionIBVAByIdentifiant(id);
            if (resultatRequete === true) {
                res.status(200).json({
                    success: true,
                    message: 'Delete OK',
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Delete failed, Identifiant incorrecte',
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Aucun No de Série insérer',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
