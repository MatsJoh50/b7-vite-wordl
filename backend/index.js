import express from "express";
import fs from "fs/promises";
import getCorrectWord from "./data/getCorrectWord.js"

const app = express()
app.use(express.json());

let items = [];


app.use((req,res, next) => {
  console.log(req.method, req.path);
  next();
});

  app.get('/', async (req, res) => {
    const html = await fs.readFile('../frontend/dist/index.html');
    res.type('html').send(html);
  })

  app.get('/api/randomword/:type/:value', (req, res) => {
    const type = req.params.type;
    const value = req.params.value;
    const word = getCorrectWord(type, value);
    console.log(word);
    res.status(201).json({ word });
});


app.use('/assets', express.static('../frontend/dist/assets'));
app.listen(5080);