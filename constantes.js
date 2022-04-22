const chaineConnexion = {
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: 'AppCRTPDev',
        password: 'Cours4D1',
        database: 'CRTPDev',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
};

// eslint-disable-next-line import/prefer-default-export
module.exports = chaineConnexion;
