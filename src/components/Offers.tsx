"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
  faTwitter,
  faSpotify,
  faLinkedin,
  faGoogle,
  faTelegram,
  faDiscord,
  faSnapchat,
  faTwitch
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faStar, faRocket, faShieldAlt, faCheck, faComments, faThumbsUp, faClock as farClock, faShieldHeart, faUserGroup, faLock, faCrown, faLocationDot, faCheckCircle, faTimesCircle, faMoneyBill, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { platformsConfig } from '@/config/japConfig';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons/faMoneyCheck';
import { faDollar } from '@fortawesome/free-solid-svg-icons/faDollar';
import { PlatformKey, ServiceDetails } from '@/types';
import { HotOffers } from './HotOffers';

// Definiujemy typ dla usług
type ServiceKey<P extends PlatformKey> = keyof typeof platformsConfig[P]['services'];

// Definiujemy typ dla usługi
type ServiceType = {
  id: string;
  name: string;
  minQuantity: number;
  maxQuantity: number;
  japServiceId: string;
  priceRanges?: Array<{min: number, max: number, pricePerUnit: number}>;
  pricePerUnit?: number;
  extraOptions?: {
    premiumGuarantee?: {
      additionalPrice: number;
    };
  };
  inputType: string;
};

const platformIcons = [
  { name: 'Facebook', icon: faFacebook, services: ['Polubienia', 'Obserwujący', 'Udostępnienia', 'Wyświetlenia'] },
  { name: 'Instagram', icon: faInstagram, services: ['Obserwujący', 'Polubienia', 'Wyświetlenia', 'Komentarze', 'Relacje'] },
  { name: 'TikTok', icon: faTiktok, services: ['Obserwujący', 'Polubienia', 'Wyświetlenia', 'Udostępnienia', 'Komentarze'] },
  { name: 'YouTube', icon: faYoutube, services: ['Subskrybenci', 'Wyświetlenia', 'Polubienia', 'Komentarze'] },
  { name: 'X (Twitter)', icon: faTwitter, services: ['Obserwujący', 'Polubienia', 'Retweety', 'Wyświetlenia'] },
  { name: 'Spotify', icon: faSpotify, services: ['Obserwujący', 'Odtworzenia', 'Zapisane'] },
  { name: 'LinkedIn', icon: faLinkedin, services: ['Połączenia', 'Obserwujący', 'Reakcje', 'Udostępnienia'] },
  { name: 'Google', icon: faGoogle, services: ['Recenzje', 'Wyświetlenia', 'Opinie'] },
  { name: 'Telegram', icon: faTelegram, services: ['Członkowie kanału', 'Wyświetlenia postów'] },
  { name: 'Discord', icon: faDiscord, services: ['Członkowie serwera', 'Reakcje', 'Online'] },
  { name: 'Snapchat', icon: faSnapchat, services: ['Obserwujący', 'Wyświetlenia historii'] },
  { name: 'Twitch', icon: faTwitch, services: ['Obserwujący', 'Wyświetlenia'] },
  { name: 'Ruch na stronie', icon: faGlobe, services: ['Odwiedziny', 'Czas na stronie', 'Unikalni użytkownicy'] }
];

const Offers = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails>({
    platform: 'TikTok',
    service: '',
    quantity: 10,
    totalPrice: 0,
    extras: {
      premiumGuarantee: false
    },
    accountInfo: {
      type: 'link',
      value: ''
    },
    email: '',
    paymentMethod: ''
  });

  const [showAccountForm, setShowAccountForm] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountLink, setAccountLink] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [accountType, setAccountType] = useState<'nick' | 'link'>('nick');

  const [orderStatus, setOrderStatus] = useState<'pending' | 'success' | 'error' | null>(null);

  const [currentService, setCurrentService] = useState<any | null>(null);

  const [platforms, setPlatforms] = useState<any[]>([]);
  
  const [emailError, setEmailError] = useState("");

  const [formErrors, setFormErrors] = useState({
    accountInfo: '',
    email: '',
    paymentMethod: ''
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const [currency, setCurrency] = useState<'pln' | 'usd'>('pln');
  const [currencySymbol, setCurrencySymbol] = useState('PLN');

  useEffect(() => {
    // Określ walutę na podstawie domeny
    const isEnglishVersion = window.location.hostname.includes('en.primes.cc');
    setCurrency(isEnglishVersion ? 'usd' : 'pln');
    setCurrencySymbol(isEnglishVersion ? '$' : 'PLN');
  }, []);

  // Funkcja pomocnicza do bezpiecznego pobierania usługi
  const getService = (platform: PlatformKey, serviceName: string): ServiceType | null => {
    if (!platformsConfig[platform]?.services || !(serviceName in platformsConfig[platform].services)) {
      return null;
    }
    return platformsConfig[platform].services[serviceName as keyof typeof platformsConfig[typeof platform]['services']];
  };

  const calculatePrice = (quantity: number, selectedService: string, platform: PlatformKey, extras: any) => {
    const service = getService(platform, selectedService);
    if (!service) {
      return 0;
    }
    
    let totalPrice = 0;

    // Znajdź odpowiedni przedział cenowy
    const priceRange = service.priceRanges?.find(
      range => range.min <= quantity && range.max >= quantity
    );

    if (priceRange) {
      totalPrice = priceRange.pricePerUnit;
    } else if (service.pricePerUnit) {
      // Jeśli nie ma przedziałów, użyj standardowej ceny za jednostkę
      totalPrice = service.pricePerUnit * quantity;
    }

    // Dodaj koszty dodatkowych opcji
    if (extras.premiumGuarantee && service.extraOptions?.premiumGuarantee) {
      totalPrice += service.extraOptions.premiumGuarantee.additionalPrice;
    }

    return totalPrice;
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform as PlatformKey);
    setSelectedService(null);
    setServiceDetails(prev => ({
      ...prev,
      platform: platform as PlatformKey,
      service: '',
      quantity: 10
    }));
  };

  const handleServiceSelect = (serviceName: string) => {
    const service = getService(selectedPlatform as PlatformKey, serviceName);
    if (!service) return;
    
    setSelectedService(serviceName);
    setCurrentService(service);
    setServiceDetails(prev => ({
      ...prev,
      service: serviceName,
      quantity: service.minQuantity || 10,
      totalPrice: calculatePrice(service.minQuantity || 10, serviceName, prev.platform as PlatformKey, prev.extras)
    }));
  };

  const handleProceedToPayment = async () => {
    if (!isValidOrder()) {
      alert('Please complete all required fields');
      return;
    }
    
    // Aktualizuj stan przed pokazaniem formularza
    setServiceDetails(prev => ({
      ...prev,
      totalPrice: calculatePrice(
        prev.quantity,
        prev.service,
        prev.platform,
        prev.extras
      )
    }));
    
    setShowAccountForm(true);
  };

  const handleStripePayment = async () => {
    // Resetuj błędy
    setFormErrors({
      accountInfo: '',
      email: '',
      paymentMethod: ''
    });
    
    // Sprawdź wszystkie pola
    let hasErrors = false;
    
    if (!serviceDetails.accountInfo.value) {
      setFormErrors(prev => ({ ...prev, accountInfo: 'This field is required' }));
      hasErrors = true;
    }
    
    if (!serviceDetails.email) {
      setFormErrors(prev => ({ ...prev, email: 'Email address is required' }));
      hasErrors = true;
    } else if (!isValidEmail(serviceDetails.email)) {
      setFormErrors(prev => ({ ...prev, email: 'Please provide a valid email address' }));
      hasErrors = true;
    }
    
    if (!serviceDetails.paymentMethod) {
      setFormErrors(prev => ({ ...prev, paymentMethod: 'Select a payment method' }));
      hasErrors = true;
    }
    
    if (hasErrors) {
      return;
    }
    
    try {
      const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      
      if (!stripePublishableKey) {
        throw new Error('Missing Stripe publishable key');
      }

      if (!serviceDetails.accountInfo.value || !serviceDetails.email) {
        throw new Error('Please fill in all required fields');
      }

      // Generowanie ID zamówienia
      const generateOrderId = () => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = 'PRIMES_ID_';
        for (let i = 0; i < 4; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      };

      const orderId = generateOrderId();
      const currentService = getService(selectedPlatform as PlatformKey, selectedService!);
      if (!currentService) {
        throw new Error('Service not found');
      }

      const totalPrice = calculatePrice(
        serviceDetails.quantity,
        serviceDetails.service,
        serviceDetails.platform as PlatformKey,
        serviceDetails.extras
      );

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice,
          orderDetails: {
            orderId: orderId,
            platform: selectedPlatform,
            service: selectedService,
            quantity: serviceDetails.quantity,
            japServiceId: currentService.japServiceId,
            orderDate: new Date().toISOString(),
            email: serviceDetails.email,
            accountInfo: serviceDetails.accountInfo
          }
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Payment initialization failed');
      }

      const { sessionId } = await response.json();
      const stripe = await loadStripe(stripePublishableKey);

      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Payment error:', error);
      setOrderStatus('error');
    }
  };

  const handlePurchase = () => {
    if (accountType === 'nick' && !accountName) {
      alert("Please provide a nickname!");
      return;
    }
    if (accountType === 'link' && !accountLink) {
      alert("Please provide a link!");
      return;
    }
    if (!email) {
      alert("Please provide an email!");
      return;
    }
    if (!paymentMethod) {
      alert("Please choose your payment method!");
      return;
    }

    const totalPrice = calculatePrice(serviceDetails.quantity, serviceDetails.service, serviceDetails.platform, serviceDetails.extras);

    // Aktualizujemy serviceDetails z aktualną ceną przed przekazaniem do Payment
    const updatedServiceDetails = {
      ...serviceDetails,
      totalPrice: totalPrice
    };
    
    return <Payment serviceDetails={updatedServiceDetails} />;
  };

  const handleQuantityChange = (value: number) => {
    setServiceDetails(prev => ({
      ...prev,
      quantity: value,
      totalPrice: calculatePrice(value, prev.service, prev.platform as PlatformKey, prev.extras)
    }));
  };

  const handleExtraOptionChange = (option: string, value: boolean) => {
    setServiceDetails(prev => ({
      ...prev,
      extras: {
        ...prev.extras,
        [option]: value
      },
      totalPrice: calculatePrice(prev.quantity, prev.service, prev.platform as PlatformKey, {
        ...prev.extras,
        [option]: value
      })
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setServiceDetails(prev => ({
      ...prev,
      email: value
    }));
    
    if (value && !isValidEmail(value)) {
      setEmailError("Please provide a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setServiceDetails(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const renderQuantitySelector = () => {
    if (!selectedPlatform || !selectedService) return null;

    const service = getService(selectedPlatform as PlatformKey, selectedService);
    const priceRanges = service?.priceRanges;

    return (
        <div className="mb-6">
         <label className="block text-white font-medium mb-2">
  {serviceDetails.quantity === 0 || serviceDetails.quantity === service?.minQuantity ? (
    "Select quantity"
  ) : (
    <>
      Selected quantity: <span className='font-extrabold text-[#a3fd3a]'>{serviceDetails.quantity}</span>
    </>
  )}
</label>

            <select
          value=""
          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
          className="bg-[#2c3718] text-white p-2 rounded w-full"
        >
          <option value="" disabled>Select quantity</option>
                {priceRanges?.map((range: { min: number, max: number, pricePerUnit: number }) => (
                    <option key={range.min} value={range.min}>
                        {range.min} {service?.name} = {formatPrice(range.pricePerUnit)} 
                    </option>
                ))}
            </select>
        </div>
    );
  };

  const renderExtraOptions = () => {
    if (!selectedService) return null;

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Additional options</h3>
        <div className="bg-[#2c3718] p-6 rounded-xl relative group">
          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <p className="text-white text-center px-4">This option is not available yet</p>
          </div>
          <label className="flex items-center text-white cursor-not-allowed opacity-70">
            <input
              type="checkbox"
              disabled
              className="mr-3"
            />
             Priority of delivery  (+ {formatPrice(3.99)})
          </label>
        </div>
        <div className="bg-[#2c3718] p-6 rounded-xl mt-5 relative group">
          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <p className="text-white text-center px-4">This option is not available yet</p>
          </div>
          <label className="flex items-center text-white cursor-not-allowed opacity-70">
            <input
              type="checkbox"
              disabled
              className="mr-3"
            />
             Profile kit (+ {formatPrice(6.99)})
          </label>
        </div>
      </div>
    );
  };

  const renderServices = () => {
    if (!selectedPlatform || !platformsConfig[selectedPlatform as keyof typeof platformsConfig]) return null;

    const services = platformsConfig[selectedPlatform as keyof typeof platformsConfig].services;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(services).map(([serviceName, serviceDetails]) => (
          <button
            key={serviceName}
            onClick={() => handleServiceSelect(serviceName)}
            className="bg-[#2c3718] hover:bg-[#3a4822] border border-[#B9FD50]/20 rounded-xl p-6 transition-all duration-300"
          >
            <h3 className="text-white text-lg font-semibold mb-2">{serviceName}</h3>
            <p className="text-[#a3fc3b]">Select to see prices</p>
            </button>
        ))}
      </div>
    );
  };

  const renderServiceDetails = () => {
    if (showAccountForm) {
      return renderAccountForm();
    }

    const displayPrice = serviceDetails.quantity === 0 ? 
      formatPrice(0) : 
      formatPrice(calculatePrice(serviceDetails.quantity, selectedService!, selectedPlatform!, serviceDetails.extras));

    return (
      <div className="max-w-[800px] mx-auto">
        <button
          onClick={() => setSelectedService(null)}
          className="text-[#a3fc3b] mb-8 hover:text-[#8fe032] transition-colors flex items-center"
        >
          ← Return to services
        </button>

        <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-2xl p-8 border border-[#B9FD50]/20">
          <div className="text-center mb-8">
            <span className="text-[#a3fc3b] text-xl font-bold uppercase tracking-wider mb-2 block">
             {selectedService?.toLowerCase()}
            </span>
            <h1 className="text-3xl md:text-3xl font-bold text-white mb-4">
            Efficiently and Expressly  <span className="text-[#a3fc3b]">🚀</span>
            </h1>

            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="flex text-[#a3fc3b]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon key={star} icon={faStar} className="w-5 h-5" />
                ))}
              </div>
              
            </div>

            <p className="text-gray-300 max-w-[600px] mx-auto">
            Get {selectedService?.toLowerCase()} on {selectedPlatform} quickly and easily! Larger amounts will help you increase your reach and popularity immediately.


            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="bg-[#2c3718] rounded-lg p-4 flex items-center gap-3 animate-pulse">
                  <div className="relative">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-yellow-500 text-sm">
                    🔥  Don't miss this opportunity - Promotion limited time!
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-2">
            *A welcome promotion from Primes.
                  </p>
          </div>

          {renderQuantitySelector()}

          {renderExtraOptions()}

          <div className="mb-8 bg-[#2c3718]/50 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Before you buy:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheck} className="text-[#a3fc3b] w-4 h-4" />
                Make sure your profile on {selectedPlatform} is public.
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheck} className="text-[#a3fc3b] w-4 h-4" />
                Likes and comments must be public.
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheck} className="text-[#a3fc3b] w-4 h-4" />
                Your profile must not be age restricted.
              </li>
            </ul>
          </div>

          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="text-3xl font-bold text-white">
                {serviceDetails.quantity === 0 ? formatPrice(0) : displayPrice}
              </div>
              <span className="bg-[#a3fc3b] text-black text-xs px-2 py-1 rounded">BEST PRICE</span>
            </div>
            <button
              onClick={handleProceedToPayment}
              className="bg-[#a3fc3b] hover:bg-[#8fe032] text-black px-8 py-3 rounded-lg font-medium transition w-full"
              disabled={!isValidOrder()}
            >
              Continue
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="flex justify-center items-center gap-5 flex-wrap">
              <img src="/blik.png" alt="Blik" className="w-14 opacity-70" />
            <img src="/visa.png" alt="Visa" className="w-14 opacity-70" />
            <img src="/mastercard.png" alt="Mastercard" className="w-14 opacity-70" />
            <img src="/gpay.png" alt="Google Pay" className="w-14 opacity-70" />
            <img src="/applepay.png" alt="Apple Pay" className="w-14 opacity-70" />
          </div>
        </div>

        
      </div>
    );
  };

 

  const generateOrderId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'PRIMES_ID_';
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const renderAccountForm = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        {orderStatus === 'success' ? (
          <div className="text-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-[#a3fc3b] w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Order accepted for processing!</h2>
            <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-2xl p-6 border border-[#B9FD50]/20 mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Order details:</h3>
              <ul className="space-y-3 text-left">
                <li className="text-gray-300">
                  <span className="font-medium">Order ID:</span> {serviceDetails.orderId}
                </li>
                <li className="text-gray-300">
                  <span className="font-medium">Date of submission:</span> {new Date().toLocaleString('pl-PL')}
                </li>
                <li className="text-gray-300">
                  <span className="font-medium">Platform:</span> {selectedPlatform}
                </li>
                <li className="text-gray-300">
                  <span className="font-medium">Service:</span> {selectedService}
                </li>
                <li className="text-gray-300">
                  <span className="font-medium">Quantity:</span> {serviceDetails.quantity}
                </li>
                <li className="text-gray-300">
                  <span className="font-medium">JAP Service ID:</span> {
                    getService(selectedPlatform as PlatformKey, selectedService!)?.japServiceId || 'N/A'
                  }
                </li>
              </ul>
            </div>
            <p className="text-gray-300 mt-6">If necessary, details will be sent to your email address.</p>
          </div>
        ) : (
          <>
            {currentService?.inputType === 'link' && (
              <div className="mb-6">
                <label className="text-white mb-2 block">Link to account/post/video</label>
                <input
                  type="text"
                  placeholder="eg. https://tiktok.com/@username/video/123456789"
                  value={serviceDetails.accountInfo.value}
                  onChange={(e) => setServiceDetails(prev => ({
                    ...prev,
                    accountInfo: { ...prev.accountInfo, value: e.target.value }
                  }))}
                  className="w-full p-3 rounded-lg bg-[#2c3718] border border-[#B9FD50]/20 text-white"
                />
                 <p className="text-sm text-gray-300 mt-2 block">Enter the correct link - depending on the selected service.</p>
              </div>
            )}

            {currentService?.inputType === 'nick' && (
              <div className="mb-6">
                <label className="text-white mb-2 block">Username</label>
                <input
                  type="text"
                  placeholder="np. @username"
                  value={serviceDetails.accountInfo.value}
                  onChange={(e) => setServiceDetails(prev => ({
                    ...prev,
                    accountInfo: { ...prev.accountInfo, value: e.target.value }
                  }))}
                  className="w-full p-3 rounded-lg bg-[#2c3718] border border-[#B9FD50]/20 text-white"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="text-white mb-2 block">E-mail</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-3 rounded-lg bg-[#2c3718] border border-[#B9FD50]/20 text-white"
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Payment method</h3>
              <div className="bg-[#2c3718] border border-[#B9FD50]/20 p-4 rounded-lg">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="creditCard"
                    checked={serviceDetails.paymentMethod === 'creditCard'}
                    onChange={() => handlePaymentMethodChange('creditCard')}
                    className="mr-3"
                  />
                 CREDIT/DEBIT CARD / STRIPE / PAYPAL
                </label>
              </div>
            </div>

            <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-2xl p-6 border border-[#B9FD50]/20 mb-8">
              <ul className="space-y-4">
             
                <li className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faLock} className="text-[#a3fc3b] w-5 h-5" />
                  <span className="text-gray-300">Without providing a password</span>
                </li>
                <li className="flex items-center gap-3">
                  <FontAwesomeIcon icon={farClock} className="text-[#a3fc3b] w-5 h-5" />
                  <span className="text-gray-300">Quick implementation</span>
                </li>
                <li className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faDollar} className="text-[#a3fc3b] w-5 h-5" />
                  <span className="text-gray-300">Super price!</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-100/10 rounded-lg p-4 mb-6">
              <p className="text-yellow-300 text-sm">
                ⚠️ Make sure you enter the correct link!
              </p>
              <p className="text-yellow-300 text-sm mt-2">
                ⚠️ Make sure the email address you provided is correct!
              </p>
            </div>

            <div className="mt-8">
            <button
              onClick={handleStripePayment}
                className="bg-[#a3fc3b] hover:bg-[#8fe032] text-black px-8 py-3 rounded-lg font-medium transition w-full"
                disabled={!isValidFormForPayment()}
            >
                Proceed to payment
            </button>
              <div className="mt-4 flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-gray-400 text-xs">
                I accept{' '}
                  <a href="/legals" className="text-[#a3fc3b] hover:text-[#8fe032]">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/legals" className="text-[#a3fc3b] hover:text-[#8fe032]">Privacy Policy</a>
                  {' '}and{' '}
                  <a href="/legals" className="text-[#a3fc3b] hover:text-[#8fe032]">Promotion Guidelines</a>
                </label>
              </div>
              {!termsAccepted && (
                <p className="text-red-500 text-xs mt-1">
                  * Required
                </p>
              )}
            </div>
          </>
        )}
      </motion.div>
    );
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidOrder = () => {
    if (!selectedPlatform || !selectedService || serviceDetails.quantity === 0) {
      return false;
    }
    
    if (showAccountForm) {
      if (!serviceDetails.accountInfo.value) {
        return false;
      }
      
      if (!isValidEmail(serviceDetails.email)) {
        return false;
      }
      
      if (!serviceDetails.paymentMethod) {
        return false;
      }
    }
    
    return true;
  };

  const isValidFormForPayment = () => {
    if (!serviceDetails.accountInfo.value) {
      return false;
    }
    
    if (!serviceDetails.email || !isValidEmail(serviceDetails.email)) {
      return false;
    }
    
    if (!serviceDetails.paymentMethod) {
      return false;
    }

    if (!termsAccepted) {
      return false;
    }
    
    return true;
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${currencySymbol}`;
  };

  return (
    <div className="min-h-screen bg-black">
      <section className="relative min-h-screen bg-[#111511] pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 right-[15%] hidden md:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(185, 253, 80, 0.15)">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          <div className="absolute bottom-40 left-[10%] hidden md:block">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(185, 253, 80, 0.1)">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          <div className="absolute top-1/3 left-[30%] hidden md:block">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(185, 253, 80, 0.2)">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          <div className="absolute bottom-1/4 right-[20%] hidden md:block">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(185, 253, 80, 0.15)">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {!selectedPlatform ? (
                "Choose your platform"
              ) : !selectedService ? (
                <>Selected: <span className="text-[#a3fc3b]">{selectedPlatform}</span></>
              ) : (
                <>Selected: <span className="text-[#a3fc3b]">{selectedPlatform} / {selectedService}</span></>
              )}
            </h1>
            <p className="text-gray-300 text-lg max-w-[600px] mx-auto">
              {!selectedPlatform ? (
                "We offer comprehensive solutions for the most popular social media platforms"
              ) : !selectedService ? (
                `Select a service for your platform ${selectedPlatform}`
              ) : (
                `${selectedService} on ${selectedPlatform}, to increase the number of new fans and improve your experience in a short period of time.`
              )}
            </p>
            <div className="flex items-center justify-center mb-8">
                    <div className="relative flex items-center gap-3 bg-[#2c3718] rounded-full px-6 py-3 mt-10">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#a3fc3b] rounded-full"></div>
                        <div className="absolute top-0 left-0 w-3 h-3 bg-[#a3fc3b] rounded-full animate-ping"></div>
                        <div className="absolute top-0 left-0 w-3 h-3 bg-[#a3fc3b] rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <span className="text-[#a3fc3b] font-semibold">TikTok & YouTube on the top</span>
                        <span className="text-gray-300 mx-2">•</span>
                        <span className="text-gray-300">This week it is enjoying </span>
                        <span className="text-[#a3fc3b] font-semibold">a lot of attention.</span>
                      </div>
                    </div>
                  </div>
          </div>

          {!selectedPlatform ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.keys(platformsConfig).map((platform) => {
                const iconData = platformIcons.find(p => p.name === platform);
                return (
                  <button
                    key={platform}
                    onClick={() => handlePlatformSelect(platform)}
                    className={`bg-[#2c3718] hover:bg-[#3a4822] border border-[#B9FD50]/20 rounded-xl p-6 transition-all duration-300 group`}
                  >
                    <div className="flex flex-col items-center">
                      <FontAwesomeIcon
                        icon={iconData?.icon || faGlobe}
                        className="text-[#a3fc3b] w-12 h-12 mb-4 group-hover:scale-110 transition-transform"
                      />
                      <h3 className="text-white text-lg font-semibold">{platform}</h3>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : !selectedService ? (
            <div>
              <button
                onClick={() => setSelectedPlatform(null)}
                className="text-[#a3fc3b] mb-8 hover:text-[#8fe032] transition-colors flex items-center"
              >
                ← Return to platforms
              </button>

              <h2 className="text-3xl font-bold text-white mb-8">
                {selectedPlatform} - Available services
              </h2>

              {renderServices()}
            </div>
          ) : (
            renderServiceDetails()
          )}
        </div>
      </section>
      <HotOffers />
    </div>
  );
};

export default Offers; 