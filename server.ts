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

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for ethics report
  app.post("/api/ethics-report", async (req, res) => {
    const { reporter_name, phone_prefix, phone_middle, phone_last, email, title, content } = req.body;

    if (!reporter_name) {
      return res.status(400).json({ error: "신고자 이름은 필수입니다." });
    }

    try {
      // 1. Save to JSON file
      const reports = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
      const newReport = {
        id: Date.now(),
        reporter_name,
        phone_prefix,
        phone_middle,
        phone_last,
        email,
        title,
        content,
        status: "pending",
        created_at: new Date().toISOString()
      };
      reports.push(newReport);
      fs.writeFileSync(DATA_FILE, JSON.stringify(reports, null, 2));

      // 2. Send Email (Optional)
      const smtpHost = process.env.SMTP_HOST || "smtp.naver.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "465");
      const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (smtpUser && smtpPass) {
        try {
          console.log(`Attempting to send email via ${smtpHost}:${smtpPort} (User: ${smtpUser})`);
          
          const transportConfig: any = {
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: { user: smtpUser, pass: smtpPass },
            tls: {
              rejectUnauthorized: false
            }
          };

          // Special handling for Gmail to improve reliability
          if (smtpHost.toLowerCase().includes("gmail.com")) {
            console.log("Using specialized Gmail service configuration...");
            delete transportConfig.host;
            delete transportConfig.port;
            delete transportConfig.secure;
            transportConfig.service = 'gmail';
          }

          const transporter = nodemailer.createTransport(transportConfig);

          const mailOptions = {
            from: `"윤리경영신고시스템" <${smtpUser}>`,
            to: "dscm@dongsungin.com",
            subject: `[윤리경영위반 신고] ${title}`,
            text: `신고자: ${reporter_name}\n연락처: ${phone_prefix}-${phone_middle}-${phone_last}\n이메일: ${email}\n제목: ${title}\n내용: ${content}`
          };

          await transporter.sendMail(mailOptions);
          console.log("Email notification sent successfully.");
        } catch (emailError: any) {
          console.error("Failed to send email notification:", emailError.message);
          
          if (emailError.message.includes("535")) {
            console.error("--- SMTP AUTHENTICATION FAILURE HELP ---");
            console.error(`Detected Provider: ${smtpHost}`);
            console.error(`Configured User: ${smtpUser}`);
            
            if (smtpHost.toLowerCase().includes("gmail.com")) {
              console.error("GMAIL ERROR 535-5.7.8: This means your password was rejected.");
              console.error("FIX: You MUST use an 'App Password' if 2-Step Verification is enabled.");
              console.error("1. Go to: https://myaccount.google.com/apppasswords");
              console.error("2. Generate a password for 'Mail' and 'Other (Custom Name)'.");
              console.error("3. Copy the 16-character code and paste it into SMTP_PASS in AI Studio Secrets.");
            } else if (smtpHost.toLowerCase().includes("naver.com")) {
              console.error("NAVER ERROR 535: Ensure SMTP is enabled in Naver Mail settings and use an App Password if 2FA is active.");
            }
            console.error("-----------------------------------------");
          }
        }
      } else {
        console.warn("SMTP credentials missing in environment variables (SMTP_USER/SMTP_PASS). Skipping email.");
      }

      res.json({ success: true, message: "신고가 정상적으로 접수되었습니다." });
    } catch (error) {
      console.error("Error processing report:", error);
      res.status(500).json({ error: "처리 중 오류가 발생했습니다." });
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
