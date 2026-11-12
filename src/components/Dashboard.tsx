import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  Activity,
  Droplets,
  Layers,
  RefreshCw,
  ShieldAlert,
  Sprout,
  Waves,
  Zap,
} from 'lucide-react';

type DashboardTab = 'overview' | 'pond' | 'robot' | 'aquafert' | 'aquapure';

// Demonstration telemetry mock trend series
const trendHistory = [
  { time: '10:00', turbidity: 85, dissolvedOxygen: 2.1, ph: 8.6, biomassKg: 12 },
  { time: '11:00', turbidity: 64, dissolvedOxygen: 3.4, ph: 8.2, biomassKg: 28 },
  { time: '12:00', turbidity: 45, dissolvedOxygen: 4.8, ph: 7.9, biomassKg: 46 },
  { time: '13:00', turbidity: 28, dissolvedOxygen: 5.6, ph: 7.6, biomassKg: 64 },
  { time: '14:00', turbidity: 18, dissolvedOxygen: 6.4, ph: 7.4, biomassKg: 82 },
  { time: '15:00', turbidity: 12, dissolvedOxygen: 7.1, ph: 7.3, biomassKg: 95 },
];

const wasteDistribution = [
  { name: 'Algae Biomass', amount: 58, fill: '#10b981' },
  { name: 'Plastic Debris', amount: 24, fill: '#ef4444' },
  { name: 'Organic Leaves', amount: 18, fill: '#f59e0b' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [highPollutionMode, setHighPollutionMode] = useState<boolean>(false);

  // Dynamic telemetry state (Clearly labelled DEMONSTRATION DATA)
  const [telemetry, setTelemetry] = useState({
    pondTemp: 24.8,
    pondPh: 7.4,
    pondTurbidity: 14,
    pondDO: 6.8,
    pondStatus: 'Recovered & Aerobic',

    robotStatus: 'Autonomous Patrolling',
    robotBattery: 86,
    robotConveyorRPM: 24,
    robotPayloadKg: 19.4,
    robotSonarDistCm: 165,
    robotMotorsCurrent: '2.4 A (Nominal)',

    algaeCollectedKg: 58.4,
    plasticCollectedKg: 24.2,
    organicLeavesKg: 18.6,
    recyclableRecoveredKg: 21.8,

    fertBiomassBatchKg: 95,
    fertStage: 'Thermophilic Phase (Day 6)',
    fertTempC: 58.4,
    fertCNRatio: '28:1',
    fertMaturity: 'Solvita Grade 7 (Finished)',
    fertToxinScreening: 'Negative (Safe for Soil)',

    pureFlowLpm: 120,
    pureStage: 'UV-C Disinfection Active',
    pureFiltrationDP: '0.4 bar',
    pureUVDosage: '42 mJ/cm²',
    pureQualityResult: 'Approved for Irrigation',
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setTelemetry((prev) => ({
        ...prev,
        pondTemp: Number((24 + Math.random() * 2).toFixed(1)),
        pondPh: Number((7.2 + Math.random() * 0.4).toFixed(1)),
        pondTurbidity: Math.round(10 + Math.random() * 8),
        pondDO: Number((6.5 + Math.random() * 0.8).toFixed(1)),
        robotBattery: Math.max(20, Math.round(prev.robotBattery - (Math.random() > 0.5 ? 1 : 0))),
        robotPayloadKg: Number((prev.robotPayloadKg + 0.3).toFixed(1)),
        algaeCollectedKg: Number((prev.algaeCollectedKg + 0.6).toFixed(1)),
      }));
      setIsRefreshing(false);
    }, 600);
  };

  const toggleSurgeMode = () => {
    setHighPollutionMode((prevMode) => {
      const nextMode = !prevMode;
      if (nextMode) {
        setTelemetry((prev) => ({
          ...prev,
          pondTurbidity: 110,
          pondDO: 2.2,
          pondPh: 8.7,
          pondStatus: 'Surge Inflow Detected',
          robotStatus: 'Maximum Sweep Speed',
          robotConveyorRPM: 35,
        }));
      } else {
        setTelemetry((prev) => ({
          ...prev,
          pondTurbidity: 14,
          pondDO: 6.8,
          pondPh: 7.4,
          pondStatus: 'Recovered & Aerobic',
          robotStatus: 'Autonomous Patrolling',
          robotConveyorRPM: 24,
        }));
      }
      return nextMode;
    });
  };

  return (
    <section
      id="dashboard"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#091a30] to-[#0a1628] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Activity className="w-3.5 h-3.5" />
            Interactive Feature 6 • Central Control System
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            AquaSense Environmental{' '}
            <span className="gradient-text">Monitoring Dashboard</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Live telemetry aggregating pond ecological variables, floating robot status, waste
            recovery fractions, and multi-stage water purification diagnostics.
          </p>
        </div>

        {/* ─── MANDATORY DEMONSTRATION DATA NOTICE CALLOUT ─── */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs text-white/80 leading-relaxed">
              <strong className="text-amber-300 font-mono uppercase">Notice: DEMONSTRATION DATA — </strong>
              All metrics, telemetry feeds, and sensor curves presented below are browser-generated educational
              demonstration data modeled after empirical water quality and robotics formulas. Never presented as real field sensors.
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleSurgeMode}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                highPollutionMode
                  ? 'bg-red-500/30 border-red-400 text-red-200'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
              }`}
            >
              {highPollutionMode ? '⚠️ Surge Mode: ON' : 'Simulate Surge Event'}
            </button>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all cursor-pointer"
              aria-label="Refresh telemetry"
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* ─── DASHBOARD NAVIGATION TABS ─── */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/10 pb-4">
          {[
            { id: 'overview', label: 'System Overview', icon: <Layers size={14} /> },
            { id: 'pond', label: 'Pond Monitoring', icon: <Waves size={14} /> },
            { id: 'robot', label: 'AquaClean Robot', icon: <Zap size={14} /> },
            { id: 'aquafert', label: 'AquaFert Composting', icon: <Sprout size={14} /> },
            { id: 'aquapure', label: 'AquaPure Treatment', icon: <Droplets size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as DashboardTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white border-cyan-400 shadow-lg'
                  : 'bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ─── TAB CONTENT PANELS ─── */}
        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Quick Status Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Pond Health */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                  <div className="flex justify-between items-center text-xs text-white/50 mb-2">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Waves size={14} /> Pond Ecology
                    </span>
                    <span className="font-mono text-[10px]">DEMO</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{telemetry.pondStatus}</div>
                  <div className="text-xs text-white/60">
                    DO: <strong className="text-emerald-400">{telemetry.pondDO} mg/L</strong> • Turbidity: {telemetry.pondTurbidity} NTU
                  </div>
                </div>

                {/* Robot Status */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                  <div className="flex justify-between items-center text-xs text-white/50 mb-2">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Zap size={14} /> Robot Navigation
                    </span>
                    <span className="font-mono text-[10px]">ESP32</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{telemetry.robotBattery}% Bat</div>
                  <div className="text-xs text-white/60">
                    {telemetry.robotStatus} • Payload: {telemetry.robotPayloadKg} kg
                  </div>
                </div>

                {/* AquaFert */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                  <div className="flex justify-between items-center text-xs text-white/50 mb-2">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Sprout size={14} /> AquaFert Composting
                    </span>
                    <span className="font-mono text-[10px]">UNIT B</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{telemetry.fertTempC}°C Hot</div>
                  <div className="text-xs text-white/60">
                    C:N {telemetry.fertCNRatio} • {telemetry.fertMaturity}
                  </div>
                </div>

                {/* AquaPure */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                  <div className="flex justify-between items-center text-xs text-white/50 mb-2">
                    <span className="flex items-center gap-1.5 text-blue-400">
                      <Droplets size={14} /> AquaPure Effluent
                    </span>
                    <span className="font-mono text-[10px]">UNIT C</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{telemetry.pureFlowLpm} L/min</div>
                  <div className="text-xs text-emerald-400 font-semibold">
                    {telemetry.pureQualityResult}
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Trend Line Chart (8 cols) */}
                <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-base font-bold text-white">Remediation Progression Curve</h4>
                      <p className="text-xs text-white/50">Simulated Turbidity drop vs. Dissolved Oxygen recovery</p>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                      Hourly Telemetry
                    </span>
                  </div>
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendHistory}>
                        <defs>
                          <linearGradient id="colorTurb" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorDO" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                        <XAxis dataKey="time" stroke="#ffffff40" fontSize={11} />
                        <YAxis stroke="#ffffff40" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                        <Area type="monotone" dataKey="turbidity" name="Turbidity (NTU)" stroke="#ef4444" fillOpacity={1} fill="url(#colorTurb)" />
                        <Area type="monotone" dataKey="dissolvedOxygen" name="Dissolved O2 (mg/L)" stroke="#10b981" fillOpacity={1} fill="url(#colorDO)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Waste Composition Breakdown (4 cols) */}
                <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">Harvested Waste Distribution</h4>
                    <p className="text-xs text-white/50 mb-4">Total harvest fractions collected</p>
                    <div className="w-full h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={wasteDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                          <XAxis dataKey="name" stroke="#ffffff40" fontSize={9} />
                          <YAxis stroke="#ffffff40" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                          <Bar dataKey="amount" name="Share (%)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/10 text-xs text-white/60 flex justify-between">
                    <span>Recyclable Plastic Diverted:</span>
                    <strong className="text-red-400 font-mono">{telemetry.plasticCollectedKg} kg</strong>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: POND MONITORING */}
          {activeTab === 'pond' && (
            <motion.div
              key="pond"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-2">Water Temperature</div>
                <div className="text-3xl font-black text-white font-mono">{telemetry.pondTemp} °C</div>
                <p className="text-xs text-white/60 mt-2">DS18B20 digital thermal probe at 0.5m depth</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-2">Water pH Level</div>
                <div className="text-3xl font-black text-white font-mono">{telemetry.pondPh}</div>
                <p className="text-xs text-emerald-400 mt-2">Optimal range (6.5 – 8.5) maintained</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-2">Pond Turbidity</div>
                <div className="text-3xl font-black text-white font-mono">{telemetry.pondTurbidity} NTU</div>
                <p className="text-xs text-white/60 mt-2">Optical nephelometric measurement</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-2">Dissolved Oxygen</div>
                <div className="text-3xl font-black text-emerald-400 font-mono">{telemetry.pondDO} mg/L</div>
                <p className="text-xs text-white/60 mt-2">Aerobic threshold exceeded (+380% vs baseline)</p>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ROBOT MONITORING */}
          {activeTab === 'robot' && (
            <motion.div
              key="robot"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/30">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-2">Navigation & Sonar</div>
                <div className="text-2xl font-bold text-white mb-2">{telemetry.robotStatus}</div>
                <div className="text-xs text-white/70 space-y-1">
                  <div>Forward Obstacle Proximity: <strong>{telemetry.robotSonarDistCm} cm</strong></div>
                  <div>Differential Steering: <strong>Active (Zero-Radius Capable)</strong></div>
                  <div>Motor Drivers Current: <strong>{telemetry.robotMotorsCurrent}</strong></div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/30">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-2">Conveyor & Basket</div>
                <div className="text-2xl font-bold text-white mb-2">{telemetry.robotConveyorRPM} RPM</div>
                <div className="text-xs text-white/70 space-y-1">
                  <div>Basket Payload: <strong>{telemetry.robotPayloadKg} / 35 kg</strong></div>
                  <div>Mesh Drain: <strong>Free flow gravitational return</strong></div>
                  <div>Hopper Fill Level: <strong>55% Capacity</strong></div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/30">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-2">Battery & Power</div>
                <div className="text-2xl font-bold text-white mb-2">{telemetry.robotBattery}% LiFePO4</div>
                <div className="text-xs text-white/70 space-y-1">
                  <div>Voltage: <strong>12.8 V</strong></div>
                  <div>Solar Aux Charging: <strong>+35W Active</strong></div>
                  <div>Estimated Runtime: <strong>5.2 hours remaining</strong></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: AQUAFERT */}
          {activeTab === 'aquafert' && (
            <motion.div
              key="aquafert"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/30">
                <div className="text-xs font-mono text-emerald-400 uppercase mb-2">Composting Phase</div>
                <div className="text-2xl font-bold text-white mb-1">{telemetry.fertStage}</div>
                <div className="text-xs text-white/70 mt-2">
                  Internal Core Temperature: <strong className="text-amber-300 font-mono text-sm">{telemetry.fertTempC} °C</strong>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/30">
                <div className="text-xs font-mono text-emerald-400 uppercase mb-2">Nutritional Balance</div>
                <div className="text-2xl font-bold text-white mb-1">C:N {telemetry.fertCNRatio}</div>
                <div className="text-xs text-white/70 mt-2">
                  Blended 30% Dewatered Algae + 70% Dry Straw
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/30">
                <div className="text-xs font-mono text-emerald-400 uppercase mb-2">Safety Verification</div>
                <div className="text-2xl font-bold text-emerald-300 mb-1">{telemetry.fertToxinScreening}</div>
                <div className="text-xs text-white/70 mt-2">
                  Microcystin Toxin Assay: <strong>&lt; 0.1 μg/L (Certified Safe)</strong>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: AQUAPURE */}
          {activeTab === 'aquapure' && (
            <motion.div
              key="aquapure"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-blue-500/30">
                <div className="text-xs font-mono text-blue-400 uppercase mb-2">Plant Throughput</div>
                <div className="text-2xl font-bold text-white mb-1">{telemetry.pureFlowLpm} L/min</div>
                <div className="text-xs text-white/70 mt-2">Continuous multi-barrier process</div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/80 border border-blue-500/30">
                <div className="text-xs font-mono text-blue-400 uppercase mb-2">UV-C Disinfection Dosage</div>
                <div className="text-2xl font-bold text-white mb-1">{telemetry.pureUVDosage}</div>
                <div className="text-xs text-emerald-300 mt-2">99.99% (4-log) pathogen inactivation</div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/80 border border-blue-500/30">
                <div className="text-xs font-mono text-blue-400 uppercase mb-2">Allocation Status</div>
                <div className="text-2xl font-bold text-emerald-400 mb-1">{telemetry.pureQualityResult}</div>
                <div className="text-xs text-white/70 mt-2">Verified against WHO & BIS irrigation standards</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
