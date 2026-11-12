import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Layers,
  Cpu,
  Eye,
  Gauge,
  Radio,
  Trash2,
  Droplets,
  Workflow,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Sliders,
  Maximize2,
  ChevronRight,
} from 'lucide-react';

interface FacilityMapProps {
  darkMode: boolean;
}

interface FacilityStation {
  id: string;
  code: string;
  name: string;
  subsystem: string;
  category: 'Screening' | 'Robotics' | 'Electronics' | 'AI Vision' | 'Hydraulics' | 'Storage';
  xPercent: number; // percentage on schematic
  yPercent: number;
  connections: string[]; // ids of connected stations
  status: 'Operational' | 'Active Telemetry' | 'Standby';
  description: string;
  specs: { label: string; value: string }[];
  engineeringRole: string;
}

const stations: FacilityStation[] = [
  {
    id: 'inlet',
    code: 'IN-01',
    name: 'Raw Water Intake Sluice',
    subsystem: 'Hydraulic Inflow Regulation',
    category: 'Hydraulics',
    xPercent: 12,
    yPercent: 48,
    connections: ['sensor-well', 'bar-screen'],
    status: 'Operational',
    description:
      'Motorized sluice gate regulating raw polluted water influx from river channels into the primary concrete flume.',
    specs: [
      { label: 'Flow Velocity', value: '0.8 – 1.4 m/s' },
      { label: 'Gate Actuator', value: '415V 3-Phase Servo' },
      { label: 'Emergency Cutoff', value: '< 4.5 seconds' },
    ],
    engineeringRole: 'Diverts raw water while buffering severe storm surges to prevent flume wall overtopping.',
  },
  {
    id: 'sensor-well',
    code: 'SN-02',
    name: 'Upstream Ultrasonic Well',
    subsystem: 'Differential Head-Loss Telemetry',
    category: 'Sensors' as any,
    xPercent: 28,
    yPercent: 24,
    connections: ['bar-screen', 'ai-mast'],
    status: 'Active Telemetry',
    description:
      'Dual non-contact ultrasonic transducers measuring upstream water surface elevation to calculate differential head loss.',
    specs: [
      { label: 'Sampling Rate', value: '20 Hz' },
      { label: 'Range', value: '0.2 – 5.0 meters' },
      { label: 'Accuracy', value: '±1.5 mm' },
    ],
    engineeringRole: 'Detects screen blockage early by sensing micro-rises in upstream water elevation.',
  },
  {
    id: 'bar-screen',
    code: 'BS-03',
    name: 'Mechanical Bar Screen Flume',
    subsystem: 'Coarse Solids Interception',
    category: 'Screening',
    xPercent: 45,
    yPercent: 48,
    connections: ['rake-gantry', 'conveyor'],
    status: 'Operational',
    description:
      'Inclined 70° stainless steel 316L grating with 25 mm clear aperture, physically arresting floating plastic bottles, leaves, and bags.',
    specs: [
      { label: 'Aperture Spacing', value: '25 mm uniform' },
      { label: 'Material', value: '316L Stainless Steel' },
      { label: 'Max Head Loss', value: '150 mm before rake' },
    ],
    engineeringRole: 'Primary physical barrier capturing large debris before deeper clarification stages.',
  },
  {
    id: 'rake-gantry',
    code: 'RK-04',
    name: 'Reciprocating Rake Mechanism',
    subsystem: 'Autonomous Mechanical Extraction',
    category: 'Robotics',
    xPercent: 62,
    yPercent: 26,
    connections: ['conveyor', 'hopper'],
    status: 'Active Telemetry',
    description:
      'Linear actuator and chain-guided rake teeth engaging the bar slots to sweep collected debris upward above the water line.',
    specs: [
      { label: 'Cycle Time', value: '45 seconds/sweep' },
      { label: 'Drive Motor', value: '2.2 kW High Torque' },
      { label: 'Overload Protection', value: 'Current-sensing limiter' },
    ],
    engineeringRole: 'Replaces dangerous manual hand-raking with scheduled and sensor-triggered motorized sweeps.',
  },
  {
    id: 'ai-mast',
    code: 'CV-05',
    name: 'AI Optical Vision Mast',
    subsystem: 'Edge Computer Vision & Classification',
    category: 'AI Vision',
    xPercent: 45,
    yPercent: 16,
    connections: ['rake-gantry'],
    status: 'Active Telemetry',
    description:
      'High-angle IP67 camera with onboard edge tensor coprocessor categorizing approaching debris into plastic, organic, or textile.',
    specs: [
      { label: 'Model', value: 'YOLOv8-Nano TensorRT' },
      { label: 'Inference Latency', value: '18 ms' },
      { label: 'Detection Accuracy', value: '93.4% mAP' },
    ],
    engineeringRole: 'Identifies incoming high-density plastic clusters and preemptively spins up the rake mechanism.',
  },
  {
    id: 'conveyor',
    code: 'CV-06',
    name: 'Perforated Drainage Conveyor',
    subsystem: 'Solids Transport & Dewatering',
    category: 'Robotics',
    xPercent: 78,
    yPercent: 38,
    connections: ['hopper', 'outflow'],
    status: 'Operational',
    description:
      'Inclined mesh belt allowing captured water to drain back into the flume while conveying dry solid waste to storage.',
    specs: [
      { label: 'Belt Material', value: 'Perforated Polypropylene' },
      { label: 'Inclination', value: '35 degrees' },
      { label: 'Speed', value: '0.15 m/s' },
    ],
    engineeringRole: 'Transfers wet extracted waste without creating hazardous, slippery debris piles on walkways.',
  },
  {
    id: 'hopper',
    code: 'HP-07',
    name: 'Sealed Waste Collection Hopper',
    subsystem: 'Odor-Controlled Waste Storage',
    category: 'Storage',
    xPercent: 88,
    yPercent: 64,
    connections: ['outflow'],
    status: 'Operational',
    description:
      'Hermetically enclosed collection container with load cells and ultrasonic volume level monitoring.',
    specs: [
      { label: 'Capacity', value: '1,200 Litres' },
      { label: 'Load Cell Sensor', value: '0 – 1,000 kg ±0.5%' },
      { label: 'Ventilation', value: 'Activated Carbon Filter' },
    ],
    engineeringRole: 'Stores captured trash safely, preventing odor release and notifying municipal haulers when full.',
  },
  {
    id: 'outflow',
    code: 'EF-08',
    name: 'Screened Water Effluent Channel',
    subsystem: 'Downstream Treatment Conveyance',
    category: 'Hydraulics',
    xPercent: 65,
    yPercent: 78,
    connections: [],
    status: 'Operational',
    description:
      'Discharge flume delivering solid-free screened water to secondary aeration basins, sedimentation, and disinfection units.',
    specs: [
      { label: 'Solids Removal', value: 'Class A Coarse (>20mm)' },
      { label: 'Hydraulic Efficiency', value: '98.5%' },
      { label: 'Downstream Target', value: 'Sedimentation Basin' },
    ],
    engineeringRole: 'Allows clean screened fluid to enter biological treatment free from pump-clogging plastic debris.',
  },
];

const categoryPills = [
  'All',
  'Screening',
  'Robotics',
  'Sensors',
  'AI Vision',
  'Hydraulics',
  'Storage',
];

export default function FacilityMap({ darkMode }: FacilityMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [selectedStation, setSelectedStation] = useState<FacilityStation>(stations[2]); // Bar screen default
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [interactiveMode, setInteractiveMode] = useState<boolean>(true);

  const filteredStations =
    activeCategory === 'All'
      ? stations
      : stations.filter(
          (s) =>
            s.category === activeCategory ||
            (activeCategory === 'Sensors' && s.category === ('Sensors' as any))
        );

  return (
    <section
      id="facility-map"
      ref={ref}
      className={`relative section-padding overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-[#060e1c]' : 'bg-[#f0f7ff]'
      }`}
    >
      {/* Background Blueprint Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: darkMode
            ? 'radial-gradient(rgba(6,182,212,0.25) 1px, transparent 1px), linear-gradient(rgba(6,182,212,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.08) 1px, transparent 1px)'
            : 'radial-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(rgba(6,182,212,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 40px 40px, 40px 40px',
        }}
      />

      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Workflow size={14} />
            AquaSense // Interactive Facility Map
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-[#0a1628]'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Step into the <span className="gradient-text">Facility Blueprint</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              darkMode ? 'text-white/60' : 'text-slate-600'
            }`}
          >
            Every station below is a real, live engineering subsystem. Click any node on the blueprint to inspect its
            kinematics, sensor parameters, and operational role.
          </p>
        </motion.div>

        {/* Subsystem Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryPills.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                  : darkMode
                  ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blueprint Terminal Container */}
        <div
          className={`rounded-3xl border relative overflow-hidden mb-12 shadow-2xl ${
            darkMode
              ? 'bg-gradient-to-b from-[#0a172c] via-[#071324] to-[#040b15] border-cyan-500/40 shadow-[0_20px_70px_rgba(6,182,212,0.15)]'
              : 'bg-white border-cyan-300 shadow-xl'
          }`}
        >
          {/* Blueprint Terminal Title Bar */}
          <div
            className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4 ${
              darkMode ? 'bg-[#081220]/80 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className={`text-xs font-mono font-semibold ${darkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>
                AQUACLEAN_OS // SCHEMATIC_VIEWPORT_V2.4 [ACTIVE]
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                8 STATIONS SYNCED
              </span>
              <button
                onClick={() => setInteractiveMode(!interactiveMode)}
                className={`text-xs font-semibold px-3 py-1 rounded-lg border cursor-pointer transition-all ${
                  interactiveMode
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                    : 'bg-white/5 text-white/50 border-white/10'
                }`}
              >
                Telemetry Glow: ON
              </button>
            </div>
          </div>

          {/* Interactive Blueprint Canvas & Side Inspector Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Left 7 Columns: Visual Blueprint Node Layout */}
            <div className="lg:col-span-7 relative p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
              {/* Blueprint Waterway Pathway SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                  <linearGradient id="blueprintLine" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="glowEffect">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Hydraulic Channel Main Line */}
                <path
                  d="M 50 280 C 180 280, 220 180, 320 280 C 420 380, 500 200, 620 240 C 700 260, 780 420, 850 420"
                  fill="none"
                  stroke="url(#blueprintLine)"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  filter="url(#glowEffect)"
                  className="animate-pulse"
                />

                {/* Connecting Cross Traces */}
                <line x1="12%" y1="48%" x2="28%" y2="24%" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="28%" y1="24%" x2="45%" y2="48%" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="45%" y1="16%" x2="45%" y2="48%" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
                <line x1="45%" y1="48%" x2="62%" y2="26%" stroke="rgba(6,182,212,0.4)" strokeWidth="2" />
                <line x1="62%" y1="26%" x2="78%" y2="38%" stroke="rgba(6,182,212,0.4)" strokeWidth="2" />
                <line x1="78%" y1="38%" x2="88%" y2="64%" stroke="rgba(6,182,212,0.4)" strokeWidth="2" />
                <line x1="45%" y1="48%" x2="65%" y2="78%" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
              </svg>

              {/* Blueprint Water Channel Visual Ribbon */}
              <div
                className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-28 pointer-events-none rounded-2xl opacity-15"
                style={{
                  background: 'linear-gradient(90deg, #0284c7 0%, #06b6d4 50%, #0891b2 100%)',
                  filter: 'blur(18px)',
                }}
              />

              {/* Station Nodes Positioned on Blueprint */}
              <div className="relative z-10 w-full h-[460px] sm:h-[500px]">
                {stations.map((st) => {
                  const isSelected = selectedStation.id === st.id;
                  const isFiltered =
                    activeCategory === 'All' ||
                    st.category === activeCategory ||
                    (activeCategory === 'Sensors' && st.category === ('Sensors' as any));

                  return (
                    <motion.div
                      key={st.id}
                      style={{
                        position: 'absolute',
                        left: `${st.xPercent}%`,
                        top: `${st.yPercent}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{
                        scale: isSelected ? 1.15 : isFiltered ? 1 : 0.85,
                        opacity: isFiltered ? 1 : 0.35,
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    >
                      <button
                        onClick={() => setSelectedStation(st)}
                        className={`relative p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-white shadow-[0_0_30px_rgba(6,182,212,0.7)] ring-4 ring-cyan-400/40 z-30'
                            : darkMode
                            ? 'bg-[#091a30] text-cyan-200 border-cyan-500/40 hover:border-cyan-300 hover:bg-[#0d2342] shadow-md z-10'
                            : 'bg-white text-slate-800 border-cyan-400 hover:border-cyan-500 hover:bg-cyan-50 shadow-md z-10'
                        }`}
                      >
                        {/* Node Icon */}
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-cyan-500/10 text-cyan-400'
                          }`}
                        >
                          {st.code}
                        </div>

                        {/* Node Label */}
                        <div className="text-left hidden sm:block">
                          <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 block">
                            {st.category}
                          </span>
                          <span className="text-xs font-bold whitespace-nowrap block">
                            {st.name}
                          </span>
                        </div>

                        {/* Active Beacon Pulse on Selected */}
                        {isSelected && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-300 animate-ping" />
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Instructions Footer */}
              <div className="relative z-10 flex items-center justify-between text-xs text-white/50 pt-3 border-t border-white/10">
                <span className="flex items-center gap-1.5 font-mono">
                  <Activity size={13} className="text-cyan-400" />
                  INTERACTIVE SCHEMATIC: SELECT A BLUEPRINT NODE
                </span>
                <span className="text-cyan-400 font-semibold hidden sm:inline">
                  {selectedStation.code} ACTIVATED
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Subsystem Deep Inspector */}
            <div
              className={`lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between ${
                darkMode ? 'bg-[#081527]/90' : 'bg-slate-50'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedStation.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Top Badge & Code */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                      SUB-ASSEMBLY // {selectedStation.code}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        selectedStation.status === 'Operational'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
                      }`}
                    >
                      ● {selectedStation.status}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                      {selectedStation.subsystem}
                    </span>
                    <h3
                      className={`text-2xl font-black ${
                        darkMode ? 'text-white' : 'text-[#0a1628]'
                      }`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {selectedStation.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed ${
                      darkMode ? 'text-white/70' : 'text-slate-600'
                    }`}
                  >
                    {selectedStation.description}
                  </p>

                  {/* Operational Role Callout */}
                  <div
                    className={`p-4 rounded-2xl border ${
                      darkMode ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-100' : 'bg-cyan-50 border-cyan-200 text-cyan-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-cyan-400 mb-1">
                      <ShieldCheck size={14} /> Engineering Function
                    </div>
                    <p className="text-xs leading-relaxed">{selectedStation.engineeringRole}</p>
                  </div>

                  {/* Technical Specifications Matrix */}
                  <div>
                    <h4
                      className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                        darkMode ? 'text-white/60' : 'text-slate-500'
                      }`}
                    >
                      Technical Parameters & Ratings
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedStation.specs.map((sp, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-xl border ${
                            darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                          }`}
                        >
                          <span
                            className={`text-[10px] font-semibold uppercase block ${
                              darkMode ? 'text-white/40' : 'text-slate-400'
                            }`}
                          >
                            {sp.label}
                          </span>
                          <span
                            className={`text-sm font-bold mt-0.5 block ${
                              darkMode ? 'text-cyan-300' : 'text-cyan-700'
                            }`}
                          >
                            {sp.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                <a
                  href="#simulation"
                  className="flex-1 py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Sparkles size={14} /> Test in Live Simulation
                </a>
                <a
                  href="#dashboard"
                  className={`py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider border text-center transition-all ${
                    darkMode
                      ? 'bg-white/5 text-white/80 hover:bg-white/10 border-white/20'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                  }`}
                >
                  View Telemetry
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Educational Callout */}
        <div
          className={`rounded-2xl p-4 border text-center text-xs ${
            darkMode ? 'bg-white/5 border-white/10 text-white/50' : 'bg-white border-slate-200 text-slate-500 shadow-sm'
          }`}
        >
          💡 <strong>Facility Overview:</strong> AquaSense coordinates mechanical, electrical, and AI vision
          subsystems into a unified, autonomous screening station engineered for municipal and river intake plants.
        </div>
      </div>
    </section>
  );
}
