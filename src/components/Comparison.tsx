import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  UserX,
  Bot,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Eye,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';

interface ComparisonProps {
  darkMode: boolean;
}

interface ComparisonDimension {
  title: string;
  category: string;
  manual: {
    description: string;
    points: string[];
    risk: 'High' | 'Severe' | 'Moderate';
  };
  automated: {
    description: string;
    points: string[];
    advantage: string;
  };
}

const comparisonData: ComparisonDimension[] = [
  {
    title: 'Waste Removal Process',
    category: 'Operational Method',
    manual: {
      description: 'Human-dependent waste removal using manual rake tools directly at intake channels.',
      points: [
        'Requires continuous physical presence of human operators at wet-well edge',
        'Physical strain and repetitive stooping/lifting of heavy waterlogged debris',
        'Direct biohazard and pathogen exposure from untreated waste and raw sewage',
      ],
      risk: 'Severe',
    },
    automated: {
      description: 'Mechanically assisted waste removal via automated reciprocating rakes and conveyor belts.',
      points: [
        'Motorised stainless-steel rakes autonomously extract captured solids',
        'Zero manual physical handling of wet floating debris during standard operation',
        'Safe, enclosed mechanical transmission compliant with industrial safety standards',
      ],
      advantage: 'Mechanically Assisted & Safer',
    },
  },
  {
    title: 'Labor Allocation & Ergonomics',
    category: 'Workforce Impact',
    manual: {
      description: 'Repetitive, strenuous manual labour with high risk of musculoskeletal injury.',
      points: [
        'Staff diverted from water quality testing to heavy repetitive debris scraping',
        'Fatigue-related productivity declines during monsoon surges and storm floods',
        'High worker turnover due to unpleasant and strenuous working conditions',
      ],
      risk: 'High',
    },
    automated: {
      description: 'Reduced repetitive physical labour; shifts workforce focus to supervisory plant management.',
      points: [
        'Staff repurposed to technical oversight, preventive maintenance, and water quality analysis',
        'Consistent mechanical duty cycle immune to human fatigue during emergency storms',
        'Substantially improved workplace safety, dignified labor, and operator satisfaction',
      ],
      advantage: 'Reduced Repetitive Labour',
    },
  },
  {
    title: 'Surveillance & Condition Monitoring',
    category: 'System Awareness',
    manual: {
      description: 'Manual periodic monitoring relying solely on sporadic physical inspections.',
      points: [
        'Blockages often noticed only after significant upstream water level rises occur',
        'Night shifts and inclement weather result in delayed emergency responses',
        'Zero historical digital data logging of debris accumulation rates or water surges',
      ],
      risk: 'High',
    },
    automated: {
      description: 'Sensor-assisted real-time monitoring with automated alerts and telemetry.',
      points: [
        'Ultrasonic and hydrostatic sensors monitor water head-loss across the screen 24/7',
        'Automated early warnings triggered before critical hydraulic overflows happen',
        'Continuous data telemetry feeds real-time status to the central plant dashboard',
      ],
      advantage: 'Sensor-Assisted 24/7 Telemetry',
    },
  },
  {
    title: 'Waste Transfer & Disposal',
    category: 'Logistics',
    manual: {
      description: 'Manual waste transfer requiring physical shoveling, wheelbarrows, and open hauling.',
      points: [
        'Debris manually piled onto catwalks before being carted to dumpsters',
        'Odor emission, vectors, and wet sludge leakage onto walkways create slip hazards',
        'Irregular clearing cycles lead to overflow around intake screens',
      ],
      risk: 'Moderate',
    },
    automated: {
      description: 'Automated waste transfer directly into sealed, designated collection bins.',
      points: [
        'Integrated mechanical chute and screw/belt conveyor routes waste straight to bins',
        'Contained collection minimizes odor and eliminates slippery sludge on catwalks',
        'Level-monitored bins notify operators when container swap is required',
      ],
      advantage: 'Automated Sealed Transfer',
    },
  },
];

export default function Comparison({ darkMode }: ComparisonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section
      id="comparison"
      ref={ref}
      className={`relative section-padding overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-[#060d1a]' : 'bg-[#f0f9ff]/70'
      }`}
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
            <SlidersHorizontal size={14} />
            Comparative Paradigm Analysis
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-[#0a1628]'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Manual vs Proposed <span className="gradient-text">Automated System</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              darkMode ? 'text-white/60' : 'text-slate-600'
            }`}
          >
            A clear comparison examining operational bottlenecks in conventional manual water intake screening
            versus our proposed automated, sensor-guided approach.
          </p>
        </motion.div>

        {/* Dimension Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {comparisonData.map((item, idx) => (
            <button
              key={item.title}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_8px_20px_rgba(6,182,212,0.35)] scale-105'
                  : darkMode
                  ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Selected Dimension Split Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14"
        >
          {/* Manual Card (Current Practice) */}
          <div
            className={`relative rounded-3xl p-7 sm:p-9 border transition-all duration-300 ${
              darkMode
                ? 'bg-gradient-to-br from-[#121b2d] to-[#0a1424] border-red-500/25 shadow-[0_15px_35px_rgba(239,68,68,0.08)]'
                : 'bg-white border-red-300 shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <UserX size={26} />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-red-400">Conventional Baseline</span>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#0a1628]'}`}>
                    Manual Operation
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-red-500/15 text-red-400 border border-red-500/30">
                Risk: {comparisonData[activeTab].manual.risk}
              </span>
            </div>

            <p className={`text-sm sm:text-base mb-6 leading-relaxed ${darkMode ? 'text-white/70' : 'text-slate-600'}`}>
              {comparisonData[activeTab].manual.description}
            </p>

            <div className="space-y-3.5 mb-6">
              {comparisonData[activeTab].manual.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">
                    ✕
                  </div>
                  <span className={`text-sm leading-relaxed ${darkMode ? 'text-white/80' : 'text-slate-700'}`}>
                    {pt}
                  </span>
                </div>
              ))}
            </div>

            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-red-400 mb-1">
                <AlertTriangle size={14} /> Operational Drawback
              </div>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
                Heavy dependency on human stamina, prone to unscheduled overflow delays and repetitive strain injuries.
              </p>
            </div>
          </div>

          {/* Automated Card (Proposed AquaClean AI) */}
          <div
            className={`relative rounded-3xl p-7 sm:p-9 border transition-all duration-300 ${
              darkMode
                ? 'bg-gradient-to-br from-[#0c233c] to-[#081b2e] border-cyan-400/40 shadow-[0_20px_50px_rgba(6,182,212,0.18)]'
                : 'bg-white border-cyan-400 shadow-xl'
            }`}
          >
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md">
              Proposed Innovation
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <Bot size={26} />
              </div>
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400">AquaClean AI Architecture</span>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#0a1628]'}`}>
                  Automated System
                </h3>
              </div>
            </div>

            <p className={`text-sm sm:text-base mb-6 leading-relaxed ${darkMode ? 'text-cyan-100/90' : 'text-slate-700'}`}>
              {comparisonData[activeTab].automated.description}
            </p>

            <div className="space-y-3.5 mb-6">
              {comparisonData[activeTab].automated.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/25 text-cyan-300 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className={`text-sm leading-relaxed ${darkMode ? 'text-white/90' : 'text-slate-800'}`}>
                    {pt}
                  </span>
                </div>
              ))}
            </div>

            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-cyan-500/10 border-cyan-400/30' : 'bg-cyan-50 border-cyan-200'}`}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-cyan-400 mb-1">
                <CheckCircle2 size={14} /> Key Innovation Advantage
              </div>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-cyan-100/80' : 'text-slate-700'}`}>
                {comparisonData[activeTab].automated.advantage}: Continuous autonomous mechanical action guided by telemetry sensors.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Conceptual Comparison Metric Matrix */}
        <div
          className={`rounded-3xl p-6 sm:p-8 border ${
            darkMode ? 'bg-[#0a1628]/80 border-white/10' : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#0a1628]'}`}>
                Conceptual Operational Comparison Matrix
              </h4>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-white/50' : 'text-slate-500'}`}>
                Qualitative operational profiles comparing conventional manual cleaning vs proposed automated screening.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 self-start sm:self-auto">
              Simulated Conceptual Index
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold uppercase ${darkMode ? 'text-white/60' : 'text-slate-500'}`}>
                  Manual Labour Intensity
                </span>
                <TrendingDown className="text-emerald-400" size={18} />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-emerald-400">Substantially Lower</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-slate-500'}`}>
                Mechanical rakes replace repetitive human bending and physical debris hauling.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold uppercase ${darkMode ? 'text-white/60' : 'text-slate-500'}`}>
                  Cleaning Frequency
                </span>
                <TrendingUp className="text-cyan-400" size={18} />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-cyan-400">Continuous / On-Demand</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-slate-500'}`}>
                Sensor triggers raking as debris accumulates, preventing buildup blankets.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold uppercase ${darkMode ? 'text-white/60' : 'text-slate-500'}`}>
                  Operational Visibility
                </span>
                <Eye className="text-blue-400" size={18} />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-blue-400">Live 24/7 Telemetry</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-slate-500'}`}>
                Head-loss levels, bin capacity, and motor statuses streamed to central UI.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold uppercase ${darkMode ? 'text-white/60' : 'text-slate-500'}`}>
                  Worker Safety Profile
                </span>
                <ShieldCheck className="text-teal-400" size={18} />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-teal-400">Significantly Elevated</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-slate-500'}`}>
                Eliminates slip, fall, and biological contamination hazards at open channel edges.
              </p>
            </div>
          </div>

          {/* Scientific Disclaimer Note */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
            <span className="text-amber-400 text-xs">⚠️</span>
            <p className={`text-xs italic ${darkMode ? 'text-white/50' : 'text-slate-500'}`}>
              Scientific Note: Comparative evaluations represent conceptual engineering paradigms. No absolute cost or percentage savings are claimed prior to certified empirical plant pilot trials.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
