//creating an http server using express
const express= require("express");

//creating the clinic
const app=express();


    const users =[{
        name: "Sanya",
        kidneys: [{
            healthy: false
        }]
    }]; 
    
    app.use(express.json());

    app.get("/", function (req, res) {
        const SanyaKidneys = users[0]. kidneys;
        const numberOfKidneys = SanyaKidneys.length;
        let numberOfHealthyKidneys = 0;
        for (let i = 0; i<SanyaKidneys.length; i++) 
        {
            if (SanyaKidneys[i].healthy) 
                {
                numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
                }
        }

        const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
        res. json({
            numberOfKidneys,
            numberOfHealthyKidneys,
            numberOfUnhealthyKidneys
        })
    })

    app.post("/", function(req, res) {
        const isHealthy =req.body.isHealthy;
        users[0].kidneys.push({
            healthy: isHealthy
        })
        res.json ({
            message: "Kidney added successfully"
        })
        // res.json is to send back data
    })


    app.put("/", function(req , res) {
        for(let i = 0 ; i <users[0].kidneys.length ; i++ ) {
            users[0].kidneys[i].healthy=true;
            //here we reset the every kidney status to healthy kidney
        }
        res. json ({
            message: "Kidney updated successfully"
        })
    })


    //removing all the unhealthy kidneys
    app.delete("/", function(req, res){
        if(isThereAtleastOneUnhealthyKidney()) {
    const newKidneys = []; 
    //created a new array such that the new array has only the healthy kidneys

    for (let i = 0; i<users [0].kidneys.length; i++) {
        if (users [0].kidneys[i].healthy) 
        {
            newKidneys.push ({ healthy: true })
        }
    }

    users[0].kidneys = newKidneys;          
    res.json({
        message: "Kidney deleted successfully"
    })
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
})

function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i<users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney
}

//doctor taking a room
app. listen (3000);


 
/*
EDGE CASES: 


TODO :

You need to create 4 routes(4 things that the hospital can do)

GET - User can check how many kidneys they have and their health
POST - User can add a new kidney
PUT - User can replace a kidney, make it healthy
DELETE - User can remove a kidney
*/


/*
    1. what will happen if the person try to delete when there are no kidneys? 

    You should return a status code of 411 i.e. wrong input.


    2. What would happen if they try to make a kidney healthy when all are already healthy?

    
*/