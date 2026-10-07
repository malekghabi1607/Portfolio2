import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
  MAIL_TO,
} = process.env;

const jsonHeaders = {
  'Content-Type': 'application/json',
};

function jsonResponse(statusCode: number, body: Record<string, string>) {
  return {
    statusCode,
    headers: jsonHeaders,
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return jsonResponse(405, { error: 'Method Not Allowed' });
    }

    const { name, email, message } = JSON.parse(event.body || '{}') as {
      name?: string;
      email?: string;
      message?: string;
    };
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedMessage = message?.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return jsonResponse(400, { error: 'Missing fields' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return jsonResponse(400, { error: 'Invalid email' });
    }

    if (!MAIL_HOST || !MAIL_PORT || !MAIL_USER || !MAIL_PASS || !MAIL_TO) {
      return jsonResponse(500, { error: 'Server email configuration missing' });
    }

    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: Number(MAIL_PORT),
      secure: Number(MAIL_PORT) === 465,
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio" <${MAIL_USER}>`,
      to: MAIL_TO,
      subject: `Nouveau message de ${trimmedName}`,
      replyTo: trimmedEmail,
      text: `Nom: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
    });

    return jsonResponse(200, { status: 'ok' });
  } catch (err: unknown) {
    console.error(err);
    return jsonResponse(500, { error: 'Internal server error' });
  }
};
