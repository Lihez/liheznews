var express = require('express');
var {session} = require('../app')
var {con} = require('../app')

var router = express.Router();

/* GET home page. */
router.get('/', async(req, res) => {
  res.render('admin/admin', { 
    title: 'Login - Lehiz News',
  });
});

router.post('/', async(req, res) => {

    if(req.session.username != undefined){return res.redirect('/speacialarea/dashboard')}
    if(req.body.username < 1){return res.redirect('/speacialarea')}
    if(req.body.passowrd < 1){return res.redirect('/speacialarea')}
    if(req.body.position < 1){return res.redirect('/speacialarea')}

    const veri = await new Promise((resolve, reject) => {
        con.query(`SELECT * FROM admin WHERE username = ?`, [req.body.username], function (err, result) {
            if (err)
                reject(err);
            resolve(result);
        });
    });
 

  if(veri[0].username < 1){
      return res.redirect('/specialarea')
  }

  if(req.body.password != veri[0].password){
    return res.redirect('/specialarea')
  }

  if(req.body.position != veri[0].position){
    return res.redirect('/specialarea')
  }
  
  console.log(veri[0].username)
  req.session.username == veri[0].username;
  req.session.passowrd == veri[0].password;
  res.redirect('/specialarea/dashboard')
});

router.get('/dashboard', async(req, res) => {

    if(req.session.username == undefined){return res.redirect('/specialarea')}
    if(req.session.username < 1){return res.redirect('/specialarea')}
    if(req.session.passowrd < 1){return res.redirect('/specialarea')}
    if(req.session.position < 1){return res.redirect('/specialarea')}

 const veri = await new Promise((resolve, reject) => {
        con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
            if (err)
                reject(err);
            resolve(result);
        });
    });
 

  if(veri[0].username < 1){return res.redirect('/specialarea')}
  if(req.session.password != veri[0].password){return res.redirect('/specialarea')}

    res.render('admin/dashboard', { 
      title: 'Dashboard - Lehiz News',
      data:veri,
    });
  });

module.exports = router;
