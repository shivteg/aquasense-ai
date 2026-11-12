import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  CheckCircle2,
  Flame,
  Leaf,
  Layers,
  Microscope,
  Scale,
  ShieldAlert,
  Sprout,
  Thermometer,
} from 'lucide-react';

interface StageInfo {
  step: number;
  title: string;
  tagline: string;
  description: string;
  scientificConcept: string;
  tempRange: string;
  duration: string;
  keyAction: string;
  output: string;
}

const compostingStages: StageInfo[] = [
  {
    step: 1,
    title: 'Algae Harvest & Intake',
    tagline: 'Raw aquatic biomass collection from AquaClean',
    description: 'Fresh wet algae slurry harvested by the AquaClean robot is transferred to the onshore holding bay. The biomass is rich in organic nitrogen, phosphorus, and trace minerals.',
    scientificConcept: 'Photosynthetic Bio-accumulation & Solar Energy Conversion',
    tempRange: 'Ambient (20–25°C)',
    duration: '0–2 Hours',
    keyAction: 'Mass logging, baseline moisture check, initial odor control containment.',
    output: 'Raw wet algae slurry (moisture content ~88–92%)',
  },
  {
    step: 2,
    title: 'Contaminant & Plastic Separation',
    tagline: 'Mechanical vibratory & magnetic sorting',
    description: 'The raw harvest passes through vibratory sieves and flotation separators to isolate micro-plastics, grit, fishing lines, and non-biodegradable debris from the algae cells.',
    scientificConcept: 'Density-Differential Flotation & Size-Exclusion Sieving',
    tempRange: 'Ambient (20–25°C)',
    duration: '2–4 Hours',
    keyAction: 'Purity sorting, diverting separated plastics to the municipal recycling loop.',
    output: 'Decontaminated, pure algae biomass pulp',
  },
  {
    step: 3,
    title: 'Dewatering & Moisture Regulation',
    tagline: 'Mechanical screw pressing to target 55–65% moisture',
    description: 'High-efficiency perforated screw press removes surplus free water, reducing moisture from ~90% down to the optimal aerobic microbial zone (55–65%). The expressed nutrient water is cycled to treatment.',
    scientificConcept: 'Hydraulic Compaction & Capillary Drainage Mechanics',
    tempRange: 'Ambient (22–26°C)',
    duration: '4–8 Hours',
    keyAction: 'Extracting excess cellular water without destroying bacterial cell walls.',
    output: 'Dewatered semi-solid algae cake (~60% moisture)',
  },
  {
    step: 4,
    title: 'C:N Ratio Blending (Carbon Balancing)',
    tagline: 'Formulating the golden 25:1 to 30:1 composting ratio',
    description: 'Pure algae has a low C:N ratio (~8:1 to 10:1, high nitrogen). It is thoroughly blended with shredded dry organic bulking agents (dry fallen leaves, wheat straw, saw dust) to hit the 25:1–30:1 optimum.',
    scientificConcept: 'Stoichiometric Carbon-to-Nitrogen Balance & Microbial Bio-Energetics',
    tempRange: 'Ambient to Mesophilic (25–35°C)',
    duration: 'Day 1',
    keyAction: 'Mechanical tumbling of 1 part dewatered algae to 2.5 parts dry carbonaceous matter.',
    output: 'Uniform porous aerated composting feedstock bed',
  },
  {
    step: 5,
    title: 'Aerobic Microbial Decomposition',
    tagline: 'Active thermophilic decomposition (55°C–65°C)',
    description: 'Aerobic bacteria (Bacillus, Pseudomonas) and actinomycetes aggressively oxidize carbonaceous compounds, generating biogenic heat. High temperatures sanitize pathogens, weed seeds, and pest larvae.',
    scientificConcept: 'Thermophilic Respiration & Microbial Enzymatic Hydrolysis',
    tempRange: 'Thermophilic (55–65°C)',
    duration: 'Day 2 to Day 21',
    keyAction: 'Forced aeration or automated windrow turning every 48 hours to sustain oxygen > 10%.',
    output: 'Sanitized, biologically stabilized intermediate humic mass',
  },
  {
    step: 6,
    title: 'Curing, Maturation & Quality Testing',
    tagline: 'Mesophilic humification and certified safety assay',
    description: 'The compost temperature gently cools as labile carbon is exhausted. Fungi and actinomycetes synthesize mature humic and fulvic acids. Mandatory laboratory assays check for algal toxins and heavy metals.',
    scientificConcept: 'Humification Chemistry & Safety Assays (ELISA / ICP-MS)',
    tempRange: 'Mesophilic to Ambient (35°C → 25°C)',
    duration: 'Day 22 to Day 40',
    keyAction: 'Testing for microcystin toxins, Lead/Cadmium, seed germination index (>85%), and Solvita rating.',
    output: 'Certified safe, fully cured, dark earthy organic compost',
  },
  {
    step: 7,
    title: 'Organic Soil Amendment Application',
    tagline: 'Regenerative green agriculture & soil health enhancement',
    description: 'The finished organic amendment is packaged or distributed to local farms. It improves soil moisture retention, provides slow-release biological N-P-K, and reduces synthetic chemical fertiliser dependence.',
    scientificConcept: 'Soil Microbiome Enrichment & Cation Exchange Capacity (CEC)',
    tempRange: 'Ambient Storage',
    duration: 'Long-term storage',
    keyAction: 'Application at 5–10 tonnes/hectare for crop fields, orchard soil, and garden restoration.',
    output: 'Regenerated agricultural soil with enhanced organic carbon',
  },
];

export default function AquaFert() {
  const [activeStep, setActiveStep] = useState<number>(4);
  const [algaeRatio, setAlgaeRatio] = useState<number>(30); // 10% to 70% algae
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const currentStage = compostingStages.find((s) => s.step === activeStep) || compostingStages[3];

  // Calculated C:N Ratio based on algae ratio slider
  // Algae is ~8:1 C:N, Dry Straw is ~60:1 C:N
  const dryStrawRatio = 100 - algaeRatio;
  const calculatedCN = Math.round(
    (algaeRatio * 8 + dryStrawRatio * 60) / 100
  );

  let cnStatus = 'Optimal Aerobic Hot Composting';
  let cnColor = 'text-emerald-400';
  let cnBg = 'bg-emerald-500/20 border-emerald-500/40';

  if (calculatedCN < 20) {
    cnStatus = 'Excess Nitrogen (Ammonia Gas / Odor Risk)';
    cnColor = 'text-red-400';
    cnBg = 'bg-red-500/20 border-red-500/40';
  } else if (calculatedCN > 35) {
    cnStatus = 'Excess Carbon (Slow Microbial Breakdown)';
    cnColor = 'text-amber-400';
    cnBg = 'bg-amber-500/20 border-amber-500/40';
  }

  return (
    <section
      id="aquafert"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#08221c] to-[#0a1628] overflow-hidden"
    >
      {/* Decorative emerald glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sprout className="w-3.5 h-3.5" />
            Unit B — Biomass Valorization
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            AquaFert —{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Algae-to-Organic-Fertiliser Unit
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            Pond algae is not waste — it is nature's most concentrated storehouse of nitrogen and
            trace minerals. AquaFert upcycles harvested pond biomass into certified organic soil amendments.
          </motion.p>
        </div>

        {/* ─── MANDATORY SAFETY CALLOUT: Algae Toxin Protocol ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-14 p-6 rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-900/80 to-amber-950/50 border border-amber-500/40 backdrop-blur-md relative overflow-hidden shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 border border-amber-500/30">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Critical Safety Protocol & Toxicity Guardrail
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Mandatory Lab Screening
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">
                Not Every Algae Species is Safe for Direct Agricultural Use
              </h4>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Blue-green algae (cyanobacteria, e.g. <em>Microcystis</em>, <em>Anabaena</em>) can synthesize potent
                hepatotoxins (microcystins) and neurotoxins that persist in soils and accumulate in food crops.
                Additionally, industrial runoff can lead to heavy metal bio-accumulation (Lead, Cadmium, Arsenic).
                AquaFert mandates rapid ELISA toxin screening and hot thermophilic composting (≥55°C) to denature
                biological toxins before any batch is approved as agricultural compost.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── INTERACTIVE COMPOSTING PROCESS STEPPER ─── */}
        <div className="bg-slate-900/80 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl mb-14 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                Interactive Pipeline
              </span>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                The 7-Stage Algae Composting Journey
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/50">Click any step to inspect details:</span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Step {activeStep} of 7
              </span>
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 mb-8">
            {compostingStages.map((st) => (
              <button
                key={st.step}
                onClick={() => setActiveStep(st.step)}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                  activeStep === st.step
                    ? 'bg-gradient-to-b from-emerald-500/30 to-teal-500/20 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      activeStep === st.step
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {st.step}
                  </span>
                  {activeStep === st.step && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-xs font-semibold text-white truncate">{st.title.split(' ')[0]}</div>
                <div className="text-[10px] text-white/50 truncate">{st.duration}</div>
              </button>
            ))}
          </div>

          {/* Active Stage Detailed Breakdown Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-950/60 p-6 sm:p-8 rounded-2xl border border-white/5"
            >
              {/* Left Column (7 cols): Stage Narrative & Science */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Stage 0{currentStage.step}
                  </span>
                  <span className="text-xs text-white/50">{currentStage.tagline}</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {currentStage.title}
                </h4>
                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  {currentStage.description}
                </p>

                {/* Scientific Principle Card */}
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 mb-6">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Microscope className="w-4 h-4" />
                    <span>Biological / Chemical Mechanism</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {currentStage.scientificConcept}
                  </div>
                  <div className="text-xs text-white/70">
                    <strong>Key Operational Action:</strong> {currentStage.keyAction}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <span className="text-white/60">Stage Tangible Output:</span>
                  <span className="font-semibold text-emerald-300">{currentStage.output}</span>
                </div>
              </div>

              {/* Right Column (5 cols): Operating Parameters & Thermophilic Curve */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                    Stage Process Parameters
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-white/70">
                        <Thermometer className="w-3.5 h-3.5 text-red-400" />
                        Temperature Profile
                      </span>
                      <span className="font-mono font-bold text-amber-300">{currentStage.tempRange}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-white/70">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        Retention Duration
                      </span>
                      <span className="font-mono font-bold text-white">{currentStage.duration}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-white/70">
                        <Flame className="w-3.5 h-3.5 text-emerald-400" />
                        Microbial Phase
                      </span>
                      <span className="font-mono font-bold text-emerald-300">
                        {currentStage.step >= 5 && currentStage.step <= 6 ? 'Thermophilic Bacteria' : 'Mesophilic / Conditioning'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Composting Stage Quick Stepper Controls */}
                <div className="flex gap-3">
                  <button
                    disabled={activeStep === 1}
                    onClick={() => setActiveStep((p) => Math.max(1, p - 1))}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 text-xs font-semibold text-white border border-white/10 transition-all cursor-pointer"
                  >
                    ← Previous Step
                  </button>
                  <button
                    disabled={activeStep === 7}
                    onClick={() => setActiveStep((p) => Math.min(7, p + 1))}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-xs font-semibold text-slate-950 shadow-md transition-all cursor-pointer"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── INTERACTIVE C:N RATIO BALANCER TOOL ─── */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Scale className="w-3.5 h-3.5" />
                Interactive Stoichiometry Simulator
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Carbon-to-Nitrogen (C:N) Formulation Tool
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Adjust the ratio of raw wet algae to dry carbonaceous matter to simulate composting thermodynamics.
              </p>
            </div>

            {/* Calculated Result Badge */}
            <div className={`p-4 rounded-2xl border ${cnBg} text-right shrink-0`}>
              <div className="text-xs text-white/70">Calculated C:N Ratio</div>
              <div className={`text-3xl font-extrabold font-mono ${cnColor}`}>{calculatedCN} : 1</div>
              <div className={`text-xs font-semibold mt-1 ${cnColor}`}>{cnStatus}</div>
            </div>
          </div>

          {/* Slider input */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex justify-between items-center text-sm">
              <span className="text-emerald-300 font-semibold flex items-center gap-2">
                <Sprout className="w-4 h-4" /> Algae Biomass: {algaeRatio}% (C:N ~8:1)
              </span>
              <span className="text-amber-300 font-semibold flex items-center gap-2">
                <Leaf className="w-4 h-4" /> Dry Straw / Leaves: {dryStrawRatio}% (C:N ~60:1)
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={70}
              value={algaeRatio}
              onChange={(e) => setAlgaeRatio(Number(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />

            <div className="flex justify-between text-[11px] font-mono text-white/40">
              <span>10% Algae (High Carbon 55:1)</span>
              <span className="text-emerald-400 font-bold">Recommended Zone (25–35% Algae → ~28:1)</span>
              <span>70% Algae (High Nitrogen 15:1)</span>
            </div>
          </div>

          {/* Scientific Principles grid */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-white/5">
              <div className="text-emerald-400 font-bold mb-1">Photosynthesis Capture</div>
              <div className="text-white/60">Algae fixes atmospheric CO2 into dense organic carbon & cellular carbohydrates.</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <div className="text-emerald-400 font-bold mb-1">Nutrient Recovery</div>
              <div className="text-white/60">Traps phosphorus and nitrates that caused eutrophication, cycling them back to farms.</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <div className="text-emerald-400 font-bold mb-1">Microbial Respiration</div>
              <div className="text-white/60">Bacteria generate 55–65°C heat, killing pathogen spores without chemical biocides.</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <div className="text-emerald-400 font-bold mb-1">Humic Acid Synthesis</div>
              <div className="text-white/60">Cured finished compost enhances soil moisture retention by up to 300%.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
