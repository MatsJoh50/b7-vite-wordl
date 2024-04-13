import express from "express";
import fs from "fs";
import getCorrectWord from "./data/getCorrectWord.js";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import {hsItem} from "./src/hsModel.js"
import sortList from './src/sortHighScore.js'
// import createWordlItem from './src/createWorldItem.js'
import dotenv from "dotenv";
import bodyParser from "body-parser";
import * as uuid from "uuid";

dotenv.config();
mongoose.connect(process.env.DB_URL).then(()=> {
  console.log('Db connected');
});

const GAMES = [];


const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.engine("handlebars", engine({ partialsDir: "./templates/partials" }));
app.set("view engine", "handlebars");
app.set("views", "./templates");

let items = [];

const menuItems = [
  {
    lable: "Game",
    link: "/",
  },
  {
    lable: "High Score",
    link: "/gethighscore",
  },
  {
    lable: "About",
    link: "/about",
  },
];

// Function to get the filename of react files in the specified directory
function getJsFilename(directory, ending) {
  const files = fs.readdirSync(directory);
  const jsFiles = files.filter(file => file.endsWith(`.${ending}`));
  return jsFiles[0];
}
const jsFilename = getJsFilename('../frontend/dist/assets/','js');
const cssFilename = getJsFilename('../frontend/dist/assets/','css');


async function renderPage(res, page, output) {
  res.render(page, {
    menu: menuItems.map((item) => {
      return {
        lable: item.lable,
        link: item.link,
      };
    }),
    css: cssFilename,
    output: output,
  });
}


//   LOG EVERYTHING THAT IS GOING ON
// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   next();
// });

app.get("/", async (req, res) => {

  renderPage(res, "react", jsFilename);
});

app.get("/about", async (req, res) => {
  const html = await fs.readFile('../frontend/dist/about.html');
  renderPage(res, 'about');
});

app.get("/api/randomword/:type/:value", (req, res) => {
  const type = req.params.type;
  const value = req.params.value;
  const word = getCorrectWord(type, value);
  console.log(word);
  res.status(201).json({ word });
});


app.get("/api/games/:type/:value", (req, res) => {

  const type = req.params.type;
  const value = req.params.value;

  const game = {
    correctWord: getCorrectWord(type, value),
    guesses: [],
    id: uuid.v4(),
    startTime: new Date(),
  };

  GAMES.push(game);

  res.status(201).json({id: game.id});
});

app.post("/api/games/:id/guesses", (req, res) => {
  const game = GAMES.find((savedGame) => savedGame.id == req.params.id);
  if(game){
    const guess = req.body.guess;
    game.guesses.push(guess);

    if(guess===game.correctWord){
      
    }
  }
})

app.post("/api/highscore/item", async (req,res) => {
  const itemData = req.body;
  console.log('body', req.body)
  console.log('itemData', itemData)

  const itemModel = new hsItem(itemData);
  await itemModel.save();

res.status(201).json(itemData);
})

app.get("/gethighscore", async (req, res) => {
  renderPage(res, "react", jsFilename);
});

app.get("/api/highscore/:dupe/:value", async (req,res) => {
  
  const dupe = req.params.dupe;
  const words = req.params.value;
  
  const sortedList = await sortList(dupe, words)
  console.log('sorted list express:',sortedList.length)
  renderPage(res, "highscore", sortedList);

})

 
app.use("../frontend", express.static("./dist"));
app.use("/assets", express.static("../frontend/dist/assets"));
app.use("/src", express.static("./src"));

export default app;
