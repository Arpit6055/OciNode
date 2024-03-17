const oracledb = require('oracledb');
require('dotenv').config();

const config = {
  user: process.env.user,
  password: process.env.password,
  connectString: process.env.db_string,
};

async function connectToDatabase() {
  try {
    console.log("Trying to connect to DB");
    const connection = await oracledb.getConnection(config);
    console.log('Connected to Autonomous Database!');

    // Return a promise that resolves with a wrapped connection object
    return new Promise((resolve, reject) => {
      resolve({
        connection,
        close: async () => {
          try {
            await connection.close();
            console.log('Connection closed successfully.');
          } catch (err) {
            console.error('Error closing connection:', err);
            reject(err); // Propagate the error if closing fails
          }
        },
      });
    });
  } catch (err) {
    console.error('Error connecting:', err);
    throw err; // Re-throw the error for proper handling
  }
}

// Export the connectToDatabase function
module.exports = {connectToDatabase};
