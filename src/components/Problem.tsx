import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  AlertTriangle,
  ChevronDown,
  Layers,
  Leaf,
  ShoppingBag,
  Trash2,
  User,
  Zap,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface WasteCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  brief: string;
  detail: string;
  color: string;
  borderColor: string;
  stat: string;
  statLabel: string;
}

const wasteCards: WasteCard[] = [
  {
    id: 'plastic',
    icon: <Trash2 size={28} />,
    title: 'Plastic Waste',
    brief:
      'Single-use plastic bottles, containers and packaging are washed into intake channels during storms and flooding.',
    detail:
      'Plastic waste is one of the most persistent contaminants entering water treatment intake systems. PET bottles, HDPE containers and film plastics float at the water surface, where they can clog bar screens, reduce flow capacity and damage rotating mechanical equipment. Their buoyancy makes them extremely difficult to remove without dedicated floating-debris rakes. Microplastic fragments released by photodegradation further contaminate the effluent stream if primary screening is not effective.',
    color: 'from-red-500/20 to-red-900/10',
    borderColor: 'border-red-500/40',
    stat: '8M+',
    statLabel: 'tonnes enter waterways yearly',
  },
  {
    id: 'leaves',
    icon: <Leaf size={28} />,
    title: 'Floating Leaves',
    brief:
      'Seasonal leaf-fall creates dense mats that float on intake water, reducing oxygen and blocking screens.',
    detail:
      'Organic leaf matter accumulates rapidly during autumn and monsoon seasons. As leaves decompose, they deplete dissolved oxygen and promote microbial growth, increasing the biochemical oxygen demand (BOD) of the incoming water. Leaf mats physically obstruct bar screens, reducing throughput and forcing manual raking every few hours during peak leaf-fall periods. The decomposition process also releases tannins, which discolour treated water if not removed at the screening stage.',
    color: 'from-green-500/20 to-green-900/10',
    borderColor: 'border-green-500/40',
    stat: '40%',
    statLabel: 'screen blockages are leaf-related',
  },
  {
    id: 'polythene',
    icon: <ShoppingBag size={28} />,
    title: 'Polythene & Wrappers',
    brief:
      'Lightweight polythene bags and food wrappers are carried by wind and runoff directly into open intake channels.',
    detail:
      'Thin-gauge polythene bags and food-grade film wrappers are particularly hazardous because they conform to the shape of bar screen openings, creating an almost impermeable membrane. Even moderate accumulations can reduce inlet flow by up to 60 % within minutes during rainfall events. Workers must typically shut down sections of the inlet to safely clear them, causing costly treatment downtime. Their low weight also makes automated capture challenging without purpose-designed mesh conveyors.',
    color: 'from-yellow-500/20 to-yellow-900/10',
    borderColor: 'border-yellow-500/40',
    stat: '60%',
    statLabel: 'flow reduction when screens clog',
  },
  {
    id: 'debris',
    icon: <Layers size={28} />,
    title: 'Accumulated Debris',
    brief:
      'Mixed sediment, sticks, foam and industrial waste settles and compounds screening problems over time.',
    detail:
      'Beyond discrete waste categories, treatment plants face a continuous accumulation of mixed debris — broken branches, foam, cloth fibres, sediment clumps and industrial offcuts. This heterogeneous mass is particularly problematic: it bridges across bar screen openings, anchors floating plastics in place and creates anaerobic pockets that generate hydrogen sulphide. Manual removal of accumulated debris is a hazardous task requiring confined-space protocols and specialist equipment, often disrupting normal plant operations for several hours.',
    color: 'from-blue-500/20 to-blue-900/10',
    borderColor: 'border-blue-500/40',
    stat: '3–6 hrs',
    statLabel: 'downtime per major clearance event',
  },
];

interface ComparisonStep {
  label: string;
}

const manualSteps: ComparisonStep[] = [
  { label: 'Operator notices blockage' },
  { label: 'Manually rake screen bars' },
  { label: 'Collect & bag waste' },
  { label: 'Dispose offsite by hand' },
  { label: 'Resume normal flow' },
];

const automatedSteps: ComparisonStep[] = [
  { label: 'Sensors detect debris build-up' },
  { label: 'Automated rake activates' },
  { label: 'Conveyor transports waste' },
  { label: 'Waste binned automatically' },
  { label: 'Continuous uninterrupted flow' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const detailVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.25, ease: 'easeIn' as const } },
};

export default function Problem() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeComparison, setActiveComparison] = useState<'manual' | 'automated'>('manual');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const toggleCard = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a1628] py-24 text-white"
    >
      {/* Background gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-700/10 blur-3xl"
      />

      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
            <AlertTriangle size={14} />
            The Problem
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 text-4xl font-bold leading-tight lg:text-5xl"
        >
          A Hidden Challenge in{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Water Treatment
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 max-w-3xl text-lg text-white/70"
        >
          Every day, tonnes of solid waste — plastic bottles, polythene bags, leaves
          and assorted debris — flow into water treatment intake channels through
          rivers, canals and stormwater drains. Without reliable removal, these
          contaminants block screens, strain equipment and compromise water quality.
          Traditional manual collection is slow, hazardous and simply cannot keep pace
          with the volume.
        </motion.p>

        {/* Waste cards grid */}
        <div className="mb-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wasteCards.map((card, i) => (
            <motion.div
              key={card.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className={`cursor-pointer rounded-2xl border bg-gradient-to-br ${card.color} ${card.borderColor} p-5 transition-shadow hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)]`}
              onClick={() => toggleCard(card.id)}
              role="button"
              aria-expanded={expandedCard === card.id}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleCard(card.id)}
            >
              {/* Card header */}
              <div className="mb-3 flex items-start justify-between">
                <span className="text-cyan-400">{card.icon}</span>
                <motion.div
                  animate={{ rotate: expandedCard === card.id ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-white/40"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </div>

              <h3 className="mb-1 text-lg font-semibold text-white">{card.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-white/60">{card.brief}</p>

              {/* Stat badge */}
              <div className="inline-flex flex-col">
                <span className="text-2xl font-bold text-cyan-400">{card.stat}</span>
                <span className="text-xs text-white/50">{card.statLabel}</span>
              </div>

              {/* Expandable detail */}
              <AnimatePresence initial={false}>
                {expandedCard === card.id && (
                  <motion.div
                    variants={detailVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <div className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/70">
                      {card.detail}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Manual vs Automated Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
        >
          <h3 className="mb-2 text-center text-2xl font-bold text-white">
            Manual vs Automated Cleaning
          </h3>
          <p className="mb-8 text-center text-sm text-white/50">
            Tap a panel to compare the two approaches side by side.
          </p>

          {/* Toggle tabs */}
          <div className="mb-8 flex justify-center">
            <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setActiveComparison('manual')}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                  activeComparison === 'manual'
                    ? 'bg-red-500/80 text-white shadow-lg'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <User size={16} />
                Manual Cleaning
              </button>
              <button
                onClick={() => setActiveComparison('automated')}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                  activeComparison === 'automated'
                    ? 'bg-cyan-500/80 text-white shadow-lg'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <Zap size={16} />
                Automated Cleaning
              </button>
            </div>
          </div>

          {/* Comparison panels side-by-side */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Manual side */}
            <div
              className={`rounded-2xl border p-6 transition-all duration-300 ${
                activeComparison === 'manual'
                  ? 'border-red-500/40 bg-red-500/10'
                  : 'border-white/5 bg-white/5 opacity-40'
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                  <User size={20} />
                </span>
                <span className="text-lg font-semibold text-white">Manual Cleaning</span>
              </div>
              <ul className="space-y-3">
                {manualSteps.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={
                      activeComparison === 'manual' && isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0.4, x: 0 }
                    }
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-500/40 bg-red-500/20 text-xs font-bold text-red-400">
                      {i + 1}
                    </span>
                    {step.label}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
                ⚠️ Requires 2–4 operators, repeated multiple times daily, with associated
                safety risks.
              </div>
            </div>

            {/* Automated side */}
            <div
              className={`rounded-2xl border p-6 transition-all duration-300 ${
                activeComparison === 'automated'
                  ? 'border-cyan-500/40 bg-cyan-500/10'
                  : 'border-white/5 bg-white/5 opacity-40'
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                  <Zap size={20} />
                </span>
                <span className="text-lg font-semibold text-white">Automated Cleaning</span>
              </div>
              <ul className="space-y-3">
                {automatedSteps.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    animate={
                      activeComparison === 'automated' && isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0.4, x: 0 }
                    }
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/20 text-xs font-bold text-cyan-400">
                      {i + 1}
                    </span>
                    {step.label}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-xs text-cyan-300">
                ✅ Operates 24/7 without manual intervention, reducing labour costs and
                improving safety.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
