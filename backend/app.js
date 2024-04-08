import express from "express";
import fs from "fs/promises";
import getCorrectWord from "./data/getCorrectWord.js";
import { engine } from "express-handlebars";

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
    link: "/highscore",
  },
  {
    lable: "About",
    link: "/about",
  },
];

const highscore = [
  {
    name: "mats",
    time: "snab som fan",
    dupes: "yes",
    lengthOfWord: 21
  },
  {
    name: "mats",
    time: "snab som fan",
    dupes: "yes",
    lengthOfWord: 21
  },
  {
    name: "mats",
    time: "snab som fan",
    dupes: "yes",
    lengthOfWord: 21
  },
  {
    name: "mats",
    time: "snab som fan",
    dupes: "yes",
    lengthOfWord: 21
  },
]
async function renderPage(res, page) {
  res.render(page, {
    menu: menuItems.map((item) => {
      return {
        lable: item.lable,
        link: item.link,
      };
    }),
    hs: highscore,
  });
}

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get("/", async (req, res) => {
  renderPage(res, "index");
});
app.get("/about", async (req, res) => {
  renderPage(res, "about");
});
app.get("/highscore", async (req, res) => {
  renderPage(res, "highscore");
});

app.get("/api/randomword/:type/:value", (req, res) => {
  const type = req.params.type;
  const value = req.params.value;
  const word = getCorrectWord(type, value);
  console.log(word);
  res.status(201).json({ word });
});

app.use("../frontend", express.static("./dist"));
app.use("/assets", express.static("../frontend/dist/assets"));
app.use("/src", express.static("./src"));

export default app;
