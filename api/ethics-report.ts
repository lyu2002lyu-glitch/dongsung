import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { reporter_name, phone_prefix, phone_middle, phone_last, email, title, content } = req.body;

  if (!reporter_name) {
    return res.status(400).json({ error: "신고자 이름은 필수입니다." });
  }

  try {
    // Note: Vercel is serverless, so we can't save to a local JSON file persistently.
    // In a real app, you would save this to a database like Supabase.
    // For now, we will just send the email.

    // 2. Send Email (Optional)
    const smtpHost = process.env.SMTP_HOST || "smtp.naver.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465");
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const smtpUser = process.env.SMTP_USER || "dongsung1970@naver.com";
    const smtpPass = process.env.SMTP_PASS || "DKTP59K99YEP";

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
          return res.status(500).json({ error: `메일 발송 실패: ${emailError.message}` });
        }
      } else {
        console.warn("SMTP credentials missing in environment variables (SMTP_USER/SMTP_PASS). Skipping email.");
        return res.status(500).json({ error: "서버의 메일 설정(SMTP)이 누락되었습니다. Vercel 환경 변수를 확인해주세요." });
      }

      res.status(200).json({ success: true, message: "신고가 정상적으로 접수되었습니다." });
  } catch (error) {
    console.error("Error processing report:", error);
    res.status(500).json({ error: "처리 중 오류가 발생했습니다." });
  }
}
