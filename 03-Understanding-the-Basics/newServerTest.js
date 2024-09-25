const http = require('http')
const server = http.createServer((req, res) => {
    console.log(req);
    process.exit() // 來終止當前進程的函數

})

server.listen(3000)