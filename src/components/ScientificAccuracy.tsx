import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Scale,
} from 'lucide-react';

interface ScientificAccuracyProps {
  darkMode: boolean;
}

interface RuleItem {
  id: number;
  title: string;
  summary: string;
  expandedExplanation: string;
  badge: string;
}

const scientificRules: RuleItem[] = [
  {
    id: 1,
    title: 'Surface Skimming vs. Dissolved Solutes & Microbes',
    badge: 'Filtration Boundary',
    summary: 'The AquaClean floating robot captures surface algae mats and floating plastics; it does not remove dissolved chemical solutes or microscopic pathogens directly from the water column.',
    expandedExplanation: 'Surface harvesting is purely physical extraction of floating debris. Dissolved pesticides, nitrogen/phosphorus ions, and enteric microbes bypass surface screening and require the downstream chemical coagulation, lamella settling, granular activated carbon adsorption, and UV-C disinfection of the AquaPure unit.',
  },
  {
    id: 2,
    title: 'No Instant Potable Drinking Water Claim',
    badge: 'Potability Guardrail',
    summary: 'AquaSense does not claim that pond water becomes immediately safe for human drinking after surface skimming or basic filtration.',
    expandedExplanation: 'Effluent leaving AquaPure is verified and allocated for unrestricted drip agricultural irrigation and wetland replenishment. Human potable consumption requires certified secondary treatment (such as high-pressure reverse osmosis / nanofiltration) and certified laboratory validation against national standards (BIS IS 10500 in India, WHO Guidelines).',
  },
  {
    id: 3,
    title: 'Algal Toxicity & Harmful Algal Bloom (HAB) Screening',
    badge: 'Biohazard Protocol',
    summary: 'Not every algae species is suitable for fertilizer production; biomass potentially containing cyanotoxins or heavy metals must be screened and tested.',
    expandedExplanation: 'Certain blue-green algae (e.g. Microcystis aeruginosa) synthesize hepatotoxins (microcystins) that can persist in soil and accumulate in food crops. AquaFert mandates rapid ELISA toxin screening and hot thermophilic composting (≥ 55°C) to denature proteins and ensure compost safety before farm application.',
  },
  {
    id: 4,
    title: 'Transparent Demonstration Telemetry & Simulated Data',
    badge: 'Data Integrity',
    summary: 'All real-time dashboard telemetry, graph streams, and pond simulations on this platform are browser-rendered demonstration models.',
    expandedExplanation: 'Telemetry values are derived from calibrated limnological formulas and empirical robot design specifications. For this competition showcase, all values are dynamically simulated on the client side and clearly labeled as demonstration telemetry to avoid misrepresenting simulation as live physical sensor feeds.',
  },
  {
    id: 5,
    title: 'Stoichiometric C:N Ratio in Composting',
    badge: 'Biological Rigor',
    summary: 'Raw algae cannot be composted alone without high-carbon bulking agents without releasing noxious ammonia gas.',
    expandedExplanation: 'Pure algae has a narrow C:N ratio (~8:1 to 10:1). Aerobic heterotrophic bacteria require 25:1 to 30:1 for balanced cellular synthesis and respiration. AquaFert blends dewatered algae with dry carbonaceous matter (straw/leaves) to maintain hot aerobic composting without odor or nitrogen loss.',
  },
];

export default function ScientificAccuracy({ darkMode: _darkMode }: ScientificAccuracyProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="scientific-accuracy"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#0b1b30] to-[#0a1628] border-t border-white/10"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Scale className="w-3.5 h-3.5" />
            Scientific Accuracy & Rigor Notice
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Academic Guardrails & Operational Demarcation
          </h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto leading-relaxed">
            In accordance with engineering integrity and scientific accuracy guidelines for the LPU Innovation
            Competition, we clearly demarcate theoretical principles, physical capabilities, and safety boundaries.
          </p>
        </div>

        <div className="space-y-4">
          {scientificRules.map((rule) => {
            const isExpanded = expandedId === rule.id;
            return (
              <div
                key={rule.id}
                className="rounded-2xl bg-slate-900/80 border border-white/10 p-5 backdrop-blur-xl transition-all"
              >
                <div
                  onClick={() => toggleExpand(rule.id)}
                  className="flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {rule.id}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 mr-2">
                        {rule.badge}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white">
                        {rule.title}
                      </span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform duration-300 shrink-0 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <div className="text-xs text-white/70 leading-relaxed mt-2 pl-9">
                  {rule.summary}
                </div>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-white/10 text-xs text-white/80 leading-relaxed pl-9 bg-white/5 p-3 rounded-xl"
                  >
                    {rule.expandedExplanation}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
