import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { platform, service, quality, japServiceId, pricePerUnit } = req.body;

    // Ścieżka do pliku konfiguracyjnego
    const configPath = path.join(process.cwd(), 'src', 'config', 'japConfig.ts');
    
    // Odczytaj aktualną konfigurację
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Przygotuj nową wartość
    const newValue = {
      japServiceId,
      pricePerUnit: parseFloat(pricePerUnit)
    };

    // Zaktualizuj konfigurację
    const platformConfig = eval(`(${configContent})`).platformsConfig;
    platformConfig[platform].services[service].qualityOptions[quality] = {
      ...platformConfig[platform].services[service].qualityOptions[quality],
      ...newValue
    };

    // Zapisz zaktualizowaną konfigurację
    fs.writeFileSync(
      configPath,
      `export const platformsConfig = ${JSON.stringify(platformConfig, null, 2)};`
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
} 