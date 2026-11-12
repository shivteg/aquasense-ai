import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Activity, Droplets, Trash2, AlertTriangle, CheckCircle,
  XCircle, Cpu, Radio, RefreshCw, ToggleLeft, ToggleRight,
  Bell, ChevronRight
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Metrics {
  systemOnline: boolean;
  flowRate: number;        // L/min
  waterLevel: number;      // %
  wasteCollected: number;  // kg
  blockageStatus: 'OK' | 'Warning' | 'Critical';
  binCapacity: number;     // %
  motorStatus: 'Running' | 'Idle' | 'Error';
  sensorsActive: number;
  sensorsTotal: number;
}

interface HistoryPoint {
  time: string;
  waste: number;
}

interface WasteBreakdown {
  type: string;
  amount: number;
}

interface Alert {
  id: number;
  level: 'info' | 'warn' | 'error';
  message: string;
  ts: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const rand = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

const timeLabel = () => {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
};

const generateMetrics = (highWaste: boolean): Metrics => ({
  systemOnline: !highWaste || Math.random() > 0.2,
  flowRate: highWaste ? rand(55, 90) : rand(20, 50),
  waterLevel: highWaste ? rand(70, 95) : rand(30, 65),
  wasteCollected: highWaste ? rand(80, 150) : rand(10, 60),
  blockageStatus: highWaste
    ? (Math.random() > 0.5 ? 'Critical' : 'Warning')
    : (Math.random() > 0.85 ? 'Warning' : 'OK'),
  binCapacity: highWaste ? rand(70, 98) : rand(20, 60),
  motorStatus: highWaste
    ? (Math.random() > 0.7 ? 'Error' : 'Running')
    : (Math.random() > 0.9 ? 'Idle' : 'Running'),
  sensorsActive: highWaste ? rand(4, 6) : rand(5, 8),
  sensorsTotal: 8,
});

const generateHistory = (): HistoryPoint[] =>
  Array.from({ length: 10 }, (_, i) => ({
    time: `T-${9 - i}`,
    waste: rand(5, 40),
  }));

const generateBreakdown = (): WasteBreakdown[] => [
  { type: 'Leaves', amount: rand(10, 50) },
  { type: 'Plastic', amount: rand(5, 35) },
  { type: 'Other', amount: rand(2, 20) },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  color: string;
  label: string;
  unit?: string;
}

function CircularProgress({ value, max = 100, size = 80, color, label, unit = '' }: CircularProgressProps) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const dash = pct * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#1e3a5f" strokeWidth={8} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>
      <span className="text-xs text-slate-400">{label}</span>
      <span className="text-sm font-bold text-white">{value}{unit}</span>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accent?: string;
  warn?: boolean;
}

function MetricCard({ icon, title, children, accent = '#06b6d4', warn = false }: MetricCardProps) {
  return (
    <motion.div
      layout
      animate={{ borderColor: warn ? '#ef4444' : accent + '33' }}
      transition={{ duration: 0.4 }}
      className="relative rounded-xl p-4 flex flex-col gap-2 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d1f3c 0%, #0a1628 100%)',
        border: `1px solid ${warn ? '#ef444455' : accent + '33'}`,
        boxShadow: `0 4px 24px ${warn ? '#ef444415' : accent + '10'}`,
      }}
    >
      {warn && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{ opacity: [0, 0.06, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          style={{ background: '#ef4444' }}
        />
      )}
      <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest">
        <span style={{ color: warn ? '#ef4444' : accent }}>{icon}</span>
        {title}
      </div>
      {children}
    </motion.div>
  );
}

interface StatusPillProps {
  status: 'OK' | 'Warning' | 'Critical' | 'Running' | 'Idle' | 'Error';
}

function StatusPill({ status }: StatusPillProps) {
  const map: Record<string, { color: string; bg: string }> = {
    OK:       { color: '#22c55e', bg: '#22c55e22' },
    Running:  { color: '#22c55e', bg: '#22c55e22' },
    Warning:  { color: '#f59e0b', bg: '#f59e0b22' },
    Idle:     { color: '#94a3b8', bg: '#94a3b822' },
    Critical: { color: '#ef4444', bg: '#ef444422' },
    Error:    { color: '#ef4444', bg: '#ef444422' },
  };
  const s = map[status] ?? { color: '#94a3b8', bg: '#94a3b822' };
  return (
    <motion.span
      key={status}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold"
      style={{ color: s.color, background: s.bg }}
    >
      <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
      {status}
    </motion.span>
  );
}

interface AnimatedCounterProps {
  value: number;
  unit?: string;
  className?: string;
}

function AnimatedCounter({ value, unit = '', className = '' }: AnimatedCounterProps) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`font-bold text-white ${className}`}
    >
      {value}<span className="text-slate-400 text-sm ml-1">{unit}</span>
    </motion.span>
  );
}

// ─── Alert Item ───────────────────────────────────────────────────────────────

function AlertItem({ alert }: { alert: Alert }) {
  const colors = {
    info:  { bg: '#06b6d422', border: '#06b6d4', icon: <Bell size={14} /> },
    warn:  { bg: '#f59e0b22', border: '#f59e0b', icon: <AlertTriangle size={14} /> },
    error: { bg: '#ef444422', border: '#ef4444', icon: <XCircle size={14} /> },
  };
  const c = colors[alert.level];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-2 p-2.5 rounded-lg text-xs"
      style={{ background: c.bg, borderLeft: `3px solid ${c.border}` }}
    >
      <span style={{ color: c.border }} className="mt-0.5 shrink-0">{c.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-slate-200">{alert.message}</p>
        <p className="text-slate-500 mt-0.5">{alert.ts}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [highWaste, setHighWaste] = useState(false);
  const [metrics, setMetrics] = useState<Metrics>(() => generateMetrics(false));
  const [history, setHistory] = useState<HistoryPoint[]>(generateHistory);
  const [breakdown, setBreakdown] = useState<WasteBreakdown[]>(generateBreakdown);
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, level: 'info', message: 'System initialised. All sensors active.', ts: timeLabel() },
    { id: 2, level: 'info', message: 'Waste collection cycle started.', ts: timeLabel() },
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [alertId, setAlertId] = useState(3);

  const refresh = useCallback(() => {
    setRefreshing(true);
    const m = generateMetrics(highWaste);
    setMetrics(m);
    setHistory(generateHistory());
    setBreakdown(generateBreakdown());

    const newAlerts: Alert[] = [];
    if (m.blockageStatus !== 'OK') {
      newAlerts.push({
        id: alertId,
        level: m.blockageStatus === 'Critical' ? 'error' : 'warn',
        message: `Screen blockage ${m.blockageStatus.toLowerCase()} detected.`,
        ts: timeLabel(),
      });
    }
    if (m.binCapacity > 85) {
      newAlerts.push({
        id: alertId + 1,
        level: 'warn',
        message: `Collection bin at ${m.binCapacity}% — emptying recommended.`,
        ts: timeLabel(),
      });
    }
    if (m.motorStatus === 'Error') {
      newAlerts.push({ id: alertId + 2, level: 'error', message: 'Motor fault detected. Check drive unit.', ts: timeLabel() });
    }
    if (newAlerts.length === 0) {
      newAlerts.push({ id: alertId + 3, level: 'info', message: 'New readings generated. All nominal.', ts: timeLabel() });
    }

    setAlertId(id => id + 4);
    setAlerts(prev => [...newAlerts, ...prev].slice(0, 20));
    setTimeout(() => setRefreshing(false), 600);
  }, [highWaste, alertId]);

  // Auto-refresh once when highWaste changes
  useEffect(() => {
    setMetrics(generateMetrics(highWaste));
    if (highWaste) {
      setAlerts(prev => [
        { id: Date.now(), level: 'error' as const, message: '⚠️ HIGH WASTE MODE activated — monitoring intensified.', ts: timeLabel() },
        ...prev,
      ].slice(0, 20));
    }
  }, [highWaste]);

  const blockageWarn = metrics.blockageStatus !== 'OK';
  const isHigh = highWaste;

  return (
    <section id="dashboard" className="py-24 relative" style={{ background: '#060f1f' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: '#06b6d422', color: '#06b6d4' }}>
            Live Monitoring
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Interactive Monitoring <span style={{ color: '#06b6d4' }}>Dashboard</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Visualise real-time operational data from the AquaClean AI system.
          </p>
          {/* Disclaimer */}
          <div className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10">
            <AlertTriangle size={14} className="text-yellow-400" />
            <span className="text-yellow-300 text-xs font-semibold tracking-wide">
              SIMULATED READINGS — DEMONSTRATION ONLY
            </span>
          </div>
        </motion.div>

        {/* Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm">Normal Mode</span>
            <button
              onClick={() => setHighWaste(v => !v)}
              className="relative focus:outline-none"
              aria-label="Toggle High Waste Mode"
            >
              <motion.div
                className="w-14 h-7 rounded-full flex items-center px-1 transition-colors duration-300"
                animate={{ background: isHigh ? '#ef444466' : '#06b6d466' }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-white shadow"
                  animate={{ x: isHigh ? 28 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </motion.div>
            </button>
            <span className={`text-sm font-semibold ${isHigh ? 'text-red-400' : 'text-slate-400'}`}>
              High Waste Mode {isHigh ? <span>{<ToggleRight size={16} className="inline" />}</span> : <span>{<ToggleLeft size={16} className="inline" />}</span>}
            </span>
          </div>

          {/* Refresh Button */}
          <motion.button
            onClick={refresh}
            whileTap={{ scale: 0.95 }}
            disabled={refreshing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}
          >
            <motion.span animate={{ rotate: refreshing ? 360 : 0 }} transition={{ duration: 0.6 }}>
              <RefreshCw size={16} />
            </motion.span>
            Generate New Readings
          </motion.button>
        </div>

        {/* High Waste Alert Banner */}
        <AnimatePresence>
          {isHigh && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl border border-red-500/40 bg-red-500/10">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <AlertTriangle className="text-red-400" size={22} />
                </motion.span>
                <p className="text-red-300 font-semibold">
                  ⚠️ Screen blockage detected — attention required
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* 1. System Status */}
          <MetricCard icon={<Activity size={16} />} title="System Status" warn={!metrics.systemOnline}>
            <div className="flex items-center gap-2 mt-1">
              <motion.span
                className="w-3 h-3 rounded-full"
                animate={{
                  background: metrics.systemOnline ? '#22c55e' : '#f59e0b',
                  boxShadow: metrics.systemOnline
                    ? '0 0 8px #22c55e'
                    : '0 0 8px #f59e0b',
                }}
                transition={{ duration: 0.4 }}
              />
              <AnimatedCounter
                value={0}
                className="text-lg"
              />
              <motion.span
                key={String(metrics.systemOnline)}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-lg font-bold ${metrics.systemOnline ? 'text-green-400' : 'text-yellow-400'}`}
              >
                {metrics.systemOnline ? 'Online' : 'Warning'}
              </motion.span>
            </div>
          </MetricCard>

          {/* 2. Water Flow Rate */}
          <MetricCard icon={<Droplets size={16} />} title="Water Flow Rate" accent="#06b6d4">
            <div className="flex justify-center mt-1">
              <CircularProgress value={metrics.flowRate} max={100} size={80} color="#06b6d4" label="Flow Rate" unit=" L/min" />
            </div>
          </MetricCard>

          {/* 3. Water Level */}
          <MetricCard icon={<Droplets size={16} />} title="Water Level" accent="#22d3ee">
            <div className="mt-2">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Level</span>
                <AnimatedCounter value={metrics.waterLevel} unit="%" className="text-sm" />
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: '#1e3a5f' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #06b6d4, #22d3ee)' }}
                  animate={{ width: `${metrics.waterLevel}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          </MetricCard>

          {/* 4. Waste Collected */}
          <MetricCard icon={<Trash2 size={16} />} title="Waste Collected" accent="#22c55e">
            <div className="mt-1">
              <AnimatedCounter value={metrics.wasteCollected} unit="kg" className="text-3xl" />
              <p className="text-xs text-slate-500 mt-1">This cycle</p>
            </div>
          </MetricCard>

          {/* 5. Screen Blockage */}
          <MetricCard icon={<AlertTriangle size={16} />} title="Screen Blockage" warn={blockageWarn} accent="#f59e0b">
            <div className="mt-1">
              <StatusPill status={metrics.blockageStatus} />
            </div>
          </MetricCard>

          {/* 6. Collection Bin Capacity */}
          <MetricCard icon={<Trash2 size={16} />} title="Bin Capacity" accent={metrics.binCapacity > 80 ? '#ef4444' : '#06b6d4'}>
            <div className="flex justify-center mt-1">
              <CircularProgress
                value={metrics.binCapacity}
                max={100}
                size={80}
                color={metrics.binCapacity > 80 ? '#ef4444' : '#06b6d4'}
                label="Capacity"
                unit="%"
              />
            </div>
          </MetricCard>

          {/* 7. Motor Status */}
          <MetricCard icon={<Cpu size={16} />} title="Motor Status" warn={metrics.motorStatus === 'Error'} accent="#a78bfa">
            <div className="mt-1">
              <StatusPill status={metrics.motorStatus} />
            </div>
          </MetricCard>

          {/* 8. Sensor Status */}
          <MetricCard icon={<Radio size={16} />} title="Sensor Status" accent="#06b6d4">
            <div className="mt-1 flex items-end gap-1">
              <AnimatedCounter value={metrics.sensorsActive} className="text-3xl" />
              <span className="text-slate-400 text-lg mb-0.5">/ {metrics.sensorsTotal}</span>
            </div>
            <p className="text-xs text-slate-500">sensors active</p>
          </MetricCard>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Line Chart: Waste Collection History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-5"
            style={{
              background: 'linear-gradient(135deg, #0d1f3c 0%, #0a1628 100%)',
              border: '1px solid #06b6d433',
            }}
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Activity size={16} style={{ color: '#06b6d4' }} />
              Waste Collection History
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#0d1f3c', border: '1px solid #06b6d433', borderRadius: 8, color: '#fff' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Line
                  type="monotone"
                  dataKey="waste"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  dot={{ fill: '#06b6d4', r: 4 }}
                  activeDot={{ r: 6, fill: '#22d3ee' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart: Waste Type Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-5"
            style={{
              background: 'linear-gradient(135deg, #0d1f3c 0%, #0a1628 100%)',
              border: '1px solid #06b6d433',
            }}
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Trash2 size={16} style={{ color: '#06b6d4' }} />
              Waste Type Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={breakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis dataKey="type" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#0d1f3c', border: '1px solid #06b6d433', borderRadius: 8, color: '#fff' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                  {breakdown.map((_, i) => (
                    <rect
                      key={i}
                      fill={['#06b6d4', '#22c55e', '#a78bfa'][i % 3]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* System Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-5"
          style={{
            background: 'linear-gradient(135deg, #0d1f3c 0%, #0a1628 100%)',
            border: '1px solid #06b6d433',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Bell size={16} style={{ color: '#06b6d4' }} />
              System Alerts
            </h3>
            <span className="text-xs text-slate-500">{alerts.length} entries</span>
          </div>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 custom-scroll">
            <AnimatePresence initial={false}>
              {alerts.map(a => (
                <AlertItem key={a.id} alert={a} />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
