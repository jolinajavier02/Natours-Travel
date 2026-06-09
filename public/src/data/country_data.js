const countryData = {
    'JP': {
        name: 'Japan',
        quickFacts: {
            weather: 'Generally mild to cool. Summer: 25°C, Winter: 5°C.',
            airQuality: 'Good (AQI 30-50)',
            internetSpeed: 'Fast (Mobile: 45 Mbps, Broadband: 160 Mbps)',
            visaRequirements: {
                'PH': 'Visa required (Tourist). Apply at embassy.',
                'default': 'Check local embassy.'
            },
            arrivalCard: 'Visit Japan Web (Digital)',
            timeZone: 'UTC+09:00',
            phoneCode: '+81',
            plugType: 'Type A/B (100V)',
            language: 'Japanese',
            drivingSide: 'Left',
            networkCoverage: 'Excellent',
            safetyIndex: 'Very High'
        },
        beforeArrival: {
            entryDocuments: ['Passport (6mo+ validity)', 'Visa', 'Visit Japan Web QR'],
            healthSafety: ['Travel Insurance recommended', 'Tap water safe'],
            moneyPayments: ['Cash is king', 'Suica/Pasmo card'],
            connectivity: ['Pocket WiFi or eSIM recommended'],
            arrivalCustoms: ['Declare over ¥1M cash']
        },
        mustTryFoods: [
            { name: 'Sushi', description: 'Fresh raw fish' },
            { name: 'Ramen', description: 'Noodle soup' }
        ],
        popularPlaces: [
            { name: 'Tokyo', description: 'Capital city' },
            { name: 'Kyoto', description: 'Temples and shrines' }
        ],
        localInsights: ['Bow to greet', 'No tipping'],
        smartExtras: {
            seasonalAlerts: 'Typhoon season (Jun-Nov)',
            commonScams: 'Rare',
            localApps: 'Google Maps, Japan Travel',
            roamingCharges: 'High',
            packingTips: 'Slip-on shoes'
        }
    },
    'US': {
        name: 'United States',
        quickFacts: {
            weather: 'Varies by region.',
            airQuality: 'Moderate to Good',
            internetSpeed: 'Fast',
            visaRequirements: {
                'PH': 'B1/B2 Visa required.',
                'default': 'Check ESTA/Visa.'
            },
            arrivalCard: 'Customs Form (Paper/Kiosk)',
            timeZone: 'UTC-5 to -10',
            phoneCode: '+1',
            plugType: 'Type A/B (120V)',
            language: 'English',
            drivingSide: 'Right',
            networkCoverage: 'Good',
            safetyIndex: 'Moderate'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'Visa/ESTA', 'Return Ticket'],
            healthSafety: ['Insurance essential (High cost)', 'Tap water safe'],
            moneyPayments: ['Credit cards everywhere', 'Tipping 15-20%'],
            connectivity: ['Local SIM/eSIM'],
            arrivalCustoms: ['Strict food regulations']
        },
        mustTryFoods: [
            { name: 'Burger', description: 'Classic beef burger' },
            { name: 'BBQ', description: 'Smoked meats' }
        ],
        popularPlaces: [
            { name: 'NYC', description: 'Big Apple' },
            { name: 'Grand Canyon', description: 'Natural wonder' }
        ],
        localInsights: ['Tipping is mandatory', 'Large portions'],
        smartExtras: {
            seasonalAlerts: 'Hurricanes (East/South)',
            commonScams: 'Tourist traps',
            localApps: 'Uber, Yelp',
            roamingCharges: 'High',
            packingTips: 'Power adapter'
        }
    },
    'CA': {
        name: 'Canada',
        quickFacts: {
            weather: 'Cold winters, mild summers.',
            airQuality: 'Excellent',
            internetSpeed: 'Fast',
            visaRequirements: {
                'PH': 'Visa required.',
                'default': 'Check eTA/Visa.'
            },
            arrivalCard: 'ArriveCAN (Optional but recommended)',
            timeZone: 'UTC-3.5 to -8',
            phoneCode: '+1',
            plugType: 'Type A/B (120V)',
            language: 'English, French',
            drivingSide: 'Right',
            networkCoverage: 'Good',
            safetyIndex: 'High'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'Visa/eTA'],
            healthSafety: ['Insurance recommended', 'Tap water safe'],
            moneyPayments: ['Cards widely accepted', 'Tipping 15-20%'],
            connectivity: ['Local SIM/eSIM'],
            arrivalCustoms: ['Declare food/plants']
        },
        mustTryFoods: [
            { name: 'Poutine', description: 'Fries with gravy and cheese curds' },
            { name: 'Maple Syrup', description: 'Sweet topping' }
        ],
        popularPlaces: [
            { name: 'Banff', description: 'National Park' },
            { name: 'Toronto', description: 'CN Tower' }
        ],
        localInsights: ['Polite culture', 'Tipping expected'],
        smartExtras: {
            seasonalAlerts: 'Extreme cold in winter',
            commonScams: 'Rare',
            localApps: 'Uber, Transit',
            roamingCharges: 'High',
            packingTips: 'Warm layers'
        }
    },
    'GB': {
        name: 'United Kingdom',
        quickFacts: {
            weather: 'Unpredictable, often rainy.',
            airQuality: 'Good',
            internetSpeed: 'Fast',
            visaRequirements: {
                'PH': 'Standard Visitor Visa.',
                'default': 'Check visa requirements.'
            },
            arrivalCard: 'None (usually)',
            timeZone: 'UTC+0',
            phoneCode: '+44',
            plugType: 'Type G (230V)',
            language: 'English',
            drivingSide: 'Left',
            networkCoverage: 'Excellent',
            safetyIndex: 'High'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'Visa'],
            healthSafety: ['NHS surcharge (if applicable)', 'Tap water safe'],
            moneyPayments: ['Contactless is standard', 'Tipping optional/10%'],
            connectivity: ['Local SIM/eSIM'],
            arrivalCustoms: ['Standard allowances']
        },
        mustTryFoods: [
            { name: 'Fish & Chips', description: 'Battered fish with fries' },
            { name: 'Roast Dinner', description: 'Sunday tradition' }
        ],
        popularPlaces: [
            { name: 'London', description: 'Big Ben, Eye' },
            { name: 'Edinburgh', description: 'Castle, History' }
        ],
        localInsights: ['Queue politely', 'Stand on right on escalators'],
        smartExtras: {
            seasonalAlerts: 'Rain likely anytime',
            commonScams: 'Phone snatching in London',
            localApps: 'Citymapper, Tube Map',
            roamingCharges: 'Check provider',
            packingTips: 'Umbrella/Raincoat'
        }
    },
    'FR': {
        name: 'France',
        quickFacts: {
            weather: 'Temperate.',
            airQuality: 'Good',
            internetSpeed: 'Fast',
            visaRequirements: {
                'PH': 'Schengen Visa.',
                'default': 'Check Schengen rules.'
            },
            arrivalCard: 'None (Schengen)',
            timeZone: 'UTC+1',
            phoneCode: '+33',
            plugType: 'Type C/E (230V)',
            language: 'French',
            drivingSide: 'Right',
            networkCoverage: 'Excellent',
            safetyIndex: 'Moderate'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'Schengen Visa', 'Insurance'],
            healthSafety: ['Insurance mandatory for visa', 'Tap water safe'],
            moneyPayments: ['Cards accepted', 'Carry some cash'],
            connectivity: ['Local SIM/eSIM'],
            arrivalCustoms: ['Standard EU rules']
        },
        mustTryFoods: [
            { name: 'Croissant', description: 'Buttery pastry' },
            { name: 'Cheese', description: 'Various types' }
        ],
        popularPlaces: [
            { name: 'Paris', description: 'Eiffel Tower' },
            { name: 'Nice', description: 'Riviera' }
        ],
        localInsights: ['Say "Bonjour" entering shops', 'Dining is leisurely'],
        smartExtras: {
            seasonalAlerts: 'Heatwaves in summer',
            commonScams: 'Pickpockets in Paris',
            localApps: 'Citymapper, TheFork',
            roamingCharges: 'EU roaming rules',
            packingTips: 'Stylish walking shoes'
        }
    },
    'DE': {
        name: 'Germany',
        quickFacts: {
            weather: 'Temperate seasonal.',
            airQuality: 'Good',
            internetSpeed: 'Fast',
            visaRequirements: {
                'PH': 'Schengen Visa.',
                'default': 'Check Schengen rules.'
            },
            arrivalCard: 'None (Schengen)',
            timeZone: 'UTC+1',
            phoneCode: '+49',
            plugType: 'Type F (230V)',
            language: 'German',
            drivingSide: 'Right',
            networkCoverage: 'Excellent',
            safetyIndex: 'High'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'Schengen Visa', 'Insurance'],
            healthSafety: ['Insurance mandatory', 'Tap water safe'],
            moneyPayments: ['Cash still popular', 'Cards accepted'],
            connectivity: ['Local SIM/eSIM'],
            arrivalCustoms: ['Standard EU rules']
        },
        mustTryFoods: [
            { name: 'Bratwurst', description: 'Sausage' },
            { name: 'Pretzel', description: 'Salty bread' }
        ],
        popularPlaces: [
            { name: 'Berlin', description: 'History & Culture' },
            { name: 'Munich', description: 'Oktoberfest' }
        ],
        localInsights: ['Punctuality is key', 'Recycling is serious'],
        smartExtras: {
            seasonalAlerts: 'Cold winters',
            commonScams: 'Rare',
            localApps: 'DB Navigator (Trains)',
            roamingCharges: 'EU roaming rules',
            packingTips: 'Practical clothing'
        }
    },
    'IT': {
        name: 'Italy',
        quickFacts: {
            weather: 'Mediterranean.',
            airQuality: 'Moderate',
            internetSpeed: 'Good',
            visaRequirements: {
                'PH': 'Schengen Visa.',
                'default': 'Check Schengen rules.'
            },
            arrivalCard: 'None (Schengen)',
            timeZone: 'UTC+1',
            phoneCode: '+39',
            plugType: 'Type F/L (230V)',
            language: 'Italian',
            drivingSide: 'Right',
            networkCoverage: 'Good',
            safetyIndex: 'Moderate'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'Schengen Visa', 'Insurance'],
            healthSafety: ['Insurance mandatory', 'Tap water safe'],
            moneyPayments: ['Cards accepted', 'Cash for small shops'],
            connectivity: ['Local SIM/eSIM'],
            arrivalCustoms: ['Standard EU rules']
        },
        mustTryFoods: [
            { name: 'Pizza', description: 'Naples style' },
            { name: 'Pasta', description: 'Fresh made' }
        ],
        popularPlaces: [
            { name: 'Rome', description: 'Colosseum' },
            { name: 'Venice', description: 'Canals' }
        ],
        localInsights: ['Coperto (cover charge) is common', 'Late dinner'],
        smartExtras: {
            seasonalAlerts: 'Hot summers',
            commonScams: 'Pickpockets in tourist areas',
            localApps: 'Trenitalia',
            roamingCharges: 'EU roaming rules',
            packingTips: 'Modest clothes for churches'
        }
    },
    'ES': {
        name: 'Spain',
        quickFacts: {
            weather: 'Sunny, Mediterranean.',
            airQuality: 'Good',
            internetSpeed: 'Fast',
            visaRequirements: {
                'PH': 'Schengen Visa.',
                'default': 'Check Schengen rules.'
            },
            arrivalCard: 'None (Schengen)',
            timeZone: 'UTC+1',
            phoneCode: '+34',
            plugType: 'Type F (230V)',
            language: 'Spanish',
            drivingSide: 'Right',
            networkCoverage: 'Excellent',
            safetyIndex: 'High'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'Schengen Visa', 'Insurance'],
            healthSafety: ['Insurance mandatory', 'Tap water safe'],
            moneyPayments: ['Cards widely accepted', 'Cash useful'],
            connectivity: ['Local SIM/eSIM'],
            arrivalCustoms: ['Standard EU rules']
        },
        mustTryFoods: [
            { name: 'Paella', description: 'Rice dish' },
            { name: 'Tapas', description: 'Small plates' }
        ],
        popularPlaces: [
            { name: 'Barcelona', description: 'Gaudi architecture' },
            { name: 'Madrid', description: 'Museums' }
        ],
        localInsights: ['Siesta time (shops close)', 'Late dinner (9pm+)'],
        smartExtras: {
            seasonalAlerts: 'Very hot summers',
            commonScams: 'Pickpockets in Barcelona',
            localApps: 'Cabify',
            roamingCharges: 'EU roaming rules',
            packingTips: 'Sun protection'
        }
    },
    'AU': {
        name: 'Australia',
        quickFacts: {
            weather: 'Varies, generally warm.',
            airQuality: 'Excellent',
            internetSpeed: 'Good',
            visaRequirements: {
                'PH': 'Visa required.',
                'default': 'Check eVisitor/Visa.'
            },
            arrivalCard: 'Incoming Passenger Card',
            timeZone: 'UTC+8 to +11',
            phoneCode: '+61',
            plugType: 'Type I (230V)',
            language: 'English',
            drivingSide: 'Left',
            networkCoverage: 'Good (Cities)',
            safetyIndex: 'High'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'Visa', 'Arrival Card'],
            healthSafety: ['Insurance recommended', 'Sun safety essential'],
            moneyPayments: ['Contactless everywhere', 'Tipping not expected'],
            connectivity: ['Local SIM/eSIM'],
            arrivalCustoms: ['Strict biosecurity (food/wood)']
        },
        mustTryFoods: [
            { name: 'Vegemite', description: 'Yeast spread' },
            { name: 'Meat Pie', description: 'Savory snack' }
        ],
        popularPlaces: [
            { name: 'Sydney', description: 'Opera House' },
            { name: 'Great Barrier Reef', description: 'Diving' }
        ],
        localInsights: ['"No worries" attitude', 'Swim between flags'],
        smartExtras: {
            seasonalAlerts: 'Bushfire season (Summer)',
            commonScams: 'Rare',
            localApps: 'Uber, Google Maps',
            roamingCharges: 'High',
            packingTips: 'Sunscreen, Hat'
        }
    },
    'NZ': {
        name: 'New Zealand',
        quickFacts: {
            weather: 'Temperate, changeable.',
            airQuality: 'Excellent',
            internetSpeed: 'Good',
            visaRequirements: {
                'PH': 'Visa required.',
                'default': 'Check NZeTA/Visa.'
            },
            arrivalCard: 'Passenger Arrival Card',
            timeZone: 'UTC+12',
            phoneCode: '+64',
            plugType: 'Type I (230V)',
            language: 'English, Maori',
            drivingSide: 'Left',
            networkCoverage: 'Good',
            safetyIndex: 'Very High'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'Visa/NZeTA', 'IVL paid'],
            healthSafety: ['Insurance recommended', 'Tap water safe'],
            moneyPayments: ['Cards widely accepted', 'No tipping'],
            connectivity: ['Local SIM/eSIM'],
            arrivalCustoms: ['Strict biosecurity (hiking gear)']
        },
        mustTryFoods: [
            { name: 'Hangi', description: 'Maori earth oven' },
            { name: 'Pavlova', description: 'Meringue dessert' }
        ],
        popularPlaces: [
            { name: 'Queenstown', description: 'Adventure capital' },
            { name: 'Auckland', description: 'City of Sails' }
        ],
        localInsights: ['Friendly locals (Kiwis)', 'Respect nature'],
        smartExtras: {
            seasonalAlerts: 'Changeable weather',
            commonScams: 'Rare',
            localApps: 'CamperMate',
            roamingCharges: 'High',
            packingTips: 'Layers, Hiking boots'
        }
    },
    'SG': {
        name: 'Singapore',
        quickFacts: {
            weather: 'Hot and humid year-round.',
            airQuality: 'Good',
            internetSpeed: 'Very Fast',
            visaRequirements: {
                'PH': 'Visa-free (30 days).',
                'default': 'Check visa rules.'
            },
            arrivalCard: 'SG Arrival Card (Digital)',
            timeZone: 'UTC+8',
            phoneCode: '+65',
            plugType: 'Type G (230V)',
            language: 'English, Mandarin, Malay, Tamil',
            drivingSide: 'Left',
            networkCoverage: 'Excellent',
            safetyIndex: 'Very High'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'SG Arrival Card (3 days prior)'],
            healthSafety: ['Insurance recommended', 'Tap water safe'],
            moneyPayments: ['Contactless everywhere', 'Cash for hawkers'],
            connectivity: ['Local SIM/eSIM'],
            arrivalCustoms: ['Strict drug laws', 'No gum']
        },
        mustTryFoods: [
            { name: 'Chicken Rice', description: 'National dish' },
            { name: 'Chilli Crab', description: 'Spicy seafood' }
        ],
        popularPlaces: [
            { name: 'Marina Bay Sands', description: 'Iconic hotel' },
            { name: 'Gardens by the Bay', description: 'Supertrees' }
        ],
        localInsights: ['Queueing is a sport', 'Reserved seats (Chope)'],
        smartExtras: {
            seasonalAlerts: 'Monsoon season',
            commonScams: 'Rare',
            localApps: 'Grab, Citymapper',
            roamingCharges: 'High',
            packingTips: 'Light breathable clothes'
        }
    },
    'MY': {
        name: 'Malaysia',
        quickFacts: {
            weather: 'Tropical, humid.',
            airQuality: 'Moderate',
            internetSpeed: 'Good',
            visaRequirements: {
                'PH': 'Visa-free (30 days).',
                'default': 'Check visa rules.'
            },
            arrivalCard: 'MDAC (Digital Arrival Card)',
            timeZone: 'UTC+8',
            phoneCode: '+60',
            plugType: 'Type G (240V)',
            language: 'Malay, English',
            drivingSide: 'Left',
            networkCoverage: 'Good',
            safetyIndex: 'High'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'MDAC (3 days prior)'],
            healthSafety: ['Insurance recommended', 'Bottled water'],
            moneyPayments: ['Cash preferred', 'GrabPay/Touch n Go'],
            connectivity: ['Local SIM/eSIM'],
            arrivalCustoms: ['Standard allowances']
        },
        mustTryFoods: [
            { name: 'Nasi Lemak', description: 'Coconut rice dish' },
            { name: 'Laksa', description: 'Spicy noodle soup' }
        ],
        popularPlaces: [
            { name: 'Kuala Lumpur', description: 'Petronas Towers' },
            { name: 'Penang', description: 'Food paradise' }
        ],
        localInsights: ['"Makan" means eat', 'Diverse culture'],
        smartExtras: {
            seasonalAlerts: 'Monsoon season',
            commonScams: 'Taxi overcharging',
            localApps: 'Grab',
            roamingCharges: 'High',
            packingTips: 'Light clothes, Umbrella'
        }
    },
    'TH': {
        name: 'Thailand',
        quickFacts: {
            weather: 'Tropical, hot.',
            airQuality: 'Variable (Poor in North during burning season)',
            internetSpeed: 'Fast',
            visaRequirements: {
                'PH': 'Visa-free (30 days).',
                'default': 'Check visa rules.'
            },
            arrivalCard: 'None (Air travel)',
            timeZone: 'UTC+7',
            phoneCode: '+66',
            plugType: 'Type A/B/C/O (220V)',
            language: 'Thai',
            drivingSide: 'Left',
            networkCoverage: 'Good',
            safetyIndex: 'Moderate'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'Return Ticket', 'Proof of Funds'],
            healthSafety: ['Insurance recommended', 'Bottled water only'],
            moneyPayments: ['Cash is king', 'QR payments (PromptPay)'],
            connectivity: ['Local SIM/eSIM cheap'],
            arrivalCustoms: ['Vaping illegal']
        },
        mustTryFoods: [
            { name: 'Pad Thai', description: 'Stir-fried noodles' },
            { name: 'Tom Yum Goong', description: 'Spicy shrimp soup' }
        ],
        popularPlaces: [
            { name: 'Bangkok', description: 'City life' },
            { name: 'Phuket', description: 'Beaches' }
        ],
        localInsights: ['Respect the King', 'Take off shoes'],
        smartExtras: {
            seasonalAlerts: 'Rainy season (Jul-Oct)',
            commonScams: 'Tuk-tuk scams',
            localApps: 'Grab, Bolt',
            roamingCharges: 'High',
            packingTips: 'Modest clothes for temples'
        }
    },
    'KR': {
        name: 'South Korea',
        quickFacts: {
            weather: 'Four seasons. Cold winter.',
            airQuality: 'Moderate',
            internetSpeed: 'World\'s Fastest',
            visaRequirements: {
                'PH': 'Visa required (or Visa-free for Jeju/Gangwon).',
                'default': 'Check K-ETA/Visa.'
            },
            arrivalCard: 'Q-Code (Health), Arrival Card',
            timeZone: 'UTC+9',
            phoneCode: '+82',
            plugType: 'Type C/F (220V)',
            language: 'Korean',
            drivingSide: 'Right',
            networkCoverage: 'Excellent',
            safetyIndex: 'Very High'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'Visa/K-ETA', 'Q-Code'],
            healthSafety: ['Insurance recommended', 'Tap water safe'],
            moneyPayments: ['Cards widely accepted', 'T-Money card'],
            connectivity: ['Local SIM/eSIM/WiFi'],
            arrivalCustoms: ['Strict food rules']
        },
        mustTryFoods: [
            { name: 'Kimchi', description: 'Fermented vegetables' },
            { name: 'BBQ', description: 'Grilled meat' }
        ],
        popularPlaces: [
            { name: 'Seoul', description: 'Palaces & Shopping' },
            { name: 'Jeju Island', description: 'Nature' }
        ],
        localInsights: ['Respect elders', 'Fast-paced (Palli-palli)'],
        smartExtras: {
            seasonalAlerts: 'Yellow dust in spring',
            commonScams: 'Rare',
            localApps: 'Naver Map, KakaoTalk',
            roamingCharges: 'High',
            packingTips: 'Adaptor'
        }
    },
    'AE': {
        name: 'United Arab Emirates',
        quickFacts: {
            weather: 'Desert climate. Very hot summer.',
            airQuality: 'Moderate',
            internetSpeed: 'Fast',
            visaRequirements: {
                'PH': 'Visa required.',
                'default': 'Check visa rules.'
            },
            arrivalCard: 'None',
            timeZone: 'UTC+4',
            phoneCode: '+971',
            plugType: 'Type G (230V)',
            language: 'Arabic',
            drivingSide: 'Right',
            networkCoverage: 'Excellent',
            safetyIndex: 'Very High'
        },
        beforeArrival: {
            entryDocuments: ['Passport', 'Visa', 'Insurance'],
            healthSafety: ['Insurance mandatory', 'Tap water desalinated'],
            moneyPayments: ['Cards everywhere', 'Cash for souks'],
            connectivity: ['Local SIM (Du/Etisalat)'],
            arrivalCustoms: ['Strict medication rules']
        },
        mustTryFoods: [
            { name: 'Shawarma', description: 'Meat wrap' },
            { name: 'Dates', description: 'Sweet fruit' }
        ],
        popularPlaces: [
            { name: 'Dubai', description: 'Burj Khalifa' },
            { name: 'Abu Dhabi', description: 'Grand Mosque' }
        ],
        localInsights: ['Dress modestly', 'Public affection restricted'],
        smartExtras: {
            seasonalAlerts: 'Extreme heat (Jun-Sep)',
            commonScams: 'Rare',
            localApps: 'Careem, Talabat',
            roamingCharges: 'High',
            packingTips: 'Sun protection, Modest clothes'
        }
    },
    'default': {
        name: 'Your Destination',
        quickFacts: {
            weather: 'Check local forecast.',
            airQuality: 'Check AQI.',
            internetSpeed: 'Varies.',
            visaRequirements: {
                'default': 'Check embassy requirements.'
            },
            arrivalCard: 'Check requirements.',
            timeZone: 'Check time zone.',
            phoneCode: 'Check code.',
            plugType: 'Check adapter.',
            language: 'Local language.',
            drivingSide: 'Check driving side.',
            networkCoverage: 'Varies.',
            safetyIndex: 'Check advisory.'
        },
        beforeArrival: {
            entryDocuments: ['Passport (6mo+)', 'Visa if needed'],
            healthSafety: ['Insurance recommended'],
            moneyPayments: ['Check currency'],
            connectivity: ['Check roaming/SIM'],
            arrivalCustoms: ['Check restrictions']
        },
        mustTryFoods: [
            { name: 'Local Dish', description: 'Traditional food' }
        ],
        popularPlaces: [
            { name: 'Capital City', description: 'Main hub' }
        ],
        localInsights: ['Respect local culture'],
        smartExtras: {
            seasonalAlerts: 'Check season',
            commonScams: 'Be aware',
            localApps: 'Maps, Translation',
            roamingCharges: 'Check provider',
            packingTips: 'Pack accordingly'
        }
    }
};
