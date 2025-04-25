import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { platform } = req.body;

    // Przygotuj dane platformy
    const platformData = {
      id: platform.toLowerCase(),
      name: platform,
      services: {}
    };

    // Dodaj platformę do Supabase
    const { data, error } = await supabase
      .from('platforms')
      .insert([platformData])
      .select();

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error creating platform:', error);
    res.status(500).json({ error: 'Failed to create platform' });
  }
} 