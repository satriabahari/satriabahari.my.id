import * as nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Semua field (nama, email, pesan) wajib diisi." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    const htmlTemplate = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #333; border-bottom: 2px solid #0070f3; padding-bottom: 10px;">Pesan Baru dari Portfolio</h2>
        <p style="font-size: 16px; color: #555;">Anda mendapatkan pesan baru dari seseorang yang mengunjungi website Anda.</p>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #888; width: 100px;">Nama:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #333;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #888;">Email:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #333;">${email}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #0070f3; color: #444; font-style: italic;">
          "${message}"
        </div>

        <footer style="margin-top: 30px; font-size: 12px; color: #aaa; text-align: center;">
          Pesan ini dikirim via sistem otomatis Portfolio Satria.
        </footer>
      </div>
    `;

    await transporter.sendMail({
      from: `"${name}" <${process.env.NODEMAILER_EMAIL}>`,
      replyTo: email,
      to: "satriaaxel7703@gmail.com",
      subject: `🚀 Contact Form: ${name}`,
      text: `${message} | Dikirim oleh: ${email}`,
      html: htmlTemplate,
    });

    return NextResponse.json(
      { message: "Email berhasil dikirim!" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json(
      { message: "Gagal mengirim email", error: error.message },
      { status: 500 },
    );
  }
};
