import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Scale,
  Cpu,
  Droplet,
  ChevronDown,
  ChevronUp,
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
    title: 'Solid Waste Capture vs. Dissolved Pollutants',
    badge: 'Filtration Boundary',
    summary:
      'Mechanical bar screens capture floating and suspended physical debris (bottles, branches, bags, leaves) but do not remove chemical solutes or microscopic dissolved organics.',
    expandedExplanation:
      'Coarse mechanical bar screening serves strictly as physical pretreatment. Micro-pollutants, heavy metal ions, nitrogen/phosphorus compounds, pesticides, and industrial dissolved organics bypass bar screens completely and must be treated through downstream chemical coagulation, flocculation, settling, and biological aeration basins.',
  },
  {
    id: 2,
    title: 'Screening is Only One Stage of Water Treatment',
    badge: 'Process Architecture',
    summary:
      'Automated screening represents primary physical pretreatment — the very first protective gate in a comprehensive multi-barrier treatment facility.',
    expandedExplanation:
      'A full municipal wastewater or surface water treatment train consists of (1) Preliminary screening & grit removal, (2) Primary clarification, (3) Secondary biological digestion / activated sludge, (4) Tertiary sand/membrane filtration, and (5) Disinfection (chlorination or ultraviolet irradiation). AquaClean AI optimizes Stage 1 to protect subsequent stages from choking.',
  },
  {
    id: 3,
    title: 'AI Role: Detection & Classification, Not Physical Collection',
    badge: 'AI Demarcation',
    summary:
      'AI and computer vision models identify and classify visible waste on water surfaces; physical removal is carried out purely by mechanical rakes, chains, and conveyors.',
    expandedExplanation:
      'Our AI computer vision models (e.g. YOLO edge detectors) process camera feeds to quantify waste density, categorize debris types (leaves vs. plastics), and evaluate accumulation rates. The AI triggers mechanical actuators or informs operators; it is never described as physically grabbing or removing debris.',
  },
  {
    id: 4,
    title: 'Sensors Monitor Operating Conditions',
    badge: 'Telemetry & IoT',
    summary:
      'Ultrasonic depth sensors, differential head-loss probes, and motor torque monitors continuously measure channel dynamics to guide mechanical action.',
    expandedExplanation:
      'Sensors assess physical variables including upstream/downstream water elevation differential, channel velocity, debris bed thickness, motor current draw, and bin fill percentage. They do not alter water chemistry directly but supply feedback loops for automated motor raking cycles.',
  },
  {
    id: 5,
    title: 'No Drinking Water Claim',
    badge: 'Potability Guardrail',
    summary:
      'AquaClean AI makes zero claim of producing potable drinking water by itself.',
    expandedExplanation:
      'Effluent leaving the automated screening channel is mechanically strained raw water. It still contains pathogenic bacteria (E. coli, coliforms), suspended colloids, viruses, and dissolved chemicals. Drinking water production requires extensive downstream multi-barrier purification, reverse osmosis or nanofiltration, and certified disinfection.',
  },
  {
    id: 6,
    title: 'Conceptual Simulations & Demonstration Data',
    badge: 'Transparency',
    summary:
      'All interactive visual simulations, graphs, numerical counters, and dashboard gauges on this platform are browser-generated demonstrations.',
    expandedExplanation:
      'Simulation parameters are derived from hydraulic engineering formulas and empirical screening design guidelines, but real-time numbers shown on the website are dynamically generated client-side for demonstration and educational purposes, clearly labeled as simulated telemetry.',
  },
  {
    id: 7,
    title: 'Engineering Implementation Requirements',
    badge: 'Real-World Path',
    summary:
      'Real-world physical realization requires certified hydraulic engineering, structural finite element modeling, safety interlocks, and capital expenditure analysis.',
    expandedExplanation:
      'Deploying an automated screening facility in a municipal river intake requires detailed channel bathymetry, civil concrete flume construction, ATEX explosion-proof electrical certification, emergency stop dead-man interlocks, corrosion-resistant metallurgy (316L stainless steel), and local environmental impact assessments.',
  },
];

export default function ScientificAccuracy({ darkMode }: ScientificAccuracyProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="scientific-accuracy"
      className={`relative section-padding border-t transition-colors duration-300 ${
        darkMode ? 'bg-[#081220] border-white/10' : 'bg-[#eef6ff] border-cyan-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4">
            <Scale size={14} />
            Scientific Accuracy & Rigor
          </div>
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-[#0a1628]'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Engineering Demarcation & <span className="gradient-text">Scientific Accuracy</span>
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              darkMode ? 'text-white/60' : 'text-slate-600'
            }`}
          >
            In compliance with national innovation competition standards, AquaClean AI strictly distinguishes between
            conceptual simulation, proposed technological innovation, and established municipal water engineering principles.
          </p>
        </div>

        {/* 7 Rules Cards Accordion/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {scientificRules.map((rule) => {
            const isExpanded = expandedId === rule.id;
            return (
              <div
                key={rule.id}
                className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                  darkMode
                    ? 'bg-[#0b1a2d] border-white/10 hover:border-cyan-500/40'
                    : 'bg-white border-slate-200 shadow-sm hover:border-cyan-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">
                      #{rule.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        darkMode ? 'bg-white/5 text-cyan-300' : 'bg-cyan-50 text-cyan-700'
                      }`}
                    >
                      {rule.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-base font-bold mb-2 ${
                      darkMode ? 'text-white' : 'text-[#0a1628]'
                    }`}
                  >
                    {rule.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed mb-4 ${
                      darkMode ? 'text-white/70' : 'text-slate-600'
                    }`}
                  >
                    {rule.summary}
                  </p>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mt-2 pt-3 border-t text-xs leading-relaxed ${
                        darkMode ? 'border-white/10 text-cyan-200/80' : 'border-slate-100 text-slate-700'
                      }`}
                    >
                      {rule.expandedExplanation}
                    </motion.div>
                  )}
                </div>

                <button
                  onClick={() => toggleExpand(rule.id)}
                  className={`mt-3 pt-2 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                    darkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-700 hover:text-cyan-900'
                  }`}
                >
                  {isExpanded ? (
                    <>
                      Show Less <ChevronUp size={13} />
                    </>
                  ) : (
                    <>
                      Read Engineering Notes <ChevronDown size={13} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Competition Certification Banner */}
        <div
          className={`rounded-2xl p-5 border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            darkMode
              ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-200'
              : 'bg-white border-cyan-200 text-slate-700 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-cyan-400 flex-shrink-0" />
            <span>
              <strong>Scientific Transparency Verified:</strong> All conceptual diagrams, mechanical flow stages, and sensor gauges are clearly denoted as simulated representations for research and evaluation.
            </span>
          </div>
          <span className="px-3 py-1 rounded-full font-bold uppercase text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 whitespace-nowrap">
            Zero Unsubstantiated Claims
          </span>
        </div>
      </div>
    </section>
  );
}
