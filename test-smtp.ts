import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function testSMTP() {
  const smtpHost = process.env.SMTP_HOST || "smtp.naver.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465");
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.error("SMTP_USER or SMTP_PASS not found in environment variables.");
    return;
  }

  const config = {
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass }
  };

  console.log(`Testing config: host ${config.host}, port ${config.port}, secure ${config.secure}, user ${config.auth.user}`);
  const transporter = nodemailer.createTransport(config);
  try {
    await transporter.verify();
    console.log("SUCCESS: SMTP connection verified!");
  } catch (err: any) {
    console.log(`FAILED: ${err.message}`);
    if (err.message.includes("535")) {
      console.log("HINT: Invalid login. Check your username/password. For Naver, ensure SMTP is enabled and use an App Password if 2FA is on.");
    }
  }
}

testSMTP();
