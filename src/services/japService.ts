import { sendDiscordMessage } from './discordService';

const JAP_API_KEY = process.env.JAP_API_KEY;
const JAP_API_URL = 'https://justanotherpanel.com/api/v2';

export interface JAPOrder {
  service: string;
  link: string;
  quantity: number;
}

export class JAPService {
  static async createOrder(order: JAPOrder) {
    try {
      const response = await fetch(`${JAP_API_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JAP_API_KEY}`
        },
        body: JSON.stringify(order)
      });

      if (!response.ok) {
        throw new Error('Failed to create order in JAP');
      }

      return await response.json();
    } catch (error) {
      console.error('JAP API Error:', error);
      throw error;
    }
  }

  static async checkOrderStatus(orderId: string) {
    try {
      const response = await fetch(`${JAP_API_URL}/order/status/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${JAP_API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to check order status');
      }

      return await response.json();
    } catch (error) {
      console.error('JAP API Error:', error);
      throw error;
    }
  }
}

interface JAPOrderParams {
  service: string;  // ID usługi w JAP
  link: string;     // Link do posta/profilu
  quantity: number; // Ilość
}

interface JAPOrderResponse {
  order: number;    // ID zamówienia w JAP
  status: string;   // Status zamówienia
  error?: string;   // Komunikat błędu (jeśli wystąpił)
}

export const placeJAPOrder = async (
  orderId: string,
  params: JAPOrderParams,
  userEmail: string
): Promise<JAPOrderResponse | null> => {
  try {
    const apiKey = process.env.JAP_API_KEY;
    
    if (!apiKey) {
      await sendDiscordMessage('❌ Błąd konfiguracji: Brak klucza API JAP', {
        'ID zamówienia': orderId,
        'Email klienta': userEmail
      });
      throw new Error('JAP API key not configured');
    }
    
    // Logowanie rozpoczęcia składania zamówienia
    await sendDiscordMessage('🔄 Rozpoczęto składanie zamówienia w JAP', {
      'ID zamówienia': orderId,
      'Usługa JAP': params.service,
      'Ilość': params.quantity.toString(),
      'Link': params.link,
      'Email klienta': userEmail
    });
    
    // Wysłanie żądania do JAP API
    const response = await fetch('https://justanotherpanel.com/api/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: apiKey,
        action: 'add',
        service: params.service,
        link: params.link,
        quantity: params.quantity
      })
    });
    
    const data = await response.json();
    
    // Sprawdzenie odpowiedzi
    if (data.error) {
      await sendDiscordMessage(`❌ Błąd zamówienia w JAP: ${data.error}`, {
        'ID zamówienia': orderId,
        'Usługa JAP': params.service,
        'Ilość': params.quantity.toString(),
        'Link': params.link,
        'Email klienta': userEmail,
        'Status transakcji': 'Płatność zrealizowana, ale zamówienie w JAP nie powiodło się'
      });
      return { order: 0, status: 'error', error: data.error };
    }
    
    // Sukces - zamówienie zostało złożone
    await sendDiscordMessage('✅ Zamówienie w JAP zostało złożone pomyślnie', {
      'ID zamówienia': orderId,
      'ID zamówienia JAP': data.order,
      'Usługa JAP': params.service,
      'Ilość': params.quantity.toString(),
      'Link': params.link,
      'Email klienta': userEmail,
      'Status transakcji': 'Zakończona pomyślnie'
    });
    
    return { order: data.order, status: 'success' };
  } catch (error) {
    console.error('Error placing JAP order:', error);
    
    // Logowanie błędu
    await sendDiscordMessage(`❌ Błąd techniczny podczas składania zamówienia w JAP: ${error instanceof Error ? error.message : 'Unknown error'}`, {
      'ID zamówienia': orderId,
      'Usługa JAP': params.service,
      'Ilość': params.quantity.toString(),
      'Link': params.link,
      'Email klienta': userEmail,
      'Status transakcji': 'Płatność zrealizowana, ale wystąpił błąd techniczny przy zamawianiu w JAP'
    });
    
    return null;
  }
};

// Funkcja do sprawdzania stanu konta JAP
export const checkJAPBalance = async (): Promise<number | null> => {
  try {
    const apiKey = process.env.JAP_API_KEY;
    
    if (!apiKey) {
      await sendDiscordMessage('❌ Błąd konfiguracji: Brak klucza API JAP podczas sprawdzania salda');
      throw new Error('JAP API key not configured');
    }
    
    // Wysłanie żądania do JAP API
    const response = await fetch('https://justanotherpanel.com/api/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: apiKey,
        action: 'balance'
      })
    });
    
    const data = await response.json();
    
    // Sprawdzenie odpowiedzi
    if (data.error) {
      await sendDiscordMessage(`❌ Błąd sprawdzania salda JAP: ${data.error}`);
      return null;
    }
    
    return data.balance;
  } catch (error) {
    console.error('Error checking JAP balance:', error);
    await sendDiscordMessage(`❌ Błąd techniczny podczas sprawdzania salda JAP: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}; 