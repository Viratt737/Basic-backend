const express = require("express");

const router = express.Router();



router.get('/users', (req, res) => {
    const html = `
    <ul>
       ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
});

// route - get all users
router.get('/api/users', (req, res) => {
    res.setHeader("X-MYName", "Virat trivedi");
    return res.json(users);
});

// route - get user by id
router.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

// route - create new user
router.post('/api/users', async (req, res) => {
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

    res.status(201).json(result);
});

module.exports = routers;