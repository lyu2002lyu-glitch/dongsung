import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function testSend() {
  const smtpHost = process.env.SMTP_HOST || "smtp.naver.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465");
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.error("SMTP_USER or SMTP_PASS not found in environment variables.");
    return;
  }

  let transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    const mailOptions = {
      from: `"윤리경영신고시스템" <${smtpUser}>`,
      to: "dscm@dongsungin.com",
      subject: `[윤리경영위반 신고] 테스트`,
      html: `<p>테스트</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[SUCCESS] Email sent:`, info);
  } catch (err: any) {
    console.log(`[FAILED]`, err.message);
    if (err.message.includes("535")) {
      console.log("HINT: Invalid login. Check your username/password. For Naver, ensure SMTP is enabled and use an App Password if 2FA is on.");
    }
  }
}

testSend();
