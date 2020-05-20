const express = require("express");
const app = express();
const safeEval = require("safe-eval");
const bodyParser = require("body-parser");
var port = process.env.PORT || 9090;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/", (req, res) => {
  try {
    const code = req.body.code ? req.body.code : "";
    console.log(code)
    const result = safeEval(code);
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "Internal server error",
      message: "Something went wrong",
    });
  }
});

app.listen(port, () => {
  console.log("Server started on http://localhost:9090");
});
