import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Zap,
  Waves,
  Trash2,
  Leaf,
  Sprout,
  Battery,
  Radio,
  Compass,
} from 'lucide-react';

type DebrisType = 'algae' | 'plastic' | 'leaf';

interface DebrisItem {
  id: number;
  type: DebrisType;
  x: number;
  y: number;
  radius: number;
  rotation: number;
  rotationSpeed: number;
  collected: boolean;
  color: string;
}

interface ObstacleItem {
  id: number;
  x: number;
  y: number;
  radius: number;
}

export default function Simulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation State
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [speedMult, setSpeedMult] = useState<number>(1);
  const [autoPatrol, setAutoPatrol] = useState<boolean>(true);

  // Real-time Telemetry Counters
  const [counters, setCounters] = useState({
    algaeKg: 24.5,
    plasticItems: 42,
    leavesKg: 18.2,
    areaCleanedM2: 650,
    batteryPct: 88,
    sonarDistCm: 145,
  });

  // Robot State in Pond
  const robotRef = useRef({
    x: 400,
    y: 250,
    angle: 0, // Radians
    speed: 1.8,
    angularVelocity: 0,
    width: 65,
    height: 45,
    conveyorAnimOffset: 0,
  });

  // Items State Refs
  const debrisRef = useRef<DebrisItem[]>([]);
  const obstaclesRef = useRef<ObstacleItem[]>([
    { id: 1, x: 200, y: 150, radius: 24 },
    { id: 2, x: 620, y: 340, radius: 28 },
    { id: 3, x: 320, y: 380, radius: 20 },
  ]);

  const animFrameRef = useRef<number | null>(null);
  const debrisIdCounter = useRef<number>(100);

  // Initialize Debris in Pond
  const initDebris = useCallback(() => {
    const items: DebrisItem[] = [];
    const types: DebrisType[] = ['algae', 'plastic', 'leaf'];
    for (let i = 0; i < 35; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      items.push({
        id: ++debrisIdCounter.current,
        type,
        x: 60 + Math.random() * 680,
        y: 60 + Math.random() * 380,
        radius: type === 'algae' ? 14 + Math.random() * 8 : type === 'plastic' ? 9 : 8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        collected: false,
        color: type === 'algae' ? '#22c55e' : type === 'plastic' ? '#ef4444' : '#eab308',
      });
    }
    debrisRef.current = items;
  }, []);

  useEffect(() => {
    initDebris();
  }, [initDebris]);

  // Spawn Individual Item
  const spawnDebris = (type: DebrisType) => {
    debrisRef.current.push({
      id: ++debrisIdCounter.current,
      type,
      x: 80 + Math.random() * 640,
      y: 80 + Math.random() * 340,
      radius: type === 'algae' ? 16 : type === 'plastic' ? 10 : 8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      collected: false,
      color: type === 'algae' ? '#22c55e' : type === 'plastic' ? '#ef4444' : '#eab308',
    });
  };

  const spawnObstacle = () => {
    obstaclesRef.current.push({
      id: Date.now(),
      x: 100 + Math.random() * 600,
      y: 100 + Math.random() * 300,
      radius: 20 + Math.random() * 12,
    });
  };

  const handleReset = () => {
    robotRef.current = {
      x: 400,
      y: 250,
      angle: 0,
      speed: 1.8,
      angularVelocity: 0,
      width: 65,
      height: 45,
      conveyorAnimOffset: 0,
    };
    initDebris();
    setCounters({
      algaeKg: 0,
      plasticItems: 0,
      leavesKg: 0,
      areaCleanedM2: 0,
      batteryPct: 100,
      sonarDistCm: 180,
    });
  };

  // Main Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const robot = robotRef.current;
      const W = canvas.width;
      const H = canvas.height;

      if (isRunning) {
        // Conveyor animation
        robot.conveyorAnimOffset += dt * 30 * speedMult;

        // Autonomous Patrolling / Target Seeking
        if (autoPatrol) {
          // Find closest uncollected debris
          let closestDist = Infinity;
          let targetAngle = robot.angle;

          for (const item of debrisRef.current) {
            if (item.collected) continue;
            const dx = item.x - robot.x;
            const dy = item.y - robot.y;
            const dist = Math.hypot(dx, dy);
            if (dist < closestDist) {
              closestDist = dist;
              targetAngle = Math.atan2(dy, dx);
            }
          }

          // Obstacle avoidance override
          let obstacleAvoidanceAngle = 0;
          let avoidWeight = 0;
          let minObsDist = 250;

          // Check rocks
          for (const obs of obstaclesRef.current) {
            const dx = obs.x - robot.x;
            const dy = obs.y - robot.y;
            const dist = Math.hypot(dx, dy) - obs.radius;
            if (dist < minObsDist) {
              minObsDist = dist;
              const angleToObs = Math.atan2(dy, dx);
              // Steer away
              obstacleAvoidanceAngle = angleToObs + Math.PI;
              avoidWeight = (1 - dist / 250) * 1.5;
            }
          }

          // Check Pond shoreline walls (bounds)
          const wallMargin = 70;
          if (robot.x < wallMargin) {
            obstacleAvoidanceAngle = 0;
            avoidWeight = 2;
          } else if (robot.x > W - wallMargin) {
            obstacleAvoidanceAngle = Math.PI;
            avoidWeight = 2;
          } else if (robot.y < wallMargin) {
            obstacleAvoidanceAngle = Math.PI / 2;
            avoidWeight = 2;
          } else if (robot.y > H - wallMargin) {
            obstacleAvoidanceAngle = -Math.PI / 2;
            avoidWeight = 2;
          }

          setCounters((prev) => ({
            ...prev,
            sonarDistCm: Math.max(15, Math.round(minObsDist)),
          }));

          // Smooth steering interpolation
          let desiredAngle = targetAngle;
          if (avoidWeight > 0.5) {
            desiredAngle = obstacleAvoidanceAngle;
          }

          // Normalize angle difference
          let diff = desiredAngle - robot.angle;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;

          robot.angle += diff * Math.min(dt * 3.5 * speedMult, 1);

          // Forward thrust
          const moveSpeed = robot.speed * 60 * speedMult * dt;
          robot.x += Math.cos(robot.angle) * moveSpeed;
          robot.y += Math.sin(robot.angle) * moveSpeed;

          // Clamping inside bounds
          robot.x = Math.max(35, Math.min(W - 35, robot.x));
          robot.y = Math.max(35, Math.min(H - 35, robot.y));

          // Increment area cleaned & slow battery drain
          setCounters((prev) => ({
            ...prev,
            areaCleanedM2: Math.round(prev.areaCleanedM2 + dt * 1.2 * speedMult),
            batteryPct: Math.max(12, Number((prev.batteryPct - dt * 0.015 * speedMult).toFixed(1))),
          }));
        }

        // Debris Collision & Collection Detection
        for (const item of debrisRef.current) {
          if (item.collected) continue;
          item.rotation += item.rotationSpeed;

          const dx = item.x - robot.x;
          const dy = item.y - robot.y;
          const dist = Math.hypot(dx, dy);

          // Robot front scoop collection radius (~36 px)
          if (dist < item.radius + 30) {
            item.collected = true;

            // Increment telemetry
            setCounters((prev) => {
              if (item.type === 'algae') {
                return { ...prev, algaeKg: Number((prev.algaeKg + 1.2).toFixed(1)) };
              } else if (item.type === 'plastic') {
                return { ...prev, plasticItems: prev.plasticItems + 1 };
              } else {
                return { ...prev, leavesKg: Number((prev.leavesKg + 0.8).toFixed(1)) };
              }
            });
          }
        }
      }

      // ─── RENDERING ───
      ctx.clearRect(0, 0, W, H);

      // 1. Draw Pond Water Background
      const waterGrad = ctx.createLinearGradient(0, 0, 0, H);
      waterGrad.addColorStop(0, '#0c2d48');
      waterGrad.addColorStop(0.5, '#08324f');
      waterGrad.addColorStop(1, '#051c2c');
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, 0, W, H);

      // Subtle pond water grid / shimmer
      ctx.strokeStyle = 'rgba(6,182,212,0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Pond Perimeter Shoreline Bank
      ctx.strokeStyle = '#0e7490';
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, W - 6, H - 6);

      // 2. Draw Obstacles (Pond Rocks & Emergent Reeds)
      for (const obs of obstaclesRef.current) {
        // Rock shadow
        ctx.beginPath();
        ctx.arc(obs.x + 3, obs.y + 4, obs.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fill();

        // Rock body
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        // Inner rock moss highlight
        ctx.beginPath();
        ctx.arc(obs.x - 3, obs.y - 3, obs.radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = '#166534';
        ctx.fill();
      }

      // 3. Draw Floating Debris
      for (const item of debrisRef.current) {
        if (item.collected) continue;

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);

        if (item.type === 'algae') {
          // Multi-lobed algae bloom patch
          ctx.fillStyle = 'rgba(34,197,94,0.75)';
          ctx.beginPath();
          ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(item.radius * 0.5, item.radius * 0.3, item.radius * 0.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(-item.radius * 0.4, -item.radius * 0.2, item.radius * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (item.type === 'plastic') {
          // Floating plastic bottle
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(-7, -4, 14, 8);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(7, -2, 3, 4); // bottle cap
        } else {
          // Floating brown leaf
          ctx.fillStyle = '#eab308';
          ctx.beginPath();
          ctx.ellipse(0, 0, item.radius, item.radius * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // 4. Draw AquaClean Robot
      ctx.save();
      ctx.translate(robot.x, robot.y);
      ctx.rotate(robot.angle);

      // Sonar Radar Scan Wave Cone (Forward)
      const sonarGrad = ctx.createRadialGradient(25, 0, 10, 25, 0, 140);
      sonarGrad.addColorStop(0, 'rgba(6,182,212,0.3)');
      sonarGrad.addColorStop(1, 'rgba(6,182,212,0)');
      ctx.fillStyle = sonarGrad;
      ctx.beginPath();
      ctx.moveTo(25, 0);
      ctx.arc(25, 0, 140, -Math.PI / 6, Math.PI / 6);
      ctx.closePath();
      ctx.fill();

      // Sonar distance arc
      ctx.strokeStyle = 'rgba(34,211,238,0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(25, 0, 80, -Math.PI / 6, Math.PI / 6);
      ctx.stroke();

      // Propeller Wash Waves (Rear)
      if (isRunning) {
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-35, -15);
        ctx.lineTo(-50 - Math.random() * 8, -15 + (Math.random() - 0.5) * 6);
        ctx.moveTo(-35, 15);
        ctx.lineTo(-50 - Math.random() * 8, 15 + (Math.random() - 0.5) * 6);
        ctx.stroke();
      }

      // Left Pontoon
      ctx.fillStyle = '#0891b2';
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-30, -22, 60, 12, 6);
      ctx.fill();
      ctx.stroke();

      // Right Pontoon
      ctx.beginPath();
      ctx.roundRect(-30, 10, 60, 12, 6);
      ctx.fill();
      ctx.stroke();

      // Center Chassis & Deck
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-22, -12, 44, 24, 4);
      ctx.fill();
      ctx.stroke();

      // Rear Storage Basket
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-20, -10, 14, 20);

      // Rotating Mesh Conveyor Belt (Front Center)
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-4, -10, 24, 20);

      // Animated conveyor slats
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      const offset = (robot.conveyorAnimOffset % 6);
      for (let sx = -4 + offset; sx < 20; sx += 6) {
        ctx.beginPath();
        ctx.moveTo(sx, -10);
        ctx.lineTo(sx, 10);
        ctx.stroke();
      }

      // Front Scoop Mouth (Tapered Guides)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, -12);
      ctx.lineTo(30, -18);
      ctx.moveTo(20, 12);
      ctx.lineTo(30, 18);
      ctx.stroke();

      // Status Beacon LED
      ctx.fillStyle = isRunning ? '#10b981' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(-8, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRunning, speedMult, autoPatrol]);

  return (
    <section
      id="simulation"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#091f3d] to-[#0a1628] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5" />
            Interactive Feature 1 & 2 • Live Physics Simulation
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Floating Robot{' '}
            <span className="gradient-text">Pond Cleaning Simulation</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Watch AquaClean patrol an active pond environment. Observe autonomous obstacle avoidance,
            differential steering thrust, front scoop channeling, and rotating mesh conveyor harvesting.
          </p>
        </div>

        {/* ─── LIVE TELEMETRY COUNTER BAR (FEATURE 2) ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md text-center">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase mb-1">
              <Sprout className="w-3.5 h-3.5" />
              <span>Algae Harvested</span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-white">
              {counters.algaeKg} <span className="text-xs text-white/50 font-normal">kg</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-red-500/30 backdrop-blur-md text-center">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-red-400 uppercase mb-1">
              <Trash2 className="w-3.5 h-3.5" />
              <span>Plastics Scooped</span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-white">
              {counters.plasticItems} <span className="text-xs text-white/50 font-normal">items</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-amber-500/30 backdrop-blur-md text-center">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-amber-400 uppercase mb-1">
              <Leaf className="w-3.5 h-3.5" />
              <span>Leaves & Detritus</span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-white">
              {counters.leavesKg} <span className="text-xs text-white/50 font-normal">kg</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md text-center">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-cyan-400 uppercase mb-1">
              <Waves className="w-3.5 h-3.5" />
              <span>Pond Area Cleaned</span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-white">
              {counters.areaCleanedM2} <span className="text-xs text-white/50 font-normal">m²</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-blue-500/30 backdrop-blur-md text-center">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-blue-400 uppercase mb-1">
              <Battery className="w-3.5 h-3.5" />
              <span>Battery Level</span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-white">
              {counters.batteryPct}%
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-yellow-500/30 backdrop-blur-md text-center col-span-2 sm:col-span-1">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-yellow-400 uppercase mb-1">
              <Radio className="w-3.5 h-3.5" />
              <span>Sonar Obstacle</span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-white">
              {counters.sonarDistCm} <span className="text-xs text-white/50 font-normal">cm</span>
            </div>
          </div>
        </div>

        {/* ─── SIMULATION CANVAS CONTAINER ─── */}
        <div className="relative rounded-3xl bg-slate-950/90 border border-cyan-500/30 overflow-hidden shadow-2xl mb-6">
          <canvas
            ref={canvasRef}
            width={800}
            height={480}
            className="w-full aspect-[16/10] block cursor-crosshair"
          />

          {/* Floating Canvas Watermark / Legend */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/90 border border-white/10 px-3 py-1.5 rounded-xl text-xs backdrop-blur-md">
            <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="font-mono text-white/90">
              {isRunning ? 'AUTONOMOUS PATROL ACTIVE' : 'SIMULATION PAUSED'}
            </span>
          </div>

          {/* Legend Badges */}
          <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-3 bg-slate-900/80 border border-white/10 px-3 py-1.5 rounded-xl text-[11px] backdrop-blur-md text-white/70">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Algae Mat
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400" /> Plastic Bottle
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-400" /> Fallen Leaf
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-500" /> Rock Obstacle
            </span>
          </div>
        </div>

        {/* ─── INTERACTIVE CONTROLS BAR ─── */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Play / Pause / Reset Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
              }`}
            >
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
              <span>{isRunning ? 'Pause' : 'Start'}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>

            {/* Auto Patrol Mode Toggle */}
            <button
              onClick={() => setAutoPatrol(!autoPatrol)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                autoPatrol
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                  : 'bg-white/5 text-white/50 border-white/10'
              }`}
            >
              <Compass size={14} />
              <span>{autoPatrol ? 'Auto Patrol: ON' : 'Station Hold'}</span>
            </button>

            {/* Speed Toggle */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-xl">
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeedMult(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    speedMult === s ? 'bg-cyan-500 text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Spawn Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-white/50 mr-1 hidden lg:inline">Inject Elements:</span>
            <button
              onClick={() => spawnDebris('algae')}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus size={12} />
              <span>+ Algae Mat</span>
            </button>
            <button
              onClick={() => spawnDebris('plastic')}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus size={12} />
              <span>+ Plastic</span>
            </button>
            <button
              onClick={() => spawnDebris('leaf')}
              className="px-3 py-1.5 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus size={12} />
              <span>+ Leaves</span>
            </button>
            <button
              onClick={spawnObstacle}
              className="px-3 py-1.5 rounded-xl bg-slate-500/20 hover:bg-slate-500/30 text-white/80 border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus size={12} />
              <span>+ Rock</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
