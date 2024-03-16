const oracledb = require('oracledb');

process.env.TNS_ADMIN = '/Wallet_QuantumDB';

async function connectToADB() {
    try {
        // Set up Oracle Instant Client
        // await oracledb.initOracleClient({ libDir: `C:\instantclient_21_13` });

        // Set up database connection
        const connection = await oracledb.getConnection({
            user: 'admin',
            password: 'H@3#pQ8Dn$7Zm*F',
            connectString: '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.ap-mumbai-1.oraclecloud.com))(connect_data=(service_name=gd293a7f3373c76_quantumdb_low.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))',
            // // Specify wallet location
            walletLocation: `/Users/Arpit singh/Downloads/Wallet_QuantumDB`,
        });

        console.log('Connected to Oracle Autonomous Database');

        // Release the connection
        await connection.close();
    } catch (error) {
        console.error('Error: ', error);
    }
}

connectToADB();
