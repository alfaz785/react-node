const { randomBytes, createHash } = require("crypto");
const JWT = require("jsonwebtoken");
const con = require("../connection/sqlDB");
const secretKey = "alfaz";

// HANDLE HASHING PASSWORD ---------------------

const handelHashingPassword = (userPassword) => {
  const salt = randomBytes(11).toString();
  const hashPassword = createHash("sha256", salt)
    .update(userPassword)
    .digest("hex");
  const hashData = {
    salt,
    hashPassword,
  };
  return hashData;
};

// HANDLE VERIFY PASSWORD ---------------------

const handleVerifyPassword = async (plainPassword, userEmail) => {
  try {
    const getQuery = `SELECT * FROM registration_user WHERE email = ?`;
    const [rows] = await con.promise().query(getQuery, [userEmail]);

    if (rows.length !== 1) {
      return "Email Is Not Found";
    }

    const hashApiPassword = rows[0].password;
    const hashApiSalt = rows[0].salt;
    const hashPassword = createHash("sha256", hashApiSalt)
      .update(plainPassword)
      .digest("hex");

    if (hashApiPassword === hashPassword) {
      return "Login Successful";
    } else {
      return "Email Or Password Is Wrong !";
    }
  } catch (err) {
    return "Error occurred while verifying password";
  }
};

// HANDLE GENERATE AUTH TOKEN ---------------------

const handleGenerateAuthToken = (userData) => {
  if (userData) {
    const token = JWT.sign(userData, secretKey);
    return token;
  }
};

// HANDLE VERIFY AUTH TOKEN ---------------------

const handleVerifyAuthToken = (token) => {
  try {
    if (token) {
      const data = JWT.verify(token, secretKey);
      return data;
    } else {
      return { message: "Token is required" };
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  handelHashingPassword,
  handleGenerateAuthToken,
  handleVerifyAuthToken,
  handleVerifyPassword,
};
