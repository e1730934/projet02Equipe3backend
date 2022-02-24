const express = require("express");
const app = express();
const cors = require('cors');
const request = require('./requestKnex')
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.static("appweb"));

app.post("/login", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    let loginInfo = {
        "username": req.body.username,
        "password": req.body.password
    }

    let data = await request.connectionCheck(loginInfo);
    
    if(data.length!=0){
        return res.status(200).json({'success': true})
    } else {
        return res.status(500).json({'succes' : false})
    }
    
})
/*
app.get("/ippeInfo", async (req, res) => {

    let prenomDeux = (req.query.prenomDeux === '') ? null : req.query.prenomDeux;
    let nom = req.query.nom
    let prenomUn = req.query.prenomUn 
    let sexe = req.query.sexe
    let ddn = req.query.ddn

    let data = await request.ippeData(nom, ddn, prenomUn, prenomDeux, sexe);
    
    console.log(data)
    if(data.length!=0){
        data.TypeEvenement.foreach((evenement)=>{
            switch(evenement){
                case 'Recherché':
                    res.Recherche = {
                        titre:'Recherché',
                        mandat: data.Raison,
                        cour: data.Cour,
                        numMandat: data.NoCour,
                        natureCrime: data.NatureCrime,
                        noEvenement: data.NoEvenement
                    }
                case 'Sous-observation':
                    res.Sousobservation = {
                        titre:'Sous-Observation',
                        msgDebut: 'Ne pas révéler au sujet l\'intrérêt qu\'on lui porte',
                        motif: data.Raison,
                        cour: data.Cour,
                        natureCrime: data.NatureCrime,
                        noEvenement: data.NoEvenement,
                        dossierEnq: data.DossierEnquete,
                        msgFin:'Compléter le ficher d\'interpellation\n Acheminer à l\'unité des Renseignements criminels'

                    }
                case 'Accusé':
                    res.Accuse = {
                        titre:'Accusé',
                        cour: data.Cour,
                        numCause: data.NoCour,
                        natureCrime: data.NatureCrime,
                        noEvenement: data.NoEvenement,
                        condition: data.libelle
                    }
                case 'Probation':
                    res.Probation = {
                        titre:'Probation',
                        cour: data.Cour,
                        numCause: data.NoCour,
                        natureCrime: data.NatureCrime,
                        noEvenement: data.NoEvenement,
                        finSentence: data.FinSentence,
                        condition: data.libelle,
                        agent: data.Agent,
                        telephone: data.telephone + ' ' + data.Poste
                    }
                case 'Liberation conditionnelle':
                    res.libCond = {
                        titre:'Libération Conditionnelle',
                        cour: data.Cour,
                        numCause: data.NoCour,
                        natureCrime: data.NatureCrime,
                        noEvenement: data.NoEvenement,
                        fps: data.NoFps,
                        lieuDetention: data.LieuDetention,
                        finSentence: data.FinSentence,
                        condition: data.libelle,
                        agent: data.Agent,
                        telephone: data.telephone + ' ' + data.Poste
                    }
                case 'Disparu':
                    res.Disparu = {
                        titre:'Disparu',
                        noEvenement: data.NoEvenement,
                        motif: data.Raison,
                        derniereVu: data.VuDerniereFois,
                        descrPhys:{ 
                            race: data.Race, 
                            taille: data.Taille, 
                            poids: data.Poids,
                            yeux: data.Yeux,
                            cheveux: data.Cheveux,
                            marques: data.Marques},
                        descrVest:{
                            gilet: data.Gilet,
                            pantalon: data.Pantalon,
                            autreVetements: data.AutreVetement},
                        problemeSante:{
                            toxicomanie: data.Toxicomanie,
                            desorganise: data.Desorganise,
                            depressif: data.Depressif,
                            suicidaire: data.Suicidaire,
                            violent: data.Violent}
                    }
                case 'interdit':
                    res.interdit = {
                        titre:'Interdit',
                        nature: data.Raison,
                        cour: data.Cour,
                        numCour: data.NoCour,
                        natureCrime: data.NatureCrime,
                        noEvenement: data.NoEvenement,
                        expiration: data.FinSentence
                    }
            }   
        })
       /* res.status(200).json({'success': true})
        console.log(res)*/
        
  //  } else {
  //      return res.status(500).json({'succes' : false})
  //  }

//});

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});