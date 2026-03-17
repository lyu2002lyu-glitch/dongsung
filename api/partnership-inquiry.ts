import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { company_name, person_name, phone_prefix, phone_middle, phone_last, email, content } = req.body;

  if (!company_name || !person_name) {
    return res.status(400).json({ error: "회사명과 성함은 필수입니다." });
  }

  try {
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
          from: `"업무제휴문의" <${smtpUser}>`,
          to: "yulee@dongsungin.com",
          subject: `[업무 제휴 문의] ${company_name}`,
          text: `회사명: ${company_name}\n담당자: ${person_name}\n연락처: ${phone_prefix}-${phone_middle}-${phone_last}\n이메일: ${email}\n내용: ${content}`
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

    res.status(200).json({ success: true, message: "문의가 정상적으로 접수되었습니다." });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    res.status(500).json({ error: "처리 중 오류가 발생했습니다." });
  }
}
