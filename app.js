const express = require("express");
const con = require("./connection/sqlDB");

const app = express();

// CONNECT WITH SQL-DB ----------------------

con.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("SQL Data-Base Connected Successfully");
});

// GET METHOD ------------------------

app.get("/", (req, res) => {
  const getQuery = "Select * from registration_user";

  con.query(getQuery, (err, result) => {
    if (err) {
      res.status(500).send("Server SomeThing Went Wrong");
    } else {
      res.json(result);
    }
  });
});

// LISTEN SERVER ---------------------

app.listen("5000", () => {
  console.log(`Server Is Started On 5000`);
});
