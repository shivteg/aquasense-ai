import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BrainCircuit,
  Radio,
  Sparkles,
  Droplets,
  SunMedium,
} from 'lucide-react';

interface FutureScopeProps {
  darkMode: boolean;
}

interface FutureItem {
  id: string;
  icon: React.ReactNode;
  phase: string;
  title: string;
  tagline: string;
  description: string;
  technicalRoadmap: string[];
  readiness: string;
  color: string;
}

const futureItems: FutureItem[] = [
  {
    id: 'swarm-robotics',
    icon: <Radio size={26} />,
    phase: 'Phase 1',
    title: 'Autonomous Multi-Agent Robot Swarms',
    tagline: 'LoRa mesh network for synchronized lake patrolling',
    description: 'Enables a fleet of 3–5 AquaClean robots to communicate over low-power LoRa mesh, autonomously partitioning large public lakes and coordinating collection sweeps without centralized human dispatch.',
    technicalRoadmap: [
      'Peer-to-peer LoRa 868/915 MHz mesh protocol',
      'Dynamic Voronoi tessellation spatial coverage algorithms',
      'Autonomous collision-avoidance interlocks between robots',
    ],
    readiness: 'Architecture Formulated',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'drone-recon',
    icon: <BrainCircuit size={26} />,
    phase: 'Phase 2',
    title: 'Multispectral AI Aerial Drone Reconnaissance',
    tagline: 'NDVI & Cyanobacteria bloom mapping from above',
    description: 'Autonomous lightweight drones flying scheduled surveillance missions over water catchments, computing Normalized Difference Vegetation Index (NDVI) to detect early-stage cyanobacteria blooms and dispatching robots before blooms choke the water.',
    technicalRoadmap: [
      'Edge TPU convolutional neural network for bloom segmentation',
      'Automated waypoint generation uploaded to AquaClean robots',
      'Solar recharging drone landing pad integration',
    ],
    readiness: 'Conceptual Design',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'solar-docking',
    icon: <SunMedium size={26} />,
    phase: 'Phase 3',
    title: 'Autonomous Solar Induction Docking Station',
    tagline: 'Zero-touch inductive battery charging and automatic hopper dumping',
    description: 'A floating solar-powered buoy station equipped with wireless inductive charging coils and an automated vacuum hopper that unloads biomass from the robot and transfers it to the onshore composting facility.',
    technicalRoadmap: [
      'Magnetic resonance resonant wireless inductive coupling (150W)',
      'Computer-vision assisted docking alignment fiducials (AprilTags)',
      'Solar photovoltaic pontoon canopy with 400W peak output',
    ],
    readiness: 'Prototype Research',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'mobile-aquapure',
    icon: <Droplets size={26} />,
    phase: 'Phase 4',
    title: 'Containerized Mobile AquaPure Treatment Units',
    tagline: 'Rapid-deployment containerized purification for disaster relief',
    description: 'A 20-foot standard shipping container housing the complete 7-stage AquaPure treatment plant, capable of being deployed on a flatbed truck to drought-stricken villages or flood-damaged rural reservoirs.',
    technicalRoadmap: [
      'Plug-and-play standard camlock inlet/outlet connections',
      'Integrated solar battery storage for 100% off-grid operation',
      'Automated remote telemetry link via 4G/5G and satellite backhaul',
    ],
    readiness: 'Engineering Roadmap',
    color: 'from-purple-500 to-indigo-600',
  },
];

export default function FutureScope({ darkMode: _darkMode }: FutureScopeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="future-scope"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#091b33] to-[#0a1628] overflow-hidden"
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
            <Sparkles className="w-3.5 h-3.5" />
            Long-Term Innovation Trajectory
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Future Scope & Scalability
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            Our technological roadmap expands AquaSense from a single pond remediation platform
            into regional autonomous swarm networks, drone intelligence, and community-driven bio-compost distribution.
          </motion.p>
        </div>

        {/* 4 Future Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {futureItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md`}>
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-white/10 text-cyan-300">
                      {item.phase}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 text-white/60">
                      {item.readiness}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {item.title}
                </h3>
                <div className="text-xs text-cyan-400 font-semibold mb-3">{item.tagline}</div>
                <p className="text-sm text-white/70 leading-relaxed mb-6">{item.description}</p>

                {/* Technical Roadmap items */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    Technical Milestones
                  </div>
                  {item.technicalRoadmap.map((rm, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{rm}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
