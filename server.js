const http = require('http');
const app = require('./app')
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, (error, server) => {
    if (error) throw error;
    console.log(`Server is listening at ${PORT}`)
})