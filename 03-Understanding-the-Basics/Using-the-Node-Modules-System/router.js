const fs = require('fs')

const reqesHandler = (req, res) => {
    const url = req.url
    const method = req.method

    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enter</title></head>')
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
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)

        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            fs.writeFileSync('message.txt', message)
        })

        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hi</h1></body>');
    res.write('</html>');
    res.end();
}


module.export = {
    header: reqesHandler,
    someText: 'Some hard coded text'
}

// module.export.handler = reqesHandler
// module.export.someText = 'Some hard coded text'