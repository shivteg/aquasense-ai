import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface ComponentDetail {
  id: string;
  name: string;
  category: 'Structure' | 'Propulsion' | 'Harvesting' | 'Electronics' | 'Sensors';
  scientificPrinciple: string;
  principleDesc: string;
  description: string;
  specs: { label: string; value: string }[];
  tag: string;
  hotspot: { x: number; y: number }; // Percentage position on robot schematic
}

const robotComponents: ComponentDetail[] = [
  {
    id: 'pontoons',
    name: 'Dual Hollow Waterproof Pontoons',
    category: 'Structure',
    scientificPrinciple: "Archimedes' Principle (Buoyancy)",
    principleDesc: 'The buoyant force exerted on a submerged body equals the weight of fluid displaced (Fb = ρ · V · g). The sealed hollow pontoons displace sufficient water to maintain stable positive buoyancy with up to 35 kg of harvested payload.',
    description: 'Twin marine-grade, rotational-moulded HDPE hollow pontoons provide extreme roll stability, low draft (less than 15 cm), and buoyancy in stagnant or turbulent pond conditions.',
    specs: [
      { label: 'Material', value: 'High-Density Polyethylene (HDPE)' },
      { label: 'Displacement Volume', value: '68 Litres per pontoon' },
      { label: 'Net Buoyancy Reserve', value: '> 85 kg' },
      { label: 'Draft Depth', value: '12–15 cm fully loaded' },
    ],
    tag: 'Buoyancy & Floatation',
    hotspot: { x: 18, y: 70 },
  },
  {
    id: 'motors',
    name: 'Twin DC Thrust Motors & Propellers',
    category: 'Propulsion',
    scientificPrinciple: "Newton's Third Law of Motion (Action-Reaction)",
    principleDesc: 'For every action force, there is an equal and opposite reaction force (Faction = -Freaction). Propellers accelerate water rearward, generating forward dynamic thrust in accordance with fluid momentum conservation.',
    description: 'Submersible dual brushed DC motors equipped with shrouded 3-blade marine propellers deliver controlled forward, reverse, and differential steering thrust.',
    specs: [
      { label: 'Operating Voltage', value: '12V DC (PWM Controlled)' },
      { label: 'Rated Power', value: '120W (60W × 2)' },
      { label: 'Propeller Type', value: '60mm 3-Blade Shrouded' },
      { label: 'Max Thrust', value: '4.8 kgf total' },
    ],
    tag: 'Thrust Generation',
    hotspot: { x: 14, y: 35 },
  },
  {
    id: 'steering',
    name: 'Differential Steering System',
    category: 'Propulsion',
    scientificPrinciple: 'Fluid Mechanics & Kinematics of Torque',
    principleDesc: 'Differential speed between port and starboard propellers produces a yaw turning moment (τ = F · r). Counter-rotating the two thrusters allows 360° zero-radius spot turning in tight pond corners.',
    description: 'Software-driven H-Bridge motor driver regulates independent left and right propeller speeds, enabling precision navigation around reeds, shorelines, and obstacles without heavy mechanical rudders.',
    specs: [
      { label: 'Turning Radius', value: '0 cm (Zero-radius pivot)' },
      { label: 'Control Method', value: 'Dual H-Bridge PWM Driver' },
      { label: 'Response Time', value: '< 25 ms' },
      { label: 'Reverse Capability', value: 'Full bi-directional' },
    ],
    tag: 'Agile Navigation',
    hotspot: { x: 25, y: 52 },
  },
  {
    id: 'intake',
    name: 'Front Waste-Collection Opening',
    category: 'Harvesting',
    scientificPrinciple: 'Fluid Convergence & Flow Channeling',
    principleDesc: 'Convergent guide vanes utilize Bernoulli streamline principles to funnels floating algae mats and buoyant plastic objects directly onto the inclined conveyor mouth.',
    description: 'The front opening sits between the forward pontoon bows, creating a natural collection throat that channels surface scum and plastics toward the rotating belt without disturbing bottom sediment.',
    specs: [
      { label: 'Intake Width', value: '650 mm opening' },
      { label: 'Immersion Depth', value: '75 mm beneath surface' },
      { label: 'Debris Deflectors', value: 'Dual side guide fences' },
      { label: 'Intake Velocity', value: '0.4 – 0.8 m/s' },
    ],
    tag: 'Debris Channeling',
    hotspot: { x: 80, y: 50 },
  },
  {
    id: 'conveyor',
    name: 'Rotating Mesh Conveyor Belt',
    category: 'Harvesting',
    scientificPrinciple: 'Mechanical Filtration & Positive Displacement',
    principleDesc: 'Porous continuous mesh creates a moving sieve: solid waste larger than 2 mm is frictionally captured and elevated, while water drains continuously back into the pond via gravitational shear.',
    description: 'A 45° inclined conveyor belt constructed from food-grade stainless steel wire mesh or reinforced nylon, featuring integrated flights that prevent wet algae from sliding backward during elevation.',
    specs: [
      { label: 'Mesh Aperture', value: '2.5 mm square' },
      { label: 'Belt Speed', value: '15 – 35 RPM variable' },
      { label: 'Incline Angle', value: '45° optimal drainage' },
      { label: 'Drive Mechanism', value: 'High-torque geared 12V motor' },
    ],
    tag: 'Continuous Extraction',
    hotspot: { x: 62, y: 50 },
  },
  {
    id: 'basket',
    name: 'Rear Collection Basket & Storage',
    category: 'Harvesting',
    scientificPrinciple: 'Gravity Separation & Volumetric Accumulation',
    principleDesc: 'Solids lifted by the conveyor tumble over the head pulley into the hopper under gravitational acceleration (g = 9.81 m/s²), while residual moisture drains through base perforations.',
    description: 'A detachable 40-litre collection basket with ergonomic handles for rapid shore-side unloading. Equipped with load-cell sensors to detect payload weight.',
    specs: [
      { label: 'Capacity', value: '40 Litres (~25 kg wet biomass)' },
      { label: 'Emptying Mechanism', value: 'Quick-release slide latch' },
      { label: 'Drainage Matrix', value: 'Perforated base tray' },
      { label: 'Load Detection', value: 'Strain gauge weight sensor' },
    ],
    tag: 'Biomass Storage',
    hotspot: { x: 42, y: 50 },
  },
  {
    id: 'esp32',
    name: 'ESP32 Automation & Control Core',
    category: 'Electronics',
    scientificPrinciple: 'Real-Time Embedded Computing & Telemetry',
    principleDesc: 'Dual Xtensa 32-bit LX6 microprocessors running FreeRTOS execute parallel obstacle-avoidance loops, sensor sampling, PWM motor calculations, and wireless telemetry streaming.',
    description: 'The master intelligence hub on board. Handles sensor fusion, runs the autonomous patrolling state machine, communicates with the central monitoring dashboard, and manages failsafe emergency stops.',
    specs: [
      { label: 'Processor', value: 'Dual-Core 240MHz ESP32' },
      { label: 'Wireless Connectivity', value: 'Wi-Fi 802.11 b/g/n & BLE 4.2' },
      { label: 'Telemetry Protocol', value: 'MQTT over WebSockets' },
      { label: 'Power Supply', value: '12V 20Ah LiFePO4 Battery' },
    ],
    tag: 'System Brain',
    hotspot: { x: 38, y: 28 },
  },
  {
    id: 'sensors',
    name: 'Multi-Sensor Environmental Array',
    category: 'Sensors',
    scientificPrinciple: 'Piezoelectric, Optical Nephelometry & Potentiometry',
    principleDesc: 'Ultrasonic time-of-flight calculates obstacle proximity (d = v · t / 2); nephelometric light scatter quantifies suspended solids (NTU); glass electrode measures hydrogen ion activity (pH).',
    description: 'Comprehensive suite of environmental and navigational sensors providing real-time data on pond conditions and navigational hazards.',
    specs: [
      { label: 'Ultrasonic Sonar', value: 'HC-SR04 Waterproof (2cm–400cm)' },
      { label: 'Turbidity Sensor', value: 'Infrared Optical Nephelometer' },
      { label: 'pH Sensor', value: 'Analog Industrial Glass Probe' },
      { label: 'Temperature Probe', value: 'DS18B20 1-Wire Waterproof' },
      { label: 'Optional GPS', value: 'NEO-6M NMEA Waypoint Receiver' },
    ],
    tag: 'Telemetry Sensing',
    hotspot: { x: 86, y: 35 },
  },
];

export default function AquaCleanRobot() {
  const [activeId, setActiveId] = useState<string>('pontoons');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const activeComp = robotComponents.find((c) => c.id === activeId) || robotComponents[0];

  return (
    <section
      id="aquaclean"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#091e3a] to-[#0a1628] overflow-hidden"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Unit A — Main Innovation Showcase
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            AquaClean —{' '}
            <span className="gradient-text">Floating Smart Pond Robot</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            Our flagship autonomous surface vessel engineered specifically for pond ecosystem restoration:
            combining dual-pontoon hydrodynamics, rotating mesh conveyor skimming, and ESP32 telemetry.
          </motion.p>
        </div>

        {/* Interactive Robot Schematic Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Left Column: Visual Interactive Robot Blueprint Schematic (7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-7 bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Engineering Schematic & Hotspot Map
                </span>
              </div>
              <span className="text-xs text-white/40 font-mono">Click any component to inspect</span>
            </div>

            {/* SVG Visual Model of the Robot */}
            <div className="relative w-full aspect-[16/10] bg-[#071322] rounded-2xl border border-cyan-500/20 overflow-hidden flex items-center justify-center p-4">
              {/* Background water ripples */}
              <svg
                viewBox="0 0 800 500"
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="pontoonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0891b2" />
                    <stop offset="100%" stopColor="#0e7490" />
                  </linearGradient>
                  <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                  <linearGradient id="conveyorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="robotGlow">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#06b6d4" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Pond Water Layer */}
                <rect x="0" y="0" width="800" height="500" fill="#071322" />
                {/* Simulated water flow vectors */}
                {[80, 160, 240, 320, 400].map((y, idx) => (
                  <motion.line
                    key={idx}
                    x1="20"
                    y1={y}
                    x2="780"
                    y2={y}
                    stroke="#0891b2"
                    strokeWidth="1"
                    strokeDasharray="8 12"
                    strokeOpacity="0.2"
                    animate={{ strokeDashoffset: [40, 0] }}
                    transition={{ duration: 3 + idx, repeat: Infinity, ease: 'linear' }}
                  />
                ))}

                {/* ─── ROBOT TOP-DOWN & PROFILE COMPOSITE ─── */}
                {/* Port Pontoon (Top) */}
                <rect x="120" y="100" width="460" height="60" rx="28" fill="url(#pontoonGrad)" stroke="#22d3ee" strokeWidth="1.5" />
                <text x="350" y="136" textAnchor="middle" fill="#cffafe" fontSize="12" fontFamily="sans-serif" fontWeight="bold">
                  PORT HOLLOW PONTOON (HDPE)
                </text>

                {/* Starboard Pontoon (Bottom) */}
                <rect x="120" y="340" width="460" height="60" rx="28" fill="url(#pontoonGrad)" stroke="#22d3ee" strokeWidth="1.5" />
                <text x="350" y="376" textAnchor="middle" fill="#cffafe" fontSize="12" fontFamily="sans-serif" fontWeight="bold">
                  STARBOARD HOLLOW PONTOON (HDPE)
                </text>

                {/* Structural Crossbeams */}
                <rect x="220" y="155" width="260" height="30" rx="6" fill="url(#chassisGrad)" stroke="#475569" strokeWidth="1" />
                <rect x="220" y="315" width="260" height="30" rx="6" fill="url(#chassisGrad)" stroke="#475569" strokeWidth="1" />

                {/* Center Collection & Mechanism Bay */}
                <rect x="240" y="180" width="240" height="140" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" filter="url(#robotGlow)" />

                {/* Rear Storage Basket */}
                <rect x="250" y="195" width="100" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="300" y="255" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="sans-serif">
                  REAR BASKET
                </text>
                <text x="300" y="272" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">
                  (40L Storage)
                </text>

                {/* Rotating Mesh Conveyor Belt */}
                <rect x="360" y="195" width="115" height="110" rx="6" fill="url(#conveyorGrad)" stroke="#22d3ee" strokeWidth="2" />
                {/* Mesh grid pattern */}
                {[205, 220, 235, 250, 265, 280, 295].map((my) => (
                  <line key={my} x1="360" y1={my} x2="475" y2={my} stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
                ))}
                {[380, 400, 420, 440, 460].map((mx) => (
                  <line key={mx} x1={mx} y1="195" x2={mx} y2="305" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
                ))}
                <text x="417" y="255" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                  CONVEYOR
                </text>

                {/* Front Intake Scoop opening */}
                <polygon points="480,185 580,150 580,350 480,315" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />
                <text x="535" y="255" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                  FRONT INTAKE
                </text>

                {/* Floating Debris approaching */}
                <circle cx="620" cy="220" r="10" fill="#22c55e" fillOpacity="0.7" />
                <text x="620" y="223" textAnchor="middle" fill="#ffffff" fontSize="8">Algae</text>
                <circle cx="650" cy="270" r="12" fill="#ef4444" fillOpacity="0.6" />
                <text x="650" y="273" textAnchor="middle" fill="#ffffff" fontSize="8">Plastic</text>
                <circle cx="610" cy="290" r="8" fill="#eab308" fillOpacity="0.7" />
                <text x="610" y="293" textAnchor="middle" fill="#ffffff" fontSize="7">Leaf</text>

                {/* Propulsion: Dual Rear Motors & Propellers */}
                {/* Port Motor */}
                <rect x="70" y="115" width="50" height="30" rx="6" fill="#334155" stroke="#06b6d4" strokeWidth="1.5" />
                <path d="M 60,110 L 70,130 L 60,150 Z" fill="#38bdf8" />
                <text x="95" y="134" textAnchor="middle" fill="#94a3b8" fontSize="8">M1</text>

                {/* Starboard Motor */}
                <rect x="70" y="355" width="50" height="30" rx="6" fill="#334155" stroke="#06b6d4" strokeWidth="1.5" />
                <path d="M 60,350 L 70,370 L 60,390 Z" fill="#38bdf8" />
                <text x="95" y="374" textAnchor="middle" fill="#94a3b8" fontSize="8">M2</text>

                {/* ESP32 Controller Box */}
                <rect x="260" y="125" width="70" height="40" rx="6" fill="#090d16" stroke="#10b981" strokeWidth="1.5" />
                <text x="295" y="148" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  ESP32 MCU
                </text>

                {/* Ultrasonic Sensor & Sonar Waves */}
                <rect x="575" y="235" width="20" height="30" rx="4" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
                <path d="M 600,225 A 30 30 0 0 1 600,275" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 615,215 A 45 45 0 0 1 615,285" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                <text x="590" y="210" textAnchor="middle" fill="#facc15" fontSize="8" fontFamily="monospace">
                  SONAR
                </text>

                {/* Water quality sensor probes */}
                <circle cx="500" cy="130" r="12" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="500" y="134" textAnchor="middle" fill="#22d3ee" fontSize="7" fontWeight="bold">pH/NTU</text>
              </svg>

              {/* Hotspot Interactive Markers */}
              {robotComponents.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => setActiveId(comp.id)}
                  style={{ left: `${comp.hotspot.x}%`, top: `${comp.hotspot.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-20 cursor-pointer ${
                    activeId === comp.id
                      ? 'bg-cyan-400 text-slate-950 scale-125 shadow-[0_0_20px_rgba(34,211,238,0.9)] ring-4 ring-cyan-400/40'
                      : 'bg-slate-900/90 text-cyan-400 border border-cyan-400/60 hover:scale-110 hover:bg-cyan-500/30'
                  }`}
                  aria-label={comp.name}
                >
                  <span className="text-xs font-mono font-bold">
                    {activeId === comp.id ? '●' : '+'}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Horizontal Selector Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {robotComponents.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    activeId === c.id
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {c.name.split(' ')[0]} {c.name.split(' ')[1] || ''}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Deep-Dive Component & Scientific Principle Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {activeComp.category}
              </span>
              <span className="text-xs text-white/50">{activeComp.tag}</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {activeComp.name}
            </h3>

            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {activeComp.description}
            </p>

            {/* Scientific Principle Highlight Box */}
            <div className="mb-6 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Scientific Principle</span>
              </div>
              <div className="text-sm font-bold text-white mb-1">
                {activeComp.scientificPrinciple}
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {activeComp.principleDesc}
              </p>
            </div>

            {/* Technical Specifications Table */}
            <div className="mb-6">
              <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                Engineering Specifications
              </div>
              <div className="space-y-2">
                {activeComp.specs.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-white/5 border border-white/5"
                  >
                    <span className="text-white/60">{s.label}</span>
                    <span className="font-mono font-semibold text-cyan-300">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct CTA to Live Robot Simulation */}
            <a
              href="#simulation"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
            >
              <span>Launch Live Simulation with this Unit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* 5 Scientific Principles Bar */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 text-center">
            Key Scientific Foundations Powering AquaClean
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-cyan-400 font-bold text-sm">Archimedes</div>
              <div className="text-xs text-white/60 mt-1">Buoyancy & Floatation</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-cyan-400 font-bold text-sm">Newton's 3rd Law</div>
              <div className="text-xs text-white/60 mt-1">Reaction Propulsion</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-cyan-400 font-bold text-sm">Fluid Mechanics</div>
              <div className="text-xs text-white/60 mt-1">Streamline Intake Flow</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-cyan-400 font-bold text-sm">Gravity Separation</div>
              <div className="text-xs text-white/60 mt-1">Sediment & Water Bleed</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 col-span-2 sm:col-span-1">
              <div className="text-cyan-400 font-bold text-sm">Mechanical Filtration</div>
              <div className="text-xs text-white/60 mt-1">Continuous Wire Mesh</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
