'use client';
import { useState } from 'react';
import { platformsConfig } from '@/config/japConfig';

export default function ClientPanel() {
  const [selectedQuantity, setSelectedQuantity] = useState(10);
  const [selectedService, setSelectedService] = useState<string>('');

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedQuantity(Number(event.target.value));
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
  };

  return (
    <div>
      <h1>Wybierz usługę</h1>
      <select value={selectedService} onChange={handleServiceChange}>
        {Object.keys(platformsConfig.TikTok.services).map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>

      <label htmlFor="quantity">Wybierz ilość:</label>
      <input
        type="range"
        id="quantity"
        min="10"
        max="10000"
        step="10"
        value={selectedQuantity}
        onChange={handleQuantityChange}
      />
      <span>{selectedQuantity}</span>

      {/* Możesz dodać przycisk do złożenia zamówienia */}
      <button onClick={() => console.log(`Zamówienie: ${selectedService}, Ilość: ${selectedQuantity}`)}>
        Zamów
      </button>
    </div>
  );
} 