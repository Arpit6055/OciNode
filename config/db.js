const oracledb = require('oracledb');
require('dotenv').config()

const config = {
    user: process.env.user,
    password: process.env.password,
    connectString: '(description= (retry_count=1)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.ap-mumbai-1.oraclecloud.com))(connect_data=(service_name=gd293a7f3373c76_quantumdb_low.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))',
  };  

async function connect() {
    try {
        console.log("trying to connect to DB");
      const connection = await oracledb.getConnection(config);
      console.log('Connected to Autonomous Database!');
  
      // Execute your SQL queries here
      const result = await connection.execute('SELECT * FROM users');
      console.log(result.rows);
  
      await connection.close();
    } catch (err) {
      console.error('Error connecting:', err);
    }
  }
  
  connect();
  