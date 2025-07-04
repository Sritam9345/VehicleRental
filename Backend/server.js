const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3000;
const { initializeSocket } = require('./socket'); 

const server = http.createServer(app);

server.listen(PORT, ()=>{
    console.log(`Listeinig on port ${PORT}`);
    initializeSocket(server); 
});