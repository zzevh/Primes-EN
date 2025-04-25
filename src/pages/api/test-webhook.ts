import { NextApiRequest, NextApiResponse } from 'next';
import { sendDiscordMessage } from '@/services/discordService';
import { checkJAPBalance } from '@/services/japService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Test połączenia z Discord
    await sendDiscordMessage('🧪 Test webhook - Discord działa poprawnie');
    
    // Test połączenia z JAP
    const balance = await checkJAPBalance();
    
    if (balance !== null) {
      await sendDiscordMessage('✅ Test webhook - JAP API działa poprawnie', {
        'Aktualne saldo JAP': balance.toString()
      });
    } else {
      await sendDiscordMessage('❌ Test webhook - Problem z połączeniem do JAP API');
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Test webhook wykonany pomyślnie. Sprawdź Discord, aby zobaczyć wyniki.' 
    });
  } catch (error) {
    console.error('Test webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    await sendDiscordMessage(`❌ Test webhook - Błąd: ${errorMessage}`);
    
    res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  }
} 