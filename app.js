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
app.get('/objet/:idObjet', async (req, res) => {
    let resultat;
    const id = req.params.idObjet;
    try {
        if (id === undefined) {
            return res.status(400).json({ message: 'paramètre manquant' });
        }
        resultat = await requeteKnex.getIBOBbyId(id);
        if (resultat.length === 0) {
            return res.status(404).json({ message: 'Cette objet n\'est pas répertoriée' });
        }
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// eslint-disable-next-line consistent-return
app.post('/objet', async (req, res) => {
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

app.put('/objet', async (req, res) => {
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

app.delete('/objet/:idObjet', async (req, res) => {
    const id = req.params.idObjet;
    if (id !== '' || id !== undefined) {
        try {
            const resultatRequete = await requeteKnex.suppresionIBOById(id);
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

app.get('/armes/:idArme', async (req, res) => {
    let resultat;
    const id = req.params.idArme;
    try {
        if (id === undefined) {
            return res.status(400).json({ message: 'paramètre manquant' });
        }
        resultat = await requeteKnex.getIBAFById(id);
        if (resultat.length === 0) {
            return res.status(404).json({ message: 'Cette arme n\'est pas répertoriée' });
        }
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// eslint-disable-next-line consistent-return
app.post('/armes', async (req, res) => {
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

app.put('/armes', async (req, res) => {
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

app.delete('/armes/:idArme', async (req, res) => {
    const id = req.params.idArme;
    if (id !== '' || id !== undefined) {
        try {
            const resultatRequete = await requeteKnex.suppresionIBAFById(id);
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

app.get('/valeurs/:idValeur', async (req, res) => {
    let resultat;
    const id = req.params.idValeur;
    if (id === undefined) {
        res.status(400).json({ message: 'paramètre manquant' });
    }
    try {
        resultat = await requeteKnex.getIBVAbyId(id);
        if (resultat.length === 0) {
            res.status(404).json({ message: 'Cette objet de valeur n\'est pas répertoriée' });
        } else res.status(200).json(resultat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// eslint-disable-next-line consistent-return
app.post('/valeurs', async (req, res) => {
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

app.put('/valeurs', async (req, res) => {
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

app.delete('/valeurs/:idValeur', async (req, res) => {
    const id = req.params.idValeur;
    if (id !== '' || id !== undefined) {
        try {
            const resultatRequete = await requeteKnex.suppresionIBVAById(id);
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
