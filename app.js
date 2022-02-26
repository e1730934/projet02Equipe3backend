const express = require('express');
// const path = require('path');
const cors = require('cors');
const requeteKnex = require("./database/requeteKnex");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('admin'));
app.set("json spaces", 2)

app.post("/login", async (req, rep) => {

    try {
        let connection = false;
        const userConnect = {
            Identifiant: req.body.Identifiant,
            MotDePasse: req.body.MotDePasse,
        }
        const donnees = await requeteKnex.getUtilisateurs();

        for (i = 0; i < donnees.length; i++) {
            if ((userConnect.Identifiant === donnees[i].Identifiant) && (userConnect.MotDePasse === donnees[i].MotDePasse)) {
                rep.status(200).json({
                    success: true,
                    nom_utilisateur: donnees[i].Identifiant
                });
                connection = true;
                console.log(userConnect.Identifiant, "vien de se connecter");
            }
        }
        if (!connection) {
            rep.status(200).json({
                success: false,
            });
        }
    } catch (error) {

        rep.status(500).json({
            success: false,
            erreur: error
        });
    }
});

app.get("/rechercher/IPPE", async (req, res) => {
    try {
        let IdPersonnes = await requeteKnex.getIdPersonnes(req.params.NomFamille, req.params.Prenom1, req.params.Prenom2, req.params.Masculin, req.params.DateNaissance);
        // let IdPersonnes = await requeteKnex.getIPPE("Ducharme", "Benoit", null, true, "1975-08-31");
        console.log(IdPersonnes)
        return res.status(200).json(IdPersonnes);

    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
})

app.get("/rechercher/infos/personnes", async (req, res) => {
    try {
        // let id = await requeteKnex.getIdPersonnes(req.params.NomFamille, req.params.Prenom1, req.params.Prenom2, req.params.Masculin, req.params.DateNaissance);
        let InfosPersonnes = await requeteKnex.getInfosPersonnes("Ducharme", "Benoit", null, true, "1975-08-31");
        res.status(200).json(InfosPersonnes);
        console.log(InfosPersonnes)

    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
})

app.get("/conditions", async (req, res) => {
    try {
        let conditions = await requeteKnex.getConditions();
        res.status(200).json(conditions);

    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
})

app.get("/FPS", async (req, res) => {
    try {
        let FPS = await requeteKnex.getFPS();
        res.status(200).json(FPS);

    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
})


app.get("/IBAF", async (req, res) => {
    try {
        let IBAF = await requeteKnex.getIBAF();
        res.status(200).json(IBAF);

    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
})


app.get("/IBOB", async (req, res) => {
    try {
        let IBOB = await requeteKnex.getIBOB();
        res.status(200).json(IBOB);

    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
})


app.get("/IBVA", async (req, res) => {
    try {
        let IBVA = await requeteKnex.getIBVA();
        res.status(200).json(IBVA);

    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
})



app.get("/Personnes", async (req, res) => {
    try {
        let Personnes = await requeteKnex.getPersonnes();
        res.status(200).json(Personnes);

    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
})

app.get("/Utilisateurs", async (req, res) => {
    try {
        let Utilisateurs = await requeteKnex.getUtilisateurs();
        res.status(200).json(Utilisateurs);

    } catch (error) {
        res.status(500).json({
            success: false,
            erreur: error
        });
    }
})

// app.put("/adduser/:id", async (req, res) => {
//   try {
//       let produit = await requeteKnex.adduser(req.params.id, req.body);
//        res.status(200).json(produit);

//   } catch (error) {
//       res.status(500).json({
//           success: false,
//           erreur: error
//       });
//   }
// })


app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
