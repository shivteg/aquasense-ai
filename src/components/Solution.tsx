import { motion, useInView } from 'framer-motion';
import { Brain, Camera, Gauge, Grid3X3, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import Modal from './Modal';

interface TechCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
  modalTitle: string;
  modalContent: React.ReactNode;
  accentColor: string;
  glowColor: string;
}

const techCards: TechCard[] = [
  {
    id: 'screening',
    icon: <Grid3X3 size={36} />,
    title: 'Automated Screening',
    tagline: 'Precision bar-screen filtration',
    description:
      'Motorised bar screens intercept floating waste at the inlet channel, automatically adjusting rake frequency based on debris load detected by upstream sensors.',
    modalTitle: 'Automated Screening — Deep Dive',
    accentColor: 'from-cyan-500 to-cyan-700',
    glowColor: 'shadow-cyan-500/20',
    modalContent: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Our automated bar screen system uses stainless-steel raking mechanisms driven by
          variable-speed motors. Unlike fixed-interval mechanical cleaners, the AquaClean
          system ties rake activation directly to real-time differential pressure readings
          across the screen, ensuring energy is used only when cleaning is actually needed.
        </p>
        <h4 className="text-base font-semibold text-cyan-400">Key Features</h4>
        <ul className="list-disc space-y-1 pl-5 text-white/70">
          <li>Stainless-steel 304-grade bar screen, 10 mm to 100 mm aperture options</li>
          <li>Variable-speed motorised rakes with torque overload protection</li>
          <li>Differential pressure sensors trigger cleaning at configurable thresholds</li>
          <li>Self-cleaning brush system for fine-screen variants</li>
          <li>ATEX-rated enclosures suitable for enclosed wet-well environments</li>
        </ul>
        <h4 className="text-base font-semibold text-cyan-400">Performance</h4>
        <p className="text-white/70">
          Up to 95 % solid waste capture efficiency at peak flow. Screen blockage events
          reduced by 87 % compared to manual raking operations.
        </p>
      </div>
    ),
  },
  {
    id: 'mechanical',
    icon: (
      <svg viewBox="0 0 36 36" width={36} height={36} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="22" width="28" height="6" rx="2" />
        <rect x="4" y="8" width="28" height="6" rx="2" />
        <line x1="10" y1="14" x2="10" y2="22" />
        <line x1="18" y1="14" x2="18" y2="22" />
        <line x1="26" y1="14" x2="26" y2="22" />
        <circle cx="10" cy="8" r="2" fill="currentColor" stroke="none" />
        <circle cx="26" cy="22" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: 'Mechanical Waste Collection',
    tagline: 'Conveyor-driven removal',
    description:
      'An integrated conveyor-rake assembly continuously lifts screened debris out of the channel and deposits it into sealed collection hoppers for safe disposal.',
    modalTitle: 'Mechanical Waste Collection — Deep Dive',
    accentColor: 'from-blue-500 to-blue-700',
    glowColor: 'shadow-blue-500/20',
    modalContent: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          The mechanical collection subsystem bridges the gap between debris capture and
          disposal. A continuous-loop conveyor belt, lined with perforated stainless-steel
          panels, carries raked waste from the bottom of the inlet up a 30–60° incline and
          discharges it into a closed collection hopper.
        </p>
        <h4 className="text-base font-semibold text-cyan-400">System Components</h4>
        <ul className="list-disc space-y-1 pl-5 text-white/70">
          <li>Inclined perforated conveyor belt — allows drainage water to return</li>
          <li>Scraper bars to prevent debris sticking to belt surface</li>
          <li>Sealed collection hopper with volume sensor and auto-compaction</li>
          <li>Overflow alarm when hopper exceeds 80 % capacity</li>
          <li>Corrosion-resistant drive chain rated for continuous outdoor use</li>
        </ul>
        <h4 className="text-base font-semibold text-cyan-400">Throughput</h4>
        <p className="text-white/70">
          Handles up to 2 tonnes of mixed solid waste per hour. Hopper capacity: 500 litres.
          Average emptying interval: 8–12 hours under normal load.
        </p>
      </div>
    ),
  },
  {
    id: 'sensors',
    icon: <Gauge size={36} />,
    title: 'Smart Sensor Monitoring',
    tagline: 'Real-time environmental intelligence',
    description:
      'A network of ultrasonic, pressure and turbidity sensors continuously monitors channel conditions and feeds live data to the control dashboard and AI engine.',
    modalTitle: 'Smart Sensor Monitoring — Deep Dive',
    accentColor: 'from-emerald-500 to-emerald-700',
    glowColor: 'shadow-emerald-500/20',
    modalContent: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Accurate, real-time environmental data is the backbone of AquaClean AI's
          intelligent operation. We deploy a layered sensor network at each intake point,
          covering debris levels, water quality and system health.
        </p>
        <h4 className="text-base font-semibold text-cyan-400">Sensor Suite</h4>
        <ul className="list-disc space-y-1 pl-5 text-white/70">
          <li>Ultrasonic level sensors — debris depth upstream and downstream of screen</li>
          <li>Differential pressure transducers — real-time head loss across screen</li>
          <li>Turbidity sensors (NTU) — water clarity at intake and after screening</li>
          <li>Flow-velocity meters — continuous volumetric flow measurement</li>
          <li>Temperature probes — monitoring seasonal variation impact</li>
          <li>Equipment vibration sensors — predictive maintenance alerting</li>
        </ul>
        <h4 className="text-base font-semibold text-cyan-400">Connectivity</h4>
        <p className="text-white/70">
          All sensors publish to an MQTT broker over RS-485 / 4G-LTE. Data is ingested at
          1 Hz, stored in a time-series database and surfaced on the live dashboard with
          configurable alert thresholds.
        </p>
      </div>
    ),
  },
  {
    id: 'ai',
    icon: <Brain size={36} />,
    title: 'AI-Assisted Waste Detection',
    tagline: 'Computer vision at the intake',
    description:
      'Overhead cameras feed live footage into an AI vision model that classifies waste types, estimates debris load and triggers targeted rake actions before blockages occur.',
    modalTitle: 'AI-Assisted Waste Detection — Deep Dive',
    accentColor: 'from-purple-500 to-purple-700',
    glowColor: 'shadow-purple-500/20',
    modalContent: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          At the core of AquaClean AI is a computer-vision pipeline that turns standard
          camera feeds into actionable waste intelligence. The model identifies, classifies
          and quantifies waste in real time, without requiring specialist hardware.
        </p>
        <h4 className="text-base font-semibold text-cyan-400">Vision Pipeline</h4>
        <ul className="list-disc space-y-1 pl-5 text-white/70">
          <li>IP66-rated industrial cameras (2 MP, 25 fps) positioned above intake</li>
          <li>YOLOv8-based detection model, fine-tuned on 50 k+ waste images</li>
          <li>Classes: plastic bottles, polythene bags, leaves, foam, mixed debris</li>
          <li>Coverage estimation: debris density heat-map updated every 2 seconds</li>
          <li>Edge inference on NVIDIA Jetson Orin — no cloud dependency</li>
        </ul>
        <h4 className="text-base font-semibold text-cyan-400">AI Actions</h4>
        <ul className="list-disc space-y-1 pl-5 text-white/70">
          <li>Pre-emptive rake trigger when debris density exceeds threshold</li>
          <li>Waste-type logging for plant reporting and regulatory compliance</li>
          <li>Anomaly detection — flags unusual objects (large branches, industrial waste)</li>
          <li>Performance analytics — daily, weekly and monthly capture reports</li>
        </ul>
        <h4 className="text-base font-semibold text-cyan-400">Accuracy</h4>
        <p className="text-white/70">
          92 % mAP@0.5 on the validation set. False-positive rate under 3 % in operational
          trials across five pilot sites.
        </p>
      </div>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

export default function Solution() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const activeCard = techCards.find((c) => c.id === openModal);

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#0d2244] via-[#0a1628] to-[#0d2244] py-24 text-white"
    >
      {/* Decorative glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 translate-x-1/2 translate-y-1/2 rounded-full bg-blue-700/10 blur-3xl"
      />

      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
            <Sparkles size={14} />
            Our Solution
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 text-4xl font-bold leading-tight lg:text-5xl"
        >
          Introducing{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            AquaClean AI
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 max-w-3xl text-lg text-white/70"
        >
          AquaClean AI combines precision mechanical engineering with real-time sensor data
          and computer-vision intelligence to create a fully autonomous waste removal system
          for water treatment intake channels. The result: continuous protection with zero
          manual intervention, reduced operational costs and dramatically improved water
          quality at the first stage of treatment.
        </motion.p>

        {/* Technology cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {techCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-shadow hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)]"
            >
              {/* Top gradient bar */}
              <div
                className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${card.accentColor}`}
              />

              {/* Icon */}
              <div
                className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${card.accentColor} bg-opacity-20 p-3 text-white shadow-lg ${card.glowColor}`}
              >
                {card.icon}
              </div>

              {/* Content */}
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/40">
                {card.tagline}
              </p>
              <h3 className="mb-3 text-lg font-bold text-white">{card.title}</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-white/60">
                {card.description}
              </p>

              {/* Learn More button */}
              <button
                onClick={() => setOpenModal(card.id)}
                className={`flex items-center gap-2 self-start rounded-lg border border-white/10 bg-gradient-to-r ${card.accentColor} px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400`}
              >
                <Camera size={14} />
                Learn More
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm md:grid-cols-4"
        >
          {[
            { value: '95%', label: 'Waste capture efficiency' },
            { value: '24/7', label: 'Autonomous operation' },
            { value: '87%', label: 'Reduction in blockages' },
            { value: '92%', label: 'AI detection accuracy' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-cyan-400">{stat.value}</p>
              <p className="mt-1 text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={openModal !== null}
        onClose={() => setOpenModal(null)}
        title={activeCard?.modalTitle ?? ''}
      >
        {activeCard?.modalContent}
      </Modal>
    </section>
  );
}
