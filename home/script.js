// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for anchor links
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


// Add scroll effect to header
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- 2. Image Slider Functionality with Staggered Timing ---
// Configuration for each slider with unique delays
const sliderConfigs = [
    { selector: '#slider-flights', delay: 0 },      // Starts immediately
    { selector: '#slider-hotels', delay: 2000 },    // Starts after 2 seconds
    { selector: '#slider-tours', delay: 4000 },     // Starts after 4 seconds
    { selector: '#slider-cruising', delay: 6000 },  // Starts after 6 seconds
    { selector: '#slider-visa', delay: 8000 }       // Starts after 8 seconds
];

sliderConfigs.forEach(config => {
    const slider = document.querySelector(config.selector);
    if (!slider) {
        console.error(`Slider not found: ${config.selector}`);
        return;
    }
    console.log(`Initializing slider: ${config.selector}`);

    let currentIndex = 0;
    const images = slider.querySelectorAll('.hero-img');
    const totalImages = images.length;

    if (totalImages === 0) return;

    const updateSlider = () => {
        const offset = -currentIndex * images[0].offsetWidth;
        slider.style.transform = `translateX(${offset}px)`;
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider();
    };

    // Start the slider after the configured delay
    setTimeout(() => {
        // Initial update
        updateSlider();

        // Auto-advance every 3 seconds
        setInterval(nextSlide, 3000);
    }, config.delay);

    // Handle window resizing
    window.addEventListener('resize', updateSlider);
});

// Copy the entire checklist generator code from guidelines/script.js
// This will be added via a separate file to keep it manageable

// Checklist Generator Functionality
const countryData = {
    'JP': {
        name: 'Japan',
        quickFacts: {
            weather: 'Generally mild to cool, depending on season. Summer avg: 25°C, Winter avg: 5°C.',
            airQuality: 'Varies by city. Tokyo: AQI 42 Good.',
            internetSpeed: 'Mobile: 45 Mbps / Broadband: 160 Mbps',
            visaRequirements: {
                'PH': 'Tourist: Visa-exempt for Philippine passport holders for stays up to 90 days.',
                'default': 'Check with your local Japanese embassy for specific visa requirements.'
            },
            arrivalCard: 'Japan utilizes a Visit Japan Web service for pre-registration of immigration, customs, and tax-free shopping information.',
            timeZone: 'UTC+09:00 (Japan Standard Time)',
            phoneCode: '+81',
            plugType: 'Type A and B (Two flat prongs or two flat prongs plus a round grounding pin). 100V.',
            language: 'Japanese',
            drivingSide: 'Left',
            networkCoverage: 'Excellent',
            safetyIndex: 'Extremely safe with very low petty crime rates.'
        },
        beforeArrival: {
            entryDocuments: [
                'Ensure passport valid 6+ months beyond entry.',
                'Complete arrival/visa forms pre-departure using Visit Japan Web for efficiency.',
                'Keep hotel confirmation, return ticket, and proof of sufficient funds readily accessible.',
                'Print/save travel insurance policy details offline.',
                'Check baggage restrictions (power banks must be in carry-on, liquids <100ml for carry-on).'
            ],
            healthSafety: [
                'Review entry health requirements (currently minimal, check official site for updates).',
                'Buy comprehensive medical travel insurance that covers hospitalization and repatriation.',
                'Tap Water Safety: Drinkable directly from the tap almost everywhere in Japan.',
                'Emergency numbers: Police (110), Ambulance/Fire (119).',
                'Locate the nearest clinic or hospital (look for signs indicating "Iryōsho" or major medical centers).'
            ],
            moneyPayments: [
                'Japan remains heavily reliant on cash, especially outside major cities or in smaller establishments.',
                'Bring sufficient Japanese Yen (JPY) in small denominations for vending machines, smaller temples, or rural locations.',
                'ATMs accepting foreign cards are common in 7-Eleven and Japan Post offices.',
                'Tipping rules: Tipping is not customary and can sometimes be considered rude or confusing.'
            ],
            connectivity: [
                'Arrange for a pocket WiFi rental, local SIM card, or eSIM prior to arrival for reliable internet.',
                'Essential apps: Google Maps (navigation), Japan Transit Planner (trains), JapanTravel by Navitime (transit/tours), Google Translate.',
                'Save hotel addresses, key phrases in Japanese (e.g., Sumimasen - Excuse me), and crucial contacts offline.',
                'Store cloud copies of passport scans, flight details, and insurance information.'
            ],
            arrivalCustoms: [
                'For major airports (Narita/Haneda/Kansai), prioritize the Narita Express, Limousine Bus, or Airport Limousine Bus for city transfers.',
                'Avoid bringing restricted food items (meat, large quantities of unsupported fresh produce), prohibited medication, or vaping products without prior documentation.',
                'Customs declaration: Declare goods exceeding the duty-free allowance (cash typically needs declaring if over ¥1,000,000).',
                'Locate ATM/Currency Exchange counters immediately upon clearing immigration.'
            ]
        },
        mustTryFoods: [
            { name: 'Sushi/Sashimi', description: 'Fresh, expertly prepared raw fish served with rice or alone.' },
            { name: 'Ramen', description: 'A flavorful noodle soup available in numerous regional styles (Shio, Shoyu, Miso, Tonkotsu).' },
            { name: 'Tempura', description: 'Lightly battered and deep-fried seafood and vegetables.' },
            { name: 'Okonomiyaki', description: 'Savory Japanese pancake cooked on a griddle, often customized.' },
            { name: 'Udon', description: 'Thick, chewy wheat flour noodles served hot as a soup or cold with dipping sauce.' },
            { name: 'Takoyaki', description: 'Ball-shaped street food made of a wheat flour-based batter filled with minced octopus.' },
            { name: 'Sake', description: 'Traditional Japanese rice wine, served hot or cold depending on the type.' }
        ],
        popularPlaces: [
            { name: 'Mount Fuji', description: 'Iconic, symmetrical active volcano and spiritual symbol.' },
            { name: 'Tokyo (Shibuya Crossing/Asakusa)', description: 'Modern metropolis featuring futuristic sights and ancient temples.' },
            { name: 'Kyoto (Gion/Arashiyama Bamboo Grove)', description: 'Cultural capital known for traditional wooden houses and geisha districts.' },
            { name: 'Osaka (Dotonbori)', description: 'Famous for its vibrant street food scene and neon lights.' },
            { name: 'Hiroshima Peace Memorial Park', description: 'Solemn site honoring the victims of the atomic bombing.' },
            { name: 'Nara Park', description: 'Home to hundreds of wild, free-roaming Sika deer considered sacred messengers.' }
        ],
        localInsights: [
            'Basic greetings involve bowing slightly; use "Konnichiwa" (Hello), "Arigato gozaimasu" (Thank you very much), and "Sumimasen" (Excuse me/Sorry).',
            'Pack layers—evenings can be cool. Purchase a reloadable IC card (Suica/Pasmo) for trains and convenience stores immediately.',
            'Check for seasonal festivals (Matsuri) happening during your travel dates for unique experiences.',
            'Etiquette: Never eat or drink while walking in public, remove shoes before entering homes/some restaurants/temples, and avoid talking loudly on public transport.',
            'Local emergency numbers: Police (110), Ambulance/Fire (119).'
        ],
        smartExtras: {
            seasonalAlerts: 'Be mindful of Typhoon season (June–November) which can affect transit, though Japan\'s infrastructure is robust.',
            commonScams: 'Slight overcharging by unlicensed taxis in extremely remote/uncommon areas or vendors pressuring hard sales in tourist traps; always use official transport apps or reputable taxis.',
            localApps: 'Suica/Pasmo (IC cards are indispensable for seamless travel).',
            roamingCharges: 'Highly expensive; use local connectivity solutions instead.',
            packingTips: 'Bring a small, durable bag for daily use; budget extra time for navigating complex train stations.'
        }
    },
    'US': {
        name: 'United States',
        quickFacts: {
            weather: 'Varies greatly by region. East Coast: Four distinct seasons. West Coast: Mild year-round. Central: Continental climate.',
            airQuality: 'Generally good in most cities. Major cities: AQI 30-60 Moderate.',
            internetSpeed: 'Mobile: 35 Mbps / Broadband: 180 Mbps',
            visaRequirements: {
                'PH': 'Tourist: B-2 visa required. Apply through US Embassy Manila.',
                'default': 'Check ESTA eligibility or visa requirements based on your nationality.'
            },
            arrivalCard: 'Complete customs declaration form on arrival or via Mobile Passport app.',
            timeZone: 'Multiple zones: EST (UTC-5), CST (UTC-6), MST (UTC-7), PST (UTC-8)',
            phoneCode: '+1',
            plugType: 'Type A and B. 120V.',
            language: 'English',
            drivingSide: 'Right',
            networkCoverage: 'Excellent in urban areas, variable in rural regions',
            safetyIndex: 'Generally safe, but varies by city and neighborhood.'
        },
        beforeArrival: {
            entryDocuments: [
                'Ensure passport valid for at least 6 months beyond your stay.',
                'Obtain approved visa or ESTA authorization before travel.',
                'Print visa approval, hotel confirmations, and return flight tickets.',
                'Prepare proof of sufficient funds and travel itinerary.',
                'Consider travel insurance covering medical emergencies (healthcare is expensive).'
            ],
            healthSafety: [
                'No mandatory vaccinations, but ensure routine vaccines are up to date.',
                'Purchase comprehensive travel medical insurance (medical costs are very high).',
                'Tap water is safe to drink throughout the country.',
                'Emergency number: 911 (Police, Fire, Ambulance).',
                'Locate nearby urgent care or hospital facilities.'
            ],
            moneyPayments: [
                'Credit cards widely accepted everywhere.',
                'Carry some USD cash for tips, small vendors, and emergencies.',
                'ATMs readily available; check foreign transaction fees with your bank.',
                'Tipping is customary: 15-20% at restaurants, $1-2 per bag for porters, $2-5 per day for housekeeping.'
            ],
            connectivity: [
                'Purchase a US SIM card or international roaming plan.',
                'Free WiFi available at most hotels, cafes, and public spaces.',
                'Essential apps: Google Maps, Uber/Lyft, Yelp, Airbnb.',
                'Download offline maps for areas you\'ll visit.'
            ],
            arrivalCustoms: [
                'Major airports have various ground transportation: taxis, rideshares, shuttles, public transit.',
                'Declare all food items, amounts over $10,000, and goods purchased abroad.',
                'Be prepared for TSA security screening and possible additional questioning.',
                'Currency exchange available but rates are better at banks or ATMs.'
            ]
        },
        mustTryFoods: [
            { name: 'Burgers', description: 'Classic American beef burgers with various toppings.' },
            { name: 'BBQ Ribs', description: 'Slow-cooked, smoky ribs with regional sauce variations.' },
            { name: 'New York Pizza', description: 'Thin-crust pizza sold by the slice.' },
            { name: 'Southern Fried Chicken', description: 'Crispy, seasoned fried chicken.' },
            { name: 'Clam Chowder', description: 'Creamy soup with clams, popular in New England.' },
            { name: 'Tex-Mex', description: 'Tacos, burritos, and nachos with American twist.' }
        ],
        popularPlaces: [
            { name: 'New York City', description: 'Statue of Liberty, Times Square, Central Park, Broadway shows.' },
            { name: 'Los Angeles', description: 'Hollywood, beaches, theme parks, entertainment capital.' },
            { name: 'Grand Canyon', description: 'Massive natural wonder in Arizona.' },
            { name: 'Las Vegas', description: 'Entertainment, casinos, shows, and nightlife.' },
            { name: 'San Francisco', description: 'Golden Gate Bridge, cable cars, Alcatraz Island.' },
            { name: 'Washington D.C.', description: 'National monuments, museums, and government buildings.' }
        ],
        localInsights: [
            'Tipping is expected in most service industries (restaurants, taxis, hotels).',
            'Distances are vast; domestic flights or car rentals often necessary.',
            'Sales tax is added at checkout and varies by state (not included in displayed prices).',
            'Be prepared for security checks at airports, government buildings, and some attractions.',
            'Americans are generally friendly and helpful to tourists.'
        ],
        smartExtras: {
            seasonalAlerts: 'Hurricane season (June-November) affects coastal areas. Winter storms in northern states.',
            commonScams: 'Overpriced tourist traps, fake tickets, aggressive panhandlers in major cities.',
            localApps: 'Uber/Lyft for transportation, Venmo/Cash App for payments.',
            roamingCharges: 'Can be expensive; consider local SIM or travel plan.',
            packingTips: 'Pack for varying climates if visiting multiple regions. Comfortable walking shoes essential.'
        }
    },
    // Add more countries as needed
    'default': {
        name: 'Your Destination',
        quickFacts: {
            weather: 'Check local weather forecasts for your travel dates.',
            airQuality: 'Research air quality index for major cities.',
            internetSpeed: 'Varies by location and provider.',
            visaRequirements: {
                'default': 'Check with the destination country\'s embassy for visa requirements.'
            },
            arrivalCard: 'May be required; check with airline or embassy.',
            timeZone: 'Check time zone difference from your origin.',
            phoneCode: 'Look up international dialing code.',
            plugType: 'Research electrical outlet types and voltage.',
            language: 'Learn basic phrases in the local language.',
            drivingSide: 'Confirm which side of the road is used.',
            networkCoverage: 'Research mobile network coverage.',
            safetyIndex: 'Check travel advisories and safety ratings.'
        },
        beforeArrival: {
            entryDocuments: [
                'Ensure passport is valid for at least 6 months beyond your stay.',
                'Research and obtain necessary visas or entry permits.',
                'Print all travel documents, confirmations, and insurance policies.',
                'Prepare proof of onward travel and accommodation.',
                'Check baggage allowances and restrictions.'
            ],
            healthSafety: [
                'Check vaccination requirements and recommendations.',
                'Purchase comprehensive travel insurance.',
                'Research tap water safety and food hygiene standards.',
                'Note emergency contact numbers.',
                'Locate medical facilities near your accommodation.'
            ],
            moneyPayments: [
                'Research local currency and exchange rates.',
                'Understand payment methods commonly accepted.',
                'Notify your bank of travel plans.',
                'Research tipping customs and expectations.'
            ],
            connectivity: [
                'Research local SIM cards or international roaming options.',
                'Download essential travel apps and offline maps.',
                'Save important contacts and addresses offline.',
                'Back up important documents to cloud storage.'
            ],
            arrivalCustoms: [
                'Research airport transfer options in advance.',
                'Understand customs declaration requirements.',
                'Know what items are prohibited or restricted.',
                'Have local currency for immediate expenses.'
            ]
        },
        mustTryFoods: [
            { name: 'Local Cuisine', description: 'Research popular local dishes and specialties.' }
        ],
        popularPlaces: [
            { name: 'Tourist Attractions', description: 'Research top-rated attractions and landmarks.' }
        ],
        localInsights: [
            'Research local customs and etiquette.',
            'Learn basic phrases in the local language.',
            'Understand cultural norms and taboos.',
            'Research local transportation options.',
            'Check for any local festivals or events during your visit.'
        ],
        smartExtras: {
            seasonalAlerts: 'Research seasonal weather patterns and natural disaster risks.',
            commonScams: 'Research common tourist scams in the area.',
            localApps: 'Download recommended local apps for navigation and services.',
            roamingCharges: 'Check international roaming rates with your provider.',
            packingTips: 'Pack according to climate and planned activities.'
        }
    }
};

// Generate Checklist Function
function generateChecklist() {
    const originSelect = document.getElementById('origin-country');
    const destinationSelect = document.getElementById('destination-country');
    const checklistDisplay = document.getElementById('checklist-display');
    const checklistTitle = document.getElementById('checklist-title');
    const checklistContent = document.getElementById('checklist-content');

    const origin = originSelect.value;
    const destination = destinationSelect.value;

    if (!origin || !destination) {
        alert('Please select both origin and destination countries.');
        return;
    }

    const originName = originSelect.options[originSelect.selectedIndex].text;
    const destinationName = destinationSelect.options[destinationSelect.selectedIndex].text;

    // Get country data or use default
    const countryInfo = countryData[destination] || countryData['default'];

    // Update title
    checklistTitle.textContent = `Pre-Arrival Checklist for ${countryInfo.name}`;

    // Generate content
    let html = '';

    // Quick Facts Section
    html += `<div class="checklist-section">
        <h4>Quick Facts</h4>
        <div class="quick-facts-grid">
            <div class="fact-item">
                <span class="fact-label">Weather</span>
                <span class="fact-value">${countryInfo.quickFacts.weather}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Air Quality</span>
                <span class="fact-value">${countryInfo.quickFacts.airQuality}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Average Internet Speed</span>
                <span class="fact-value">${countryInfo.quickFacts.internetSpeed}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Visa Requirements</span>
                <span class="fact-value">${countryInfo.quickFacts.visaRequirements[origin] || countryInfo.quickFacts.visaRequirements['default']}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Arrival Card</span>
                <span class="fact-value">${countryInfo.quickFacts.arrivalCard}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Time Zone</span>
                <span class="fact-value">${countryInfo.quickFacts.timeZone}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Phone Country Code</span>
                <span class="fact-value">${countryInfo.quickFacts.phoneCode}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Plug Type & Voltage</span>
                <span class="fact-value">${countryInfo.quickFacts.plugType}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Official Language</span>
                <span class="fact-value">${countryInfo.quickFacts.language}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Driving Side</span>
                <span class="fact-value">${countryInfo.quickFacts.drivingSide}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Network Coverage Quality</span>
                <span class="fact-value">${countryInfo.quickFacts.networkCoverage}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Traveler Safety Index</span>
                <span class="fact-value">${countryInfo.quickFacts.safetyIndex}</span>
            </div>
        </div>
    </div>`;

    // Before You Arrive Section
    html += `<div class="checklist-section">
        <h4>Before You Arrive</h4>`;

    // Entry & Documents
    html += `<h5 style="margin-top: 1.5rem; margin-bottom: 0.8rem; color: var(--primary-dark);">Entry & Documents</h5>
        <ul class="checklist-items">`;
    countryInfo.beforeArrival.entryDocuments.forEach(item => {
        html += `<li>${item}</li>`;
    });
    html += `</ul>`;

    // Health & Safety
    html += `<h5 style="margin-top: 1.5rem; margin-bottom: 0.8rem; color: var(--primary-dark);">Health & Safety</h5>
        <ul class="checklist-items">`;
    countryInfo.beforeArrival.healthSafety.forEach(item => {
        html += `<li>${item}</li>`;
    });
    html += `</ul>`;

    // Money & Payments
    html += `<h5 style="margin-top: 1.5rem; margin-bottom: 0.8rem; color: var(--primary-dark);">Money & Payments</h5>
        <ul class="checklist-items">`;
    countryInfo.beforeArrival.moneyPayments.forEach(item => {
        html += `<li>${item}</li>`;
    });
    html += `</ul>`;

    // Connectivity
    html += `<h5 style="margin-top: 1.5rem; margin-bottom: 0.8rem; color: var(--primary-dark);">Connectivity</h5>
        <ul class="checklist-items">`;
    countryInfo.beforeArrival.connectivity.forEach(item => {
        html += `<li>${item}</li>`;
    });
    html += `</ul>`;

    // Arrival & Customs
    html += `<h5 style="margin-top: 1.5rem; margin-bottom: 0.8rem; color: var(--primary-dark);">Arrival & Customs</h5>
        <ul class="checklist-items">`;
    countryInfo.beforeArrival.arrivalCustoms.forEach(item => {
        html += `<li>${item}</li>`;
    });
    html += `</ul></div>`;

    // Must-Try Foods
    html += `<div class="checklist-section">
        <h4>Must-Try Local Foods & Drinks</h4>
        <div class="food-grid">`;
    countryInfo.mustTryFoods.forEach(food => {
        html += `<div class="food-item">
            <h5>${food.name}</h5>
            <p>${food.description}</p>
        </div>`;
    });
    html += `</div></div>`;

    // Popular Places
    html += `<div class="checklist-section">
        <h4>Popular Places to Visit</h4>
        <div class="places-grid">`;
    countryInfo.popularPlaces.forEach(place => {
        html += `<div class="place-item">
            <h5>${place.name}</h5>
            <p>${place.description}</p>
        </div>`;
    });
    html += `</div></div>`;

    // Local Insights
    html += `<div class="checklist-section">
        <h4>Local Insights</h4>
        <ul class="insights-list">`;
    countryInfo.localInsights.forEach(insight => {
        html += `<li>${insight}</li>`;
    });
    html += `</ul></div>`;

    // Smart Extras
    html += `<div class="checklist-section">
        <h4>Smart Extras</h4>
        <div class="alert-box">
            <h5>Seasonal Alerts</h5>
            <p>${countryInfo.smartExtras.seasonalAlerts}</p>
        </div>
        <div class="alert-box" style="margin-top: 1rem; background: #fff3e0; border-left-color: #ff9800;">
            <h5>Common Scams</h5>
            <p>${countryInfo.smartExtras.commonScams}</p>
        </div>
        <div class="quick-facts-grid" style="margin-top: 1rem;">
            <div class="fact-item">
                <span class="fact-label">Local Transport/Payment Apps</span>
                <span class="fact-value">${countryInfo.smartExtras.localApps}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Roaming Charges</span>
                <span class="fact-value">${countryInfo.smartExtras.roamingCharges}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Packing Tips</span>
                <span class="fact-value">${countryInfo.smartExtras.packingTips}</span>
            </div>
        </div>
    </div>`;

    // Update content and show
    checklistContent.innerHTML = html;
    checklistDisplay.style.display = 'block';

    // Scroll to checklist
    setTimeout(() => {
        checklistDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// Print Checklist Function
function printChecklist() {
    window.print();
}

// Event Listeners
// Event Listeners
function initChecklistGenerator() {
    const generateBtn = document.getElementById('generate-checklist-btn');
    const printBtn = document.getElementById('print-checklist');

    if (generateBtn) {
        generateBtn.addEventListener('click', function () {
            console.log('Generate button clicked');
            generateChecklist();
        });
        console.log('Checklist generator initialized');
    } else {
        console.error('Generate button not found');
    }

    if (printBtn) {
        printBtn.addEventListener('click', printChecklist);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChecklistGenerator);
} else {
    initChecklistGenerator();
}

