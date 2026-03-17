import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "ethics_reports.json");
const PARTNERSHIP_FILE = path.join(__dirname, "partnership_inquiries.json");

// Initialize data files if they don't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}
if (!fs.existsSync(PARTNERSHIP_FILE)) {
  fs.writeFileSync(PARTNERSHIP_FILE, JSON.stringify([]));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for ethics report email
  app.post("/api/ethics-report", async (req, res) => {
    const { reporter_name, phone_prefix, phone_middle, phone_last, email, title, content } = req.body;

    if (!reporter_name) {
      return res.status(400).json({ error: "신고자 이름은 필수입니다." });
    }

    try {
      // Send Email
      const smtpHost = process.env.SMTP_HOST || "smtp.naver.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "465");
      const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
      const smtpUser = process.env.SMTP_USER || "dongsung1970@naver.com";
      const smtpPass = process.env.SMTP_PASS || "DKTP59K99YEP";

      if (smtpUser && smtpPass) {
        const transportConfig: any = {
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: { user: smtpUser, pass: smtpPass },
          tls: { rejectUnauthorized: false }
        };

        const transporter = nodemailer.createTransport(transportConfig);

        const mailOptions = {
          from: `"윤리경영신고시스템" <${smtpUser}>`,
          to: "dscm@dongsungin.com",
          subject: `[윤리경영위반 신고] ${title}`,
          text: `신고자: ${reporter_name}\n연락처: ${phone_prefix}-${phone_middle}-${phone_last}\n이메일: ${email}\n제목: ${title}\n내용: ${content}`
        };

        await transporter.sendMail(mailOptions);
        console.log("Ethics report email sent successfully.");
      } else {
        console.warn("SMTP credentials not found.");
      }

      res.json({ success: true, message: "신고가 정상적으로 접수되었습니다." });
    } catch (error: any) {
      console.error("Error processing report email:", error.message);
      res.status(500).json({ error: "이메일 발송 중 오류가 발생했습니다." });
    }
  });

  // API Route for partnership inquiry email
  app.post("/api/partnership-inquiry", async (req, res) => {
    const { company_name, person_name, phone_prefix, phone_middle, phone_last, email, content } = req.body;

    if (!company_name || !person_name) {
      return res.status(400).json({ error: "회사명과 성함은 필수입니다." });
    }

    try {
      // Send Email
      const smtpHost = process.env.SMTP_HOST || "smtp.naver.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "465");
      const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
      const smtpUser = process.env.SMTP_USER || "dongsung1970@naver.com";
      const smtpPass = process.env.SMTP_PASS || "DKTP59K99YEP";

      if (smtpUser && smtpPass) {
        const transportConfig: any = {
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: { user: smtpUser, pass: smtpPass },
          tls: { rejectUnauthorized: false }
        };

        const transporter = nodemailer.createTransport(transportConfig);

        const mailOptions = {
          from: `"업무제휴문의" <${smtpUser}>`,
          to: "yulee@dongsungin.com",
          subject: `[업무 제휴 문의] ${company_name}`,
          text: `회사명: ${company_name}\n담당자: ${person_name}\n연락처: ${phone_prefix}-${phone_middle}-${phone_last}\n이메일: ${email}\n내용: ${content}`
        };

        await transporter.sendMail(mailOptions);
        console.log("Partnership inquiry email sent successfully.");
      } else {
        console.warn("SMTP credentials not found.");
      }

      res.json({ success: true, message: "문의가 정상적으로 접수되었습니다." });
    } catch (error: any) {
      console.error("Error processing inquiry email:", error.message);
      res.status(500).json({ error: "이메일 발송 중 오류가 발생했습니다." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
