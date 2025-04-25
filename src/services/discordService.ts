// Serwis do wysyłania wiadomości na Discord poprzez webhook
export const sendDiscordMessage = async (message: string, details?: Record<string, string>) => {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('Discord webhook URL not configured');
      return;
    }
    
    // Formatowanie daty
    const now = new Date();
    const formattedDate = now.toLocaleString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Tworzenie pól z dodatkowymi informacjami
    const fields = details ? Object.entries(details).map(([name, value]) => {
      return {
        name,
        value: String(value),
        inline: true
      };
    }) : [];
    
    // Tworzenie embeda dla Discord
    const embed = {
      title: "Primes - Powiadomienie",
      description: message,
      color: 0xa3fc3b, // Kolor w formacie hex (zielony)
      timestamp: now.toISOString(),
      footer: {
        text: `Primes System | ${formattedDate}`
      },
      fields
    };
    
    // Wysyłanie wiadomości na webhook
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        embeds: [embed]
      })
    });
  } catch (error) {
    console.error('Error sending Discord message:', error);
  }
}; 