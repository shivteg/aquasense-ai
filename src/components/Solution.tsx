import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle2,
  Recycle,
  RotateCw,
  Sparkles,
  Sprout,
  Trash2,
  Layers,
} from 'lucide-react';

interface SolutionPillar {
  id: string;
  stepNumber: string;
  title: string;
  unitName: string;
  description: string;
  highlights: string[];
  color: string;
  borderColor: string;
  accent: string;
}

const pillars: SolutionPillar[] = [
  {
    id: 'aquaclean',
    stepNumber: '01',
    title: 'Autonomous Surface Harvesting',
    unitName: 'AquaClean Floating Robot',
    description: 'Autonomous dual-pontoon surface robot skims excessive algae blooms and floating plastic debris without disturbing delicate benthic pond beds.',
    highlights: [
      'Twin HDPE pontoons with 85+ kg reserve buoyancy',
      'Continuous rotating wire mesh conveyor skimming',
      'Ultrasonic obstacle avoidance & ESP32 telemetry',
    ],
    color: 'from-cyan-500/15 to-transparent',
    borderColor: 'border-cyan-500/30',
    accent: 'text-cyan-400',
  },
  {
    id: 'separation',
    stepNumber: '02',
    title: 'Dual-Stream Waste Separation',
    unitName: 'Mechanical Sorter & Flotation Chamber',
    description: 'Harvested mixed catch is automatically segregated using size-exclusion sieves and density-differential flotation chambers.',
    highlights: [
      'Plastic bottles & wrappers recovered for recycling loops',
      'Algae biomass directed to dewatering screw press',
      'Coarse twigs & organic leaves isolated for carbon balancing',
    ],
    color: 'from-amber-500/15 to-transparent',
    borderColor: 'border-amber-500/30',
    accent: 'text-amber-400',
  },
  {
    id: 'aquafert',
    stepNumber: '03',
    title: 'Algae-to-Organic-Fertiliser',
    unitName: 'AquaFert Composting Facility',
    description: 'Separated algae biomass is blended with dry carbonaceous matter (C:N 25–30:1) and aerobically composted at thermophilic 55–65°C.',
    highlights: [
      'Thermophilic biological sanitization kills weed seeds & pathogens',
      'Recovers organic Nitrogen, Phosphorus, and trace minerals',
      'Supplies regenerative soil amendment to local farmers',
    ],
    color: 'from-emerald-500/15 to-transparent',
    borderColor: 'border-emerald-500/30',
    accent: 'text-emerald-400',
  },
  {
    id: 'aquapure',
    stepNumber: '04',
    title: 'Multi-Barrier Water Purification',
    unitName: 'AquaPure 7-Stage Facility',
    description: 'Remaining pond water undergoes comprehensive multi-stage screening, coagulation, sedimentation, sand & carbon filtration, and UV-C disinfection.',
    highlights: [
      'Screening, coagulation, lamella clarifier, sand & carbon beds',
      'UV-C germicidal pathogen inactivation (99.99% log-4 kill)',
      'Verified water reused for drip irrigation & aquifer recharge',
    ],
    color: 'from-blue-500/15 to-transparent',
    borderColor: 'border-blue-500/30',
    accent: 'text-blue-400',
  },
];

export default function Solution() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // ─── INTERACTIVE FEATURE 3: Waste Separation Demonstration State ───
  const [harvestWeight, setHarvestWeight] = useState<number>(100); // 100 kg batch
  const [algaePct, setAlgaePct] = useState<number>(55); // 55%
  const [plasticPct, setPlasticPct] = useState<number>(25); // 25%
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortComplete, setSortComplete] = useState<boolean>(true);

  // Remaining percentage is leaves & organic dry matter
  const organicPct = Math.max(0, 100 - algaePct - plasticPct);

  // Calculated weights
  const algaeKg = ((harvestWeight * algaePct) / 100).toFixed(1);
  const plasticKg = ((harvestWeight * plasticPct) / 100).toFixed(1);
  const organicKg = ((harvestWeight * organicPct) / 100).toFixed(1);

  const handleRunSort = () => {
    setIsSorting(true);
    setSortComplete(false);
    setTimeout(() => {
      setIsSorting(false);
      setSortComplete(true);
    }, 900);
  };

  return (
    <section
      id="solution"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#091a2f] to-[#0a1628] overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

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
            Closed-Loop Environmental Architecture
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Our Solution:{' '}
            <span className="gradient-text">Integrated Circular Ecosystem</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            AquaSense integrates surface robotics, mechanical waste separation, high-temperature
            biological composting, and 7-stage water purification into a single harmonized loop.
          </motion.p>
        </div>

        {/* 4 Pillars Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              className={`rounded-3xl bg-gradient-to-b ${p.color} bg-slate-900/80 border ${p.borderColor} backdrop-blur-xl p-6 flex flex-col justify-between shadow-xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-extrabold ${p.accent}`}>
                    STAGE {p.stepNumber}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-white/40 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {p.unitName.split(' ')[0]}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {p.title}
                </h3>
                <div className={`text-xs font-medium ${p.accent} mb-3`}>{p.unitName}</div>
                <p className="text-xs text-white/70 leading-relaxed mb-4">{p.description}</p>

                <div className="space-y-1.5 pt-3 border-t border-white/10">
                  {p.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-white/80">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${p.accent} shrink-0 mt-0.5`} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── INTERACTIVE FEATURE 3: Waste Separation Demonstration ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Recycle className="w-3.5 h-3.5" />
                Interactive Material Recovery Station
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Interactive Waste Separation Demonstration
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Simulate how raw harvested pond debris is automatically fractionated into high-value resources.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-mono px-3 py-1.5 rounded-xl border ${
                isSorting
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                  : sortComplete
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-white/5 text-white/50 border-white/10'
              }`}>
                {isSorting ? '⚙️ Centrifugal & Flotation Active...' : '✓ Separation Batch Complete'}
              </span>
              <button
                onClick={handleRunSort}
                disabled={isSorting}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-400 hover:to-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer transition-all disabled:opacity-50"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSorting ? 'animate-spin' : ''}`} />
                <span>{isSorting ? 'Sorting in Progress...' : 'Run Mechanical Separation'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Harvest Composition Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl bg-white/5 border border-white/5 mb-8">
            {/* Total Batch Weight */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-white/60">Harvest Batch Weight:</span>
                <span className="font-mono font-bold text-cyan-400">{harvestWeight} kg</span>
              </div>
              <input
                type="range"
                min={20}
                max={500}
                step={10}
                value={harvestWeight}
                onChange={(e) => setHarvestWeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Algae % */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-white/60">Algae Biomass Share:</span>
                <span className="font-mono font-bold text-emerald-400">{algaePct}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={80}
                value={algaePct}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setAlgaePct(val);
                  if (val + plasticPct > 90) setPlasticPct(90 - val);
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Plastic % */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-white/60">Plastic Debris Share:</span>
                <span className="font-mono font-bold text-red-400">{plasticPct}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={40}
                value={plasticPct}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setPlasticPct(val);
                  if (algaePct + val > 90) setAlgaePct(90 - val);
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-400"
              />
            </div>
          </div>

          {/* Separation Results Stream Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Stream 1: Algae to AquaFert */}
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    STREAM A • VALORIZATION
                  </span>
                  <Sprout className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black font-mono text-white mb-1">
                  {algaeKg} <span className="text-xs text-white/50 font-normal">kg</span>
                </div>
                <div className="text-xs font-bold text-emerald-300 mb-1">Clean Algae Biomass Pulp</div>
                <p className="text-[11px] text-white/70 leading-relaxed mb-3">
                  Transferred directly to AquaFert dewatering screw press and C:N balancing for agricultural composting.
                </p>
              </div>
              <div className="text-[10px] font-mono text-emerald-400/90 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                → Destined for Organic Soil Amendment
              </div>
            </div>

            {/* Stream 2: Recyclable Plastics */}
            <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase">
                    STREAM B • RECYCLING LOOP
                  </span>
                  <Trash2 className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-2xl font-black font-mono text-white mb-1">
                  {plasticKg} <span className="text-xs text-white/50 font-normal">kg</span>
                </div>
                <div className="text-xs font-bold text-red-300 mb-1">Recovered Plastics & Polythene</div>
                <p className="text-[11px] text-white/70 leading-relaxed mb-3">
                  Density-separated PET bottles, HDPE caps, and wrappers sanitized and baled for municipal plastic recycling.
                </p>
              </div>
              <div className="text-[10px] font-mono text-red-400/90 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                → Diverted from Landfills & Microplastic Breakup
              </div>
            </div>

            {/* Stream 3: Organic Dry Matter */}
            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                    STREAM C • CARBON SOURCE
                  </span>
                  <Layers className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black font-mono text-white mb-1">
                  {organicKg} <span className="text-xs text-white/50 font-normal">kg</span>
                </div>
                <div className="text-xs font-bold text-amber-300 mb-1">Leaves & Fibrous Detritus</div>
                <p className="text-[11px] text-white/70 leading-relaxed mb-3">
                  Dried fallen leaves and twigs shredded as carbonaceous bulking agent to adjust composting C:N balance.
                </p>
              </div>
              <div className="text-[10px] font-mono text-amber-400/90 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                → Blended into AquaFert Compost Piles
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
