import express from "express";
import nodemailer from "nodemailer";
import admin from "firebase-admin";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Firebase init (Aynı kalacak)
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"))
  )
});

const db = admin.firestore();

// Transporter (Aynı kalacak)
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// ZARİF MAIL ŞABLONU OLUŞTURUCU
const createEmailTemplate = (fullname, status, team) => {
  const isApproved = status === 'approved';
  
  // Renkler ve Metinler
  const mainColor = isApproved ? '#27C93F' : '#FF5F56'; // Yeşil veya Kırmızı
  const title = isApproved ? 'Welcome Aboard! 🎉' : 'Application Update';
  
  // İçerik Metinleri (İngilizce)
  let bodyText = '';
  
  if (isApproved) {
    bodyText = `
      <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">
        Congratulations <strong>${fullname}</strong>!
      </p>
      <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">
        We are thrilled to inform you that your application to <strong>Axonode</strong> has been accepted. 
        After reviewing your skills and enthusiasm, we believe you will be a great addition to our community.
      </p>
      <div style="background-color: #F3F4F6; border-left: 4px solid ${mainColor}; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 0; color: #1F2937; font-weight: bold;">Your Assigned Role:</p>
        <p style="margin: 5px 0 0 0; color: ${mainColor}; font-size: 18px; font-weight: 800;">${team || 'General Member'}</p>
      </div>
      <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">
        Please check our Discord server for your new role and further instructions on how to get started. We can't wait to see what you'll build with us!
      </p>
    `;
  } else {
    bodyText = `
      <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">
        Dear <strong>${fullname}</strong>,
      </p>
      <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">
        Thank you for your interest in Axonode and for taking the time to apply. 
      </p>
      <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">
        After careful consideration, we regret to inform you that we cannot move forward with your application at this time. 
        However, we encourage you to improve your portfolio and apply again in the future.
      </p>
    `;
  }

  // HTML İskeleti
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Inter', sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              
              <tr>
                <td align="center" style="padding: 40px 0 20px 0; background-color: #ffffff;">
                   <img src="cid:axonodelogo" width="60" height="60" style="border-radius: 12px;" alt="Axonode Logo"/>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 40px 40px 40px;">
                  <h1 style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 800; text-align: center;">${title}</h1>
                  ${bodyText}
                  
                  ${isApproved ? `
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="https://discord.gg/tst6pnGv5X" style="background-color: ${mainColor}; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Get Started</a>
                  </div>
                  ` : ''}
                </td>
              </tr>

              <tr>
                <td style="background-color: #f3f4f6; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
                    &copy; ${new Date().getFullYear()} Axonode Community. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

app.post("/send-status-mail", async (req, res) => {
  const { applicationId, status, team } = req.body; // team parametresini al

  try {
    const snap = await db.collection("applications").doc(applicationId).get();
    if (!snap.exists) return res.status(404).json({ error: "Başvuru yok" });

    const data = snap.data();
    
    // Şablonu oluştur
    const htmlContent = createEmailTemplate(data.fullname, status, team);
    const subjectLine = status === 'approved' 
      ? "Welcome to the Team! 🎉" 
      : "Update Regarding Your Application";

    await transporter.sendMail({
      from: '"Axonode Team" <noreply@axonode.org>',
      to: data.email,
      subject: subjectLine,
      html: htmlContent,
      attachments: [
        {
          filename: "logo.png",
          path: "logo.png", // Proje klasöründe logo.png olduğundan emin ol
          cid: "axonodelogo"
        }
      ]
    });

    // Firestore güncellemesi (Opsiyonel: Eğer frontend zaten yapıyorsa burası şart değil ama güvenlik için backendde de yapılabilir)
    if (team && status === 'approved') {
        await db.collection("applications").doc(applicationId).update({ team: team });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Mail gönderilemedi" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Backend çalışıyor: http://localhost:3000");
});