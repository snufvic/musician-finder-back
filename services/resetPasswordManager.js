const { getConnection } = require("./sql");
const generator = require("generate-password");
const nodemailer = require("nodemailer");
const config = require("config");

async function checkIfEmailExists(email) {
  const connection = await getConnection();
  const [existInst] = await connection.query(
    `SELECT * FROM musicians WHERE email=?`,
    [email]
  );
  if (existInst[0]) {
    return existInst[0];
  }
  return null;
}

async function generatePassword(email) {
  const connection = await getConnection();

  const password = generator.generate({
    length: 8,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
    strict: true,
  });

  await connection.query(`UPDATE musicians SET password = ? WHERE email=?`, [
    password,
    email,
  ]);

  return password;
}

async function sendEmail(email, password) {
  const transporter = nodemailer.createTransport({
    host: config.get("smtpHost"),
    port: config.get("smtpPORT"),
    auth: {
      user: config.get("smtpUser"),
      pass: config.get("smtpPass"),
    },
  });

  const mailOptions = {
    from: config.get("emailProvider"),
    to: email,
    subject: "Reset password verification code",
    text: `Hello!\r\n Here is your temporary passcode for Musician Finder App:\r\n ${password}`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("E-mail sent: " + info.response);
    }
  });
}

async function updateEncryptedPassword(password, email) {
  const connection = await getConnection();
  await connection.query(`UPDATE musicians SET password = ? WHERE email=?`, [
    password,
    email,
  ]);
}

module.exports = {
  checkIfEmailExists,
  generatePassword,
  sendEmail,
  updateEncryptedPassword,
};
