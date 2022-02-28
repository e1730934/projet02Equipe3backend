const requeteKnex = require("./requeteKnex");
test('Réponse ***RECHERCHÉ***', async () => {
        const resultat = {
            "Adresse1": null,
            "Adresse2": null,
            "Agent": null,
            "Antecedents": null,
            "AutreVetement": null,
            "CD": null,
            "Cheveux": null,
            "CodePostal": null,
            "Contagieux": null,
            "Cour": "Municipale de Longueuil",
            "DateMesure": null,
            "DateNaissance": new Date('1975-08-31'),
            "Depressif": null,
            "Desequilibre": null,
            "Desorganise": null,
            "DossierEnquete": "CM-LGL-A-26840      ",
            "Echappe": null,
            "FinSentence": null,
            "Gilet": null,
            "Id": [2, null, 1, null],
            "IdIPPE": null,
            "IdPersonne": 2,
            "Libelle": null,
            "LieuDetention": null,
            "Marques": null,
            "Masculin": true,
            "NatureCrime": "Agression armée",
            "NoCour": null,
            "NoEvenement": "108-220208-0031",
            "NoFPS": null,
            "NoPermis": null,
            "NomFamille": "Ducharme",
            "Pantalon": null,
            "Poids": null,
            "Poste": null,
            "Prenom1": "Benoit",
            "Prenom2": null,
            "Province": null,
            "Race": null,
            "Raison": "Arrestation",
            "Suicidaire": null,
            "Taille": null,
            "Telephone": null,
            "Toxicomanie": null,
            "TypeEvenement": "Recherché",
            "Ville": null,
            "Violent": null,
            "VuDerniereFois": null,
            "Yeux": null
        }
        const ippe = await requeteKnex.getIPPE(resultat.NomFamille, resultat.Prenom1, resultat.Prenom2, resultat.Masculin, resultat.DateNaissance);
        expect(ippe).toEqual([resultat]);

    }
)
;
