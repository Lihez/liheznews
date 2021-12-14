var express = require('express');
var {session,con} = require('../app')


var router = express.Router();

/* GET home page. */
router.get('/', async(req, res) => {
  
  const veri = await new Promise((resolve, reject) => {
    con.query(`SELECT * FROM news ORDER BY id DESC LIMIT 12`, function (err, result) {
        if (err)
            reject(err);
        resolve(result);
    });
});

const spor = await new Promise((resolve, reject) => {
  con.query(`SELECT * FROM news WHERE category='spor' ORDER BY id DESC LIMIT 12`, function (err, result) {
      if (err)
          reject(err);
      resolve(result);
  });
});

const ekonomi = await new Promise((resolve, reject) => {
  con.query(`SELECT * FROM news WHERE category='ekonomi' ORDER BY id DESC LIMIT 12`, function (err, result) {
      if (err)
          reject(err);
      resolve(result);
  });
});

  res.render('index', { 
    title: 'Home - Lehiz News',
    data: veri,
    spor:spor,
    ekonomi:ekonomi
  });
});

module.exports = router;
