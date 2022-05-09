# Projet CRPQ
## API

Projet de consultation de base de données pour les étudiants de Technique policière.

Dans le cadre du cours de Projet 2 - 4D1, le projet consiste à réaliser à développer une application capable de simuler l'outil d'interrogation de base de données à la disposition d'un agent de l'ordre lors de ses interventions.

## Cadre d'utilisation
Cette application servira comme outil de formation auz étudiants en Technique policière. Il permettra à l'étudiant de:
- Utiliser un outil de recherche de base de données
- Se familiariser avec les informations récoltées lors d'une interpellation

## Collaborateurs
**Ce projet est développé par:**
* Dan Bagalwa
* David Déchaine
* Charles-Étienne Doucet
* Ryma Merrouchi

**PO :** Marc Levasseur.

## Utilisation
Installation de toutes les dependances:
    `npm i`

Exécution des tests unitaires:
    `npm test`

Détection des erreurs de lint:
    `npm run lint`

Correction des erreurs de lint:
    `npm run fix`

Lancement du serveur:
    `npm run serve`

Le serveur s'exécute sur le port 3000.



## Appel d'API

Ajout/Modification/suppresion dune personne


    Appel API{
        

        GET /personnes/{idPersonne}

        POST /personnes

        PUT /personnes/{idPersonne}

        DELETE /personnes/{idPersonne}

    }


Ajout/Modification d’une adresse de personne


    Appel API{


        GET /personnes/{idPersonne}

        PUT /personnes/{idPersonne}

        }

Ajout/Modification d’une description de personne


    Appel API{


        GET /personnes/{idPersonne}

        PUT /personnes/{idPersonne}
    }