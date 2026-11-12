import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Wifi,
  BrainCircuit,
  Wrench,
  BellRing,
  SunMedium,
  MonitorSmartphone,
  LineChart,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface FutureScopeProps {
  darkMode: boolean;
}

interface FutureItem {
  id: string;
  icon: React.ReactNode;
  phase: string;
  title: string;
  tagline: string;
  description: string;
  technicalRoadmap: string[];
  readiness: 'Conceptual Design' | 'Architecture Formulated' | 'Prototype Research';
  color: string;
}

const futureItems: FutureItem[] = [
  {
    id: 'iot-integration',
    icon: <Wifi size={26} />,
    phase: 'Phase 1',
    title: 'Real-Time Industrial IoT Integration',
    tagline: 'LoRaWAN and MQTT telemetry streaming',
    description:
      'Seamless telemetry integration with SCADA and municipal plant DCS protocols, broadcasting ultrasonic water-level readings, rake mechanical load, and gate positions.',
    technicalRoadmap: [
      'MQTT / Modbus-TCP field-bus gateway integration',
      'Long-range LoRaWAN transceivers for wide rural waterways',
      'End-to-end encrypted cryptographic transport layer',
    ],
    readiness: 'Architecture Formulated',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'ai-classification',
    icon: <BrainCircuit size={26} />,
    phase: 'Phase 2',
    title: 'Advanced AI Waste Classification',
    tagline: 'High-speed edge camera computer vision',
    description:
      'Edge-deployed convolutional neural networks (such as YOLOv8-nano on Raspberry Pi 5 or Jetson Nano) categorising incoming floating waste into plastics, organic vegetation, metals, and textiles.',
    technicalRoadmap: [
      'Edge TPU acceleration for 30+ FPS low-latency inference',
      'Self-learning segmentation models trained on surface turbidity',
      'Automated compositional waste profiling for municipal recycling logs',
    ],
    readiness: 'Conceptual Design',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'predictive-maintenance',
    icon: <Wrench size={26} />,
    phase: 'Phase 3',
    title: 'Predictive Mechanical Maintenance',
    tagline: 'Vibration & motor torque acoustic monitoring',
    description:
      'Acoustic and motor current signature analysis (MCSA) predicting mechanical bearing wear, chain slack, and rake motor gearbox stress prior to actual mechanical seizure.',
    technicalRoadmap: [
      'Piezoelectric vibration sensor nodes on gear motor housings',
      'Anomaly detection algorithms trained on baseline operating torque',
      'Automated maintenance work-order generation via plant ERP hooks',
    ],
    readiness: 'Conceptual Design',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'blockage-alerts',
    icon: <BellRing size={26} />,
    phase: 'Phase 1',
    title: 'Automatic Multi-Tier Blockage Alerts',
    tagline: 'Proactive cellular SMS & automated bypass triggers',
    description:
      'Smart logic that evaluates differential water levels across the screen; if severe debris blinds more than 60% of open area, early audio-visual sirens and cellular dispatch notifications activate.',
    technicalRoadmap: [
      'Multi-sensor differential head-loss validation algorithms',
      'Automated emergency upstream sluice gate throttle control',
      'Redundant cellular SMS, push notifications, and relay siren triggers',
    ],
    readiness: 'Architecture Formulated',
    color: 'from-amber-500 to-red-600',
  },
  {
    id: 'solar-powered',
    icon: <SunMedium size={26} />,
    phase: 'Phase 2',
    title: 'Solar & Renewable Off-Grid Operation',
    tagline: 'Clean microgrid power for remote canal sluices',
    description:
      'Photovoltaic solar arrays coupled with LiFePO4 battery banks enabling fully autonomous off-grid screening stations in rural river canals, agricultural sluices, and mangrove estuaries.',
    technicalRoadmap: [
      'High-efficiency MPPT charge controller integration',
      'Ultra-low-power standby mode when no floating debris is detected',
      'Battery thermal management and surge protection circuitry',
    ],
    readiness: 'Prototype Research',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'remote-monitoring',
    icon: <MonitorSmartphone size={26} />,
    phase: 'Phase 1',
    title: 'Remote Multi-Plant Cloud Portal',
    tagline: 'Single-pane oversight for municipal river authorities',
    description:
      'A unified web and mobile dashboard allowing district municipal engineers to observe dozens of distributed screening sites across an entire river basin from any smartphone or control room.',
    technicalRoadmap: [
      'Role-based access control (Super Admin, Plant Operator, Technician)',
      'Geographic GIS mapping of all intake stations and real-time status pins',
      'Exportable CSV and PDF compliance reports for environmental regulators',
    ],
    readiness: 'Architecture Formulated',
    color: 'from-cyan-500 to-teal-600',
  },
  {
    id: 'waste-analytics',
    icon: <LineChart size={26} />,
    phase: 'Phase 3',
    title: 'Advanced Waste Analytics & Heatmaps',
    tagline: 'Data intelligence for upstream pollution tracking',
    description:
      'Aggregating waste accumulation patterns over seasons, rainfall amounts, and urban runoff cycles to help municipalities pinpoint upstream illegal dumping zones and storm sewer overflows.',
    technicalRoadmap: [
      'Correlation models combining municipal rainfall data and debris spikes',
      'Predictive accumulation forecasting 24 hours prior to monsoon landfall',
      'Data API feeds for municipal environmental protection agencies',
    ],
    readiness: 'Conceptual Design',
    color: 'from-teal-500 to-cyan-600',
  },
];

export default function FutureScope({ darkMode }: FutureScopeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [activeItem, setActiveItem] = useState<FutureItem>(futureItems[0]);

  return (
    <section
      id="future"
      ref={ref}
      className={`relative section-padding overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-[#060d1a]' : 'bg-[#f0f9ff]/50'
      }`}
    >
      {/* Background blurs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
            <Sparkles size={14} />
            Innovation Horizon
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-[#0a1628]'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Future Scope & <span className="gradient-text">Expansion Roadmap</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              darkMode ? 'text-white/60' : 'text-slate-600'
            }`}
          >
            Our vision extends beyond foundational mechanical screening to an interconnected, solar-powered,
            AI-monitored water intelligence network for modern smart cities.
          </p>
        </motion.div>

        {/* Interactive Roadmap Layout: Left Selector, Right Detailed Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Interactive Cards List */}
          <div className="lg:col-span-5 space-y-3">
            {futureItems.map((item) => {
              const isSelected = activeItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                    isSelected
                      ? darkMode
                        ? 'bg-gradient-to-r from-cyan-950/80 to-[#0c223c] border-cyan-400/60 shadow-[0_4px_25px_rgba(6,182,212,0.25)]'
                        : 'bg-white border-cyan-400 shadow-md ring-2 ring-cyan-400/20'
                      : darkMode
                      ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-cyan-500 text-white shadow-md'
                          : darkMode
                          ? 'bg-white/5 text-cyan-400 group-hover:bg-cyan-500/10'
                          : 'bg-cyan-50 text-cyan-600'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                          {item.phase}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            darkMode ? 'bg-white/5 text-white/50' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {item.readiness}
                        </span>
                      </div>
                      <h4
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isSelected
                            ? 'text-cyan-400'
                            : darkMode
                            ? 'text-white group-hover:text-cyan-300'
                            : 'text-slate-800'
                        }`}
                      >
                        {item.title}
                      </h4>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className={`transition-transform duration-300 ${
                      isSelected
                        ? 'text-cyan-400 translate-x-1'
                        : darkMode
                        ? 'text-white/30 group-hover:text-white/60'
                        : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Spotlight Card */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className={`rounded-3xl p-7 sm:p-9 border relative overflow-hidden ${
                darkMode
                  ? 'bg-gradient-to-br from-[#0c233c] to-[#071424] border-cyan-500/40 shadow-[0_20px_60px_rgba(6,182,212,0.15)]'
                  : 'bg-white border-cyan-300 shadow-xl'
              }`}
            >
              {/* Top Accent Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    {activeItem.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      {activeItem.phase} Innovation Milestone
                    </span>
                    <h3
                      className={`text-xl sm:text-2xl font-black ${
                        darkMode ? 'text-white' : 'text-[#0a1628]'
                      }`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {activeItem.title}
                    </h3>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-cyan-500/15 border border-cyan-400/40 text-cyan-300">
                  {activeItem.readiness}
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                {activeItem.tagline}
              </p>

              {/* Full Description */}
              <p
                className={`text-base sm:text-lg leading-relaxed mb-8 ${
                  darkMode ? 'text-white/80' : 'text-slate-700'
                }`}
              >
                {activeItem.description}
              </p>

              {/* Technical Implementation Roadmap */}
              <div
                className={`p-6 rounded-2xl border mb-6 ${
                  darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-cyan-400 mb-4 tracking-wider">
                  <ShieldCheck size={16} /> Technical Implementation Roadmap
                </div>
                <div className="space-y-3">
                  {activeItem.technicalRoadmap.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span
                        className={`text-sm leading-relaxed ${
                          darkMode ? 'text-white/80' : 'text-slate-700'
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Note */}
              <div className="flex items-center justify-between text-xs text-white/50 pt-2">
                <span>Part of AquaClean AI Multi-Year Innovation Horizon</span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  Ready for Lab Prototyping <ArrowRight size={13} />
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Future Architecture Banner */}
        <div
          className={`rounded-2xl p-5 border text-center text-xs sm:text-sm ${
            darkMode
              ? 'bg-white/5 border-white/10 text-white/60'
              : 'bg-white border-slate-200 text-slate-600 shadow-sm'
          }`}
        >
          🚀 <strong>Development Note:</strong> Features outlined in the Future Scope represent planned engineering
          extensions to be developed following baseline mechanical qualification and field pilot validation.
        </div>
      </div>
    </section>
  );
}
