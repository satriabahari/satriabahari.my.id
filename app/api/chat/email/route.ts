import * as nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    // Warna Utama & Tekstur
    const primaryColor = "#fbe400";
    const darkColor = "#1e293b";

    const mainContainer = `font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: ${darkColor};`;
    const headerStyle = `background-color: ${primaryColor}; padding: 30px 24px; text-align: center;`;
    const bodyStyle = "padding: 32px; background-color: #ffffff;";
    const footerStyle =
      "padding: 20px; text-align: center; background-color: #f8fafc; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;";

    const buttonStyle = `display: inline-block; padding: 12px 24px; background-color: ${primaryColor}; color: ${darkColor}; text-decoration: none; border-radius: 8px; font-weight: 700; margin-top: 20px;`;
    const quoteStyle = `margin: 20px 0; padding: 16px; border-left: 4px solid ${primaryColor}; background-color: #fffdec; color: #454c00; font-style: italic; line-height: 1.6;`;

    if (body.type === "REPLY_NOTIFICATION") {
      const { targetEmail, senderName, message } = body;

      const htmlReply = `
        <div style="${mainContainer}">
          <div style="${headerStyle}">
            <h1 style="color: ${darkColor}; margin: 0; font-size: 20px; font-weight: bold;">Pesan Kamu Dibalas!</h1>
          </div>
          <div style="${bodyStyle}">
            <p style="font-size: 16px; margin-top: 0;">Halo,</p>
            <p style="font-size: 15px; line-height: 1.5;">
              <strong>${senderName}</strong> baru saja memberikan balasan untuk pesan kamu di Chat Room:
            </p>
            <div style="${quoteStyle}">
              "${message}"
            </div>
            <p style="font-size: 14px; color: #64748b; margin-top: 24px;">Klik tombol di bawah ini untuk melihat percakapan lengkap.</p>
            <a href="https://satriabahari.my.id/chat" style="${buttonStyle}">Buka Chat Room</a>
          </div>
          <div style="${footerStyle}">
            Sent by Satria Bahari Portfolio System • www.satriabahari.my.id • Jambi, Indonesia
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Satria Bahari" <${process.env.NODEMAILER_EMAIL}>`,
        to: targetEmail,
        subject: `Re: Pesan kamu dibalas oleh ${senderName}`,
        html: htmlReply,
      });
    } else {
      const { name, email, message } = body;

      const htmlNewChat = `
        <div style="${mainContainer}">
          <div style="${headerStyle}">
            <h1 style="color: ${darkColor}; margin: 0; font-size: 20px; font-weight: bold;">💬 Chat Room Alert</h1>
          </div>
          <div style="${bodyStyle}">
            <p style="font-size: 16px; margin-top: 0;">Hi Satria,</p>
            <p style="font-size: 15px;">Kamu mendapatkan pesan baru dari seseorang di Chat Room kamu.</p>
            
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #e2e8f0;">
                <p style="margin: 0; font-size: 14px;"><strong>Pengirim:</strong> ${name}</p>
                <p style="margin: 5px 0 0 0; font-size: 14px;"><strong>Email:</strong> ${email}</p>
            </div>

            <div style="${quoteStyle}">
              "${message}"
            </div>
            
            <a href="https://satriabahari.my.id/chat" style="${buttonStyle}">Balas Sekarang</a>
          </div>
          <div style="${footerStyle}">
            Automated Notification System • Portfolio App
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Chat System" <${process.env.NODEMAILER_EMAIL}>`,
        to: "satriaaxel7703@gmail.com",
        subject: `New Message from ${name} 💬`,
        html: htmlNewChat,
      });
    }

    return NextResponse.json({ message: "Sent" });
  } catch (error: any) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
