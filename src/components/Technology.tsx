import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Layers,
  RefreshCw,
  ArrowRightLeft,
  Gauge,
  Waves,
  Cpu,
  Eye,
  Radio,
} from 'lucide-react';

interface TechCard {
  id: number;
  icon: React.ReactNode;
  emoji: string;
  title: string;
  category: string;
  explanation: string;
  specs: string[];
  color: string;
  borderColor: string;
}

const techCards: TechCard[] = [
  {
    id: 1,
    icon: <Layers className="w-7 h-7" />,
    emoji: '🔩',
    title: 'Mechanical Bar Screens',
    category: 'Hardware',
    explanation:
      'Heavy-duty parallel steel bars spaced precisely to intercept and capture floating solid waste including leaves, plastic bottles, and large debris before they enter deeper treatment stages.',
    specs: [
      'Bar spacing: 20–50 mm',
      'Stainless steel grade 316L',
      'Inclination: 60–80°',
      'Capacity: up to 500 L/s',
    ],
    color: 'from-blue-500/20 to-cyan-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 2,
    icon: <RefreshCw className="w-7 h-7" />,
    emoji: '⚙️',
    title: 'Automated Rakes',
    category: 'Hardware',
    explanation:
      'Motor-driven rake teeth travel continuously along the bar screen face, lifting captured waste out of the water channel and depositing it onto the conveyor without manual intervention.',
    specs: [
      'Variable speed motor (0.5–3 rpm)',
      'Anti-jam torque limiter',
      'Stainless steel rake teeth',
      'Auto-triggered by pressure sensor',
    ],
    color: 'from-cyan-500/20 to-teal-500/10',
    borderColor: 'border-cyan-500/30',
  },
  {
    id: 3,
    icon: <ArrowRightLeft className="w-7 h-7" />,
    emoji: '🏭',
    title: 'Conveyor Mechanisms',
    category: 'Hardware',
    explanation:
      'Rubber-belted or chain-driven conveyors transport screened waste horizontally from the rake discharge point to the collection bin, handling wet and irregular waste shapes reliably.',
    specs: [
      'Belt width: 400–600 mm',
      'Speed: 0.1–0.5 m/s',
      'Incline: up to 30°',
      'Corrosion-resistant frame',
    ],
    color: 'from-teal-500/20 to-emerald-500/10',
    borderColor: 'border-teal-500/30',
  },
  {
    id: 4,
    icon: <Gauge className="w-7 h-7" />,
    emoji: '📡',
    title: 'Ultrasonic Sensors',
    category: 'Sensors',
    explanation:
      'Non-contact ultrasonic transducers emit high-frequency sound pulses that reflect off the water surface, calculating precise water depth and flow velocity without touching the medium.',
    specs: [
      'Frequency: 40–200 kHz',
      'Range: 0.3–10 m',
      'Accuracy: ±1 mm',
      'IP67 waterproof rating',
    ],
    color: 'from-emerald-500/20 to-green-500/10',
    borderColor: 'border-emerald-500/30',
  },
  {
    id: 5,
    icon: <Waves className="w-7 h-7" />,
    emoji: '🌊',
    title: 'Water-Level Sensors',
    category: 'Sensors',
    explanation:
      'Submersible pressure transducers and float-type sensors continuously monitor water depth upstream and downstream of the bar screen, triggering rake activation when levels diverge.',
    specs: [
      'Range: 0–5 m water column',
      'Output: 4–20 mA / 0–5 V',
      'Response time: < 50 ms',
      'Operating temp: -10°C to 70°C',
    ],
    color: 'from-green-500/20 to-lime-500/10',
    borderColor: 'border-green-500/30',
  },
  {
    id: 6,
    icon: <Cpu className="w-7 h-7" />,
    emoji: '🖥️',
    title: 'Arduino / ESP32',
    category: 'Control',
    explanation:
      'Low-power microcontrollers aggregate sensor data, execute real-time control logic, drive motor relays, and transmit operational data to the cloud dashboard over Wi-Fi or LoRa.',
    specs: [
      'Dual-core 240 MHz (ESP32)',
      'Wi-Fi 802.11 b/g/n + BLE',
      '34 GPIO / multiple ADC channels',
      'MQTT / HTTP / WebSocket',
    ],
    color: 'from-lime-500/20 to-yellow-500/10',
    borderColor: 'border-lime-500/30',
  },
  {
    id: 7,
    icon: <Eye className="w-7 h-7" />,
    emoji: '🤖',
    title: 'AI Computer Vision',
    category: 'AI · Optional',
    explanation:
      'An optional camera module runs a lightweight CNN model on the edge to classify waste types (plastic, organic, textile) in real time, enabling category-specific recycling and reporting.',
    specs: [
      'Model: MobileNet / YOLOv8-nano',
      'Inference: < 100 ms on-device',
      'Classes: plastic, organic, fabric',
      'Raspberry Pi 4 / Jetson Nano',
    ],
    color: 'from-purple-500/20 to-pink-500/10',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 8,
    icon: <Radio className="w-7 h-7" />,
    emoji: '📶',
    title: 'IoT Monitoring',
    category: 'Connectivity',
    explanation:
      'An MQTT-based IoT layer relays all sensor readings, motor states, and alerts to a secure cloud dashboard, enabling operators to monitor and control the entire plant remotely 24/7.',
    specs: [
      'Protocol: MQTT over TLS',
      'Dashboard: React + Recharts',
      'Alert channels: Email, SMS, Push',
      'Data retention: 12 months',
    ],
    color: 'from-pink-500/20 to-rose-500/10',
    borderColor: 'border-rose-500/30',
  },
];

const FlipCard: React.FC<{ card: TechCard; delay: number; inView: boolean }> = ({
  card,
  delay,
  inView,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="h-56 cursor-pointer perspective-1000"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl border ${card.borderColor} bg-gradient-to-br ${card.color} backdrop-blur-sm p-5 flex flex-col gap-3`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400">
              {card.icon}
            </div>
            <span className="text-2xl">{card.emoji}</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-cyan-400/80 tracking-wider uppercase">
              {card.category}
            </span>
            <h3 className="text-white font-bold text-base mt-0.5 leading-tight">{card.title}</h3>
          </div>
          <p className="text-white/50 text-xs line-clamp-3 leading-relaxed">{card.explanation}</p>
          <div className="mt-auto text-xs text-cyan-400/60 flex items-center gap-1">
            <span>Hover to see specs</span>
            <span className="text-lg">↗</span>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl border ${card.borderColor} bg-gradient-to-br from-[#0d2244] to-[#0a1628] p-5 flex flex-col gap-3`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center text-cyan-400 scale-90">
              {card.icon}
            </div>
            <h3 className="text-white font-bold text-sm leading-tight">{card.title}</h3>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {card.specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span className="text-white/70 text-xs">{spec}</span>
              </div>
            ))}
          </div>
          <div
            className={`mt-auto text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r ${card.color.replace('/20', '').replace('/10', '')}`}
          >
            Technical Specifications
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Technology: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-[#0a1628] to-[#0d2244] overflow-hidden"
    >
      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
            Under the Hood
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technology{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Eight carefully selected technologies work in concert to automate, monitor and optimise
            the entire water-screening process. Hover a card to reveal specs.
          </p>
        </motion.div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {['Hardware', 'Sensors', 'Control', 'AI · Optional', 'Connectivity'].map(cat => (
            <span
              key={cat}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-white/50 border border-white/10"
            >
              {cat}
            </span>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techCards.map((card, idx) => (
            <FlipCard key={card.id} card={card} delay={0.1 + idx * 0.07} inView={isInView} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center text-white/30 text-sm mt-10"
        >
          Click any card on mobile · Hover on desktop to flip and see technical specifications
        </motion.p>
      </div>
    </section>
  );
};

export default Technology;
