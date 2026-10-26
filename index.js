import express from 'express'
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'))

import Especie from './models/Especie.js'
import Dinossauro from './models/Dinossauro.js'
import Paleontologo from './models/Paleontologo.js'

app.get('/', (req, res) => {
    //envio de informação para o EJS
    res.render("index");
})

//dinossauro
app.post('/dinossauro/add', async (req, res) => {
    const {nome,especie,descricao,altura,peso,anodesc,dieta} = req.body
    await Dinossauro.create({nome,especie,descricao,altura,peso,anodesc,dieta})
    res.render("dinossauro/add");
})
app.get('/dinossauro/add', async (req, res) => {
   res.render("dinossauro/add");
})
app.get('/dinossauro', async (req, res) => {
    const dinossauros = await Dinossauro.find()
    res.render("dinossauro/lst", {dinossauros});
})

//update e delete - dinossauro
app.get('/dinossauro/upd/:id',  async(req, res) => {
  //buscar o registro que quero alterar
  const dinossauro = await Dinossauro.findById(req.params.id)
    res.render("dinossauro/upd",{dinossauro});
})

app.get('/dinossauro/del/:id',  async(req, res) => {
    await Dinossauro.findByIdAndDelete(req.params.id)
  const dinossauros = await Dinossauro.find()
    res.render("dinossauro/lst",{dinossauros});
})

app.post('/dinossauro/upd/:id',  async (req, res) => {
  const {id, nome,periodo} = req.body
  await Dinossauro.findByIdAndUpdate(id,{nome,periodo})
  const dinossauros = await Dinossauro.find()
 res.render("dinossauro/lst", {dinossauros});
})



//paleontologo
app.get('/paleontologo', async (req, res) => {
    const paleontologos = await Paleontologo.find()
    res.render("paleontologo/lst", {paleontologos});
})
app.get('/paleontologo/add', async (req, res) => {
   res.render("paleontologo/add");
})
app.post('/paleontologo/add', async (req, res) => {
    const {nome,nascimento,descoberta} = req.body
    await Paleontologo.create({nome,nascimento,descoberta})
    res.render("paleontologo/add");
})

//update e delete - paleontologo
app.get('/paleontologo/upd/:id',  async(req, res) => {
  //buscar o registro que quero alterar
  const paleontologo = await Paleontologo.findById(req.params.id)
    res.render("paleontologo/upd",{paleontologo});
})

app.get('/paleontologo/del/:id',  async(req, res) => {
    await Paleontologo.findByIdAndDelete(req.params.id)
  const paleontologos = await Paleontologo.find()
    res.render("paleontologo/lst",{paleontologos});
})

app.post('/paleontologo/upd/:id',  async (req, res) => {
  const {id, nome,periodo} = req.body
  await Paleontologo.findByIdAndUpdate(id,{nome,periodo})
  const paleontologos = await Paleontologo.find()
 res.render("paleontologo/lst", {paleontologos});
})



//especie
app.get('/especie',  async (req, res) => {
 //listar espécies
const especies = await Especie.find()
 res.render("especie/lst", {especies});

})
app.get('/especie/add',  (req, res) => {
  res.render("especie/add");
})
//Rota POST pra gravar no Banco de Dados
app.post('/especie/add',  async (req, res) => {

  const {nome,periodo} = req.body
  await Especie.create({nome,periodo})
  res.render("especie/add");
})

//update e delete - especie
app.get('/especie/upd/:id',  async(req, res) => {
  //buscar o registro que quero alterar
  const especie = await Especie.findById(req.params.id)
    res.render("especie/upd",{especie});
})

app.get('/especie/del/:id',  async(req, res) => {
    await Especie.findByIdAndDelete(req.params.id)
  const especies = await Especie.find()
    res.render("especie/lst",{especies});
})

app.post('/especie/upd/:id',  async (req, res) => {
  const {id, nome,periodo} = req.body
  await Especie.findByIdAndUpdate(id,{nome,periodo})
  const especies = await Especie.find()
 res.render("especie/lst", {especies});
})


app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});