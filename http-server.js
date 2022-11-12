const express = require("express");
const app = express();
const low = require("lowdb");
const fs = require("lowdb/adapters/FileSync");
const adapter = new fs("db.json");
const db = low(adapter);

// init the data store
db.defaults({ users: [] }).write();

// data parser - used to parse post data
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })); // what does this mean?
app.use(bodyParser.json());

// serve static files from public directory
app.use(express.static("./public"))

// return all users
app.get("/data", (req, res) => {
  res.send(db.get("users").value());
});

// post route 
// tested this with the cURL command
app.post("/test", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.get("users").push({ username, password }).write();
  res.send(req.body.username + " " + req.body.password);
});

// add user
// will utilitize this route when posting using faker
app.post("/add", (req, res) => {
  const user = {
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    streetaddress: req.body.streetaddress,
    citystatezip: req.body.citystatezip,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    avatar: req.body.avatar,
  };
  db.get("users").push(user).write();
  console.log(get("users").value());
  res.send(get("users").value());
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});


