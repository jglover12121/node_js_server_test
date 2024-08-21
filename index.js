const http = require("node:http");

let value = "Hello world";
let history = ["Hello world"];
let requests = 0;

const server = http.createServer((req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const url = req.url;
  if(req.method === "GET"){
    requests++;
    if (url === "/favicon.ico") {
      res.writeHead(204);  // No Content
      res.end();
      return;
    }
    if(url === "/history"){
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(history));
      return;
    }
    if(url === "/value"){
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end(value);
      return;
    }
    if(url === "/requests"){
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end(requests.toString());
      return;
    }
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("api default");
    return;
  }
  if(req.method === "POST"){
    let body = "";
    req.on('data', (chunk)=>{
      body += chunk.toString();
      console.log(body);
    })
    req.on('end', ()=>{
      console.log(body);
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Success!");
      value = body;
      history.push(value);
      requests++;
      return;
    })
  }
})

server.listen(3000, ()=>{
  console.log("Listening at port 3000!")
})