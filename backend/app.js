import express from "express";
import fs from "fs";
import getCorrectWord from "./data/getCorrectWord.js";
import { engine } from "express-handlebars";
import fetchHighscore from "./fetchHighscore.js";
import mongoose from "mongoose";
import {hsItem} from "./src/hsModel.js"
import sortList from './src/sortHighScore.js'

mongoose.connect('mongodb://127.0.0.1:27017/Highscores').then(()=> {
  console.log('Db connected');
});



const app = express();
app.use(express.json());

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

// Function to get the filename of the JavaScript file in the specified directory
function getJsFilename(directory, ending) {
  // Read the contents of the directory
  const files = fs.readdirSync(directory);

  // Filter the files to only include JavaScript files
  const jsFiles = files.filter(file => file.endsWith(`.${ending}`));

  // Return the first JavaScript file found (assuming there's only one)
  return jsFiles[0];
}
const jsFilename = getJsFilename('../frontend/dist/assets/','js');
const cssFilename = getJsFilename('../frontend/dist/assets/','css');

console.log(cssFilename)

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

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

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

app.post("/api/highscore/item", async (req,res) => {
  const itemData = req.body;

  const itemModel = new hsItem(itemData);
  await itemModel.save();

  res.status(201).json(itemData);
})


app.get("/gethighscore", async (req, res) => {
  
  renderPage(res, "react", jsFilename);

});


app.get("/api/highscore/:type/:value", async (req,res) => {
  
  const type = req.params.type;
  const value = req.params.value;
  
  const sortedList = sortList(type, value)
  renderPage(res, "highscore", sortedList);

})

 
app.use("../frontend", express.static("./dist"));
app.use("/assets", express.static("../frontend/dist/assets"));
app.use("/src", express.static("./src"));

export default app;
