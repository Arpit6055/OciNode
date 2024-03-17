const oracledb = require('oracledb');
require('dotenv').config();

const config = {
  user: process.env.user,
  password: process.env.password,
  connectString: process.env.db_string,
  poolMax: 5, // Adjust pool size as needed (default is 4)
  poolMin: 1, // Adjust pool minimum (default is 0)
};

let pool; // Declare pool variable outside the function

async function createPool() {
  try {
    console.log('Creating connection pool...');
    pool = await oracledb.createPool(config);
    console.log('Connection pool created successfully!');
  } catch (err) {
    console.error('Error creating pool:', err);
    throw err; // Re-throw for proper handling
  }
}

async function getConnection() {
  try {
    if (!pool) {
      await createPool(); // Create pool if it doesn't exist
    }
    const connection = await pool.getConnection();
    console.log('Obtained connection from pool.');
    return connection;
  } catch (err) {
    console.error('Error getting connection:', err);
    throw err; // Re-throw for proper handling
  }
}

async function releaseConnection(connection) {
  try {
    console.log('Releasing connection back to pool.');
    await connection.release();
  } catch (err) {
    console.error('Error releasing connection:', err);
  }
}

// Export the necessary functions
module.exports = {
  getConnection,
  releaseConnection,
};