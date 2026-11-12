# AQUASENSE

![AquaSense | Innovation Project](https://img.shields.io/badge/AquaSense-Innovation%20Project-06b6d4?style=for-the-badge&logo=dropbox&logoColor=white)
![Competition Entry](https://img.shields.io/badge/LPU%20Innovation%20Competition-14--15%20Nov-10b981?style=for-the-badge)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> **Clean Water. Green Agriculture. Sustainable Future.**  
> *AquaSense – Turning Pond Pollution into Environmental Opportunity.*

---

## 🌊 About AquaSense

**AquaSense – An Integrated Floating Pond-Cleaning, Algae-to-Fertiliser and Water-Purification System.**

AquaSense is an integrated environmental sustainability platform formulated for presentation at the **Lovely Professional University Innovation Competition on 14–15 November**.

Unlike isolated water treatment plants or standalone waste-skimming machines, AquaSense introduces a closed-loop circular economy connecting pond conservation, waste recovery, and regenerative agriculture:

$$\text{POLLUTION} \longrightarrow \text{COLLECTION} \longrightarrow \text{SEPARATION} \longrightarrow \text{RESOURCE RECOVERY} \longrightarrow \text{WATER TREATMENT} \longrightarrow \text{SUSTAINABLE REUSE}$$

### 🎯 Core Vision
> *“To transform polluted ponds into valuable environmental resources by connecting water conservation, waste recovery and sustainable agriculture.”*

---

## ⚙️ The Three Main Units of AquaSense

### 1. 🚤 Unit A: AquaClean — Floating Smart Pond-Cleaning Robot (Main Attraction)
The flagship autonomous surface vessel engineered specifically for pond ecosystem restoration:
- **Buoyancy & Floatation**: Twin hollow waterproof HDPE pontoons (reserve buoyancy > 85 kg) based on **Archimedes' Principle**.
- **Propulsion**: Two submerged 60W DC thrust motors with 3-blade shrouded marine propellers obeying **Newton's Third Law of Motion**.
- **Steering**: Software-driven differential steering (PWM H-bridge) enabling 360° zero-radius turning without bulky rudders.
- **Harvesting Mechanism**: Convergent front intake throat channeling surface scum into an inclined continuous rotating wire mesh conveyor (2.5 mm aperture).
- **Drainage & Storage**: Water drains gravitationally back into the pond while wet solids tumble into a detachable 40L rear collection hopper.
- **Embedded Core**: Dual-core ESP32 microcontroller running FreeRTOS for autonomous obstacle avoidance, fail-safe returns, and telemetry streaming.
- **Sensor Suite**: Ultrasonic sonar (obstacle detection), optical nephelometric turbidity probe, glass-electrode pH sensor, waterproof DS18B20 temperature probe, and optional GPS waypoint logging.

### 2. 🌿 Unit B: AquaFert — Algae-to-Organic-Fertiliser Unit
Transforms troublesome pond algal blooms into certified organic soil amendments:
1. **Algae Harvest & Intake**: Raw aquatic biomass intake from AquaClean robot.
2. **Contaminant & Plastic Separation**: Vibratory and flotation sorting to isolate microplastics and non-biodegradable debris.
3. **Dewatering**: Perforated screw press reduces moisture from ~90% down to the optimal 55–65% composting moisture window.
4. **C:N Ratio Balancing**: Blends nitrogen-rich algae ($\text{C:N } \sim 8:1$) with dry agricultural straw/leaves ($\text{C:N } \sim 60:1$) to achieve the ideal **25:1 to 30:1** aerobic composting stoichiometry.
5. **Thermophilic Microbial Composting**: Aerobic bacteria and actinomycetes oxidize organic carbon, releasing metabolic heat reaching **55°C–65°C** to sanitize pathogens and weed seeds.
6. **Maturation & Safety Testing**: Mandatory screening for cyanotoxins (microcystins) and heavy metals (Lead/Cadmium).
7. **Regenerative Soil Amendment**: High-grade finished compost applied to farmland to boost soil microbiology and moisture retention.

### 3. 💧 Unit C: AquaPure — 7-Stage Water Treatment Facility
Transports remaining pond water through a multi-barrier purification train for verified safe reuse:
1. **Preliminary Screening**: 500-micron rotary drum filter removes remaining fine suspended filaments.
2. **Coagulation & Flocculation**: Rapid in-line dosing of Polyaluminium Chloride (PAC) destabilizes colloidal charges.
3. **Sedimentation**: High-rate 60° inclined lamella plate clarifier settles flocs under gravitational acceleration (**Stokes' Law**).
4. **Multi-Media Sand Filtration**: Dual-media depth filtration (anthracite + quartz sand) removes residual turbidity (< 1.5 NTU).
5. **Activated Carbon Filtration**: Granular Activated Carbon (GAC) adsorbs dissolved organic compounds, agricultural pesticides, and odor compounds (geosmin).
6. **Disinfection**: Medium-pressure 254 nm germicidal UV-C reactor chamber achieves 99.99% (4-log) microbial pathogen inactivation without toxic chlorine byproducts.
7. **Final Water Quality Audit**: Continuous sensor manifold verifying compliance with WHO and BIS IS 10500 standards for unrestricted drip irrigation and aquifer recharge.

---

## 🎮 10 Genuine Interactive Features

1. **Floating Robot Physics Simulation**: Real-time canvas simulation of AquaClean with Start, Pause, Reset, speed toggles, debris injectors, and obstacle avoidance.
2. **Live Waste Collection Counter**: Real-time telemetry tracking Algae ($kg$), Plastics recovered, Leaves ($kg$), Cleaned Area ($m^2$), and Sonar proximity ($cm$).
3. **Interactive Waste Separation Sorter**: Adjust harvest weights and material shares to simulate automated density-differential separation.
4. **7-Stage Composting Stepper & C:N Simulator**: Interactive composting pipeline with thermodynamic curves and a real-time Carbon-to-Nitrogen formulation slider.
5. **Clickable 7-Stage Water Purification Train**: Interactive diagram highlighting working principles, technological hardware, retention times, and efficiencies.
6. **Central Environmental Monitoring Dashboard**: 5-tab telemetry hub featuring simulated pond metrics, robot status, waste recovery, and AquaPure diagnostic curves.
7. **Water Quality Testing Interface**: Test 4 water samples (Raw pond, post-robot, clarified, post-AquaPure) across 7 critical parameters against WHO / BIS standards.
8. **Before & After Interactive Pond Slider**: Drag handle revealing the transformation of a hypoxic, plastic-ridden pond into an oxygenated aquatic sanctuary.
9. **Complete Working Process Flowchart**: Clickable 7-node interactive journey from Pond Catchment to Agricultural Reuse.
10. **Scientific Principles Explorer**: Interactive categorized cards detailing Physics, Chemistry, Biology, and Electronics foundations.

---

## 🔬 Scientific Foundations

- **Physics**: Archimedes' Principle of Buoyancy ($F_b = \rho V g$), Newton's Third Law ($F_{action} = -F_{reaction}$), Fluid Mechanics & Bernoulli Streamlines, Gravity Separation & Stokes' Settling Law.
- **Chemistry**: Colloidal Double-Layer Compression (DLVO Theory), Granular Depth Filtration (Kozeny-Carman), Activated Carbon Adsorption (Freundlich Isotherms), Carbonate Buffering & pH.
- **Biology**: Photosynthetic Carbon Fixation, Aerobic Microbial Respiration ($\Delta H$ heat generation), Stoichiometric C:N Dynamics (25–30:1), Biological N-P-K Nutrient Recovery.
- **Electronics & Computer Science**: ESP32 Dual-Core Architecture (FreeRTOS real-time scheduling), Ultrasonic Sonar Ranging ($d = v \cdot \Delta t / 2$), H-Bridge PWM Motor Control, MQTT Telemetry over WebSockets.

---

## ⚠️ Academic Rigor & Safety Guardrails

- **Surface Skimming vs Potable Drinking Water**: Removing surface algae and floating plastic mechanically does **not** make water safe to drink. Human drinking-water suitability requires certified multi-barrier treatment (e.g. reverse osmosis) and certified laboratory validation against national standards (BIS IS 10500 / WHO).
- **Algal Toxicity (Microcystins)**: Not all algae are safe for direct agricultural use. Toxic blue-green cyanobacteria must undergo rapid ELISA testing and thermophilic sanitization (≥ 55°C) to denature biological toxins.
- **Demonstration Data Notice**: All real-time telemetry numbers and dashboard charts on this platform are browser-rendered demonstration data modeled after scientific formulas, and are transparently labeled as such for the competition showcase.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Custom Environmental Gradients
- **Animations**: Framer Motion
- **Visuals & Charts**: HTML5 Canvas (Robot Simulation), Recharts (Telemetry Curves), Lucide React Icons
- **Bundler**: Vite 8

---

## 🚀 Getting Started

### Installation

```bash
git clone https://github.com/shivteg/aquaclean-ai.git
cd aquaclean-ai
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production

```bash
npm run build
```

---

## 🏆 Innovation Competition Entry

- **Event**: Lovely Professional University Innovation Competition
- **Dates**: 14–15 November
- **Category**: Clean Technology, Robotics & Environmental Sustainability
- **Repository**: [https://github.com/shivteg/aquaclean-ai](https://github.com/shivteg/aquaclean-ai)

---

<p align="center">
  <strong>AQUASENSE</strong> · Clean Water · Green Agriculture · Sustainable Future · 2026
</p>
