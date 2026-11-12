import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Atom,
  Beaker,
  Cpu,
  Dna,
  Microscope,
  Sparkles,
} from 'lucide-react';

type Discipline = 'Physics' | 'Chemistry' | 'Biology' | 'Electronics';

interface PrincipleItem {
  id: string;
  discipline: Discipline;
  title: string;
  tagline: string;
  formulaOrConcept: string;
  mechanism: string;
  roleInAquaSense: string;
  keyTakeaway: string;
}

const principlesData: PrincipleItem[] = [
  // ─── PHYSICS ───
  {
    id: 'archimedes',
    discipline: 'Physics',
    title: "Archimedes' Principle of Buoyancy",
    tagline: 'Static fluid displacement and equilibrium floatation',
    formulaOrConcept: 'F_b = ρ_f · V_disp · g',
    mechanism: 'Any object wholly or partially immersed in a fluid is buoyed up by a force equal to the weight of the fluid displaced by the object.',
    roleInAquaSense: 'Engineered into the dual hollow HDPE pontoons of AquaClean, providing a reserve buoyancy of over 85 kg to float safely even under full waste and battery payloads.',
    keyTakeaway: 'Ensures shallow 12 cm draft without disturbing shallow pond beds.',
  },
  {
    id: 'newton-third',
    discipline: 'Physics',
    title: "Newton's Third Law of Motion",
    tagline: 'Conservation of momentum & action-reaction thrust',
    formulaOrConcept: 'F_{action} = -F_{reaction} = \\dot{m} \\Delta v',
    mechanism: 'When the submerged marine propellers accelerate water masses backward, an equal and opposite reactive force propels the vessel forward through the water.',
    roleInAquaSense: 'Drives the twin 60W waterproof propulsion pods, allowing independent forward and reverse thrust for agile differential maneuvering.',
    keyTakeaway: 'Provides reliable propulsion without relying on complex rudders.',
  },
  {
    id: 'fluid-mechanics',
    discipline: 'Physics',
    title: 'Fluid Mechanics & Hydrodynamics',
    tagline: 'Bernoulli streamlines and low-drag pontoon bow geometry',
    formulaOrConcept: 'P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}',
    mechanism: 'Streamlined pontoon profiles minimize viscous drag and turbulent wake, while the converging bow funnel channels floating debris directly into the intake mouth.',
    roleInAquaSense: 'Channels floating algae mats toward the conveyor throat while maintaining energy-efficient cruising at 0.5 m/s.',
    keyTakeaway: 'Reduces motor power consumption by 35% compared to blunt hulls.',
  },
  {
    id: 'gravity-separation',
    discipline: 'Physics',
    title: "Gravity Separation & Stokes' Law",
    tagline: 'Sedimentation velocity of suspended particulate flocs',
    formulaOrConcept: 'v_s = \\frac{g(\\rho_p - \\rho_f) d^2}{18 \\mu}',
    mechanism: 'Particles denser than water accelerate downward under gravitational pull until fluid drag balances the buoyant weight, achieving terminal settling velocity.',
    roleInAquaSense: 'Applied in the AquaPure Lamella Clarifier (Stage 3) and AquaClean mesh conveyor dewatering base to separate heavy flocs from clear supernatant water.',
    keyTakeaway: 'Powers chemical-free primary dewatering and secondary clarification.',
  },

  // ─── CHEMISTRY ───
  {
    id: 'coagulation-flocculation',
    discipline: 'Chemistry',
    title: 'Coagulation & Flocculation Kinetics',
    tagline: 'Colloidal zeta-potential destabilization (DLVO Theory)',
    formulaOrConcept: 'Al^{3+} + 3H_2O \\rightarrow Al(OH)_3 \\downarrow + 3H^+',
    mechanism: 'Trivalent aluminium (Al³⁺) or polyaluminium chloride ions neutralize the negative zeta-potential of colloidal clay and organic particles, allowing Van der Waals attraction to agglomerate them into macro-flocs.',
    roleInAquaSense: 'Stage 2 of the AquaPure water purification plant aggregates microscopic suspended particles that cannot be filtered mechanically.',
    keyTakeaway: 'Transforms microscopic cloudiness into settleable solid clumps.',
  },
  {
    id: 'adsorption-chemistry',
    discipline: 'Chemistry',
    title: 'Activated Carbon Surface Adsorption',
    tagline: 'London dispersion forces in microporous carbon lattices',
    formulaOrConcept: 'q_e = K_F \\cdot C_e^{1/n} \\quad \\text{(Freundlich Isotherm)}',
    mechanism: 'Granular activated carbon possesses an internal surface area exceeding 1,000 m²/g. Dissolved non-polar organics, dyes, and pesticides partition onto carbon pore walls through physical Van der Waals attraction.',
    roleInAquaSense: 'Stage 5 of AquaPure strips trace agricultural pesticides, algal odor compounds (geosmin, MIB), and dissolved organics from pre-filtered water.',
    keyTakeaway: 'Eliminates chemical odors and micro-contaminants without hazardous residues.',
  },
  {
    id: 'ph-equilibrium',
    discipline: 'Chemistry',
    title: 'pH & Acid-Base Carbonate Buffering',
    tagline: 'Hydrogen ion activity and aquatic carbonate equilibrium',
    formulaOrConcept: '\\text{pH} = -\\log_{10}[H^+] \\quad \\text{and} \\quad CO_2 + H_2O \\rightleftharpoons H_2CO_3 \\rightleftharpoons HCO_3^- + H^+',
    mechanism: 'Excessive algae blooms consume free dissolved carbon dioxide during daytime photosynthesis, shifting carbonate equilibrium and driving pond pH to alkaline extremes (>9.0).',
    roleInAquaSense: 'Monitored continuously on board AquaClean to track algae photosynthetic activity, and corrected in AquaPure to maintain neutral 7.0–7.4 potable/irrigation standards.',
    keyTakeaway: 'Crucial health indicator for pond ecology and crop water compatibility.',
  },
  {
    id: 'mechanical-filtration-chem',
    discipline: 'Chemistry',
    title: 'Granular Multi-Media Depth Filtration',
    tagline: 'Physical sieving and interstitial straining',
    formulaOrConcept: '\\Delta P = \\frac{\\mu L v}{k} \\quad \\text{(Kozeny-Carman Law)}',
    mechanism: 'Stratified layers of anthracite coal, quartz sand, and garnet trap particles through mechanical straining, sedimentation in pore throats, and electrostatic adherence.',
    roleInAquaSense: 'Stage 4 of AquaPure reduces turbidity from 15 NTU down to below 1.5 NTU before UV disinfection.',
    keyTakeaway: 'Ensures water optical clarity necessary for UV light penetration.',
  },

  // ─── BIOLOGY ───
  {
    id: 'photosynthesis-biology',
    discipline: 'Biology',
    title: 'Photosynthesis & Algae Bio-Energetics',
    tagline: 'Solar conversion into dense cellular biomass',
    formulaOrConcept: '6CO_2 + 6H_2O + h\\nu \\rightarrow C_6H_{12}O_6 + 6O_2',
    mechanism: 'Algae chloroplasts utilize solar photons to fix carbon dioxide and assimilate pond nitrates and orthophosphates into cellular proteins, lipids, and carbohydrates.',
    roleInAquaSense: 'Instead of viewing algae as pond scum, AquaSense recognizes it as an energy-dense, nitrogen-rich organic biomass harvest for agriculture.',
    keyTakeaway: 'Converts troublesome pond pollution into high-value organic fertilizer.',
  },
  {
    id: 'microbial-decomposition',
    discipline: 'Biology',
    title: 'Aerobic Microbial Decomposition',
    tagline: 'Succession of mesophilic and thermophilic microbial consortia',
    formulaOrConcept: '\\text{Biomass} + O_2 \\xrightarrow{\\text{Bacteria/Fungi}} \\text{Humus} + CO_2 + H_2O + \\Delta H',
    mechanism: 'Aerobic heterotrophic bacteria (Bacillus, Pseudomonas) rapidly oxidize simple carbohydrates, releasing metabolic heat. Temperatures climb to 55–65°C, where thermophilic actinomycetes break down tough cellulose.',
    roleInAquaSense: 'The core biological engine of AquaFert (Unit B), sanitizing pathogens and converting raw algae into mature, disease-suppressive organic compost.',
    keyTakeaway: 'Destroys weed seeds and pathogens naturally through biogenic heat.',
  },
  {
    id: 'cn-ratio-biology',
    discipline: 'Biology',
    title: 'Carbon-to-Nitrogen (C:N) Stoichiometry',
    tagline: 'Nutritional balance for optimal microbial metabolism',
    formulaOrConcept: '\\text{Optimal } C:N = 25:1 \\text{ to } 30:1',
    mechanism: 'Microorganisms require roughly 30 parts of carbon for cellular respiration and energy for every 1 part of nitrogen utilized for protein and enzyme synthesis.',
    roleInAquaSense: 'Guides the precise blending of high-nitrogen algae (C:N ~8:1) with dry carbonaceous straw/leaves (C:N ~60:1) in AquaFert.',
    keyTakeaway: 'Prevents ammonia gas odor loss while accelerating decomposition speed.',
  },
  {
    id: 'nutrient-recovery-biology',
    discipline: 'Biology',
    title: 'Biological Nutrient Recovery (N-P-K)',
    tagline: 'Restoring circular nutrient cycles to farm soils',
    formulaOrConcept: '\\text{Nutrient Loop: Runoff } (N, P) \\rightarrow \\text{Algae } \\rightarrow \\text{AquaFert } \\rightarrow \\text{Crops}',
    mechanism: 'Agricultural fertiliser runoff contains soluble Nitrogen (NO₃⁻) and Phosphorus (PO₄³⁻) that trigger eutrophication. AquaSense closes the cycle by harvesting the algae and returning stabilized organic N-P-K to farm soils.',
    roleInAquaSense: 'Restores degraded agricultural topsoil organic matter while reducing dependence on synthetic chemical fertilisers.',
    keyTakeaway: 'Transforms an ecological crisis into a circular agricultural asset.',
  },

  // ─── ELECTRONICS & CS ───
  {
    id: 'esp32-embedded',
    discipline: 'Electronics',
    title: 'ESP32 Dual-Core Embedded Automation',
    tagline: 'Real-time task scheduling and multi-sensor fusion',
    formulaOrConcept: '240\\text{ MHz Dual Tensilica LX6 } + \\text{FreeRTOS}',
    mechanism: 'Core 0 runs the real-time sensor polling and motor PWM control loop (50 Hz), while Core 1 handles WiFi/Bluetooth telemetry streaming, MQTT messaging, and obstacle-avoidance logic.',
    roleInAquaSense: 'Serves as the autonomous brain inside the AquaClean robot, executing fail-safe loops and communicating with the live telemetry dashboard.',
    keyTakeaway: 'Low-cost, high-reliability industrial automation at edge scale.',
  },
  {
    id: 'sensor-technology',
    discipline: 'Electronics',
    title: 'Multi-Parametric Environmental Sensors',
    tagline: 'Piezoelectric sonar, nephelometry, and glass potentiometry',
    formulaOrConcept: 'd = \\frac{v_{sound} \\cdot \\Delta t}{2} \\quad \\text{and} \\quad E = E_0 - \\frac{2.303 RT}{F}\\text{pH}',
    mechanism: 'Ultrasonic sensors bounce 40 kHz acoustic waves to detect floating obstacles; optical turbidity sensors measure 90° light scattering (nephelometric NTU); glass electrodes measure hydrogen ion activity.',
    roleInAquaSense: 'Enables autonomous collision avoidance around pond shorelines and streams continuous water quality metrics to the cloud.',
    keyTakeaway: 'Turns the cleaning robot into a roaming environmental monitoring laboratory.',
  },
  {
    id: 'motor-control-cs',
    discipline: 'Electronics',
    title: 'Differential Motor Control & H-Bridge PWM',
    tagline: 'Pulse-width modulated bi-directional speed control',
    formulaOrConcept: 'V_{avg} = D \\cdot V_{supply} = \\left(\\frac{t_{on}}{T}\\right) V_{supply}',
    mechanism: 'MOSFET H-Bridge motor drivers modulate the duty cycle of DC voltage applied to thrusters, allowing smooth acceleration, deceleration, and counter-rotation for zero-radius turns.',
    roleInAquaSense: 'Controls the two propulsion thrusters and the conveyor belt motor, adjusting speeds dynamically when heavy algae loads are detected.',
    keyTakeaway: 'Delivers pinpoint navigation without delicate steering servos.',
  },
  {
    id: 'iot-telemetry-cs',
    discipline: 'Electronics',
    title: 'IoT Monitoring & Real-Time Telemetry',
    tagline: 'Lightweight publish-subscribe telemetry over WebSockets',
    formulaOrConcept: '\\text{MQTT Broker: } \\text{Edge ESP32} \\leftrightarrow \\text{Web Dashboard}',
    mechanism: 'Lightweight JSON telemetry packets are transmitted periodically to a central broker, logging payload weights, battery voltage, solar input, water metrics, and operational alarms.',
    roleInAquaSense: 'Feeds the interactive monitoring dashboard with live metrics, notifying operators when the collection basket is full or when water quality meets reuse standards.',
    keyTakeaway: 'Provides complete transparency and real-time supervisory control.',
  },
];

export default function ScientificPrinciples() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>('Physics');
  const [selectedPrincipleId, setSelectedPrincipleId] = useState<string>('archimedes');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const disciplines: Discipline[] = ['Physics', 'Chemistry', 'Biology', 'Electronics'];

  const filteredPrinciples = principlesData.filter((p) => p.discipline === selectedDiscipline);
  const activePrinciple = principlesData.find((p) => p.id === selectedPrincipleId) || filteredPrinciples[0] || principlesData[0];

  const getDisciplineIcon = (d: Discipline) => {
    switch (d) {
      case 'Physics':
        return <Atom className="w-4 h-4" />;
      case 'Chemistry':
        return <Beaker className="w-4 h-4" />;
      case 'Biology':
        return <Dna className="w-4 h-4" />;
      case 'Electronics':
        return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="scientific-principles"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#091e34] to-[#0a1628] overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Microscope className="w-3.5 h-3.5" />
            Rigorous Theoretical Foundations
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            The Science Behind{' '}
            <span className="gradient-text">AquaSense</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            AquaSense is grounded in fundamental scientific disciplines — combining classical mechanics,
            surface chemistry, microbial biological composting, and embedded IoT engineering.
          </motion.p>
        </div>

        {/* Discipline Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {disciplines.map((d) => (
            <button
              key={d}
              onClick={() => {
                setSelectedDiscipline(d);
                const first = principlesData.find((p) => p.discipline === d);
                if (first) setSelectedPrincipleId(first.id);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer border ${
                selectedDiscipline === d
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {getDisciplineIcon(d)}
              <span>{d}</span>
            </button>
          ))}
        </div>

        {/* Interactive Principle Cards & Deep Dive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column (5 cols): Principle Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredPrinciples.map((pr) => (
              <button
                key={pr.id}
                onClick={() => setSelectedPrincipleId(pr.id)}
                className={`w-full p-4 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between ${
                  activePrinciple.id === pr.id
                    ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/15 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{pr.discipline}</span>
                  {activePrinciple.id === pr.id && <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <div className="text-base font-bold text-white mb-1">{pr.title}</div>
                <div className="text-xs text-white/60 line-clamp-1">{pr.tagline}</div>
              </button>
            ))}
          </div>

          {/* Right Column (7 cols): Deep Dive Scientific Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePrinciple.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-7 bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                  {getDisciplineIcon(activePrinciple.discipline)}
                  <span>{activePrinciple.discipline} Principle</span>
                </span>
                <span className="text-xs text-white/40 font-mono">Theoretical & Applied Foundation</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {activePrinciple.title}
              </h3>
              <p className="text-xs text-cyan-300 font-medium mb-6">{activePrinciple.tagline}</p>

              {/* Governing Equation / Mathematical Concept Box */}
              <div className="p-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 mb-6">
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-1">
                  Governing Formula / Scientific Law
                </div>
                <div className="font-mono font-bold text-white text-sm sm:text-base py-1 text-cyan-200">
                  {activePrinciple.formulaOrConcept}
                </div>
              </div>

              {/* Scientific Mechanism */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                  Fundamental Scientific Mechanism
                </h4>
                <p className="text-sm text-white/80 leading-relaxed">
                  {activePrinciple.mechanism}
                </p>
              </div>

              {/* Concrete Application in AquaSense */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>How AquaSense Leverages This Principle</span>
                </h4>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {activePrinciple.roleInAquaSense}
                </p>
              </div>

              {/* Key Engineering Takeaway */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs">
                <span className="text-white/60">Core Engineering Benefit:</span>
                <span className="font-semibold text-cyan-300">{activePrinciple.keyTakeaway}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
