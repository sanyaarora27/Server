//CREATE AN HTTP SERVER USING EXPRESS
const bodyParser = require("body-parser");
const express= require("express");
const fs= require('fs');

//CREATING THE ROOM
const app= express();

// MIDDLEWARE TO PARSE JSON BODIES
app.use(bodyParser.json());


//LOGGING THE REQUESTS
app.use((req,res,next)=>{
    console.log("Logging the requests");
    next();
});



//TO CHECK THE ITEM BY ID
function findIndex(arr, ID){
    for(let i=0; i< arr.length; i++){   //traversing through whole array
        if(arr[i].ID==ID)               //to find whether the ID of that index is equals the required ID
            return i;                   // If yes, return the ID             
    }
    return -1;                          //else return -1
    
}



//TO REMOVE THE ITEM BY ID
function removeIndex(arr, index){
    let newArray = [];                  //let's create a new array to store the value after the removal of the index
    for(let i=0; i<arr.length;i++){     //traversing through the old array (arr)
        if(i !== index){                   // if the element from arr at i is != to the required index then push that element to the new array (newArray)
            newArray.push(arr[i]);      // element pushed
    }
    return newArray;                    //new array turned
    }
}


// RETRIEVE ALL THE ITEMS
app.get('/todos', (req, res)=> {

    fs.readFile("todos.json", "utf8",(err, data)=>{
        if(err) throw err;
        res.json(JSON.parse(data));
        res.status(200).json({message:"OK"});           //Response: 200 OK with an array of todo items in JSON format.
    
    });
});

//Retrieve a specific todo item by ID
    app.get("/todos/:ID", (req, res)=>{
        fs.readFile("todos.json", "utf8", (err, data)=> 
        {
        if(err) throw err;

            const todos= json.parse(data);
            const todoIndex= findIndex(todos, parseInt(req.params.ID));

            if(todoIndex== -1)
            {
                res.status(404).send();
                console.log("Not found!!!");
            }
            else
            {
                res.json(todos[todoIndex])
                console.log("Successfully Retreived");
            }
        });
});

//Create a new todo item
app.post("/todos", (req, res)=> {
    const newTodo = {
        ID: Math.floor(Math.random() * 1000000), // unique random ID
        title: req.body.title,      //BUY GROCERIES
        description: req.body.description       //I SHOULD BUY GROCERIES
    };
    fs.readFile("todos.json", "utf8", (err, data) => {
        if (err) throw err;
        const todos = JSON.parse(data);
        todos.push(newTodo);

        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(201).json(newTodo);
        });
    });
});

//Update an existing todo item by ID
app.put('/todos/:ID', (req, res)=> {
    fs.readFile("todos.json", "utf8", (err, data) => {
        if (err) throw err;
        const todos = JSON.parse(data);
        const todoIndex = findIndex(todos, parseInt(req.params.ID));
        if (todoIndex === -1) {
        res.status(404).send();
        } else 
        {const updatedTodo = {
            ID: todos[todoIndex].ID,
            title: req.body.title,
            description: req.body.description
        };}                 
        todos[todoIndex]= updatedTodo;

        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
            if (err) throw err;
                res.status(200).json(updatedTodo);
        });
        });
})

//Delete a todo item by ID

app.delete("/todos/:ID", (req, res, next)=>{
    fs.readFile("todos.json", "utf8", (err, data) => {
        if (err)throw err;
        let todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
    res.status(404).send();
    } 
    else {
    todos = removeIndex(todos, todoIndex);
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send();
    });
    }
});
})

//error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});


app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
})
