const knex = require('knex')({
	client: 'mssql',
	connection: {
		host: 'sv55.cmaisonneuve.qc.ca',
		user: '4D1EQUIPE04',
		password: 'otn984',
		database: '4D1Equipe04',
		options: {
			enableArithAbort: false
		},
	},
	pool: {min: 0, max: 7}
});

function connectionCheck(loginInfo){
    return knex('Utilisateurs')
    .where('Identifiant', loginInfo.username)
    .andWhere('MotDePasse', loginInfo.password)
}

function ippeData(nom,ddn, prenomUn, prenomDeux, sexe){
	return knex('Personnes')
	.where('NomFamille', nom)
	.andWhere('DateNaissance', ddn)
	.andWhere('Prenom1', prenomUn)
	.andWhere('Prenom2', prenomDeux)
	.andWhere('Masculin', sexe)
	.leftJoin('IPPE', 'Personnes.id', 'IPPE.IdPersonne')
	.leftJoin('Conditions', 'Conditions.IdIPPE', 'IPPE.Id')
	.select('*')
}

function dataFPS(DataIdPersonne){
    return knex('FPS')
    .where('FPS.IdPersonne', DataIdPersonne)
    .join('Personnes', 'FPS.IdPersonne', 'Personnes.Id')
    .select('FPS.*', 
	'Personnes.Race',
	'Personnes.Taille',
	'Personnes.Poids',
	'Personnes.Yeux',
	'Personnes.Cheveux',
	'Personnes.Marques',
	'Personnes.Toxicomanie',
	'Personnes.Desorganise',
	'Personnes.Depressif')
}

module.exports = {
    connectionCheck,
	ippeData,
	dataFPS
}