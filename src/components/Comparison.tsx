import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle2,
  Scale,
} from 'lucide-react';

interface ComparisonProps {
  darkMode: boolean;
}

interface ComparisonDimension {
  title: string;
  category: string;
  traditional: {
    title: string;
    description: string;
    points: string[];
    risk: 'Severe' | 'High' | 'Critical';
  };
  aquasense: {
    title: string;
    description: string;
    points: string[];
    advantage: string;
  };
}

const comparisonDimensions: ComparisonDimension[] = [
  {
    title: 'Pond Surface Remediation',
    category: 'Operational Method',
    traditional: {
      title: 'Manual Netting & Chemical Algicides',
      description: 'Workers haul rotting scum using hand nets or spray copper-sulfate algicides that poison aquatic life.',
      points: [
        'Dangerous physical labor at slippery, steep pond embankments',
        'Direct human skin contact with toxic cyanobacteria microcystins',
        'Chemical algicides cause mass copper toxicity and sudden oxygen collapse',
      ],
      risk: 'Severe',
    },
    aquasense: {
      title: 'AquaClean Autonomous Robotics',
      description: 'Dual-pontoon autonomous robot harvesting surface algae and plastics without worker hazard.',
      points: [
        'Zero manual handling of wet floating debris during standard operation',
        'Continuous rotating mesh conveyor separates water from solids mechanically',
        'Shallow 12 cm draft operates without disturbing delicate pond bed ecology',
      ],
      advantage: 'Autonomous & Safe',
    },
  },
  {
    title: 'Algae Biomass Fate',
    category: 'Resource Recovery',
    traditional: {
      title: 'Landfill Dumping & Anaerobic Putrefaction',
      description: 'Raked weeds and algae are dumped in roadside pits, rotting anaerobically and breeding mosquitoes.',
      points: [
        'Foul volatile sulphur and methane gas emissions during uncontrolled rotting',
        'Leachate seeps back into groundwater tables, causing secondary contamination',
        'Complete forfeiture of dense photosynthetic nitrogen and phosphorus',
      ],
      risk: 'High',
    },
    aquasense: {
      title: 'AquaFert Controlled Thermophilic Composting',
      description: 'Upcycled into certified organic soil amendments through stoichiometric C:N blending.',
      points: [
        'Blended with dry straw to achieve optimal 25:1 to 30:1 aerobic C:N ratio',
        'Thermophilic heat (55–65°C) sanitizes weed seeds and biological pathogens',
        'Produces rich organic humus reducing local farmer reliance on synthetic NPK',
      ],
      advantage: '100% Resource Recovery',
    },
  },
  {
    title: 'Water Treatment & Reuse',
    category: 'Water Quality',
    traditional: {
      title: 'Stagnant Water Left Unusable',
      description: 'Pond remains choked with suspended colloids and enteric pathogens, unfit for irrigation or animals.',
      points: [
        'No multi-stage physical, chemical or microbiological purification',
        'Farmers forced to pump depleting deep borewells at high diesel/electric cost',
        'Periodic toxic algae blooms poison local village livestock',
      ],
      risk: 'Critical',
    },
    aquasense: {
      title: 'AquaPure Multi-Barrier 7-Stage Train',
      description: 'Clarification, sand/carbon filtration, and UV-C disinfection for verified safe reuse.',
      points: [
        '7-stage scientific train: screening, coagulation, lamella clarifier, sand, carbon, UV-C',
        '99.99% pathogen inactivation without dangerous chlorine disinfection byproducts',
        'Verified safe for unrestricted crop drip irrigation and aquifer recharge',
      ],
      advantage: 'Verified Multi-Barrier Reuse',
    },
  },
];

export default function Comparison({ darkMode: _darkMode }: ComparisonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="comparison"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#091b35] to-[#0a1628] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Scale className="w-3.5 h-3.5" />
            Rigorous Paradigm Comparison
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Traditional Remediation vs.{' '}
            <span className="gradient-text">AquaSense</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            See how AquaSense replaces hazardous manual labor and wasteful disposal with an
            integrated, autonomous circular technology system.
          </motion.p>
        </div>

        {/* Comparison Dimensions */}
        <div className="space-y-8">
          {comparisonDimensions.map((dim, idx) => (
            <motion.div
              key={dim.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              className="rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                    {dim.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    {dim.title}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Traditional Column */}
                <div className="p-6 rounded-2xl bg-red-950/25 border border-red-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                        Traditional / Manual Method
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/30">
                        {dim.traditional.risk} Risk
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{dim.traditional.title}</h4>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                      {dim.traditional.description}
                    </p>
                    <div className="space-y-2">
                      {dim.traditional.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                          <span className="text-red-400 font-bold shrink-0">✗</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AquaSense Column */}
                <div className="p-6 rounded-2xl bg-emerald-950/25 border border-emerald-500/40 flex flex-col justify-between shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                        AquaSense Closed-Loop
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {dim.aquasense.advantage}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{dim.aquasense.title}</h4>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                      {dim.aquasense.description}
                    </p>
                    <div className="space-y-2">
                      {dim.aquasense.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-white/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
