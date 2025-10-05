# ExoVision AI - A World Away: Hunting for Exoplanets with AI

🌌 **NASA Space Apps Global Hackathon Project**

> 🔭 Explore the cosmos with AI — detect exoplanets straight from your browser!

---

🌐 **[🚀 Visit Live Website → ExoVisionAI.space](https://your-deployed-site-url.com)**  

<p align="center">
  <img src="assets/home.png" alt="ExoVision AI Screenshot" width="800" style="border-radius:12px;box-shadow:0 0 15px rgba(0,0,0,0.3);" />
</p>

---

## 🚀 Project Overview

ExoVision AI leverages machine learning to identify candidate exoplanets based on light curve data. The platform includes:

- **Dataset Upload & Analysis**: Upload CSV files and visualize stellar brightness variations
- **AI Detection Model**: Trained ML model identifies exoplanet candidates automatically
- **Research Assistant**: RAG-powered chatbot helps researchers understand and explore data

## 🛠️ Technology Stack

### Frontend
- **React 18** + **Vite** - Fast, modern development
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Space-themed UI design
- **shadcn/ui** - Beautiful component library
- **Recharts** - Light curve visualization
- **React Router** - Navigation


### Backend
💫 The FastAPI backend is available here:  
👉 **[ExoVision AI Backend Repository](https://github.com/JosephJonathanFernandes/Nasa-Space-Hackathon-WizCoders-backend)**

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   └── Footer.tsx          # Footer with credits
│   ├── home/
│   │   ├── Hero.tsx            # Hero section with 3D planet
│   │   └── Features.tsx        # Feature highlights
│   ├── upload/
│   │   ├── UploadSection.tsx   # CSV upload with drag-drop
│   │   ├── AnalysisResult.tsx  # Results display
│   │   └── LightCurveChart.tsx # Light curve visualization
│   └── chat/
│       ├── ChatInterface.tsx   # Chat UI
│       ├── MessageBubble.tsx   # Message display
│       └── ChatInput.tsx       # Message input
├── pages/
│   ├── Home.tsx               # Landing page
│   ├── UploadPage.tsx         # Upload & analysis page
│   ├── ChatPage.tsx           # AI chatbot page
│   └── NotFound.tsx           # 404 page
├── services/
│   └── api.ts                 # Backend API integration
├── hooks/
│   ├── useUpload.ts           # Upload logic hook
│   └── useChat.ts             # Chat logic hook
└── App.tsx                    # Main app with routing
```

## 🎨 Design System

### Color Palette
- **Deep Navy**: `hsl(225, 60%, 10%)` - Background
- **Cosmic Blue**: `hsl(214, 100%, 62%)` - Primary actions
- **Nebula Purple**: `hsl(244, 100%, 69%)` - Secondary elements
- **Star White**: `hsl(210, 17%, 98%)` - Text

### Features
- Glassmorphic cards with backdrop blur
- Animated starfield background
- Glowing effects on interactive elements
- Smooth transitions with Framer Motion patterns
- Responsive mobile-first design

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:8080` to see the application.

## 🧠 AI Model Integration

The platform is designed to work with ML models trained on:
- NASA Kepler mission data
- TESS mission observations
- Transit detection algorithms
- RAG (Retrieval-Augmented Generation) for chat

## 📝 Development Guidelines

- **Components**: Functional components with TypeScript
- **Styling**: Design system tokens (no hardcoded colors)
- **State**: React hooks for local state, React Query for server state
- **Documentation**: JSDoc comments on all components/functions
- **Accessibility**: ARIA labels, keyboard navigation

## 🌟 Features

### Current
✅ Dataset upload with drag-and-drop  
✅ Light curve visualization  
✅ Candidate detection display  
✅ AI chatbot interface  
✅ Responsive design  
✅ Space-themed animations  

### Coming Soon
- [ ] Advanced filtering and sorting
- [ ] Export analysis reports
- [ ] User authentication
- [ ] Dataset history

## 🤝 Contributing

This project was developed for NASA Space Apps Global Hackathon. Contributions welcome!

## 📜 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- NASA Kepler & TESS missions for exoplanet data
- NASA Exoplanet Archive
- Space Apps Challenge organizers
- Open source community

## 🔗 Resources

- [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/)
- [Kepler Mission](https://www.nasa.gov/kepler)
- [TESS Mission](https://tess.mit.edu/)
- [Lovable Documentation](https://docs.lovable.dev/)

---

**Built with ❤️ for exploring the cosmos** 🪐
