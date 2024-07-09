const { randomBytes, createHash } = require("crypto");

const handelHashingPassword = (userPassword) => {
  const salt = randomBytes(11).toString();
  console.log("🚀 ~ handelHashingPassword ~ salt:", salt);
  const hashPassword = createHash("sha256", salt)
    .update(userPassword)
    .digest("hex");
  console.log("🚀 ~ handelHashingPassword ~ hashPassword:", hashPassword);
  const hashData = {
    salt,
    hashPassword,
  };
  return hashData;
};

module.exports = { handelHashingPassword };
