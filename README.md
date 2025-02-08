# EcoSense Web Application - Documentation
## By Z3RO CRASH

## Overview
EcoSense is a sustainability-focused web application designed to provide users with real-time environmental analytics, sustainability scores, and AI-powered assistance for sustainable living. The app integrates weather forecasting, air quality monitoring, and AI-driven guidance to help users make environmentally conscious decisions.

## Screenshots
![Dashboard](https://i.imgur.com/RP1LxtK.png)

![AI Chat](https://i.imgur.com/kpYizgJ.png)

Features 1. Dashboard:
• Real-time weather updates (temperature, wind speed, humidity, etc.).
• Location-based air quality index (AQI) and carbon footprint insights.
• Sustainability metrics such as energy efficiency and water usage. 2. AI Chatbot:
• Powered by Socket.IO and OpenAI.
• Answers sustainability-related queries.
• Provides personalized suggestions based on current weather conditions. 3. Shop Green:
• A curated list of eco-friendly products (future expansion). 4. Sustainability Analytics:
• Real-time data visualization of environmental metrics.

Tech Stack
• Frontend:
• React.js (Responsive UI with Material-UI for components)
• CSS-in-JS for custom styling
• Backend:
• Node.js
• Express.js
• Socket.IO for real-time AI chatbot interactions
• APIs:
• Weather API for forecasting and AQI data.
• OpenAI API for AI assistance.
• Database: MongoDB (for storing user preferences and chat history)
• Deployment: Dockerized setup (scalable and platform-independent)

Setup Process 
### 1. Clone the Repository:

```console
git clone https://github.com/username/ecosense.git
cd ecosense
```

### 2. Install Dependencies:

```console
npm install
```

### 3. Environment Variables:
#### Create a .env file in the root directory.
#### Add the following:

```console
WEATHER_API_KEY=your_weather_api_key
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_string
PORT=9090
```

### 4. Run the Project:

```console
npm run dev
```
### 5. Access the Application:
    Open http://localhost:3000 in your browser.

## Future Expansion 
1. Product Recommendations:
    • Integrate OpenFoodFacts API for product sustainability data.
    • Add recyclability scoring using Material AI.
2. User Profiles:
    • Track and display user-specific sustainability progress over time.
3. Gamification:
    • Introduce badges and rewards for sustainable actions.
4. Mobile App:
    • Develop a React Native app for better accessibility.
5. Carbon Offset Integration:
    • Partner with carbon offset programs to allow users to directly contribute to environmental initiatives.

How It Works 
1. Weather & AQI Data:
• The app fetches real-time weather and air quality data using the Weather API based on the user’s geolocation.
2. AI Chatbot:
• Socket.IO ensures seamless communication between the user and the AI.
• The chatbot understands current weather and provides relevant sustainability tips (e.g., energy-saving tips during high energy usage days).
3. Sustainability Scores:
• Metrics are calculated using API integrations and algorithms to assess energy consumption, water usage, and carbon footprint.


Feel free to contribute and make the world greener! 🌱
