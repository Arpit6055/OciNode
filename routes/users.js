var express = require('express');
var router = express.Router();
const { executeQuery } = require('../config/db.js');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const { rows } = await executeQuery('SELECT * FROM users');
    if (!rows || !rows.length) {
      return res.status(204).send();
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
