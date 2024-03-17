const oracledb = require('oracledb');
require('dotenv').config();

const config = {
  user: process.env.user,
  password: process.env.password,
  connectString: process.env.db_string,
  poolMax: 5,
  poolMin: 1,
};

let pool;

async function createPool() {
  try {
    console.log('Creating connection pool...');
    pool = await oracledb.createPool(config);
    console.log('Connection pool created successfully!');
  } catch (err) {
    console.error('Error creating pool:', err);
    throw err;
  }
}

async function getConnection() {
  try {
    if (!pool) {
      await createPool();
    }
    const connection = await pool.getConnection();
    console.log('Obtained connection from pool.');
    return connection;
  } catch (err) {
    console.error('Error getting connection:', err);
    throw err;
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

async function executeQuery(sql, binds = [], options = {}) {
  let connection;
  try {
    connection = await getConnection();
    console.log('Executing query...');
    const result = await connection.execute(sql, binds, options);
    console.log('Query executed successfully!');
    return result;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
}

module.exports = {
  getConnection,
  releaseConnection,
  executeQuery,
};