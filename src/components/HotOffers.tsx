import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { platformsConfig } from '@/config/japConfig';

interface PriceRange {
  min: number;
  max: number;
  pricePerUnit: number;
}

export const HotOffers = () => {
  // Funkcja do wyciągnięcia HOT i SUPER HOT ofert
  const getHotOffers = () => {
    const hotOffers: any[] = [];
    const superHotOffers: any[] = [];

    Object.entries(platformsConfig).forEach(([platform, platformData]) => {
      Object.entries(platformData.services).forEach(([serviceName, service]) => {
        service.priceRanges?.forEach((range: PriceRange) => {
          if (range.pricePerUnit) {
            const offer = {
              platform,
              serviceName,
              quantity: range.min,
              price: range.pricePerUnit,
              isSuperHot: false
            };

            // Sprawdź, czy oferta jest HOT lub SUPER HOT
            const isHot = range.min === 2000 && range.max === 2000 && serviceName === 'TikTok Likes' ||
                         range.min === 2500 && range.max === 2500 && serviceName === 'TikTok Followers' ||
                         range.min === 5000 && range.max === 5000 && serviceName === 'TikTok Followers' ||
                         range.min === 1000 && range.max === 1000 && serviceName === 'Instagram Likes' ||
                         range.min === 350 && range.max === 350 && serviceName === 'Instagram Followers' ||
                         range.min === 10000 && range.max === 10000 && serviceName === 'Instagram Followers' ||
                         range.min === 500 && range.max === 500 && serviceName === 'Instagram Views' ||
                         range.min === 350 && range.max === 350 && serviceName === 'Facebook Page Likes (Page/Fanpage Likes)';

            const isSuperHot = range.min === 2500 && range.max === 2500 && serviceName === 'TikTok Views' ||
                              range.min === 50 && range.max === 50 && serviceName === 'Instagram Likes' ||
                              range.min === 750 && range.max === 750 && serviceName === 'Instagram Followers' ||
                              range.min === 1000 && range.max === 1000 && serviceName === 'Instagram Followers' ||
                              range.min === 25000 && range.max === 25000 && serviceName === 'Instagram Views' ||
                              range.min === 1000 && range.max === 1000 && serviceName === 'Facebook Likes (Post Likes)';

            if (isHot) {
              hotOffers.push(offer);
            } else if (isSuperHot) {
              offer.isSuperHot = true;
              superHotOffers.push(offer);
            }
          }
        });
      });
    });

    return [...superHotOffers, ...hotOffers];
  };

  const offers = getHotOffers();

  return (
    <section className="py-24 bg-black">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-x-20 mb-16">
          <div>
            <span className="text-[#a3fc3b] text-sm uppercase tracking-wider mb-4 block">
              HOT OFFERS
            </span>
            <h2 className="text-4xl md:text-[42px] font-bold text-white leading-[1.1] max-w-[600px]">
              Check out our hottest deals!
            </h2>
          </div>
          <div className="lg:max-w-[500px] mt-6 lg:mt-12">
            <p className="text-gray-300 text-lg leading-relaxed">
              Don't miss out on these amazing deals! Limited time offers with the best prices on the market.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="min-w-[300px] bg-[#1a1a1a] rounded-lg p-6 relative overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute top-4 right-4 z-10">
                  {offer.isSuperHot ? (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                      <FontAwesomeIcon icon={faFire} className="text-yellow-300" />
                      SUPER HOT
                    </div>
                  ) : (
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                      <FontAwesomeIcon icon={faFire} className="text-yellow-300" />
                      HOT
                    </div>
                  )}
                </div>
                <div className="pr-24">
                  <h3 className="text-white text-xl font-semibold mb-2 truncate">{offer.serviceName}</h3>
                  <p className="text-gray-400 mb-4">{offer.platform}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#a3fc3b] font-bold text-2xl">{offer.quantity} <span className='text-gray-400 text-sm'>pcs.</span></span>
                    <span className="text-white font-bold text-2xl">${offer.price}</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplikujemy oferty, aby stworzyć efekt nieskończonego przewijania */}
            {offers.map((offer, index) => (
              <div
                key={`duplicate-${index}`}
                className="min-w-[300px] bg-[#1a1a1a] rounded-lg p-6 relative overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute top-4 right-4 z-10">
                  {offer.isSuperHot ? (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                      <FontAwesomeIcon icon={faFire} className="text-yellow-300" />
                      SUPER HOT
                    </div>
                  ) : (
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                      <FontAwesomeIcon icon={faFire} className="text-yellow-300" />
                      HOT
                    </div>
                  )}
                </div>
                <div className="pr-24">
                  <h3 className="text-white text-xl font-semibold mb-2 truncate">{offer.serviceName}</h3>
                  <p className="text-gray-400 mb-4">{offer.platform}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#a3fc3b] font-bold text-2xl">{offer.quantity}</span>
                    <span className="text-white font-bold text-2xl">${offer.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 