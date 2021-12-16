var express = require('express');
var {session} = require('../app')
var {con} = require('../app')

var router = express.Router();

/* GET home page. */
router.get('/', async(req, res) => {
  res.render('admin/admin', { 
    title: 'Login - Lihez News',
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
  req.session.username = veri[0].username;
  req.session.password = veri[0].password;
  res.redirect('/specialarea/dashboard')
});

router.get('/dashboard', async(req, res) => {

    if(req.session.username == undefined){return res.redirect('/specialarea')}
    if(req.session.username < 1){return res.redirect('/specialarea')}
    if(req.session.passowrd < 1){return res.redirect('/specialarea')}

 const veri = await new Promise((resolve, reject) => {
        con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
            if (err)
                reject(err);
            resolve(result);
        });
    });

  if(veri[0].username < 1){return res.redirect('/specialarea')}
  if(req.session.password != veri[0].password){return res.redirect('/specialarea')}
  if(veri[0].position ==  "user"){return res.redirect('/specialarea')}

    res.render('admin/dashboard', { 
      title: 'Dashboard - Lihez News',
      data:veri,
    });
  });

  router.get('/dashboard/news', async(req, res) => {

    if(req.session.username == undefined){return res.redirect('/specialarea')}
    if(req.session.username < 1){return res.redirect('/specialarea')}
    if(req.session.passowrd < 1){return res.redirect('/specialarea')}

 const veri = await new Promise((resolve, reject) => {
        con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
            if (err)
                reject(err);
            resolve(result);
        });
    });

  if(veri[0].username < 1){return res.redirect('/specialarea')}
  if(req.session.password != veri[0].password){return res.redirect('/specialarea')}
  if(veri[0].position ==  "user"){return res.redirect('/specialarea')}

  const news = await new Promise((resolve, reject) => {
    con.query(`SELECT * FROM news ORDER BY id DESC`, function (err, result) {
        if (err)
            reject(err);
        resolve(result);
    });
});

    res.render('admin/haberler', { 
      title: 'Haberler - Lihez News',
      data:veri,
      news:news
    });
  });

  
  router.get('/dashboard/news/edit/:id', async(req, res) => {

    if(req.session.username == undefined){return res.redirect('/specialarea')}
    if(req.session.username < 1){return res.redirect('/specialarea')}
    if(req.session.passowrd < 1){return res.redirect('/specialarea')}

 const veri = await new Promise((resolve, reject) => {
        con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
            if (err)
                reject(err);
            resolve(result);
        });
    });

  if(veri[0].username < 1){return res.redirect('/specialarea')}
  if(req.session.password != veri[0].password){return res.redirect('/specialarea')}
  if(veri[0].position ==  "user"){return res.redirect('/specialarea')}

  const news = await new Promise((resolve, reject) => {
    con.query(`SELECT * FROM news WHERE id = ?`,[req.params.id], function (err, result) {
        if (err)
            reject(err);
        resolve(result);
    });
});

    res.render('admin/haberidüzenle', { 
      title: 'Haberi düzenle - Lihez News',
      news:news
    });
  });



  router.post('/editnews', async(req, res) => {
    if(req.session.username == undefined){return res.redirect('/specialarea')}
    if(req.session.username < 1){return res.redirect('/specialarea')}
    if(req.session.passowrd < 1){return res.redirect('/specialarea')}

 const veri = await new Promise((resolve, reject) => {
        con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
            if (err)
                reject(err);
            resolve(result);
        });
    });

  if(veri[0].username < 1){return res.redirect('/specialarea')}
  if(req.session.password != veri[0].password){return res.redirect('/specialarea')}

  con.query(`UPDATE news SET title = ?, content = ?, thumbnail = ?, category = ? WHERE id = ?`,[req.body.title,req.body.content,req.body.thumbnail,req.body.category, req.body.id], function (err, result) {
    if (err) console.log(err)
});

  res.redirect(`/haber/${req.body.id}`)
});


router.post('/deletenews', async(req, res) => {
  if(req.session.username == undefined){return res.redirect('/specialarea')}
  if(req.session.username < 1){return res.redirect('/specialarea')}
  if(req.session.passowrd < 1){return res.redirect('/specialarea')}

const veri = await new Promise((resolve, reject) => {
      con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
          if (err)
              reject(err);
          resolve(result);
      });
  });

if(veri[0].username < 1){return res.redirect('/specialarea')}
if(req.session.password != veri[0].password){return res.redirect('/specialarea')}

con.query(`DELETE FROM news WHERE id = ?`,[req.body.id], function (err, result) {
  if (err) console.log(err)
});

res.redirect(`/specialarea/dashboard/news`)
});


router.get('/dashboard/news/new', async(req, res) => {

  if(req.session.username == undefined){return res.redirect('/specialarea')}
  if(req.session.username < 1){return res.redirect('/specialarea')}
  if(req.session.passowrd < 1){return res.redirect('/specialarea')}

const veri = await new Promise((resolve, reject) => {
      con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
          if (err)
              reject(err);
          resolve(result);
      });
  });

if(veri[0].username < 1){return res.redirect('/specialarea')}
if(req.session.password != veri[0].password){return res.redirect('/specialarea')}
if(veri[0].position ==  "user"){return res.redirect('/specialarea')}

  res.render('admin/yenihaber', { 
    title: 'Yeni Haber - Lihez News',
  });
});

router.post('/createnews', async(req, res) => {
  if(req.session.username == undefined){return res.redirect('/specialarea')}
  if(req.session.username < 1){return res.redirect('/specialarea')}
  if(req.session.passowrd < 1){return res.redirect('/specialarea')}

const veri = await new Promise((resolve, reject) => {
      con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
          if (err)
              reject(err);
          resolve(result);
      });
  });

if(veri[0].username < 1){return res.redirect('/specialarea')}
if(req.session.password != veri[0].password){return res.redirect('/specialarea')}

con.query(`INSERT INTO news(title,content,thumbnail,category) VALUE(?,?,?,?)`,[req.body.title,req.body.content,req.body.thumbnail,req.body.category], function (err, result) {
  if (err) console.log(err)
});

res.redirect(`/specialarea/dashboard/news`)
});

router.get('/dashboard/user', async(req, res) => {

  if(req.session.username == undefined){return res.redirect('/specialarea')}
  if(req.session.username < 1){return res.redirect('/specialarea')}
  if(req.session.passowrd < 1){return res.redirect('/specialarea')}

const veri = await new Promise((resolve, reject) => {
      con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
          if (err)
              reject(err);
          resolve(result);
      });
  });

if(veri[0].username < 1){return res.redirect('/specialarea')}
if(req.session.password != veri[0].password){return res.redirect('/specialarea')}
if(veri[0].position !=  "admin"){return res.redirect('/specialarea')}

const user = await new Promise((resolve, reject) => {
  con.query(`SELECT * FROM admin`,function (err, result) {
      if (err)
          reject(err);
      resolve(result);
  });
});

  res.render('admin/users', { 
    title: 'Kullanıcılar - Lihez News',
    data:veri,
    user:user
  });
});

router.get('/dashboard/user/edit/:id', async(req, res) => {


  if(req.session.username == undefined){return res.redirect('/specialarea')}
  if(req.session.username < 1){return res.redirect('/specialarea')}
  if(req.session.passowrd < 1){return res.redirect('/specialarea')}

const veri = await new Promise((resolve, reject) => {
      con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
          if (err)
              reject(err);
          resolve(result);
      });
  });

if(veri[0].username < 1){return res.redirect('/specialarea')}
if(req.session.password != veri[0].password){return res.redirect('/specialarea')}
if(veri[0].position !=  "admin"){return res.redirect('/specialarea')}


const user = await new Promise((resolve, reject) => {
  con.query(`SELECT * FROM admin WHERE id =?`,[req.params.id],function (err, result) {
      if (err)
          reject(err);
      resolve(result);
  });
});
  res.render('admin/edituser', { 
    title: 'Kullanıcıyı düzenle - Lihez News',
    user:user
  });
});



router.post('/edituser', async(req, res) => {
  if(req.session.username == undefined){return res.redirect('/specialarea')}
  if(req.session.username < 1){return res.redirect('/specialarea')}
  if(req.session.passowrd < 1){return res.redirect('/specialarea')}

const veri = await new Promise((resolve, reject) => {
      con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
          if (err)
              reject(err);
          resolve(result);
      });
  });

if(veri[0].username < 1){return res.redirect('/specialarea')}
if(req.session.password != veri[0].password){return res.redirect('/specialarea')}
if(veri[0].position !=  "admin"){return res.redirect('/specialarea')}

con.query(`UPDATE admin SET username = ?, pp = ?, password = ?, position = ? WHERE id = ?`,[req.body.username,req.body.pp,req.body.passowrd,req.body.position, req.body.id], function (err, result) {
  if (err) console.log(err)
});

res.redirect(`/specialarea/dashboard/user`)
});


router.post('/deleteuser', async(req, res) => {
  if(req.session.username == undefined){return res.redirect('/specialarea')}
  if(req.session.username < 1){return res.redirect('/specialarea')}
  if(req.session.passowrd < 1){return res.redirect('/specialarea')}

const veri = await new Promise((resolve, reject) => {
      con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
          if (err)
              reject(err);
          resolve(result);
      });
  });

if(veri[0].username < 1){return res.redirect('/specialarea')}
if(req.session.password != veri[0].password){return res.redirect('/specialarea')}
if(veri[0].position !=  "admin"){return res.redirect('/specialarea')}

con.query(`DELETE FROM admin WHERE id = ?`,[req.body.id], function (err, result) {
if (err) console.log(err)
});

res.redirect(`/specialarea/dashboard/user`)
});


router.get('/dashboard/user/new', async(req, res) => {
  if(req.session.username == undefined){return res.redirect('/specialarea')}
  if(req.session.username < 1){return res.redirect('/specialarea')}
  if(req.session.passowrd < 1){return res.redirect('/specialarea')}

const veri = await new Promise((resolve, reject) => {
      con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
          if (err)
              reject(err);
          resolve(result);
      });
  });

if(veri[0].username < 1){return res.redirect('/specialarea')}
if(req.session.password != veri[0].password){return res.redirect('/specialarea')}
if(veri[0].position !=  "admin"){return res.redirect('/specialarea')}

  res.render('admin/newuser', { 
    title: 'Yeni Kullanıcı - Lihez News',
  });
});

router.post('/createuser', async(req, res) => {
  if(req.session.username == undefined){return res.redirect('/specialarea')}
  if(req.session.username < 1){return res.redirect('/specialarea')}
  if(req.session.passowrd < 1){return res.redirect('/specialarea')}

const veri = await new Promise((resolve, reject) => {
      con.query(`SELECT * FROM admin WHERE username = ?`, [req.session.username], function (err, result) {
          if (err)
              reject(err);
          resolve(result);
      });
  });

if(veri[0].username < 1){return res.redirect('/specialarea')}
if(req.session.password != veri[0].password){return res.redirect('/specialarea')}
if(veri[0].position !=  "admin"){return res.redirect('/specialarea')}

con.query(`INSERT INTO admin(username,pp,password,position) VALUE(?,?,?,?)`,[req.body.username,req.body.pp,req.body.password,req.body.position], function (err, result) {
  if (err) console.log(err)
});

res.redirect(`/specialarea/dashboard/user`)
});

module.exports = router;
