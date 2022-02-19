const express = require('express');
const path = require('path');
const cors = require('cors');
const requeteKnex = require("./database/requeteKnex");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('admin'));
app.set("json spaces", 2)

app.post("/login", async(req, rep) => {

  try {
      let connection = false;

      const userConnect = {
        Identifiant: req.body.Identifiant,
          MotDePasse: req.body.MotDePasse,
      }
      const donnees = await requeteKnex.getUtilisateurs();

      for (i = 0; i < donnees.length; i++) {
          if ((userConnect.Identifiant == donnees[i].Identifiant) && (userConnect.MotDePasse == donnees[i].MotDePasse)) {
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

app.get("/IPPE/:id", async (req, res) => {
    try {
        let produit = await requeteKnex.getIdPersonnes(req.params.NomFamille, req.params.Prenom1, req.params.Masculin, req.params.DateNaissance, req.params.NoPermis);
         res.status(200).json(produit);

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
