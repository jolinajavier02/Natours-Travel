# Natours Travel & Tour Services

A modern, AI-powered travel agency website featuring a dynamic checklist generator and interactive destination guides.

## 🚀 Features

- **AI Travel Checklist Generator**: Uses Google Gemini API to generate real-time, comprehensive travel checklists tailored to your origin and destination.
- **Interactive Destination Guides**: Detailed information on popular travel spots.
- **Modern Responsive Design**: Premium aesthetics with smooth animations and mobile-friendly layouts.
- **Dynamic Image Sliders**: Showcasing flights, hotels, tours, and more.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+)
- **AI Integration**: Google Gemini 1.5 Flash API
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter, Roboto, Outfit)

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jolinajavier02/Natours-Travel.git
   cd Natours-Travel
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Configure Prompt Template**:
   Ensure `prompt.txt` exists in the root directory with the desired AI instructions.

4. **Run Locally**:
   Since the application uses `fetch` to load configuration files, it must be served via a web server.
   ```bash
   # Using Python
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

## 📂 Project Structure

- `/home`: Main landing page and core logic.
- `/guidelines`: Travel guidelines and information.
- `/book-your-trip`: Booking interface.
- `/services`: Details on offered travel services.
- `country_data.js`: Fallback/static travel data.
- `script.js`: Main application logic and AI integration.

## 📄 License

© 2025 Natours-Travel-And-Tour-Services. All rights reserved.
