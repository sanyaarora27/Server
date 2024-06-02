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
}]
}];

//GET - the no of unhealthy kidneys
//query parameters
app.get("/", function (req, res) {
    const johnKidneys = users[0].kidneys; //no of kidneys
    // console.log(johnKidneys);
    const noOfKidneys = johnKidneys.length;
    let noOfHealthyKidneys = 0;
    for (let i = 0; i < johnKidneys.length; i++) {
    if (johnKidneys[i].healthy) {
    noOfHealthyKidneys = noOfHealthyKidneys + 1;
    }
    }
    const noOfUnhealthyKidneys = noOfKidneys - noOfHealthyKidneys;
    res.json({
    noOfKidneys,
    noOfHealthyKidneys,
    noOfUnhealthyKidneys,
    });
    });
    
    //POST - Add new Kidneys
    //middlewares
    app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
    healthy: isHealthy,
    });
    res.json({
    msg: "Done!",
    });
    });
    
    //PUT - user can replace a kidney , make it healthy
    app.put("/", function (req, res) {
    //if there is no unhealthy kidney
    if (isThereAtLeastOneUnhealthyKidney()) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
    }
    res.json({}); //tell the user that everything is done , if not the request will remain hung
    } else {
    res.status(411).json({
    msg: "all kidneys are already healthy",
    });
    }
    });
    
    //DELETE - User can remove a kidney
    app.delete("/", function (req, res) {
    if (isThereAtLeastOneUnhealthyKidney()) {
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy) {
    newKidneys.push({
    healthy: true,
    });
    }
    }
    users[0].kidneys = newKidneys;
    res.json({
    msg: "done",
    });
    } else {
    res.status(411).json({
    msg: "you have no unhealthy kidney",
    });
    }
    });
    
    function isThereAtLeastOneUnhealthyKidney() {
    //you should return a 411
    //only if at least one unhealthy kidney is there do this , else return 411
    let atLeastOneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
    atLeastOneUnhealthyKidney = true;
    }
    }
    return atLeastOneUnhealthyKidney;
    }

app.listen(3000, () => {
console.log("Server Running on 3000.");
});
