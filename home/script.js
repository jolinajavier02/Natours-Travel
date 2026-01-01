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
// countryData is now loaded from country_data.js


// Generate Checklist Function
// Helper to load .env variables (simulated for frontend)
async function getEnvVariable(key) {
    try {
        const response = await fetch('/.env');
        const text = await response.text();
        const lines = text.split('\n');
        for (const line of lines) {
            const [k, v] = line.split('=');
            if (k.trim() === key) return v.trim();
        }
    } catch (e) {
        console.error('Error loading .env:', e);
    }
    return null;
}

// Helper to load prompt template
async function getPromptTemplate() {
    try {
        const response = await fetch('/prompt.txt');
        return await response.text();
    } catch (e) {
        console.error('Error loading prompt.txt:', e);
        return null;
    }
}

// Generate Checklist Function using Gemini API
async function generateChecklist() {
    const originSelect = document.getElementById('origin-country');
    const destinationSelect = document.getElementById('destination-country');
    const checklistDisplay = document.getElementById('checklist-display');
    const checklistTitle = document.getElementById('checklist-title');
    const checklistContent = document.getElementById('checklist-content');
    const generateBtn = document.getElementById('generate-checklist-btn');

    const origin = originSelect.value;
    const destination = destinationSelect.value;

    if (!origin || !destination) {
        alert('Please select both origin and destination countries.');
        return;
    }

    const originName = originSelect.options[originSelect.selectedIndex].text;
    const destinationName = destinationSelect.options[destinationSelect.selectedIndex].text;

    // Show loading state
    const originalBtnText = generateBtn.textContent;
    generateBtn.textContent = 'Generating...';
    generateBtn.disabled = true;
    checklistDisplay.style.display = 'none';

    try {
        const apiKey = await getEnvVariable('GEMINI_API_KEY');
        const promptTemplate = await getPromptTemplate();

        if (!apiKey || !promptTemplate) {
            throw new Error('API Key or Prompt Template missing. Please check .env and prompt.txt');
        }

        const prompt = promptTemplate
            .replace('{origin}', originName)
            .replace('{destination}', destinationName)
            .replace('{origin_code}', origin);

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API Error:', errorData);
            throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const resultText = data.candidates[0].content.parts[0].text;

        // Clean the result text in case Gemini adds markdown code blocks
        const cleanJson = resultText.replace(/```json\n?|\n?```/g, '').trim();
        const countryInfo = JSON.parse(cleanJson);

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

    } catch (error) {
        console.error('Error generating checklist:', error);
        alert('Failed to generate checklist. Please try again later.');
    } finally {
        generateBtn.textContent = originalBtnText;
        generateBtn.disabled = false;
    }
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

