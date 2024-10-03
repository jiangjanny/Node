const http = require("http");
const bodyParser = require("body-parser")
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded())
// app.use((req, res, next) => {
//   console.log("In the middleware!");
//   next(); // Allows the request to continue to the next middleware in line
// });

app.use('/add-product', (req, res, next) => {
  res.send('<form action="/" method="POST"><input type = "text" name = "message" ><button type="submit">Submit</button></form > ')
})

app.use("/", (req, res, next) => {
  console.log(req.body);
  res.redirect('/')
});

app.use("/use", (req, res, next) => {
  console.log("In the middleware!");
  res.send("<h1>Hello from Express! USE</h1>");
});

// app.use("/", (req, res, next) => {
//   console.log("In the middleware!");
//   res.send("<h1>Hello from Express! HOME</h1>");
// });

const server = http.createServer(app);

server.listen(3000);
