const oracledb = require('oracledb');
require('dotenv').config()

process.env.TNS_ADMIN = '/Wallet_QuantumDB';

async function connectToADB() {
    try {
        // Set up Oracle Instant Client
        // await oracledb.initOracleClient({ libDir: `C:\instantclient_21_13` });

        // Set up database connection
        console.log({           user: process.env.user, password: process.env.password,});
        const connection = await oracledb.getConnection({
            user: process.env.user,
            password: process.env.password,
            connectString: 'quantumdb_tpurgent',
            // walletLocation: `./Wallet_QuantumDB_copy`,
        });

        console.log('Connected to Oracle Autonomous Database');

        // Release the connection
        await connection.close();
    } catch (error) {
        console.error('Error: ', error);
    }
}

connectToADB();
