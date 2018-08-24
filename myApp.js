
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// --> 7)  Mount the Logger middleware here
const myMiddleware = (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
};
app.use("/", myMiddleware);

// --> 11)  Mount the body-parser middleware  here
app.use("/", bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
// app.get("/", (req, res) => res.send("Hello Express"));

/** 3) Serve an HTML file */
const indexPath = __dirname + "/views/index.html";
app.get("/", (req, res) => res.sendFile(indexPath))

/** 4) Serve static assets  */
const publicPath = __dirname + "/public";
app.use("/", express.static(publicPath));

/** 5) serve JSON on a specific route */
// app.get("/json", (req, res) => res.json({"message": "Hello json"}));

/** 6) Use the .env file to configure the app */

app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  return res.json({message});
});
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get(
  "/now", 
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  }, 
  (req, res) => res.send({"time": req.time})
);

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", 
    (req, res) => (res.json({echo: req.params.word}))
);

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

// app.get("/name", (req, res) => (res.json({
//   name: req.query.first + " " + req.query.last
// })));
const queryStringHandler = (req, res) => (res.json({
   name: req.query.first + " " + req.query.last
 }));
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */

// app.get("/name", (req, res) => (res.json({
//   name: req.body.first + " " + req.body.last
// })));
const postHandler = (req, res) => (res.json({
  name: req.body.first + " " + req.body.last
}));

app.route("/name").get(queryStringHandler).post(postHandler);
// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
