// const http = require("http");
const express = require("express");

const app = express();

app.get('/',(req, res)=>{
   return res.send("hello from home page using express!");
});

app.get('/about',(req, res)=>{
    return res.send("hello from about page using exprrss !");
});


app.listen(3000, () => console.log("server started!"));
// const myserver = http.createServer(app);
    // const log = `${Date.now()}: New req recived \n`;
    // const myurl = url.parse(req.url, true); 
    // console.log(myurl);
    // console.log(req);
    // fs.appendFile("log.txt", log, (err, data) => {
    //     res.end("hello from server create by virat!");
    //     switch(req.url){
    //         case "/" :
    //             res.end("Homepage");
    //             break;

    //         case "/about":
    //             const username= myurl.query.myname
    //             res.end(`hi, ${username}`); 
    //             res.end("I am virat trivedi");
    //             break;

    //         case "/search" :
    //             const search = myurl.query.search_query;
    //             res.end("Here are your result for "+ search);
    //             break;
    //         case "/contact-us":
    //             res.end("404 Not found");
    //             break;

    //     }
    // });
// myserver.listen(3000, () => console.log("server started"));