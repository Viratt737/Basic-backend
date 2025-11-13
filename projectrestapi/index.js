// const express = require("express");
// const fs = require("fs");
// const mongoose = require("mongoose");
// const users = require("./MOCK_DATA.json")
// const app = express();

// // connnect with mongoo

// mongoose.connect('mongodb://127.0.0.1:27017/firstdatabase-1')
// .then(() => console.log("Mongodb connected"))
// .catch(err => console.log('error is happend', err));


// const userSchema = new mongoose.Schema({
//     firstName:{
//         type : String,
//         required :true,
//     },
//     lastName:{
//         type : String,
//     },
//     email:{
//         type:String,
//         required :true,
//         unique:true,
//     },
//     jobtitle:{
//         type: String,
//     },
//     gender:{
//         type:String,
//     }
// });

// const User = mongoose.model('user',userSchema);


// // middleware

// app.use((req, res, next)=>{
//     console.log("hello from middleware 1");
//     next();
// });

// app.use((req, res, next)=>{
//     fs.appendFile('log.txt',`\n${Date.now()}:${req.ip}: ${req.method}: ${req.path}`, (err, data)=>{
//         next();
//     });
// });


// app.get('/users', (req, res)=>{
//     const html = `
//     <ul>
//        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//     </ul>`;
//     res.send(html);
// });

// // api uses with json

// app.get('/api/users',(req, res)=>{
//     res.setHeader("X-MYName", "Virat trivedi");
//     return res.json(users);
// });

// app.get('/api/users/:id',(req, res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//      return res.json(user);
// });

// app.post('/api/users',async(req, res) =>{
//     const body = req.body;
//     if(!body ||
//       !body.first_name || 
//       !body.last_name || 
//       !body.email || 
//       !body.gender || 
//       !body.job_title){
//     return res.status(201).json({msg : "All field are req ....."});
//     }

//    const result = await User.create({
//         firstName : body.first_name,
//         lastName: body.last_name,
//         email: body.email,
//         gender : body.gender,
//         jobtitle : body.job_title,

//     })
//     console.log("result ", result);
// });


// app.listen(8000, () => console.log("sever started!"));

const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");
const app = express();

// connect with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/firstdatabase-1')
.then(() => console.log("Mongodb connected"))
.catch(err => console.log('error is happend', err));

app.use(express.json());

// middleware
app.use((req, res, next) => {
    console.log("hello from middleware 1");
    next();
});

app.use((req, res, next) => {
    fs.appendFile('log.txt', `\n${Date.now()}:${req.ip}: ${req.method}: ${req.path}`, (err, data) => {
        next();
    });
});

// route - show HTML list
app.get('/users', (req, res) => {
    const html = `
    <ul>
       ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
});

// route - get all users
app.get('/api/users', (req, res) => {
    res.setHeader("X-MYName", "Virat trivedi");
    return res.json(users);
});

// route - get user by id
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

// route - create new user
app.post('/api/users', async (req, res) => {
    const body = req.body;

    if (!body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title) {
        
        return res.status(201).json({ msg: "All fields are required" });
    }

    //Wrong key name "job_title", fixed to "jobtitle"
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobtitle: body.job_title,
    });

    console.log("result ", result);

    // ✅ You didn’t send a response before
    res.status(201).json(result);
});

app.listen(8000, () => console.log("server started!"));
