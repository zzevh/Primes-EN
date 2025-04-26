"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const LegalsPage = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'preorder'>('terms');

  return (
    <div className="min-h-screen bg-[#111204] pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Tabs */}
        <div className="flex justify-center mb-12 flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'terms'
                ? 'bg-[#a3fc3b] text-black'
                : 'bg-[#2c3718] text-white hover:bg-[#3a4822]'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'privacy'
                ? 'bg-[#a3fc3b] text-black'
                : 'bg-[#2c3718] text-white hover:bg-[#3a4822]'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('preorder')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'preorder'
                ? 'bg-[#a3fc3b] text-black'
                : 'bg-[#2c3718] text-white hover:bg-[#3a4822]'
            }`}
          >
           Promotion Guidelines
          </button>
        </div>

        {/* Content */}
        <div className="bg-[#1A1A1A]/40 backdrop-blur-sm rounded-[20px] p-8 border border-[#ffffff]/[0.08]">
          {activeTab === 'terms' ? (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8 text-center">TERMS OF SERVICE PRIMES.CC</h1>
              <div className="text-gray-300 space-y-4">
                <p>
                1. Postanowienia ogólne <br />

1.1. Niniejszy regulamin określa zasady korzystania z serwisu Primes.cc, który oferuje usługi związane z promocją mediów społecznościowych (dalej: "Usługi").
1.2. Serwis nie wymaga rejestracji ani logowania. Zamówienia realizowane są jednorazowo.
1.3. Korzystanie z serwisu oznacza akceptację niniejszego regulaminu.
                </p>
                <p>
                2. Zakres usług <br />

2.1. Serwis oferuje usługi związane z promocją kont, postów i filmów w mediach społecznościowych, takich jak lajki, subskrypcje, obserwacje czy wyświetlenia.
2.2. Czas realizacji zamówienia wynosi średnio 3 minuty, jednak maksymalny czas realizacji to 72 godziny.
2.3. Usługi są dostarczane automatycznie po dokonaniu płatności.
                </p>
                <p>
                3. Płatności <br />

3.1. Serwis obsługuje płatności wyłącznie poprzez Stripe (BLIK, Przelewy24, karta płatnicza).
3.2. Cena usługi jest wyświetlana przed zakupem i uzależniona od wybranej ilości.
                </p>
                <p>
                4. Reklamacje i zwroty <br />

4.1. Zwroty nie są oferowane, chyba że wymaga tego prawo.
4.2. Reklamacje można składać poprzez formularz "Kontakt z nami" znajdujący się w stopce strony.
4.3. Reklamacja musi zawierać dowód zakupu oraz pełny screenshot strony /success z datą i godziną.
4.4. Brak wymaganych dowodów skutkuje odrzuceniem reklamacji.
                </p>
                <p>
                5. Odpowiedzialność serwisu <br />

5.1. Serwis nie ponosi odpowiedzialności za skutki korzystania z usług.
5.2. Serwis nie jest powiązany z platformami społecznościowymi, na których promowane są konta.
                </p>
                <p>
                6. Dane osobowe i prywatność <br />

6.1. Serwis zbiera minimalne dane: link do konta/filmu/postu oraz adres e-mail.
6.2. Płatności obsługuje Stripe, który może zbierać dodatkowe dane (np. IP, cookies).
6.3. Dane są widoczne tylko dla Stripe i w prywatnym webhooku Discorda administratora.
                </p>
                <p>
                7. Postanowienia końcowe <br />

7.1. Serwis może wprowadzać zmiany w regulaminie. Korzystanie z usług po zmianach oznacza ich akceptację.
7.2. W sprawach nieuregulowanych niniejszym regulaminem obowiązują przepisy prawa.
                </p>
                <p>Terms of Service written in Polish!</p>
              </div>
            </div>
          ) : activeTab === 'privacy' ? (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8 text-center">POLITYKA PRYWATNOŚCI</h1>
              <div className="text-gray-300 space-y-4">
                <p>
                1. Administrator danych <br />

1.1. Administratorem danych jest właściciel serwisu Primes.cc (dalej: "Administrator").
                </p>
                <p>
                2. Jakie dane zbieramy? <br />

2.1. Link do konta, filmu lub postu (niezbędne do realizacji usługi). <br />
2.2. Adres e-mail (do ewentualnego kontaktu w sprawie zamówienia). <br /> 
2.3. Stripe może zbierać dodatkowe dane (np. adres IP, cookies). <br />
2.4. Facebook Pixel może zbierać dane o aktywności użytkownika na stronie, takie jak odwiedzone podstrony, czas spędzony w serwisie oraz interakcje z treścią. 
                </p>
                <p>
                3. Cel przetwarzania danych <br />

3.1. Dane są przetwarzane wyłącznie w celu realizacji zamówienia. <br />
3.2. Facebook Pixel jest wykorzystywany do analizy ruchu na stronie i optymalizacji reklam.  <br />
3.3 Nie wykorzystujemy danych do newsletterów ani innych form marketingu bezpośredniego.
                </p>
                <p>
                4. Komu udostępniamy dane? <br />

4.1. Dane są przekazywane wyłącznie do Stripe (obsługa płatności) oraz na prywatny serwer Discord (webhook do monitorowania zamówień) oraz Facebook (w ramach działania Facebook Pixel).
                </p>
                <p>
                5. Jak długo przechowujemy dane? <br />

5.1. Dane są przechowywane zgodnie z polityką Stripe. <br />
5.2. Administrator może usunąć dane na żądanie użytkownika. <br />
5.3. Dane zbierane przez Facebook Pixel podlegają polityce prywatności Facebooka.
                </p>
                <p>
                6. Prawa użytkownika <br />

6.1. Użytkownik ma prawo do: 

dostępu do swoich danych,

żądania ich usunięcia,

wniesienia skargi do organu nadzorczego (jeśli uzna, że dane są przetwarzane niezgodnie z prawem).
                </p>
                <p>
                7. Pliki cookies <br />

                7.1. Serwis wykorzystuje pliki cookies w celu poprawy działania strony. <br />
                7.2. Stripe stosuje cookies do obsługi płatności. <br />
                7.3. Facebook Pixel może używać cookies do analizy ruchu i personalizacji reklam.
                </p>
                <p>
                8. Kontakt <br />

8.1. Wszelkie pytania dotyczące prywatności można kierować poprzez formularz "Kontakt z nami".


                </p>
                <p>Privacy Policy written in Polish!</p>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8 text-center">Informacje przed zakupem</h1>
              <div className="text-gray-300 space-y-4">
                <p>
                Aby Twoje zamówienie zostało zrealizowane prawidłowo i bez opóźnień, prosimy o uważne zapoznanie się z poniższymi informacjami:
                </p>
                <h2 className="text-xl font-semibold text-white mt-6 mb-3">1. Poprawny link to podstawa!</h2>
                <p>
                  • Jeśli zamawiasz polubienia, wyświetlenia lub komentarze – podaj link do posta,filmu lub komentarza. <br />
                  • Jeśli zamawiasz obserwacje lub subskrypcje – podaj link do konta/profilu. <br />
                  ⚠️ Błędny link może uniemożliwić realizację usługi – nie ponosimy odpowiedzialności za źle wprowadzony adres.
                </p>
                <h2 className="text-xl font-semibold text-white mt-6 mb-3">2. Czas realizacji</h2>
                <p>
                Usługi są zazwyczaj realizowane w ciągu kilku minut, jednak zastrzegamy sobie maksymalny czas realizacji do 72 godzin.
                </p>
                <h2 className="text-xl font-semibold text-white mt-6 mb-3">3. Brak możliwości działania</h2>
                <p>
                Jeśli podany link jest błędny lub usługa nie może zostać zrealizowana, a klient nie odpowiada na kontakt – zastrzegamy sobie prawo do zakończenia zlecenia bez zwrotu środków.
                </p>
                <h2 className="text-xl font-semibold text-white mt-6 mb-3">UWAGA:</h2>
                <p>
                Nie współpracujemy z platformami typu TikTok, YouTube, Instagram itd. <br />
                Nazwy i logotypy platform są wykorzystywane wyłącznie w celach informacyjnych, aby wskazać, do jakich serwisów odnoszą się nasze usługi. <br /> 
                <br />
                Primes.cc nie jest w żaden sposób powiązany ani stowarzyszony z TikTok, Instagram, YouTube, Facebook, X (Twitter) ani żadną inną platformą mediów społecznościowych. Nazwy i ikonki platform używane są wyłącznie w celach informacyjnych i identyfikacyjnych – dla ułatwienia użytkownikom wyboru odpowiednich usług.

Usługi oferowane przez Primes.cc mają na celu zwiększenie widoczności i aktywności w mediach społecznościowych, jednak nie są oficjalnie wspierane, certyfikowane ani zatwierdzone przez żadną z wymienionych platform.
<br />
<br />
Użytkownik ponosi pełną odpowiedzialność za poprawność wpisanego linku.
Primes nie odpowiada za brak realizacji usługi w przypadku nieprawidłowo wprowadzonego adresu.
Prosimy o dokładne sprawdzenie linku przed złożeniem zamówienia.
                </p>
                <p>Promotion Guidelines written in Polish!</p>
              </div>
            </div>
          )}
        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-[#2c3718] hover:bg-[#3a4822] text-white px-6 py-3 rounded-lg transition-all"
          >
            ← Go back to the home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LegalsPage; 