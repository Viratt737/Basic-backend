const express = require("express");
const {connectToMongooseDB} = require("./connect");
const urlRoute = require("./routes/url");
const URL = require('./models/url');
const app = express();
const PORT = 8001;

connectToMongooseDB('mongodb://localhost:27017/short-url')
.then(() => console.log("mongodb connected"));
app.use(express.json())

app.use("/url", urlRoute);
app.get('/:shortId', async (req, res) =>{
     const shortId = req.params.shortId;
     const entry = await URL.findOneAndUpdate({
        shortId
     },{ $push :{
        visitHistory:{
            timestamp: Date.now(),
        }
     },
    }
   );
   res.redirect(entry.redirectURL);
})
app.listen(PORT , ()=> console.log(`Server is started at PORT: ${PORT}`));