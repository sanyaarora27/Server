const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [
{
name: "John",
kidneys: [
{
healthy: false,
},
],
},
];

//? checking kidenys information

app.get("/", (req, res) => {
const johnKidenys = users[0].kidneys;
const noOfKideneys = johnKidenys.length;

const healthResult = users[0].kidneys.filter(checkHealth);

noOfHealthyKideneys = healthResult.length;

function checkHealth(kidney) {
return kidney.healthy ? 1 : 0;
}

const noOfUnhealthyKideneys = noOfKideneys - noOfHealthyKideneys;

res.json({
noOfKideneys,
noOfHealthyKideneys,
noOfUnhealthyKideneys,
});
});

//? Adding new Kideny

app.post("/add", (req, res) => {
const isHealthy = req.body.isHealthy;
users[0].kidneys.push({ healthy: isHealthy });
res.json({
msg: "New Kideny Added !",
});
});

//? Removing all unhealthy kidenys !

app.put("/replace", (req, res) => {
const healthResult = users[0].kidneys.filter(checkHealth);
noOfHealthyKideneys = healthResult.length;
function checkHealth(kidney) {
if (kidney.healthy === false) {
kidney.healthy = true;
}
}

res.json({ msg: "Kideny Replaced !" });
});

//? Removing all unhealthy kidenys !

function isTheiratLeastOneUnhealthyKideny() {
let atLeastOneUnhealthyKideny = false;
for (let i = 0; i < users[0].kidneys.length; i++) {
if (!users[0].kidneys[i].healthy) {
atLeastOneUnhealthyKideny = true;
}
}
return atLeastOneUnhealthyKideny;
}

app.delete("/remove", (req, res) => {
if (isTheiratLeastOneUnhealthyKideny()) {
const kidneys = users[0].kidneys;
const healthyKideneys = [];

kidneys.filter(removeUnhealthy);

function removeUnhealthy(kidney) {
  if (kidney.healthy === true) {
    healthyKideneys.push(kidney);
  }
}
users[0].kidneys = healthyKideneys;

res.json({ msg: "unhealthy Kidenyes Removed !" });
} else {
res.status(411).json({ msg: "unhealthy Kidenyes Removed !" });
}
});

app.listen(3000, () => {
console.log("Server Running on 3000 !");
});