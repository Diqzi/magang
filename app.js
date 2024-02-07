const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const expressLayouts = require("express-ejs-layouts");
const xlsx = require("xlsx");
const csv = require("csv-parser");
const fs = require("fs");
const cors = require("cors");
const bcrypt = require("bcrypt");

const path = require("path");

const app = express();
const port = 9000;

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_absen_kksp",
});

db.connect((err) => {
  if (err) throw err;
  console.log("database connected...");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set folder tempat menyimpan file statis (contoh: CSS, JavaScript)
app.use(express.static(path.join(__dirname, "views")));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

// Set view engine menggunakan 'ejs' (atau template engine lainnya)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function (req, res) {
  res.render("login", {
    title: "Login",
    layout: "layouts/auth-layout",
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    layout: "layouts/auth-layout",
  });
});

// app.get('/index', (req, res) => {
//   res.render('index',{
//     title: 'Home',
//     layout: 'layouts/main-layout'
//   });
// });

app.get("/index", function (req, res) {
  res.render("index", {
    title: "Home",
    layout: "layouts/main-layout",
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:9000`);
});
