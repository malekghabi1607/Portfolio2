// src/utils/emailService.ts
import emailjs from '@emailjs/browser';

export type ContactForm = { name: string; email: string; message: string };
export type ContactResult = {
  success: boolean;
  error?: string;
  fallbackUsed?: boolean;
  debug?: string;
  fallbackMailtoUrl?: string;
};

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

function buildMailtoUrl(data: ContactForm): string {
  const subject = encodeURIComponent(`Nouveau message portfolio - ${data.name}`);
  const body = encodeURIComponent(
    `Nom: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
  );
  return `mailto:malekghabi.education@gmail.com?subject=${subject}&body=${body}`;
}

function openMailClientFallback(data: ContactForm): boolean {
  if (typeof window === 'undefined') return false;
  window.location.href = buildMailtoUrl(data);
  return true;
}

export async function sendContactEmail(
  data: ContactForm
): Promise<ContactResult> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error('EmailJS non configuré:', { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY });
    const fallbackOpened = openMailClientFallback(data);
    if (fallbackOpened) {
      return {
        success: true,
        fallbackUsed: true,
        debug: 'CONFIG_MISSING: VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY',
        fallbackMailtoUrl: buildMailtoUrl(data)
      };
    }
    return {
      success: false,
      error: 'Configuration EmailJS manquante',
      debug: 'CONFIG_MISSING: fallback mailto impossible',
      fallbackMailtoUrl: buildMailtoUrl(data)
    };
  }

  try {
    // Les noms des variables doivent correspondre à celles définies dans ton template EmailJS
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        // Compatibilite avec differents templates EmailJS
        name: data.name,
        email: data.email,
        title: 'Portfolio Contact',
        time: new Date().toLocaleString('fr-FR'),

        // Variables deja utilisees dans le projet
        from_name: data.name,
        reply_to: data.email,
        message: data.message,
        to_name: 'Malek',
      },
      { publicKey: PUBLIC_KEY }
    );

    return { success: true };
  } catch (err) {
    console.error('Erreur EmailJS:', err);
    const raw =
      err instanceof Error
        ? err.message
        : typeof err === 'string'
        ? err
        : JSON.stringify(err);

    if (raw.includes('Account not found')) {
      return {
        success: false,
        error: 'Compte EmailJS introuvable. Verifie la Public Key, Service ID et Template ID du meme compte.',
        debug: `EMAILJS_ACCOUNT_NOT_FOUND: ${raw}`,
        fallbackMailtoUrl: buildMailtoUrl(data)
      };
    }

    const fallbackOpened = openMailClientFallback(data);
    if (fallbackOpened) {
      return {
        success: true,
        fallbackUsed: true,
        debug: `EMAILJS_ERROR_FALLBACK: ${raw}`,
        fallbackMailtoUrl: buildMailtoUrl(data)
      };
    }
    return {
      success: false,
      error: 'Échec de l’envoi du message',
      debug: `EMAILJS_ERROR: ${raw}`,
      fallbackMailtoUrl: buildMailtoUrl(data)
    };
  }
}
