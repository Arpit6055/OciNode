const oracledb = require('oracledb');
require('dotenv').config()

const config = {
    user: process.env.user,
    password: process.env.password,
    connectString: process.env.db_string,
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
  