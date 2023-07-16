// require elements are added here.
const express = require("express");
const sharp = require("sharp");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const csv = require("csv-parser");
const multer = require("multer");
const fs = require("fs");
const { textSpanIsEmpty } = require("typescript");

// express app
const app = express();
const upload = multer({ dest: "uploads/" });

// Body parser for parsing data from body.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ejs set-up
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Landing Page
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// POST Method for CSV Badge Generator
app.post("/badge-gen", (req, res) => {
  const { name, ieeenum } = req.body;
  async function addTextOnImage(name, ieeenum) {
    try {
      const width = 5600; // width of views file
      const height = 5600; // height of template file

      const text1 = `${name}`; // Full Name
      const text2 = `${ieeenum}`; // IEEE Number
      let template = `${text1}`; // For Renaming Generated File

      const svgImage = `
      <svg width="${width}" height="${height}">
        <style>
        .title {fill:#fff; font-size: 300px; font-weight: bold; font-family:"monospace";}
        </style>
        <text x="50%" y="11%" text-anchor="middle" class="title">${text1}</text>
        <text x="50%" y="22.75%" text-anchor="middle" class="title">${text2}</text>
      </svg>
      `;

      const svgBuffer = Buffer.from(svgImage);
      const image = await sharp("./img/template.png")
        .composite([
          {
            input: svgBuffer,
            top: 2000,
            left: 0,
          },
        ])
        .toFile(`./final-outs/${template}.png`);
      res.redirect(`/download/${template}`);
    } catch (error) {
      console.log(error);
    }
  }
  addTextOnImage(name, ieeenum);
});

// GET Method - For Downloading the File
app.get("/download/:data", (req, res) => {
  const fileName = `${req.params.data}.png`;
  const filePath = path.join(__dirname, "final-outs", fileName);
  res.download(filePath, fileName, (err) => {
    if (err) {
      res.status(404).send("File Not Found");
    }
  });
});

// One-on-one Badge Generator
app.get("/badge-generator", (req, res) => {
  res.render(`data-form.ejs`);
});

// GET for collecting CSV File
app.get("/auto-badge-gen", (req, res) => {
  res.render("auto-gen");
});

// Conversion of CSV to JSON
app.post("/auto-badge-gen", upload.single("csvFile"), (req, res) => {
  const csvFile = req.file;
  if (!csvFile) {
    res.send("NO csv found");
  }
  const results = [];
  fs.createReadStream(csvFile.path)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      // const jsonString = JSON.stringify(results);
      res.render("csvGen", { results });
    });
});

// App listen to PORT 3000
app.listen(3000, () => {
  console.log("App is listening on the port 3000");
});
