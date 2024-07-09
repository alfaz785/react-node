const { Router } = require("express");
const con = require("../connection/sqlDB");
const { handelHashingPassword } = require("../controller/userFun");
const router = Router();

// GET METHOD -----------------------------

router.get("/users", (req, res) => {
  const getQuery = "SELECT * FROM registration_user";

  con.query(getQuery, (err, result) => {
    if (err) throw res.status(500).send("Server Error");
    res.json(result);
  });
});

// POST METHOD --------------------------------

router.post("/add-user", (req, res) => {
  const { fullName, email, password } = req.body;
  const { hashPassword, salt } = handelHashingPassword(password);

  const insertQuery = `INSERT INTO registration_user (fullName, email, password, salt) VALUES ('${fullName}', '${email}', '${hashPassword}', '${salt}')`;

  con.query(insertQuery, (err, result) => {
    if (err) throw res.status(500).send("Server Error");
    res.json({ status: "success" });
  });
});

module.exports = router;
