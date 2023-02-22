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
  const {titulo, url, descripcion}= req.body
  const newFoto ={
    titulo,
    url,
    descripcion
  }
  await pool.query('INSERT INTO fotos SET ?',[newFoto])
  res.redirect('/fotos')
})

router.post('/borrar/:id', async(req,res)=>{
  const {id} = req.params
  await pool.query('DELETE FROM fotos WHERE id = ?', [id])
  res.redirect('fotos')
})



router.get('/edit/:id' ,async(req,res) =>{
  const {id} = req.params
  const [foto] = await pool.query('SELECT * FROM fotos WHERE id = ?', [id])
  console.log(foto)
  res.render('fotos/edit' ,{foto:foto[0]})
})

router.post('/edit/:id', async(req,res)=>{
  const {id } = req.params
  const {titulo, url, descripcion} = req.body
  const newFoto = {
    titulo,
    url,
    descripcion
  }
  await pool.query('UPDATE fotos SET ? WHERE id = ?', [newFoto, id])
  res.redirect('/fotos')
})

module.exports = router;
