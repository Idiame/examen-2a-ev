const express = require('express');
const router = express.Router();

const pool = require('../database')

/* GET users listing. */

router.get('/',async(req, res, next)=> {
  const [fotos] = await pool.query('SELECT * FROM fotos')
  console.log(fotos)
  res.render('fotos/grid',{fotos});
});

router.get('/add',(req,res,next)=>{
  res.render('fotos/add')
});

router.post('/add',async(req,res)=>{
  const {titulo, url, descripcion, likes, dislikes}= req.body
  const newFoto ={
    titulo,
    url,
    descripcion,
    likes : 0,
    dislikes : 0
  }
  await pool.query('INSERT INTO fotos SET ?',[newFoto])
  res.redirect('/fotos')
});


router.get('/delete/:id', async(req,res)=>{
  const {id} = req.params
  console.log([id])
  await pool.query('DELETE FROM fotos WHERE id = ?', [id])
  res.redirect('/fotos')
})


router.get('/edit/:id' ,async(req,res) =>{
  const {id} = req.params
  const [foto] = await pool.query('SELECT * FROM fotos WHERE id = ?', [id])
  console.log(foto)
  res.render('fotos/edit' ,{foto:foto[0]})
})

router.post('/edit/:id', async(req,res)=>{
  const {id} = req.params
  const {titulo, url, descripcion} = req.body
  const newFoto = {
    titulo,
    url,
    descripcion
  }
  await pool.query('UPDATE fotos SET ? WHERE id = ?', [newFoto, id])
  res.redirect('/fotos')
})


router.get('/likes/:id',async(req,res)=>{
  const {id} = req.params
  const {likes} = req.body
  console.log(likes)
  await pool.query('UPDATE FOTOS SET likes = likes+1 WHERE id = ?', [id])
  res.redirect('/fotos')
})

router.get('/dislikes/:id',async(req,res)=>{
  const {id} = req.params
  const {dislikes} = req.body
  console.log(dislikes)
  await pool.query('UPDATE FOTOS SET dislikes = dislikes+1 WHERE id = ?', [id])
  res.redirect('/fotos')
})

router.get('/masvotadas',async(req,res)=>{
  const [fotos] = await pool.query('SELECT * FROM fotos WHERE likes > 5')
  res.render('fotos/grid',{fotos})
})

router.get('/menosvotadas',async(req,res)=>{
  const [fotos] = await pool.query('SELECT * FROM fotos WHERE dislikes > 5')
  res.render('fotos/grid',{fotos})
})


module.exports = router;
