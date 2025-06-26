import app from "./app.js";
import http from "http";

const server = http.createServer(app);

server.listen(process.env.PORT || 5000,()=>{
    console.log('server is running on port', process.env.PORT || 5000);
})