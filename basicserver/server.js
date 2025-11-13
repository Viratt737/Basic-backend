const http = require('http');
const server = http.createServer((req, res) =>{
    const url = req.url;
    if(url === '/'){
        console.log("home page");
        res.writeHead(200,{ "content-type" :"text/plain"});
        res.end("Home page");

    }
    else if (url ==="/project"){
        res.writeHead(200,{ "content-type" :"text/plain"});
        res.end("projects");
    }
    else{
        res.writeHead(404,{ "content-type" :"text/plain"});
        res.end("error not found that page ");
    }
})

const port = 3000;
server.listen(port,() =>{
    console.log(`server is now listening to port ${port}`);
})