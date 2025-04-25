import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { platform, service } = req.body;
    console.log('Creating service:', { platform, service });

    // Przygotuj nową usługę
    const newService = {
      id: `${platform.toLowerCase()}-${service.toLowerCase()}`,
      name: service,
      minQuantity: 10,
      maxQuantity: 10000,
      basePrice: 0,
      japServiceId: '',
      qualityOptions: {
        Standard: {
          multiplier: 1,
          japServiceId: '',
          pricePerUnit: 0.01
        },
        Wysoka: {
          multiplier: 1.5,
          japServiceId: '',
          pricePerUnit: 0.015
        },
        Premium: {
          multiplier: 2,
          japServiceId: '',
          pricePerUnit: 0.02,
          maxQuantity: 5000
        }
      },
      extraOptions: {
        fastDelivery: {
          japServiceId: '',
          pricePerUnit: 0.02
        },
        premiumGuarantee: {
          additionalPrice: 2.99
        }
      },
      inputType: 'link'
    };

    // Pobierz aktualną platformę
    const { data: platformData, error: platformError } = await supabase
      .from('platforms')
      .select('services')
      .eq('id', platform.toLowerCase())
      .single();

    if (platformError) {
      console.error('Error fetching platform:', platformError);
      throw platformError;
    }

    console.log('Current platform data:', platformData);

    // Dodaj nową usługę do istniejących
    const updatedServices = {
      ...platformData.services,
      [service]: newService
    };

    console.log('Updated services:', updatedServices);

    // Zaktualizuj platformę z nową usługą
    const { error: updateError } = await supabase
      .from('platforms')
      .update({ services: updatedServices })
      .eq('id', platform.toLowerCase());

    if (updateError) {
      console.error('Error updating platform:', updateError);
      throw updateError;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
} 