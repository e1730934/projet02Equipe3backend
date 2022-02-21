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



module.exports = {
    connectionCheck
}