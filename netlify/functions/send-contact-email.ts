import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
  MAIL_TO,
} = process.env;

// Anti-spam : délai minimal (ms) entre l'affichage du formulaire et l'envoi,
// et longueurs maximales des champs
const MIN_FILL_TIME_MS = 3000;
const MAX_LENGTHS = { name: 100, email: 254, message: 5000 };

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

    let payload: {
      name?: unknown;
      email?: unknown;
      message?: unknown;
      website?: unknown;
      elapsedMs?: unknown;
    };
    try {
      payload = JSON.parse(event.body || '{}');
    } catch {
      return jsonResponse(400, { error: 'Invalid JSON' });
    }

    // Robot détecté (champ piège rempli, ou envoi trop rapide / hors formulaire) :
    // on répond « ok » sans envoyer, pour ne pas lui indiquer qu'il a été bloqué.
    const elapsedMs = Number(payload.elapsedMs);
    if (payload.website || !Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_TIME_MS) {
      return jsonResponse(200, { status: 'ok' });
    }

    const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
    // Pas de retour à la ligne dans le nom : il est utilisé dans l'objet du mail
    const trimmedName = asText(payload.name).replace(/[\r\n]+/g, ' ');
    const trimmedEmail = asText(payload.email);
    const trimmedMessage = asText(payload.message);

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return jsonResponse(400, { error: 'Missing fields' });
    }

    if (
      trimmedName.length > MAX_LENGTHS.name ||
      trimmedEmail.length > MAX_LENGTHS.email ||
      trimmedMessage.length > MAX_LENGTHS.message
    ) {
      return jsonResponse(400, { error: 'Field too long' });
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
