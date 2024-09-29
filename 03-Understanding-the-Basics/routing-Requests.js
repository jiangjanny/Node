const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(`
            <body>
                <form action="/message" method="POST">
                    <input type="text" name="message">
                    <button type="submit">Submit</button>
                </form>
            </body>
        `);
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'DUMMY')
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }

    if (url === '/display-message') {
        fs.readFile('message.txt', (err, data) => {
            if (err) {
                res.write('<html>');
                res.write('<head><title>Error</title></head>');
                res.write('<body><h1>Something went wrong</h1></body>');
                res.write('</html>');
                return res.end();
            }
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Your Message</title></head>');
            res.write(`<body><h1>Your message is: ${data}</h1></body>`);
            res.write('</html>');
            return res.end();
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hi</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
