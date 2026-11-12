import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Droplet,
  Globe2,
  Recycle,
  Sprout,
  Waves,
} from 'lucide-react';

interface ImpactProps {
  darkMode: boolean;
}

const impactPillars = [
  {
    id: 'pond-conservation',
    title: 'Pond Ecosystem Conservation',
    subtitle: 'Re-oxygenating aquatic habitats',
    desc: 'Rapid removal of decomposing algae mats halts toxic hydrogen sulphide formation and raises dissolved oxygen back above 6.0 mg/L, preventing mass fish suffocation.',
    stat: '+380%',
    statLabel: 'Dissolved oxygen recovery',
    icon: <Waves className="w-6 h-6 text-cyan-400" />,
    color: 'from-cyan-500/20 to-transparent',
    border: 'border-cyan-500/30',
  },
  {
    id: 'plastic-intercept',
    title: 'Plastic Interception & Recycling',
    subtitle: 'Preventing microplastic fragmentation',
    desc: 'Intercepts buoyant PET containers and polythene film before solar ultraviolet degradation shatters them into hazardous, bio-accumulating microplastic particles.',
    stat: '100%',
    statLabel: 'Recovered plastics diverted to recycling',
    icon: <Recycle className="w-6 h-6 text-red-400" />,
    color: 'from-red-500/20 to-transparent',
    border: 'border-red-500/30',
  },
  {
    id: 'algae-fertiliser',
    title: 'Algae-to-Organic Fertiliser',
    subtitle: 'Replacing synthetic chemical fertilizers',
    desc: 'High-temperature aerobic composting valorizes nuisance algae into rich organic humus, returning biological N-P-K to farmland and boosting soil water retention.',
    stat: '35 kg/batch',
    statLabel: 'High-grade organic compost per harvest',
    icon: <Sprout className="w-6 h-6 text-emerald-400" />,
    color: 'from-emerald-500/20 to-transparent',
    border: 'border-emerald-500/30',
  },
  {
    id: 'sustainable-agri',
    title: 'Water Purification & Sustainable Agri',
    subtitle: 'Conserving dwindling freshwater reserves',
    desc: 'Transforms stagnant, unusable pond water into certified drip-irrigation grade water, preserving deep borewells and fostering climate-resilient farming.',
    stat: '120 L/min',
    statLabel: 'Continuous certified purified output',
    icon: <Droplet className="w-6 h-6 text-blue-400" />,
    color: 'from-blue-500/20 to-transparent',
    border: 'border-blue-500/30',
  },
];

const unSdgs = [
  { number: '6', name: 'Clean Water & Sanitation', desc: 'Target 6.3: Improving water quality by reducing pollution and eliminating dumping.' },
  { number: '12', name: 'Responsible Consumption', desc: 'Target 12.5: Substantially reducing waste generation through prevention, reduction, recycling.' },
  { number: '13', name: 'Climate Action', desc: 'Halting anaerobic methane emissions from stagnant rotting pond sediment.' },
  { number: '14', name: 'Life Below Water', desc: 'Preventing hypoxia and toxic cyanotoxin poisoning in freshwater pond fauna.' },
  { number: '15', name: 'Life on Land', desc: 'Restoring degraded agricultural topsoil organic carbon via bio-compost.' },
];

export default function Impact({ darkMode: _darkMode }: ImpactProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="impact"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#091b33] to-[#0a1628] overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Globe2 className="w-3.5 h-3.5" />
            Environmental Impact & Circular Economy
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Transforming Pollution into{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Environmental Opportunity
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            AquaSense connects pond conservation, floating waste collection, plastic recycling,
            algae recovery, organic fertiliser production, and water purification into a regenerative whole.
          </motion.p>
        </div>

        {/* ─── PROMINENT VISION STATEMENT CALLOUT ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-cyan-950/60 border border-emerald-500/30 backdrop-blur-xl relative overflow-hidden shadow-2xl text-center"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            The AquaSense North Star
          </div>
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold text-white max-w-4xl mx-auto leading-relaxed italic">
            “To transform polluted ponds into valuable environmental resources by
            connecting water conservation, waste recovery and sustainable agriculture.”
          </blockquote>
        </motion.div>

        {/* ─── 4 IMPACT PILLARS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {impactPillars.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
              className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-b ${p.color} bg-slate-900/80 border ${p.border} backdrop-blur-xl flex flex-col justify-between shadow-xl`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    {p.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black font-mono text-white">{p.stat}</div>
                    <div className="text-[11px] text-white/50">{p.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {p.title}
                </h3>
                <div className="text-xs text-cyan-300 font-semibold mb-3">{p.subtitle}</div>
                <p className="text-sm text-white/70 leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── UN SUSTAINABLE DEVELOPMENT GOALS (SDGs) ALIGNMENT ─── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              Global Sustainability Alignment
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">United Nations SDGs Impacted</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {unSdgs.map((sdg) => (
              <div
                key={sdg.number}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center text-xs mb-2">
                    SDG {sdg.number}
                  </div>
                  <div className="text-xs font-bold text-white mb-1.5">{sdg.name}</div>
                  <div className="text-[11px] text-white/60 leading-relaxed">{sdg.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
