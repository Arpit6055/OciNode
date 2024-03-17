const supertest = require('supertest');
const test = require('unit.js');
const app = require('../app.js');
const { getConnection } = require('../config/db.js'); 

const request = supertest(app);

describe('Database Connection', function() {
  it('should establish a database connection', async function() {
    try {
      const connection = await getConnection();
      test.object(connection).isNotEmpty();
      await connection.close(); // Close the connection after the test
    } catch (error) {
      throw new Error('Failed to establish database connection');
    }
  });
});

describe('GET /', function() {
  it('should respond with HTML', function (done) {
    request.get('/').expect(200).end(function (err, result) {
      test.value(result).hasHeader('content-type', 'text/html; charset=utf-8');
      done(err);
    });
  });
  it('should say Express', function (done) {
    request.get('/').expect(200).end(function (err,result) {
      test.string(result.text).contains('Express');
      done(err);
    });    
  });
});

describe('GET /users', function() {
  it('should respond with status 200 and user data', function(done) {
    request.get('/users')
      .expect(200) // Expect successful status code (adjust based on your API logic)
      .expect('Content-Type', /application\/json/) // Expect JSON response
      .end(function(err, result) {
        if (err) return done(err);

        // console.log({results:result.body});

        done();
      });
  });
});