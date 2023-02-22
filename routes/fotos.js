const express = require('express');
const router = express.Router();

const pool = require('../database')

/* GET users listing. */

router.get('/',async(req, res, next)=> {
  const [url] = await pool.query('SELECT * FROM fotos')
  console.log(url)
  res.render('fotos/grid',{url});
});

router.get('/add',(req,res,next)=>{
  res.render('fotos/add')
})

router.post('/add',async(req,res)=>{
  const {titulo, fotos_url, descripcion}= req.body
  const newFoto ={
    titulo,
    fotos_url,
    descripcion
  }
  await pool.query('INSERT INTO url SET ?',[newFoto])
  res.redirect('/fotos')
})

module.exports = router;
