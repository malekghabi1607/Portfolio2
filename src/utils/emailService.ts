export type ContactForm = { name: string; email: string; message: string };
// Données anti-spam envoyées en plus du formulaire
export type ContactPayload = ContactForm & { website: string; elapsedMs: number };
export type ContactResult = {
  success: boolean;
  error?: string;
  fallbackMailtoUrl?: string;
};

function buildMailtoUrl(data: ContactForm): string {
  const subject = encodeURIComponent(`Nouveau message portfolio - ${data.name}`);
  const body = encodeURIComponent(
    `Nom: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
  );
  return `mailto:malekghabi.education@gmail.com?subject=${subject}&body=${body}`;
}

export async function sendContactEmail(
  data: ContactPayload
): Promise<ContactResult> {
  try {
    const response = await fetch('/.netlify/functions/send-contact-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Le formulaire est momentanement indisponible.',
        fallbackMailtoUrl: buildMailtoUrl(data),
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Contact form error:', err);
    return {
      success: false,
      error: 'Le formulaire est momentanement indisponible.',
      fallbackMailtoUrl: buildMailtoUrl(data),
    };
  }
}
