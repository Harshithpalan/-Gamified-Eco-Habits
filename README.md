# 🌿 Gamified Eco Habits

Transforming individual sustainable actions into collective planetary healing through gamification and AI.
## 🚀 Overview

**Gamified Eco Habits** is a comprehensive sustainability platform designed to help users track, improve, and gamify their environmental impact. By combining real-time carbon tracking, behavioral psychology, and an AI-driven shopping assistant, we empower individuals to become "Eco Warriors" in the fight against climate change.

## ✨ Key Features

- **📊 AI Carbon Tracking**: Real-time estimation of carbon footprints across transport, energy, and diet.
- **🎮 Gamified Rewards**: Earn badges, maintain streaks, and climb global leaderboards for sustainable habits.
- **🛍️ Eco-Friendly Shopping Assistant**: A Chrome extension that provides sustainability ratings and footprint estimations on Amazon and Flipkart.
- **🤝 Community Challenges**: Join 1.2M+ users in collective reforestation and carbon reduction goals.
- **📈 Data Visualization**: Interactive charts and insights powered by Recharts to track your progress.

## 🛠️ Tech Stack
### Browser Extension
- **Platform**: Chrome Extension Manifest V3
- **Logic**: Vanilla JavaScript
- **Styling**: Standard CSS

## 📂 Project Structure

```text
Gamified-Eco-Habits/
├── web-dashboard/       # Next.js Application
│   ├── src/app/        # Dashboard, Habits, Rewards, Community
│   ├── src/lib/        # Firebase config, gamification logic
│   └── public/         # Static assets
├── browser-extension/   # Chrome Extension
│   ├── manifest.json   # Extension configuration
│   ├── content.js      # Scrapers for Amazon/Flipkart
│   └── popup.html      # User interface
└── package.json         # Root scripts for development
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/Gamified-Eco-Habits.git
   cd Gamified-Eco-Habits
   ```

2. **Install dependencies**:
   ```bash
   # Install root dependencies
   npm install
   # Install dashboard dependencies
   cd web-dashboard && npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` in `web-dashboard/` with your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   ...
   ```

4. **Run development server**:
   ```bash
   # From root
   npm run dev
   ```