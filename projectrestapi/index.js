const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json")
const app = express();


// middleware

app.use((req, res, next)=>{
    console.log("hello from middleware 1");
    next();
});

app.use((req, res, next)=>{
    fs.appendFile('log.txt',`\n${Date.now()}:${req.ip}: ${req.method}: ${req.path}`, (err, data)=>{
        next();
    });
});


app.get('/users', (req, res)=>{
    const html = `
    <ul>
       ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
});

// api uses with json

app.get('/api/users',(req, res)=>{
    return res.json(users);
});

app.get('/api/users/:id',(req, res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
     return res.json(user);
});

app.post('/api/users',(req, res) =>{
    const body = req.body;
    console.log(body);
    return res.json("status : pending");
});


app.listen(8000, () => console.log("srver started!"));