import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  HeartHandshake,
  Repeat,
  Activity,
  ShieldAlert,
  Clock,
  Sparkles,
  Maximize2,
  CheckCircle,
  Info,
  Droplet,
  Globe2,
} from 'lucide-react';

interface ImpactProps {
  darkMode: boolean;
}

interface BenefitItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  category: 'Operational' | 'Environmental' | 'Worker Safety' | 'Scalability';
  summary: string;
  details: string[];
  gradient: string;
  border: string;
  iconColor: string;
}

const benefits: BenefitItem[] = [
  {
    id: 'manual-effort',
    icon: <HeartHandshake size={28} />,
    title: 'Reduced Manual Effort',
    category: 'Worker Safety',
    summary: 'Minimizes strenuous, repetitive, and hazardous physical labor previously required at open intake channels.',
    details: [
      'Operators no longer need to physically haul heavy waterlogged debris from hazardous deep basins.',
      'Reduces direct contact with toxic microbial pathogens, sharp objects, and contaminated bio-waste.',
      'Promotes workplace safety and enables dignified, technical supervision roles for treatment plant staff.',
    ],
    gradient: 'from-cyan-500/15 via-cyan-500/5 to-transparent',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
  },
  {
    id: 'consistency',
    icon: <Repeat size={28} />,
    title: 'Improved Waste Collection Consistency',
    category: 'Operational',
    summary: 'Delivers reliable, timed, and debris-triggered mechanical raking that operates without human fatigue.',
    details: [
      'Maintains consistent intake channel throughput around the clock, including during night shifts.',
      'Eliminates intermittent debris buildup surges that commonly choke downstream pumping systems.',
      'Adapts cleaning frequency dynamically to sudden inflow spikes during storm events.',
    ],
    gradient: 'from-blue-500/15 via-blue-500/5 to-transparent',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
  },
  {
    id: 'monitoring',
    icon: <Activity size={28} />,
    title: 'Better Monitoring & Telemetry',
    category: 'Operational',
    summary: 'Provides continuous operational awareness through water level, motor status, and blockage sensors.',
    details: [
      'Dual water level sensors accurately measure head loss across the bar screen in real time.',
      'Early warning indicators identify partial clogging hours before hydraulic backups happen.',
      'Digital telemetry enables historical trend analysis and informed preventive maintenance.',
    ],
    gradient: 'from-teal-500/15 via-teal-500/5 to-transparent',
    border: 'border-teal-500/30',
    iconColor: 'text-teal-400',
  },
  {
    id: 'blockage',
    icon: <ShieldAlert size={28} />,
    title: 'Reduced Risk of Screen Blockage',
    category: 'Operational',
    summary: 'Continuous clearing prevents thick floating waste carpets from causing catastrophic plant back-ups.',
    details: [
      'Rapid clearing prevents differential pressure buildup that could bend or compromise bar screens.',
      'Protects expensive downstream centrifugal pumps, valves, and aerators from abrasive debris damage.',
      'Reduces unplanned downtime and emergency plant bypass episodes into local waterways.',
    ],
    gradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'time-savings',
    icon: <Clock size={28} />,
    title: 'Potential Operational Time Savings',
    category: 'Operational',
    summary: 'Automates routine clearing so maintenance engineers can focus on critical biochemical treatment stages.',
    details: [
      'Eliminates hours of daily manual clearing shifts, freeing personnel for water quality diagnostics.',
      'Automated container loading reduces secondary manual handling of harvested debris.',
      'Streamlines maintenance schedules with condition-based servicing rather than reactive repairs.',
    ],
    gradient: 'from-indigo-500/15 via-indigo-500/5 to-transparent',
    border: 'border-indigo-500/30',
    iconColor: 'text-indigo-400',
  },
  {
    id: 'cleaner-water',
    icon: <Sparkles size={28} />,
    title: 'Cleaner Water-Treatment Processes',
    category: 'Environmental',
    summary: 'Early removal of floating organics and non-biodegradable plastics significantly improves primary treatment.',
    details: [
      'Removing decomposing leaves before stagnation reduces microbial biochemical oxygen demand (BOD).',
      'Intercepting plastics before UV and aeration stages prevents abrasive microplastic fragmentation.',
      'Optimizes sedimentation tank settling efficiency and chemical dosing accuracy downstream.',
    ],
    gradient: 'from-sky-500/15 via-sky-500/5 to-transparent',
    border: 'border-sky-500/30',
    iconColor: 'text-sky-400',
  },
  {
    id: 'scalability',
    icon: <Maximize2 size={28} />,
    title: 'Modular & Potential Scalability',
    category: 'Scalability',
    summary: 'Engineered as a modular architecture adaptable to small canal sluices up to large municipal intake works.',
    details: [
      'Configurable screen widths, bar pitches, and rake arm sizes accommodate varying flow channels.',
      'Low-power sensor telemetry nodes support solar backup and remote cellular/LoRaWAN integration.',
      'Standardized mechanical and software interfaces make retrofitting existing intake bays straightforward.',
    ],
    gradient: 'from-cyan-600/15 via-blue-600/5 to-transparent',
    border: 'border-cyan-600/30',
    iconColor: 'text-cyan-300',
  },
];

export default function Impact({ darkMode }: ImpactProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Operational', 'Environmental', 'Worker Safety', 'Scalability'];

  const filteredBenefits =
    selectedFilter === 'All'
      ? benefits
      : benefits.filter((b) => b.category === selectedFilter);

  return (
    <section
      id="impact"
      ref={ref}
      className={`relative section-padding overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-[#0a1628]' : 'bg-[#f8faff]'
      }`}
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
            <Globe2 size={14} />
            Environmental & Operational Value
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-[#0a1628]'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Benefits & <span className="gradient-text">Environmental Impact</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              darkMode ? 'text-white/60' : 'text-slate-600'
            }`}
          >
            Discover how automated mechanical screening and smart sensor telemetry transform municipal and industrial
            water treatment plant efficiency while safeguarding workforce health.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30 scale-105'
                  : darkMode
                  ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredBenefits.map((b, idx) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`rounded-3xl p-6 sm:p-7 border relative overflow-hidden transition-all duration-300 card-hover flex flex-col justify-between ${
                darkMode
                  ? `bg-gradient-to-br from-[#0c1f38] to-[#071324] ${b.border} shadow-[0_10px_30px_rgba(0,0,0,0.3)]`
                  : `bg-white border-slate-200 shadow-lg hover:border-cyan-400`
              }`}
            >
              {/* Card top indicator */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                      darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                    } ${b.iconColor}`}
                  >
                    {b.icon}
                  </div>
                  <span
                    className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                      darkMode ? 'bg-white/5 text-white/60 border border-white/10' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {b.category}
                  </span>
                </div>

                <h3
                  className={`text-xl font-bold mb-3 ${
                    darkMode ? 'text-white' : 'text-[#0a1628]'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {b.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-5 ${
                    darkMode ? 'text-white/70' : 'text-slate-600'
                  }`}
                >
                  {b.summary}
                </p>

                {/* Bullet specifics */}
                <div className="space-y-2 mb-4">
                  {b.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle
                        size={15}
                        className={`mt-0.5 flex-shrink-0 ${b.iconColor}`}
                      />
                      <span
                        className={`text-xs leading-relaxed ${
                          darkMode ? 'text-white/60' : 'text-slate-600'
                        }`}
                      >
                        {d}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div
                className={`pt-4 border-t text-[11px] font-semibold flex items-center justify-between ${
                  darkMode ? 'border-white/10 text-cyan-400/80' : 'border-slate-100 text-cyan-700'
                }`}
              >
                <span>Proposed System Attribute</span>
                <span className="text-xs">⚡ Automated</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Environmental Accuracy & Boundary Note Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`rounded-3xl p-6 sm:p-8 border ${
            darkMode
              ? 'bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-blue-950/40 border-cyan-500/30 text-white'
              : 'bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border-cyan-200 text-slate-900'
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 border border-cyan-400/40">
              <Droplet size={30} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                  <Info size={13} /> Scientific Treatment Scope Boundary
                </span>
              </div>
              <h4 className="text-lg font-bold mb-1">
                Screening is Step One: Capturing Solids Before Secondary Biological & Chemical Purification
              </h4>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  darkMode ? 'text-white/70' : 'text-slate-700'
                }`}
              >
                Mechanical screening specifically targets floating and suspended solid debris (plastic containers, wrappers,
                branches, leaf mats). It does <strong>not</strong> eliminate dissolved chemical contaminants, heavy metals,
                or micro-pathogens, and is <strong>not</strong> a standalone drinking water producer. It functions as the critical
                primary protective gatekeeper in a multi-stage municipal treatment infrastructure.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
