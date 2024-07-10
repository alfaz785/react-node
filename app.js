const express = require("express");
const con = require("./connection/sqlDB");
const userRoute = require("./routers/user");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();

// CONNECT WITH SQL-DB ----------------------

con.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("SQL Data-Base Connected Successfully");
});

// MIDDLEWARE ----------------------------

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// GET METHOD ------------------------

app.use("/", userRoute);

// LISTEN SERVER ---------------------

app.listen("5000", () => {
  console.log(`Server Is Started On 5000`);
});
