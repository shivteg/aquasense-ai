import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Droplets,
  Filter,
  Cog,
  Trash2,
  CheckCircle,
  Wifi,
  ChevronRight,
  X,
  ArrowRight,
} from 'lucide-react';

interface Stage {
  id: number;
  title: string;
  shortTitle: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  description: string;
  details: string[];
  animation: string;
}

const stages: Stage[] = [
  {
    id: 1,
    title: 'Water Inlet',
    shortTitle: 'Inlet',
    icon: <Droplets className="w-7 h-7" />,
    color: 'from-blue-500 to-cyan-400',
    glowColor: 'rgba(6,182,212,0.6)',
    description: 'Polluted water enters the treatment plant from rivers, canals, or municipal sources.',
    details: [
      'Raw, untreated water flows into the intake channel at controlled rates.',
      'The inlet gate regulates flow based on plant capacity.',
      'Initial screening begins at the entrance to prevent large objects.',
      'Flow sensors measure and log water volume in real time.',
      'Emergency shutoff valves protect the plant during overflow events.',
    ],
    animation: 'water-flow',
  },
  {
    id: 2,
    title: 'Mechanical Screening',
    shortTitle: 'Screen',
    icon: <Filter className="w-7 h-7" />,
    color: 'from-cyan-500 to-teal-400',
    glowColor: 'rgba(20,184,166,0.6)',
    description: 'Bar screens capture floating solid waste — leaves, plastic bottles, wrappers and debris.',
    details: [
      'Parallel steel bars spaced 20–50 mm apart intercept solid waste.',
      'Screen inclination angle (60–80°) allows gravity-assisted self-cleaning.',
      'High-tensile stainless steel resists corrosion in wastewater environments.',
      'Multiple screen passes (coarse → fine) catch progressively smaller particles.',
      'Differential pressure sensors detect screen blockage requiring rake activation.',
    ],
    animation: 'screen-pulse',
  },
  {
    id: 3,
    title: 'Automated Rake',
    shortTitle: 'Rake',
    icon: <Cog className="w-7 h-7" />,
    color: 'from-teal-500 to-emerald-400',
    glowColor: 'rgba(16,185,129,0.6)',
    description: 'An automated rake/conveyor mechanism lifts and transfers captured waste from the screen.',
    details: [
      'Motorised rake teeth travel upward along the bar screen face.',
      'Captured debris is lifted clear of the water surface continuously.',
      'Servo-controlled speed adjusts based on debris load detected by sensors.',
      'Conveyor belt transfers waste horizontally to the collection zone.',
      'Anti-jam detection pauses the system and raises an alert if resistance spikes.',
    ],
    animation: 'gear-spin',
  },
  {
    id: 4,
    title: 'Waste Collection',
    shortTitle: 'Collect',
    icon: <Trash2 className="w-7 h-7" />,
    color: 'from-emerald-500 to-green-400',
    glowColor: 'rgba(34,197,94,0.6)',
    description: 'Captured waste falls into a sealed collection container for periodic disposal.',
    details: [
      'Covered bins prevent odour escape and secondary contamination.',
      'Ultrasonic fill-level sensors alert operators when bins reach 80% capacity.',
      'Drain ports at the base allow residual water to return to the treatment channel.',
      'Bin exchange is performed without interrupting plant operation.',
      'Weight sensors log total collected waste mass for analytics.',
    ],
    animation: 'bin-fill',
  },
  {
    id: 5,
    title: 'Treated Water Flow',
    shortTitle: 'Clean',
    icon: <CheckCircle className="w-7 h-7" />,
    color: 'from-green-500 to-lime-400',
    glowColor: 'rgba(132,204,22,0.6)',
    description: 'Screened water, now free of solid waste, proceeds to secondary treatment stages.',
    details: [
      'Post-screen water enters sedimentation tanks for suspended-solid removal.',
      'Turbidity sensors confirm solid-waste removal efficiency after screening.',
      'Dissolved-oxygen probes baseline water quality before biological treatment.',
      'Flow rate is recalculated post-screen to account for waste volume removed.',
      'Automated diversion valves route water to the correct downstream process.',
    ],
    animation: 'clean-flow',
  },
  {
    id: 6,
    title: 'Sensor Dashboard',
    shortTitle: 'Monitor',
    icon: <Wifi className="w-7 h-7" />,
    color: 'from-lime-500 to-cyan-400',
    glowColor: 'rgba(6,182,212,0.6)',
    description: 'IoT sensors relay real-time monitoring data to an AI-powered operations dashboard.',
    details: [
      'ESP32 / Arduino microcontrollers aggregate sensor readings every 500 ms.',
      'Data is transmitted via MQTT over Wi-Fi to the cloud dashboard.',
      'AI anomaly-detection flags unusual patterns before failures occur.',
      'Historical trend charts support predictive maintenance scheduling.',
      'Remote alerts via email/SMS notify operators of critical events instantly.',
    ],
    animation: 'wifi-pulse',
  },
];

const WaterFlowArrow: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="relative flex items-center justify-center w-10 shrink-0">
    <div
      className={`h-0.5 w-full transition-all duration-500 ${
        active ? 'bg-cyan-400' : 'bg-white/20'
      }`}
    />
    {/* Animated water drop */}
    {active && (
      <motion.div
        className="absolute left-0 w-2 h-2 rounded-full bg-cyan-400"
        animate={{ x: [0, 36] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    )}
    <ArrowRight
      className={`absolute right-0 w-4 h-4 transition-colors duration-300 ${
        active ? 'text-cyan-400' : 'text-white/20'
      }`}
    />
  </div>
);

const HowItWorks: React.FC = () => {
  const [activeStage, setActiveStage] = useState<Stage | null>(stages[0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleStageClick = (stage: Stage) => {
    setActiveStage(prev => (prev?.id === stage.id ? null : stage));
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-[#0a1628] via-[#0d2244] to-[#0a1628] overflow-hidden"
    >
      {/* Background shimmer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
            Step-by-Step Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Follow water through each stage of our automated screening system — click any stage to
            explore in depth.
          </p>
        </motion.div>

        {/* Main layout: flow + detail panel */}
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Process Flow */}
          <div className="flex-1">
            {/* Horizontal flow — desktop */}
            <div className="hidden lg:flex items-center gap-0 mb-6 overflow-x-auto pb-4">
              {stages.map((stage, idx) => (
                <div key={stage.id} className="flex items-center shrink-0">
                  <motion.button
                    onClick={() => handleStageClick(stage)}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 cursor-pointer w-28 ${
                      activeStage?.id === stage.id
                        ? 'border-cyan-400/60 bg-cyan-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                    }`}
                    style={
                      activeStage?.id === stage.id
                        ? { boxShadow: `0 0 24px ${stage.glowColor}` }
                        : {}
                    }
                  >
                    {/* Stage number */}
                    <span
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                        activeStage?.id === stage.id
                          ? 'bg-cyan-500 text-white'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {stage.id}
                    </span>
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${stage.color} ${
                        activeStage?.id === stage.id ? 'shadow-lg' : 'opacity-70'
                      }`}
                    >
                      <div className="text-white">{stage.icon}</div>
                    </div>
                    <span className="text-xs text-white/80 font-medium text-center leading-tight">
                      {stage.shortTitle}
                    </span>
                  </motion.button>

                  {/* Arrow connector */}
                  {idx < stages.length - 1 && (
                    <WaterFlowArrow active={activeStage !== null && activeStage.id >= stage.id} />
                  )}
                </div>
              ))}
            </div>

            {/* Vertical flow — mobile / tablet */}
            <div className="flex lg:hidden flex-col gap-4">
              {stages.map((stage, idx) => (
                <div key={stage.id} className="flex flex-col items-center">
                  <motion.button
                    onClick={() => handleStageClick(stage)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                      activeStage?.id === stage.id
                        ? 'border-cyan-400/60 bg-cyan-500/10'
                        : 'border-white/10 bg-white/5'
                    }`}
                    style={
                      activeStage?.id === stage.id
                        ? { boxShadow: `0 0 20px ${stage.glowColor}` }
                        : {}
                    }
                  >
                    <div
                      className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br ${stage.color}`}
                    >
                      <div className="text-white">{stage.icon}</div>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs text-cyan-400 font-semibold">Stage {stage.id}</span>
                      </div>
                      <p className="text-white font-semibold text-sm">{stage.title}</p>
                      <p className="text-white/50 text-xs line-clamp-2 mt-0.5">{stage.description}</p>
                    </div>
                    <ChevronRight
                      className={`ml-auto shrink-0 text-white/40 transition-transform duration-300 ${
                        activeStage?.id === stage.id ? 'rotate-90 text-cyan-400' : ''
                      }`}
                    />
                  </motion.button>
                  {idx < stages.length - 1 && (
                    <div className="w-0.5 h-5 bg-gradient-to-b from-cyan-400/40 to-transparent" />
                  )}
                </div>
              ))}
            </div>

            {/* Stage cards grid (desktop — below flow) */}
            <div className="hidden lg:grid grid-cols-3 gap-4 mt-6">
              {stages.map((stage, idx) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.08 }}
                  onClick={() => handleStageClick(stage)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                    activeStage?.id === stage.id
                      ? 'border-cyan-400/40 bg-cyan-500/8'
                      : 'border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/6'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center bg-gradient-to-br ${stage.color} opacity-90`}
                    >
                      <div className="text-white scale-75">{stage.icon}</div>
                    </div>
                    <div>
                      <p className="text-white/90 font-semibold text-sm">{stage.title}</p>
                      <p className="text-white/50 text-xs mt-0.5 line-clamp-2">{stage.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detail Panel — right side */}
          <div className="xl:w-96 shrink-0">
            <AnimatePresence mode="wait">
              {activeStage ? (
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden"
                  style={{ boxShadow: `0 0 40px ${activeStage.glowColor}30` }}
                >
                  {/* Gradient blob */}
                  <div
                    className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${activeStage.color} opacity-10 blur-2xl pointer-events-none`}
                  />

                  {/* Close */}
                  <button
                    onClick={() => setActiveStage(null)}
                    className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-white/70" />
                  </button>

                  {/* Stage badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 mb-4">
                    Stage {activeStage.id}
                  </span>

                  {/* Icon + title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${activeStage.color} shadow-lg`}
                    >
                      <div className="text-white">{activeStage.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight">{activeStage.title}</h3>
                  </div>

                  <p className="text-white/70 text-sm mb-5 leading-relaxed">{activeStage.description}</p>

                  <div className="space-y-3">
                    {activeStage.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className={`mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-gradient-to-br ${activeStage.color}`}
                        />
                        <p className="text-white/60 text-sm leading-relaxed">{detail}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() =>
                        setActiveStage(stages[Math.max(0, activeStage.id - 2)])
                      }
                      disabled={activeStage.id === 1}
                      className="flex-1 py-2 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:border-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() =>
                        setActiveStage(stages[Math.min(stages.length - 1, activeStage.id)])
                      }
                      disabled={activeStage.id === stages.length}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r ${activeStage.color} disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:opacity-90`}
                    >
                      Next →
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[300px] rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3 text-center p-8"
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Droplets className="w-7 h-7 text-cyan-400/60" />
                  </div>
                  <p className="text-white/40 text-sm">
                    Click any stage above to explore detailed information about that step in the
                    process.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CSS animation for water flow */}
      <style>{`
        @keyframes waterDrop {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
