// Główna konfiguracja wszystkich platform i ich usług
export const platformsConfig = {
  // Konfiguracja dla TikToka
  "TikTok": {
    "id": "tiktok",
    "name": "TikTok",
    "services": {
      // Polubienia
      "TikTok Likes": {
        "id": "tiktok-likes",
        "name": "TikTok Likes ",
        "minQuantity": 10,
        "maxQuantity": 10000,
        "japServiceId": "9396", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { "min": 50, "max": 50, "pricePerUnit": 0.50 },
          { "min": 100, "max": 100, "pricePerUnit": 0.80 },
          { "min": 250, "max": 250, "pricePerUnit": 1.90 },
          { "min": 350, "max": 350, "pricePerUnit": 2.65 },
          { "min": 500, "max": 500, "pricePerUnit": 3.85 },
          { "min": 750, "max": 750, "pricePerUnit": 4.95 },
          { "min": 1000, "max": 1000, "pricePerUnit": 7.35 },
          { "min": 1500, "max": 1500, "pricePerUnit": 9.99 },
          { "min": 1800, "max": 1800, "pricePerUnit": 11.99 },
          { "min": 2000, "max": 2000, "pricePerUnit": 14.99 }, // HOT
          { "min": 2500, "max": 2500, "pricePerUnit": 16.99 },
          { "min": 3500, "max": 3500, "pricePerUnit": 24.99 },
          { "min": 3800, "max": 3800, "pricePerUnit": 27.79 },
          { "min": 5000, "max": 5000, "pricePerUnit": 33.99 },
          { "min": 7500, "max": 7500, "pricePerUnit": 46.99 },
          { "min": 8700, "max": 8700, "pricePerUnit": 55.99 },
          { "min": 10000, "max": 10000, "pricePerUnit": 59.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      },
      // Obserwacje
      "TikTok Followers": {
        "id": "tiktok-followers",
        "name": "TikTok Followers",
        "minQuantity": 10,
        "maxQuantity": 10000,
        "japServiceId": "9583", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { "min": 50, "max": 50, "pricePerUnit": 0.55 },
          { "min": 100, "max": 100, "pricePerUnit": 1.25 },
          { "min": 250, "max": 250, "pricePerUnit": 3.00 },
          { "min": 350, "max": 350, "pricePerUnit": 4.20 },
          { "min": 500, "max": 500, "pricePerUnit": 5.99 },
          { "min": 750, "max": 750, "pricePerUnit": 7.99 },
          { "min": 1000, "max": 1000, "pricePerUnit": 11.99 },
          { "min": 1500, "max": 1500, "pricePerUnit": 16.99 },
          { "min": 2500, "max": 2500, "pricePerUnit": 25.99 }, // HOT
          { "min": 3800, "max": 3800, "pricePerUnit": 39.99 },
          { "min": 5000, "max": 5000, "pricePerUnit": 52.99 }, // HOT
          { "min": 7500, "max": 7500, "pricePerUnit": 69.99 },
          { "min": 10000, "max": 10000, "pricePerUnit": 89.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      },
      // Wyświetlenia
      "TikTok Views": {
        "id": "tiktok-views",
        "name": "TikTok Views ",
        "minQuantity": 100,
        "maxQuantity": 10000,
        "japServiceId": "6207", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { min: 500, max: 500, pricePerUnit: 1.00 },
          { min: 750, max: 750, pricePerUnit: 1.99 }, 
          { min: 1000, max: 1000, pricePerUnit: 2.49 },
          { min: 2500, max: 2500, pricePerUnit: 2.89 }, // SUPER HOT
          { min: 3500, max: 3500, pricePerUnit: 3.49 },
          { min: 4800, max: 4800, pricePerUnit: 3.99 },
          { min: 5000, max: 5000, pricePerUnit: 4.49 },
          { min: 7500, max: 7500, pricePerUnit: 5.49 },
          { min: 10000, max: 10000, pricePerUnit: 6.99 },
          { min: 15000, max: 15000, pricePerUnit: 8.99 },
          { min: 25000, max: 25000, pricePerUnit: 9.99 } // HOT
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      }
    }
  },

  "Instagram": {
    "id": "instagram",
    "name": "Instagram",
    "services": {
      "Instagram Likes": {
        "id": "instagram-likes",
        "name": "Instagram Likes",
        "minQuantity": 10,
        "maxQuantity": 10000,
        "japServiceId": "7563", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { min: 25, max: 25, pricePerUnit: 0.50 },
          { min: 50, max: 50, pricePerUnit: 0.85 }, // SUPER HOT
          { min: 100, max: 100, pricePerUnit: 1.00 },
          { min: 250, max: 250, pricePerUnit: 1.39 },
          { min: 350, max: 350, pricePerUnit: 1.99 },
          { min: 500, max: 500, pricePerUnit: 2.99 },
          { min: 750, max: 750, pricePerUnit: 3.69 },
          { min: 1000, max: 1000, pricePerUnit: 4.99 }, // HOT
          { min: 2500, max: 2500, pricePerUnit: 5.49 },
          { min: 2800, max: 2800, pricePerUnit: 5.99 },
          { min: 3500, max: 3500, pricePerUnit: 7.49 },
          { min: 5000, max: 5000, pricePerUnit: 8.99 },
          { min: 7500, max: 7500, pricePerUnit: 9.99 },
          { min: 10000, max: 10000, pricePerUnit: 11.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      },
      "Instagram Followers": {
        "id": "instagram-followers",
        "name": "Instagram Followers",
        "minQuantity": 10,
        "maxQuantity": 10000,
        "japServiceId": "8839", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { min: 100, max: 100, pricePerUnit: 1.10 },
          { min: 250, max: 250, pricePerUnit: 2.29 },
          { min: 350, max: 350, pricePerUnit: 3.39 }, // HOT
          { min: 500, max: 500, pricePerUnit: 4.99 }, 
          { min: 750, max: 750, pricePerUnit: 6.99 }, // SUPER HOT
          { min: 1000, max: 1000, pricePerUnit: 8.99 }, // SUPER HOT
          { min: 2500, max: 2500, pricePerUnit: 16.99 },
          { min: 5000, max: 5000, pricePerUnit: 39.99 },
          { min: 7500, max: 7500, pricePerUnit: 59.99 },
          { min: 10000, max: 10000, pricePerUnit: 82.99 } // HOT
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      },
      "Instagram Views": {
        "id": "instagram-views",
        "name": "Instagram Views",
        "minQuantity": 100,
        "maxQuantity": 50000,
        "japServiceId": "513", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { min: 100, max: 100, pricePerUnit: 0.55 },
          { min: 250, max: 250, pricePerUnit: 0.85 },
          { min: 500, max: 500, pricePerUnit: 1.29 }, // HOT
          { min: 750, max: 750, pricePerUnit: 1.69 },
          { min: 1000, max: 1000, pricePerUnit: 2.99 },
          { min: 1700, max: 1700, pricePerUnit: 3.49 },
          { min: 2500, max: 2500, pricePerUnit: 3.99 },
          { min: 3500, max: 3500, pricePerUnit: 4.99 },
          { min: 5000, max: 5000, pricePerUnit: 6.99 },
          { min: 7500, max: 7500, pricePerUnit: 8.99 },
          { min: 8500, max: 8500, pricePerUnit: 9.99 },
          { min: 10000, max: 10000, pricePerUnit: 11.99 },
          { min: 25000, max: 25000, pricePerUnit: 16.99 }, // SUPER HOT
          { min: 35000, max: 35000, pricePerUnit: 19.99 },
          { min: 50000, max: 50000, pricePerUnit: 24.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      }
    }
  },

  "Facebook": {
    "id": "facebook",
    "name": "Facebook",
    "services": {
      "Facebook Likes (Post Likes)": {
        "id": "facebook-likes",
        "name": "Facebook Likes (Post Likes)",
        "minQuantity": 10,
        "maxQuantity": 5000,
        "japServiceId": "9155", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { "min": 50, "max": 50, "pricePerUnit": 1.99 },
          { "min": 100, "max": 100, "pricePerUnit": 2.99 },
          { "min": 250, "max": 250, "pricePerUnit": 3.69 },
          { "min": 500, "max": 500, "pricePerUnit": 5.69 },
          { "min": 750, "max": 750, "pricePerUnit": 7.69 },
          { "min": 1000, "max": 1000, "pricePerUnit": 8.75 }, // SUPER HOT
          { "min": 1800, "max": 1800, "pricePerUnit": 9.99 },
          { "min": 2500, "max": 2500, "pricePerUnit": 12.99 },
          { "min": 3800, "max": 3800, "pricePerUnit": 16.99 },
          { "min": 5000, "max": 5000, "pricePerUnit": 19.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      },
      "Facebook Page Likes (Page/Fanpage Likes)": {
        "id": "facebook-page-likes",
        "name": "Facebook Page Likes (Page/Fanpage Likes)",
        "minQuantity": 10,
        "maxQuantity": 5000,
        "japServiceId": "1722", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { "min": 100, "max": 100, "pricePerUnit": 2.99 },
          { "min": 250, "max": 250, "pricePerUnit": 3.99 },
          { "min": 350, "max": 350, "pricePerUnit": 4.49 }, // HOT
          { "min": 500, "max": 500, "pricePerUnit": 6.29 },
          { "min": 750, "max": 750, "pricePerUnit": 7.29 },
          { "min": 1000, "max": 1000, "pricePerUnit": 9.99 },
          { "min": 1500, "max": 1500, "pricePerUnit": 11.99 },
          { "min": 2800, "max": 2800, "pricePerUnit": 14.99 },
          { "min": 3500, "max": 3500, "pricePerUnit": 16.99 },
          { "min": 5000, "max": 5000, "pricePerUnit": 19.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      },
      "Facebook Views (For Videos)": {
        "id": "facebook-views",
        "name": "Facebook Views (For Videos)",
        "minQuantity": 100,
        "maxQuantity": 10000,
        "japServiceId": "8953", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { "min": 100, "max": 100, "pricePerUnit": 1.49 }, // HOT
          { "min": 250, "max": 250, "pricePerUnit": 2.99 },
          { "min": 500, "max": 500, "pricePerUnit": 4.99 },
          { "min": 750, "max": 750, "pricePerUnit": 5.49 }, // SUPER HOT
          { "min": 1000, "max": 1000, "pricePerUnit": 7.99 },
          { "min": 2500, "max": 2500, "pricePerUnit": 9.99 },
          { "min": 3800, "max": 3800, "pricePerUnit": 11.99 },
          { "min": 4500, "max": 4500, "pricePerUnit": 13.99 },
          { "min": 5000, "max": 5000, "pricePerUnit": 16.99 },
          { "min": 7500, "max": 7500, "pricePerUnit": 19.99 }, // HOT
          { "min": 10000, "max": 10000, "pricePerUnit": 22.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      }
    }
  },

  "YouTube": {
    "id": "youtube",
    "name": "YouTube",
    "services": {
      "YouTube Likes": {
        "id": "youtube-likes",
        "name": "YouTube Likes",
        "minQuantity": 10,
        "maxQuantity": 10000,
        "japServiceId": "7975", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { "min": 10, "max": 10, "pricePerUnit": 1.49 },
          { "min": 35, "max": 35, "pricePerUnit": 2.49 },
          { "min": 50, "max": 50, "pricePerUnit": 3.69 },
          { "min": 100, "max": 100, "pricePerUnit": 4.99 },
          { "min": 250, "max": 250, "pricePerUnit": 5.49 }, // HOT
          { "min": 350, "max": 350, "pricePerUnit": 6.49 },
          { "min": 500, "max": 500, "pricePerUnit": 6.99 },
          { "min": 750, "max": 750, "pricePerUnit": 7.69 },
          { "min": 1000, "max": 1000, "pricePerUnit": 8.69 },
          { "min": 2500, "max": 2500, "pricePerUnit": 9.99 },
          { "min": 3500, "max": 3500, "pricePerUnit": 11.99 },
          { "min": 4800, "max": 4800, "pricePerUnit": 14.99 },
          { "min": 5000, "max": 5000, "pricePerUnit": 16.49 },
          { "min": 7500, "max": 7500, "pricePerUnit": 18.99 },
          { "min": 10000, "max": 10000, "pricePerUnit": 26.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      },
      "YouTube Views": {
        "id": "youtube-views",
        "name": "YouTube Views",
        "minQuantity": 100,
        "maxQuantity": 15000,
        "japServiceId": "8040", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { "min": 100, "max": 100, "pricePerUnit": 1.89 },
          { "min": 250, "max": 250, "pricePerUnit": 2.49 },
          { "min": 350, "max": 350, "pricePerUnit": 3.69 },
          { "min": 750, "max": 750, "pricePerUnit": 4.49 },
          { "min": 1000, "max": 1000, "pricePerUnit": 4.99 },
          { "min": 1800, "max": 1800, "pricePerUnit": 5.99 },
          { "min": 2500, "max": 2500, "pricePerUnit": 6.49 },
          { "min": 3800, "max": 3800, "pricePerUnit": 7.69 },
          { "min": 5000, "max": 5000, "pricePerUnit": 8.99 },
          { "min": 7800, "max": 7800, "pricePerUnit": 9.69 },
          { "min": 10000, "max": 10000, "pricePerUnit": 16.99 },
          { "min": 15000, "max": 15000, "pricePerUnit": 19.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      },
      "YouTube Subscribers": {
        "id": "youtube-subscribers",
        "name": "YouTube Subscribers",
        "minQuantity": 50,
        "maxQuantity": 10000,
        "japServiceId": "6293", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { "min": 20, "max": 20, "pricePerUnit": 1.69 },
          { "min": 50, "max": 50, "pricePerUnit": 2.69 },
          { "min": 100, "max": 100, "pricePerUnit": 3.99 }, // HOT
          { "min": 250, "max": 250, "pricePerUnit": 4.69 },
          { "min": 500, "max": 500, "pricePerUnit": 5.99 },
          { "min": 750, "max": 750, "pricePerUnit": 6.69 },
          { "min": 1000, "max": 1000, "pricePerUnit": 7.49 },
          { "min": 2500, "max": 2500, "pricePerUnit": 8.99 },
          { "min": 3500, "max": 3500, "pricePerUnit": 9.99 },
          { "min": 5000, "max": 5000, "pricePerUnit": 12.99 },
          { "min": 7500, "max": 7500, "pricePerUnit": 16.99 },
          { "min": 10000, "max": 10000, "pricePerUnit": 19.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      }
    }
  },

  "Spotify": {
    "id": "spotify",
    "name": "Spotify",
    "services": {
      "Spotify Followers": {
        "id": "spotify-followers",
        "name": "Spotify Followers",
        "minQuantity": 100,
        "maxQuantity": 10000,
        "japServiceId": "6537", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { "min": 100, "max": 100, "pricePerUnit": 1.69 },
          { "min": 500, "max": 500, "pricePerUnit": 2.49 },
          { "min": 850, "max": 850, "pricePerUnit": 3.69 }, // SUPER HOT
          { "min": 1000, "max": 1000, "pricePerUnit": 4.29 },
          { "min": 1700, "max": 1700, "pricePerUnit": 4.99 },
          { "min": 3500, "max": 3500, "pricePerUnit": 5.69 },
          { "min": 5000, "max": 5000, "pricePerUnit": 6.99 },
          { "min": 8500, "max": 8500, "pricePerUnit": 8.99 },
          { "min": 10000, "max": 10000, "pricePerUnit": 12.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      },
      "Spotify Plays": {
        "id": "spotify-plays",
        "name": "Spotify Plays",
        "minQuantity": 100,
        "maxQuantity": 10000,
        "japServiceId": "7556", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { "min": 1000, "max": 1000, "pricePerUnit": 2.99 }, // SUPER HOT
          { "min": 3500, "max": 3500, "pricePerUnit": 4.69 },
          { "min": 5000, "max": 5000, "pricePerUnit": 6.99 },
          { "min": 7500, "max": 7500, "pricePerUnit": 8.99 },
          { "min": 10000, "max": 10000, "pricePerUnit": 11.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      }
    }
  },

  "Twitch": {
    "id": "twitch",
    "name": "Twitch",
    "services": {
      "Twitch Followers": {
        "id": "twitch-followers",
        "name": "Twitch Followers",
        "minQuantity": 100,
        "maxQuantity": 8500,
        "japServiceId": "348", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { "min": 100, "max": 100, "pricePerUnit": 2.49 },
          { "min": 350, "max": 350, "pricePerUnit": 3.69 },
          { "min": 500, "max": 500, "pricePerUnit": 4.49 },
          { "min": 850, "max": 850, "pricePerUnit": 5.99 },
          { "min": 1500, "max": 1500, "pricePerUnit": 7.69 },
          { "min": 3500, "max": 3500, "pricePerUnit": 8.99 },
          { "min": 5000, "max": 5000, "pricePerUnit": 11.99 },
          { "min": 8500, "max": 8500, "pricePerUnit": 14.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      },
      "Twitch Views (Clip views)": {
        "id": "twitch-views",
        "name": "Twitch Views (Clip views)",
        "minQuantity": 100,
        "maxQuantity": 10000,
        "japServiceId": "3898", // ID usługi na JustAnotherPanel
        "priceRanges": [
          { "min": 1000, "max": 1000, "pricePerUnit": 3.69 },
          { "min": 2500, "max": 2500, "pricePerUnit": 5.99 },
          { "min": 4500, "max": 4500, "pricePerUnit": 12.99 },
          { "min": 7500, "max": 7500, "pricePerUnit": 16.99 },
          { "min": 10000, "max": 10000, "pricePerUnit": 19.99 }
        ],
        "extraOptions": {
          "premiumGuarantee": {
            "additionalPrice": 2.99
          }
        },
        "inputType": "link"
      }
    }
  }
} as const;

// Dodaj definicję typu PlatformKey
export type PlatformKey = keyof typeof platformsConfig;

// Dodaj tutaj typy dla TypeScriptu (opcjonalne)
export type PlatformConfig = typeof platformsConfig;