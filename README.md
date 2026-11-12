# AquaClean AI

![AquaClean AI | Innovation Project](https://img.shields.io/badge/AquaClean%20AI-Innovation%20Project-06b6d4?style=for-the-badge&logo=dropbox&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38BDF8?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> **Smarter Waste Removal. Cleaner Water. Better Tomorrow.**

---

## 🌊 About the Project

**AquaClean AI** is an interactive innovation showcase website presenting a proposed intelligent water treatment screening system. The project demonstrates how automated mechanical screening combined with smart sensor monitoring and AI-assisted waste detection can reduce the burden of manual solid-waste removal at water treatment plant inlets.

Solid waste — plastic bottles, polythene bags, leaves, wrappers, and accumulated debris — routinely clogs inlet screens at water treatment facilities. Manual removal is repetitive, labour-intensive, and inconsistent. AquaClean AI proposes a mechanically automated bar screen system enhanced with real-time monitoring, sensor data collection, and an AI-assisted detection pipeline that can alert operators before critical blockages occur.

This website is built as a **competition-ready, fully responsive single-page application** that walks visitors through the problem, the proposed solution, an interactive simulation, a live monitoring dashboard, comparative analysis, projected benefits, and the project team.

---

## ✨ Features

The website contains **12 fully animated sections**:

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Animated gradient landing with SVG water treatment diagram and CTA buttons |
| 2 | **The Problem** | Interactive expandable waste-type cards + Manual vs Automated animated comparison |
| 3 | **Our Solution** | Four technology pillars with glassmorphism cards and modal deep-dives |
| 4 | **How It Works** | Animated step-by-step process timeline with particle water-flow SVG |
| 5 | **Simulation** | Interactive real-time animated simulation of the bar screen and rake mechanism |
| 6 | **Dashboard** | Industrial monitoring dashboard with Recharts graphs and live-randomised readings |
| 7 | **Technology** | Deep-dive into Automated Screening, Mechanical Collection, Sensor Monitoring, AI Detection |
| 8 | **Comparison** | Side-by-side Manual vs Automated comparison with animated Recharts charts |
| 9 | **Impact** | 7 benefit cards with animated icons and scroll-triggered entrance |
| 10 | **Future Scope** | Roadmap for scalability, IoT integration, and next steps |
| 11 | **Team** | Placeholder profile cards for team members, project guide, and institution |
| 12 | **Contact** | Validated contact form with honest no-backend disclaimer toast |

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18 | UI component library |
| **TypeScript** | 5 | Static typing and developer safety |
| **Tailwind CSS** | 3 | Utility-first responsive styling |
| **Vite** | 5 | Lightning-fast build tool and dev server |
| **Framer Motion** | 11 | Declarative animations and transitions |
| **Lucide React** | latest | Consistent icon system |
| **Recharts** | 2 | Composable charting for the dashboard |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or later
- **npm** 9 or later (or pnpm / yarn)

### Installation

```bash
git clone https://github.com/shivteg/aquaclean-ai.git
cd aquaclean-ai
npm install
npm run dev
```

The development server starts at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

The optimised output is written to the `dist/` folder. Preview it with:

```bash
npm run preview
```

---

## 📁 Project Structure

```
aquaclean-ai/
├── public/
│   └── favicon.svg             # Water droplet favicon (aqua blue)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky responsive navbar with dark mode toggle
│   │   ├── Hero.tsx             # Animated hero with water treatment SVG diagram
│   │   ├── Problem.tsx          # Problem description + expandable waste cards
│   │   ├── Solution.tsx         # Four technology pillar cards with modals
│   │   ├── Modal.tsx            # Reusable animated modal component
│   │   ├── HowItWorks.tsx       # Step-by-step process timeline
│   │   ├── Simulation.tsx       # Interactive bar screen simulation
│   │   ├── Dashboard.tsx        # Industrial monitoring dashboard with Recharts
│   │   ├── Technology.tsx       # Technology deep-dive section
│   │   ├── Comparison.tsx       # Manual vs Automated comparison
│   │   ├── Impact.tsx           # Benefits and environmental impact cards
│   │   ├── FutureScope.tsx      # Future development roadmap
│   │   ├── Team.tsx             # Team profile placeholder cards
│   │   ├── Contact.tsx          # Validated contact form
│   │   ├── Footer.tsx           # Site footer
│   │   └── BackToTop.tsx        # Floating scroll-to-top button
│   ├── hooks/
│   │   └── useScrollAnimation.ts # Custom IntersectionObserver hook
│   ├── App.tsx                  # Root app with dark mode state and section layout
│   ├── main.tsx                 # React entry point
│   ├── index.css                # Global styles and Tailwind imports
│   └── favicon.svg              # SVG favicon (src copy)
├── index.html                   # Vite HTML entry with Google Fonts
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── tsconfig.json                # TypeScript root configuration
├── tsconfig.app.json            # TypeScript app configuration
├── tsconfig.node.json           # TypeScript Node configuration
├── package.json                 # Dependencies and scripts
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

---

## ⚠️ Scientific Accuracy Disclaimer

> **Important:** AquaClean AI is a **student innovation project and competition entry**. All sensor readings in the monitoring dashboard are **simulated demonstration data** and do not represent measurements from a real deployed system. Efficiency comparisons, operational metrics, and environmental impact projections are **illustrative estimates** intended to communicate the concept, not peer-reviewed scientific claims. The proposed system design is based on publicly available information about mechanical bar screens, rake mechanisms, and sensor-assisted monitoring in water treatment.

---

## 🏆 Competition Ready

This project is designed and built as a **science fair / innovation competition entry**:

- ✅ Fully responsive — works on mobile, tablet, and desktop
- ✅ Dark mode support across all sections
- ✅ Smooth scroll navigation with active-link highlighting
- ✅ Interactive simulation and live dashboard for judges
- ✅ Honest disclaimers on simulated data (no misleading claims)
- ✅ Professional design with consistent aqua/navy colour palette
- ✅ Accessible semantic HTML structure
- ✅ Zero-runtime-dependency deployment via `npm run build`

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 AquaClean AI Project Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  Built with 💧 for a cleaner tomorrow · AquaClean AI Innovation Project · 2024
</p>
