import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Beaker,
  Droplets,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface StageDetail {
  id: number;
  name: string;
  shortName: string;
  category: string;
  workingPrinciple: string;
  technology: string;
  scientificPrinciple: string;
  inputQuality: string;
  outputQuality: string;
  retentionTime: string;
  efficiency: string;
}

const purificationStages: StageDetail[] = [
  {
    id: 1,
    name: 'Preliminary Screening',
    shortName: 'Screening',
    category: 'Physical Separation',
    workingPrinciple: 'Removes remaining macro-particulates, fine plant twigs, and suspended filaments missed during primary pond skimming.',
    technology: 'Perforated rotary drum screen (aperture 500 microns) with backwash jet cleaning.',
    scientificPrinciple: 'Mechanical Sieving & Size Exclusion',
    inputQuality: 'Raw clarified pond water (Turbidity: 80–120 NTU)',
    outputQuality: 'Strained fluid free of solids > 0.5 mm (Turbidity: ~60 NTU)',
    retentionTime: 'Continuous (0.5 – 1.0 m/s flow)',
    efficiency: '99% macro-particle retention',
  },
  {
    id: 2,
    name: 'Coagulation & Flocculation',
    shortName: 'Coagulation',
    category: 'Chemical Conditioning',
    workingPrinciple: 'Chemical coagulants destabilize negatively charged colloidal suspensions (clays, bacteria, humic acids), allowing particles to collide and aggregate into settleable micro-flocs.',
    technology: 'In-line dosing of Polyaluminium Chloride (PAC) / Alum with rapid-mix flash basin (G > 700 s⁻¹) followed by slow paddle flocculation.',
    scientificPrinciple: 'Double-Layer Compression & Charge Neutralization (DLVO Theory)',
    inputQuality: 'Strained water with microscopic colloids in stable suspension',
    outputQuality: 'Fluid containing visible settleable pin-flocs',
    retentionTime: '2 min flash mix + 15 min flocculation',
    efficiency: '90% colloidal destabilization',
  },
  {
    id: 3,
    name: 'Sedimentation (Lamella Clarification)',
    shortName: 'Sedimentation',
    category: 'Physical Separation',
    workingPrinciple: 'Heavier coagulated flocs settle rapidly to the tank floor under gravitational pull, while clarified liquid rises through inclined lamella plates.',
    technology: 'High-rate inclined plate lamella clarifier (60° inclination angle) with automated bottom sludge scraper.',
    scientificPrinciple: "Stokes' Law of Gravitational Settling (Vs = g(ρp - ρf)d² / 18μ)",
    inputQuality: 'Flocculated water with heavy suspended flocs',
    outputQuality: 'Clarified supernatant water (Turbidity < 15 NTU)',
    retentionTime: '45 – 60 minutes',
    efficiency: '85% suspended solids reduction',
  },
  {
    id: 4,
    name: 'Multi-Media Sand Filtration',
    shortName: 'Sand Filter',
    category: 'Granular Filtration',
    workingPrinciple: 'Downflow through stratified granular layers of anthracite, quartz silica sand, and garnet traps remaining fine suspended flocs through depth filtration.',
    technology: 'Pressurized dual-media depth filter with differential pressure automated air-scour backwash.',
    scientificPrinciple: 'Interception, Inertial Impaction & Brownian Diffusion within Porous Matrix',
    inputQuality: 'Clarified water with fine non-settled flocs (15 NTU)',
    outputQuality: 'Low-turbidity filtrate (Turbidity < 1.5 NTU)',
    retentionTime: 'Filtration velocity: 8 – 12 m/hr',
    efficiency: '95% remaining turbidity removal',
  },
  {
    id: 5,
    name: 'Activated Carbon Filtration',
    shortName: 'Carbon Adsorption',
    category: 'Chemical Adsorption',
    workingPrinciple: 'Granular Activated Carbon (GAC) adsorbs dissolved organic compounds, agricultural pesticide traces, synthetic dyes, foul tastes, and odor compounds into its extensive internal micropore network.',
    technology: 'GAC packed-bed contactor with virgin coconut-shell carbon (Iodine number > 1050 mg/g).',
    scientificPrinciple: "Surface Adsorption via London Dispersion & Van der Waals Forces (Freundlich Isotherm)",
    inputQuality: 'Clear water containing dissolved organic solutes and odor molecules',
    outputQuality: 'Colorless, odorless decontaminated fluid (COD < 10 mg/L)',
    retentionTime: 'Empty Bed Contact Time (EBCT): 10 – 15 minutes',
    efficiency: '85–92% dissolved organic carbon removal',
  },
  {
    id: 6,
    name: 'UV-C Disinfection & Pathogen Inactivation',
    shortName: 'Disinfection',
    category: 'Photochemical Sterilization',
    workingPrinciple: 'Ultraviolet photons at the germicidal 254 nm wavelength penetrate bacterial and viral cell walls, dimerization of thymine bases in DNA/RNA stops replication and renders pathogens non-infectious without generating toxic disinfection byproducts.',
    technology: 'Closed-vessel medium-pressure UV-C reactor chamber equipped with automated quartz sleeve wiper and calibrated radiometer.',
    scientificPrinciple: 'Photochemical Pyrimidine Dimerization of Microbial Nucleic Acids',
    inputQuality: 'Optically clear water (UVT > 85%)',
    outputQuality: 'Disinfected pathogen-free water (E. coli: 0 CFU/100mL)',
    retentionTime: 'Continuous inline exposure (< 3 seconds)',
    efficiency: '99.99% (4-log) microbial kill rate at ≥ 40 mJ/cm²',
  },
  {
    id: 7,
    name: 'Final Water Quality Testing & Manifold',
    shortName: 'Quality Testing',
    category: 'Automated Telemetry & Verification',
    workingPrinciple: 'Continuous inline sensor manifold and automated laboratory assay verify that treated water complies with regulatory standards before routing to its intended reuse destination.',
    technology: 'Multi-parametric flow-through cell testing pH, Turbidity, TDS, DO, along with automated optical fluorescence pathogen alerts.',
    scientificPrinciple: 'Electrochemistry, Nephelometry & Optical Fluorometry',
    inputQuality: 'Fully treated effluent stream',
    outputQuality: 'Certified verified water allocated to secondary reuse or aquifer recharge',
    retentionTime: 'Real-time telemetry logging (1 Hz)',
    efficiency: '100% continuous regulatory compliance audit',
  },
];

interface SampleData {
  id: string;
  source: string;
  ph: number;
  turbidity: number; // NTU
  tds: number; // ppm
  dissolvedOxygen: number; // mg/L
  ecoli: number; // CFU/100mL
  heavyMetals: number; // ppm (Lead/Cadmium)
  chemicalPollutants: number; // COD mg/L
  verdict: string;
  recommendedUse: string;
  isPotable: boolean;
}

const sampleWaterSources: SampleData[] = [
  {
    id: 'raw',
    source: 'Raw Polluted Pond Water',
    ph: 8.8,
    turbidity: 142,
    tds: 820,
    dissolvedOxygen: 1.8,
    ecoli: 24000,
    heavyMetals: 0.08,
    chemicalPollutants: 85,
    verdict: 'Severe Contamination & Hypoxia',
    recommendedUse: 'Unfit for any domestic, farm or animal use. Requires immediate remediation.',
    isPotable: false,
  },
  {
    id: 'post-aquaclean',
    source: 'Post-AquaClean Surface Skimming',
    ph: 7.9,
    turbidity: 68,
    tds: 710,
    dissolvedOxygen: 4.5,
    ecoli: 12000,
    heavyMetals: 0.06,
    chemicalPollutants: 48,
    verdict: 'Surface Debris Removed, Suspended Colloids Present',
    recommendedUse: 'Pond surface aerated; suitable for non-sensitive wetland biodiversity, unsuited for irrigation.',
    isPotable: false,
  },
  {
    id: 'post-clarifier',
    source: 'Post-Sedimentation Clarified Water',
    ph: 7.3,
    turbidity: 12,
    tds: 540,
    dissolvedOxygen: 5.8,
    ecoli: 1800,
    heavyMetals: 0.02,
    chemicalPollutants: 22,
    verdict: 'Flocs Removed, Residual Microbes & Dissolved Solutes',
    recommendedUse: 'Preliminary industrial cooling, restricted landscape turf irrigation.',
    isPotable: false,
  },
  {
    id: 'post-aquapure',
    source: 'Post-AquaPure 7-Stage Complete Purification',
    ph: 7.2,
    turbidity: 0.8,
    tds: 210,
    dissolvedOxygen: 7.4,
    ecoli: 0,
    heavyMetals: 0.001,
    chemicalPollutants: 4.2,
    verdict: 'High-Purity Verified Eco-Water (Meets WHO & BIS Irrigation Standards)',
    recommendedUse: 'Unrestricted crop drip irrigation, fish farming pond replenishment, groundwater aquifer recharge.',
    isPotable: false, // Disclaimed below
  },
];

export default function AquaPure() {
  const [selectedStageId, setSelectedStageId] = useState<number>(3);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('post-aquapure');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const activeStage = purificationStages.find((s) => s.id === selectedStageId) || purificationStages[2];
  const activeSample = sampleWaterSources.find((s) => s.id === selectedSampleId) || sampleWaterSources[3];

  return (
    <section
      id="aquapure"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#081e3a] to-[#0a1628] overflow-hidden"
    >
      {/* Decorative blue/aqua glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Droplets className="w-3.5 h-3.5" />
            Unit C — Multi-Stage Water Purification
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            AquaPure —{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
              7-Stage Water Treatment Facility
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            Pond surface harvesting is only the first step. Remaining pond water is transported
            to the AquaPure facility where it passes through 7 scientific multi-barrier purification stages.
          </motion.p>
        </div>

        {/* ─── MANDATORY POTABILITY GUARDRAIL CALLOUT ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-14 p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-blue-950/60 border border-cyan-500/40 backdrop-blur-md relative overflow-hidden shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0 border border-cyan-500/30">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Crucial Potability & Public Health Guardrail
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Engineering Standard
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">
                Surface Waste & Algae Removal Does Not Automatically Equal Drinking Water
              </h4>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Removing surface algae mats and plastic bottles does not neutralize microscopic dissolved chemical solutes,
                heavy metals, pesticides, or microbial pathogens. Drinking-water suitability requires certified secondary
                multi-barrier processing (such as high-pressure reverse osmosis / nanofiltration) and certified laboratory
                verification against national standards (BIS IS 10500 in India, WHO Guidelines). AquaPure effluent is verified
                for unrestricted agricultural irrigation, ecological replenishment, and aquifer recharge.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── CLICKABLE 7-STAGE TREATMENT PLANT DIAGRAM ─── */}
        <div className="bg-slate-900/80 border border-blue-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Interactive Schematic
              </span>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                7-Stage Water Treatment Train
              </h3>
            </div>
            <div className="text-xs text-white/50">
              Click any stage below to inspect its chemical, biological, and physical parameters:
            </div>
          </div>

          {/* Graphical Pipeline Flow Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
            {purificationStages.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStageId(st.id)}
                className={`p-3 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between border relative overflow-hidden ${
                  selectedStageId === st.id
                    ? 'bg-gradient-to-b from-blue-600/30 to-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)]'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      selectedStageId === st.id
                        ? 'bg-cyan-400 text-slate-950'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    0{st.id}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">{st.category.split(' ')[0]}</span>
                </div>
                <div className="text-xs font-bold text-white leading-tight mb-1">{st.shortName}</div>
                <div className="text-[10px] text-cyan-300 font-mono truncate">{st.efficiency.split(' ')[0]}</div>

                {/* Animated active bottom line */}
                {selectedStageId === st.id && (
                  <motion.div
                    layoutId="active-stage-line"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Active Stage Inspector Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-950/70 p-6 sm:p-8 rounded-2xl border border-white/5"
            >
              {/* Left Column (7 cols): Stage Description & Scientific Principle */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Stage 0{activeStage.id} of 7
                  </span>
                  <span className="text-xs text-white/50">{activeStage.category}</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {activeStage.name}
                </h4>
                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  {activeStage.workingPrinciple}
                </p>

                {/* Scientific Principle Highlight */}
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 mb-6">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Scientific Mechanism</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {activeStage.scientificPrinciple}
                  </div>
                  <div className="text-xs text-white/70">
                    <strong>Engineered Hardware:</strong> {activeStage.technology}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-white/50 mb-1">Incoming Stream Quality:</div>
                    <div className="font-mono text-amber-300 font-medium">{activeStage.inputQuality}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-white/50 mb-1">Post-Stage Stream Quality:</div>
                    <div className="font-mono text-emerald-300 font-medium">{activeStage.outputQuality}</div>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Performance Metrics */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                    Hydraulic & Removal Metrics
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-white/70">Contact / Retention Time</span>
                      <span className="font-mono font-bold text-white">{activeStage.retentionTime}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-white/70">Efficiency Rating</span>
                      <span className="font-mono font-bold text-cyan-300">{activeStage.efficiency}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-white/70">Monitoring Method</span>
                      <span className="font-mono text-white/90">Automated PLC Telemetry</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    disabled={selectedStageId === 1}
                    onClick={() => setSelectedStageId((p) => Math.max(1, p - 1))}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 text-xs font-semibold text-white border border-white/10 transition-all cursor-pointer"
                  >
                    ← Previous Stage
                  </button>
                  <button
                    disabled={selectedStageId === 7}
                    onClick={() => setSelectedStageId((p) => Math.min(7, p + 1))}
                    className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-xs font-semibold text-slate-950 shadow-md transition-all cursor-pointer"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── INTERACTIVE FEATURE 7: Water Quality Testing Interface with Sample Data ─── */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Beaker className="w-3.5 h-3.5" />
                Interactive Testing Station
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Water Quality Testing Interface (Sample Data)
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Select different water sample batches along the remediation timeline to audit key water quality parameters.
              </p>
            </div>

            {/* Regulatory Compliance Badge */}
            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-right shrink-0">
              <span className="text-[10px] font-mono uppercase text-cyan-400">Benchmark Standards</span>
              <div className="text-xs font-bold text-white">WHO & BIS IS 10500 Guidelines</div>
            </div>
          </div>

          {/* Sample Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {sampleWaterSources.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSampleId(s.id)}
                className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                  selectedSampleId === s.id
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <div className="text-xs font-bold text-white truncate">{s.source}</div>
                <div className="text-[11px] text-cyan-300 font-mono mt-1">Turbidity: {s.turbidity} NTU</div>
              </button>
            ))}
          </div>

          {/* Testing Results Grid: 7 Key Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-8">
            {/* pH */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="text-[10px] font-mono text-white/50 uppercase">pH Level</div>
              <div className={`text-xl font-bold font-mono my-1 ${activeSample.ph >= 6.5 && activeSample.ph <= 8.5 ? 'text-emerald-400' : 'text-red-400'}`}>
                {activeSample.ph}
              </div>
              <div className="text-[10px] text-white/40">Target: 6.5 – 8.5</div>
            </div>

            {/* Turbidity */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="text-[10px] font-mono text-white/50 uppercase">Turbidity (NTU)</div>
              <div className={`text-xl font-bold font-mono my-1 ${activeSample.turbidity <= 5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {activeSample.turbidity}
              </div>
              <div className="text-[10px] text-white/40">Target: &lt; 5.0 NTU</div>
            </div>

            {/* TDS */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="text-[10px] font-mono text-white/50 uppercase">TDS (ppm)</div>
              <div className={`text-xl font-bold font-mono my-1 ${activeSample.tds <= 500 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {activeSample.tds}
              </div>
              <div className="text-[10px] text-white/40">Target: &lt; 500 ppm</div>
            </div>

            {/* Dissolved Oxygen */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="text-[10px] font-mono text-white/50 uppercase">Dissolved O2</div>
              <div className={`text-xl font-bold font-mono my-1 ${activeSample.dissolvedOxygen >= 6.0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {activeSample.dissolvedOxygen} mg/L
              </div>
              <div className="text-[10px] text-white/40">Target: &gt; 6.0 mg/L</div>
            </div>

            {/* E. coli */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="text-[10px] font-mono text-white/50 uppercase">E. coli</div>
              <div className={`text-xl font-bold font-mono my-1 ${activeSample.ecoli === 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {activeSample.ecoli}
              </div>
              <div className="text-[10px] text-white/40">Target: 0 CFU/100mL</div>
            </div>

            {/* Heavy Metals */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="text-[10px] font-mono text-white/50 uppercase">Heavy Metals</div>
              <div className={`text-xl font-bold font-mono my-1 ${activeSample.heavyMetals <= 0.01 ? 'text-emerald-400' : 'text-red-400'}`}>
                {activeSample.heavyMetals} ppm
              </div>
              <div className="text-[10px] text-white/40">Target: &lt; 0.01 ppm</div>
            </div>

            {/* Chemical Pollutants (COD) */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center col-span-2 sm:col-span-1">
              <div className="text-[10px] font-mono text-white/50 uppercase">Chemical (COD)</div>
              <div className={`text-xl font-bold font-mono my-1 ${activeSample.chemicalPollutants <= 10 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {activeSample.chemicalPollutants} mg/L
              </div>
              <div className="text-[10px] text-white/40">Target: &lt; 10 mg/L</div>
            </div>
          </div>

          {/* Sample Verdict and Allocation */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-cyan-400 uppercase">Assessment Verdict:</span>
                <span className="text-sm font-bold text-white">{activeSample.verdict}</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                <strong>Recommended Destination:</strong> {activeSample.recommendedUse}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified Secondary Reuse
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
