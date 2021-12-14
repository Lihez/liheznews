var express = require('express');
var {session} = require('../app')
var {con} = require('../app')


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

const gündem = await new Promise((resolve, reject) => {
  con.query(`SELECT * FROM news WHERE category='gündem' ORDER BY id DESC LIMIT 12`, function (err, result) {
      if (err)
          reject(err);
      resolve(result);
  });
});

const teknoloji = await new Promise((resolve, reject) => {
  con.query(`SELECT * FROM news WHERE category='teknoloji' ORDER BY id DESC LIMIT 12`, function (err, result) {
      if (err)
          reject(err);
      resolve(result);
  });
});

const magazin = await new Promise((resolve, reject) => {
  con.query(`SELECT * FROM news WHERE category='magazin' ORDER BY id DESC LIMIT 12`, function (err, result) {
      if (err)
          reject(err);
      resolve(result);
  });
});

const dünya = await new Promise((resolve, reject) => {
  con.query(`SELECT * FROM news WHERE category='dünya' ORDER BY id DESC LIMIT 12`, function (err, result) {
      if (err)
          reject(err);
      resolve(result);
  });
});

  res.render('index', { 
    title: 'Home - Lehiz News',
    data: veri,
    spor:spor,
    ekonomi:ekonomi,
    dünya:dünya,
    magazin:magazin,
    gündem:gündem,
    teknoloji:teknoloji
  });
});

module.exports = router;
