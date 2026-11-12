import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Plus, Zap } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────

type WasteType = 'leaf' | 'bottle' | 'bag';

interface WasteObject {
  id: number;
  type: WasteType;
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  caught: boolean;
  raking: boolean;  // moving up the bar screen
  rakeY: number;    // current y while raking
  rakeTargetY: number;
  collected: boolean;
  catchTime: number; // timestamp when caught, to delay rake
  wobble: number;    // phase offset for wobble animation
}

interface Counters {
  leaves: number;
  plastic: number;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const BASE_SPEED = 1.5;
const MAX_FLOW = 3;
const RAKE_SPEED = 1.8;      // px per frame going up
const CATCH_DELAY_MS = 1500; // ms to wait before raking
const AUTO_SPAWN_MS = 5000;  // ms between auto-spawns
const WATER_Y_TOP = 110;     // canvas y where water surface starts
const WATER_Y_BOT = 290;     // canvas y where water ends
const BAR_SCREEN_X = 560;    // x of the bar screen
const BIN_X = 710;           // x of collection bin
const BIN_Y_TOP = 30;        // y of bin top
const BIN_HEIGHT = 100;
const BIN_WIDTH = 90;
const WAVE_SEGMENTS = 40;

let wasteIdCounter = 0;

function makeWaste(type?: WasteType): WasteObject {
  const types: WasteType[] = ['leaf', 'bottle', 'bag'];
  const t = type ?? types[Math.floor(Math.random() * types.length)];
  const y = WATER_Y_TOP + 20 + Math.random() * (WATER_Y_BOT - WATER_Y_TOP - 40);
  return {
    id: ++wasteIdCounter,
    type: t,
    x: 30 + Math.random() * 20,
    y,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.03,
    caught: false,
    raking: false,
    rakeY: y,
    rakeTargetY: BIN_Y_TOP + BIN_HEIGHT - 5,
    collected: false,
    catchTime: 0,
    wobble: Math.random() * Math.PI * 2,
  };
}

// ─── Drawing helpers ─────────────────────────────────────────────────────────

function drawWater(
  ctx: CanvasRenderingContext2D,
  W: number,
  t: number,
  flowMult: number
) {
  // deep water gradient
  const grad = ctx.createLinearGradient(0, WATER_Y_TOP, 0, WATER_Y_BOT);
  grad.addColorStop(0, 'rgba(6,182,212,0.55)');
  grad.addColorStop(0.5, 'rgba(14,116,144,0.70)');
  grad.addColorStop(1, 'rgba(8,47,73,0.85)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, WATER_Y_TOP, W, WATER_Y_BOT - WATER_Y_TOP);

  // animated surface waves
  ctx.beginPath();
  ctx.moveTo(0, WATER_Y_TOP);
  for (let i = 0; i <= WAVE_SEGMENTS; i++) {
    const wx = (i / WAVE_SEGMENTS) * W;
    const wy =
      WATER_Y_TOP +
      Math.sin(wx * 0.02 + t * 0.04 * flowMult) * 4 +
      Math.sin(wx * 0.04 + t * 0.06 * flowMult + 1) * 2;
    if (i === 0) ctx.moveTo(wx, wy);
    else ctx.lineTo(wx, wy);
  }
  ctx.lineTo(W, WATER_Y_TOP);
  ctx.closePath();
  ctx.fillStyle = 'rgba(103,232,249,0.25)';
  ctx.fill();

  // bottom shimmer line
  ctx.beginPath();
  ctx.moveTo(0, WATER_Y_BOT);
  ctx.lineTo(W, WATER_Y_BOT);
  ctx.strokeStyle = 'rgba(6,182,212,0.4)';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawWaterParticles(
  ctx: CanvasRenderingContext2D,
  t: number,
  flowMult: number
) {
  ctx.save();
  for (let i = 0; i < 18; i++) {
    const phase = (i / 18) * Math.PI * 2;
    const px =
      ((i * 53 + t * 1.2 * flowMult) % (BAR_SCREEN_X - 60)) + 20;
    const py =
      WATER_Y_TOP +
      30 +
      (Math.sin(phase + t * 0.03) * 0.5 + 0.5) *
        (WATER_Y_BOT - WATER_Y_TOP - 60);
    const radius = 2 + Math.sin(phase + t * 0.05) * 1;
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(186,230,253,${0.15 + Math.sin(phase + t * 0.04) * 0.1})`;
    ctx.fill();
  }
  ctx.restore();
}

function drawLeaf(ctx: CanvasRenderingContext2D, x: number, y: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.bezierCurveTo(10, -10, 14, 4, 0, 10);
  ctx.bezierCurveTo(-14, 4, -10, -10, 0, -10);
  ctx.closePath();
  ctx.fillStyle = '#4ade80';
  ctx.fill();
  ctx.strokeStyle = '#16a34a';
  ctx.lineWidth = 1;
  ctx.stroke();
  // stem
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(0, 14);
  ctx.strokeStyle = '#86efac';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

function drawBottle(ctx: CanvasRenderingContext2D, x: number, y: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  // body
  ctx.beginPath();
  ctx.roundRect(-5, -12, 10, 20, 2);
  ctx.fillStyle = 'rgba(147,197,253,0.80)';
  ctx.fill();
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 1.2;
  ctx.stroke();
  // cap
  ctx.beginPath();
  ctx.roundRect(-3, -16, 6, 5, 1);
  ctx.fillStyle = '#ef4444';
  ctx.fill();
  // label
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillRect(-4, -6, 8, 7);
  ctx.restore();
}

function drawBag(ctx: CanvasRenderingContext2D, x: number, y: number, rot: number, t: number, wobble: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  // bag body — squiggly using sin
  ctx.beginPath();
  for (let i = 0; i <= 12; i++) {
    const bx = -8 + (i / 12) * 16;
    const by = -8 + Math.sin((i / 12) * Math.PI * 3 + t * 0.08 + wobble) * 3;
    if (i === 0) ctx.moveTo(bx, by - 4);
    else ctx.lineTo(bx, by);
  }
  ctx.lineTo(8, 10);
  ctx.lineTo(-8, 10);
  ctx.closePath();
  ctx.fillStyle = 'rgba(253,224,71,0.75)';
  ctx.fill();
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1;
  ctx.stroke();
  // tie knot
  ctx.beginPath();
  ctx.arc(0, -12, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = '#fde047';
  ctx.fill();
  ctx.restore();
}

function drawWaste(
  ctx: CanvasRenderingContext2D,
  w: WasteObject,
  t: number
) {
  const drawX = w.caught ? BAR_SCREEN_X - 12 : w.x;
  const drawY = w.raking ? w.rakeY : w.y;

  switch (w.type) {
    case 'leaf':
      drawLeaf(ctx, drawX, drawY, w.rotation);
      break;
    case 'bottle':
      drawBottle(ctx, drawX, drawY, w.rotation);
      break;
    case 'bag':
      drawBag(ctx, drawX, drawY, w.rotation, t, w.wobble);
      break;
  }
}

function drawBarScreen(ctx: CanvasRenderingContext2D, t: number) {
  const barCount = 8;
  const barSpacing = (WATER_Y_BOT - WATER_Y_TOP) / barCount;

  // frame
  ctx.save();
  ctx.fillStyle = '#475569';
  ctx.fillRect(BAR_SCREEN_X - 4, WATER_Y_TOP - 15, 8, WATER_Y_BOT - WATER_Y_TOP + 30);

  // vertical bars
  for (let i = 0; i < barCount; i++) {
    const by = WATER_Y_TOP + i * barSpacing;
    ctx.fillStyle = '#64748b';
    ctx.fillRect(BAR_SCREEN_X - 20, by, 40, 4);
  }

  // top beam
  ctx.fillStyle = '#334155';
  ctx.fillRect(BAR_SCREEN_X - 25, WATER_Y_TOP - 20, 50, 8);

  // label
  ctx.font = 'bold 9px Inter, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'center';
  ctx.fillText('BAR', BAR_SCREEN_X, WATER_Y_BOT + 18);
  ctx.fillText('SCREEN', BAR_SCREEN_X, WATER_Y_BOT + 28);

  ctx.restore();
}

function drawRake(ctx: CanvasRenderingContext2D, t: number, hasRaking: boolean) {
  ctx.save();
  const rakeX = BAR_SCREEN_X + 22;

  // guide rail
  ctx.fillStyle = '#475569';
  ctx.fillRect(rakeX - 3, BIN_Y_TOP, 6, WATER_Y_BOT - BIN_Y_TOP + 10);

  // animated rake head
  const bounce = hasRaking ? 0 : Math.sin(t * 0.03) * 3;
  const rakeHeadY = WATER_Y_BOT - 20 + bounce;

  // rake teeth
  ctx.fillStyle = '#94a3b8';
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(rakeX - 10 + i * 5, rakeHeadY, 3, 14);
  }
  // rake body
  ctx.fillStyle = '#64748b';
  ctx.fillRect(rakeX - 12, rakeHeadY - 6, 28, 7);
  // mechanical connector
  ctx.fillStyle = '#475569';
  ctx.fillRect(rakeX - 2, rakeHeadY - 20, 5, 15);

  ctx.font = 'bold 9px Inter, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'center';
  ctx.fillText('RAKE', rakeX, WATER_Y_BOT + 18);

  ctx.restore();
}

function drawCollectionBin(
  ctx: CanvasRenderingContext2D,
  collectedCount: number
) {
  ctx.save();
  const maxItems = 15;
  const fillFraction = Math.min(collectedCount / maxItems, 1);

  // bin outline
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  ctx.strokeRect(BIN_X, BIN_Y_TOP, BIN_WIDTH, BIN_HEIGHT);

  // fill level
  if (fillFraction > 0) {
    const fillH = BIN_HEIGHT * fillFraction;
    const fillGrad = ctx.createLinearGradient(0, BIN_Y_TOP + BIN_HEIGHT - fillH, 0, BIN_Y_TOP + BIN_HEIGHT);
    fillGrad.addColorStop(0, 'rgba(74,222,128,0.5)');
    fillGrad.addColorStop(1, 'rgba(34,197,94,0.75)');
    ctx.fillStyle = fillGrad;
    ctx.fillRect(BIN_X + 1, BIN_Y_TOP + BIN_HEIGHT - fillH, BIN_WIDTH - 2, fillH);
  }

  // bin label
  ctx.font = 'bold 10px Inter, sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.textAlign = 'center';
  ctx.fillText('WASTE BIN', BIN_X + BIN_WIDTH / 2, BIN_Y_TOP - 8);
  ctx.font = '9px Inter, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`${collectedCount} items`, BIN_X + BIN_WIDTH / 2, BIN_Y_TOP + BIN_HEIGHT + 14);

  // lid
  ctx.fillStyle = '#475569';
  ctx.fillRect(BIN_X - 4, BIN_Y_TOP - 7, BIN_WIDTH + 8, 7);

  ctx.restore();
}

function drawInlet(ctx: CanvasRenderingContext2D, t: number, flowMult: number) {
  ctx.save();
  // pipe
  ctx.fillStyle = '#475569';
  ctx.fillRect(0, WATER_Y_TOP - 5, 30, WATER_Y_BOT - WATER_Y_TOP + 10);
  // animated flow arrows
  for (let i = 0; i < 3; i++) {
    const phase = (i / 3) * 60;
    const ax = 5 + ((t * 1.5 * flowMult + phase) % 50);
    const ay = WATER_Y_TOP + (WATER_Y_BOT - WATER_Y_TOP) / 2;
    ctx.beginPath();
    ctx.moveTo(ax, ay - 5);
    ctx.lineTo(ax + 8, ay);
    ctx.lineTo(ax, ay + 5);
    ctx.strokeStyle = `rgba(186,230,253,0.6)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.font = 'bold 9px Inter, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'center';
  ctx.fillText('INLET', 15, WATER_Y_BOT + 18);
  ctx.restore();
}

function drawOutlet(ctx: CanvasRenderingContext2D, W: number, t: number, flowMult: number) {
  ctx.save();
  const outX = BAR_SCREEN_X + 60;
  // clean water channel
  const cleanGrad = ctx.createLinearGradient(0, WATER_Y_TOP, 0, WATER_Y_BOT);
  cleanGrad.addColorStop(0, 'rgba(103,232,249,0.4)');
  cleanGrad.addColorStop(1, 'rgba(14,116,144,0.6)');
  ctx.fillStyle = cleanGrad;
  ctx.fillRect(outX, WATER_Y_TOP, W - outX, WATER_Y_BOT - WATER_Y_TOP);

  // sparkling clean particles
  for (let i = 0; i < 8; i++) {
    const phase = i * 37;
    const px = outX + ((i * 29 + t * 1.5 * flowMult + phase) % (W - outX - 10)) + 5;
    const py = WATER_Y_TOP + 20 + (Math.sin(phase + t * 0.05) * 0.5 + 0.5) * (WATER_Y_BOT - WATER_Y_TOP - 40);
    ctx.beginPath();
    ctx.arc(px, py, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fill();
  }

  // outlet label
  ctx.font = 'bold 9px Inter, sans-serif';
  ctx.fillStyle = '#22d3ee';
  ctx.textAlign = 'center';
  ctx.fillText('CLEAN', W - 25, WATER_Y_BOT + 18);
  ctx.fillText('OUTLET', W - 25, WATER_Y_BOT + 28);
  ctx.restore();
}

function drawBackground(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0a1628');
  bg.addColorStop(0.5, '#0d2244');
  bg.addColorStop(1, '#071020');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // channel walls
  ctx.fillStyle = '#1e3a5f';
  ctx.fillRect(0, WATER_Y_TOP - 15, W, 15);
  ctx.fillRect(0, WATER_Y_BOT, W, 15);
}

function drawLabel(ctx: CanvasRenderingContext2D, W: number) {
  ctx.save();
  ctx.font = 'bold 11px Inter, sans-serif';
  ctx.fillStyle = 'rgba(251,191,36,0.9)';
  ctx.textAlign = 'center';
  ctx.fillText('⚠️ CONCEPTUAL SIMULATION — FOR DEMONSTRATION ONLY', W / 2, 20);
  ctx.restore();
}

// ─── Main Component ───────────────────────────────────────────────────────────

const Simulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    running: false,
    frameT: 0,
    waste: [] as WasteObject[],
    counters: { leaves: 0, plastic: 0 },
    flowMult: 1,
    lastAutoSpawn: 0,
    animId: 0,
  });

  const [running, setRunning] = useState(false);
  const [counters, setCounters] = useState<Counters>({ leaves: 0, plastic: 0 });
  const [flowLevel, setFlowLevel] = useState(1);

  // ── Render one frame ────────────────────────────────────────────────────────
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const s = stateRef.current;

    s.frameT++;
    const t = s.frameT;
    const fm = s.flowMult;
    const now = performance.now();

    // Auto-spawn waste
    if (s.running && now - s.lastAutoSpawn > AUTO_SPAWN_MS) {
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) s.waste.push(makeWaste());
      s.lastAutoSpawn = now;
    }

    // Update waste positions
    let countersChanged = false;
    for (const w of s.waste) {
      if (w.collected) continue;

      if (w.raking) {
        // move up towards bin
        w.rakeY -= RAKE_SPEED;
        if (w.rakeY <= BIN_Y_TOP + BIN_HEIGHT) {
          w.collected = true;
          if (w.type === 'leaf') s.counters.leaves++;
          else s.counters.plastic++;
          countersChanged = true;
        }
        continue;
      }

      if (!w.caught) {
        w.x += BASE_SPEED * fm;
        w.rotation += w.rotationSpeed;
        // gentle bob
        w.y += Math.sin(t * 0.05 + w.wobble) * 0.3;

        if (w.x >= BAR_SCREEN_X - 15) {
          w.x = BAR_SCREEN_X - 15;
          w.caught = true;
          w.catchTime = now;
        }
      } else {
        // wait for rake delay, then start raking
        if (now - w.catchTime >= CATCH_DELAY_MS) {
          w.raking = true;
          w.rakeY = w.y;
          w.rakeTargetY = BIN_Y_TOP + BIN_HEIGHT - 10;
        }
      }
    }

    // Remove collected items from list (after a cycle)
    s.waste = s.waste.filter((w) => !w.collected);

    if (countersChanged) {
      setCounters({ ...s.counters });
    }

    // ── Draw ──────────────────────────────────────────────────────────────────
    drawBackground(ctx, W, H);
    drawLabel(ctx, W);
    drawWater(ctx, W, t, fm);
    drawWaterParticles(ctx, t, fm);
    drawInlet(ctx, t, fm);
    drawBarScreen(ctx, t);

    const hasRaking = s.waste.some((w) => w.raking);
    drawRake(ctx, t, hasRaking);
    drawCollectionBin(ctx, s.counters.leaves + s.counters.plastic);
    drawOutlet(ctx, W, t, fm);

    // draw waste objects
    for (const w of s.waste) {
      drawWaste(ctx, w, t);
    }
  }, []);

  // ── Animation loop ──────────────────────────────────────────────────────────
  const loopRef = useRef<number>(0);

  const startLoop = useCallback(() => {
    const tick = () => {
      renderFrame();
      loopRef.current = requestAnimationFrame(tick);
    };
    loopRef.current = requestAnimationFrame(tick);
  }, [renderFrame]);

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(loopRef.current);
  }, []);

  // Initial static render
  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  // ── Controls ─────────────────────────────────────────────────────────────────

  const handleStart = () => {
    stateRef.current.running = true;
    stateRef.current.lastAutoSpawn = performance.now();
    setRunning(true);
    startLoop();
  };

  const handlePause = () => {
    stateRef.current.running = false;
    setRunning(false);
    stopLoop();
  };

  const handleReset = () => {
    stopLoop();
    stateRef.current.running = false;
    stateRef.current.frameT = 0;
    stateRef.current.waste = [];
    stateRef.current.counters = { leaves: 0, plastic: 0 };
    stateRef.current.flowMult = 1;
    stateRef.current.lastAutoSpawn = 0;
    setRunning(false);
    setCounters({ leaves: 0, plastic: 0 });
    setFlowLevel(1);
    renderFrame();
  };

  const handleAddWaste = () => {
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      stateRef.current.waste.push(makeWaste());
    }
    if (!stateRef.current.running) renderFrame();
  };

  const handleIncreaseFlow = () => {
    setFlowLevel((prev) => {
      const next = prev >= MAX_FLOW ? 1 : Math.min(prev + 0.5, MAX_FLOW);
      stateRef.current.flowMult = next;
      return next;
    });
  };

  // cleanup on unmount
  useEffect(() => () => stopLoop(), [stopLoop]);

  const totalCollected = counters.leaves + counters.plastic;

  return (
    <section
      id="simulation"
      className="py-20 bg-gradient-to-b from-[#0a1628] via-[#071a38] to-[#0a1628]"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4 tracking-wider uppercase">
            Interactive Demo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Live{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Simulation
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Watch the AquaClean AI screening process in real-time. Control the
            simulation and observe how waste is captured and collected.
          </p>
        </motion.div>

        {/* Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-[0_0_60px_rgba(6,182,212,0.12)] mb-6"
        >
          <canvas
            ref={canvasRef}
            width={860}
            height={340}
            className="w-full block bg-[#071020]"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </motion.div>

        {/* Controls & Counters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5"
          >
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Simulation Controls
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Start/Pause */}
              {!running ? (
                <button
                  onClick={handleStart}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20 col-span-2"
                >
                  <Play size={16} />
                  Start Simulation
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-amber-500/20 col-span-2"
                >
                  <Pause size={16} />
                  Pause Simulation
                </button>
              )}

              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-600 hover:bg-slate-500 text-white font-semibold text-sm transition-all duration-200"
              >
                <RotateCcw size={15} />
                Reset
              </button>

              <button
                onClick={handleAddWaste}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200"
              >
                <Plus size={15} />
                Add Waste
              </button>

              <button
                onClick={handleIncreaseFlow}
                className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200"
              >
                <Zap size={15} />
                Increase Flow ({flowLevel.toFixed(1)}x / {MAX_FLOW}x)
              </button>
            </div>

            {/* Flow indicator */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Water Flow Speed</span>
                <span>{((flowLevel / MAX_FLOW) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
                  animate={{ width: `${(flowLevel / MAX_FLOW) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Counters */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5"
          >
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Real-Time Counters
            </h3>
            <div className="space-y-3">
              {[
                {
                  emoji: '🍃',
                  label: 'Leaves Collected',
                  value: counters.leaves,
                  color: 'text-emerald-400',
                  barColor: 'bg-emerald-500',
                },
                {
                  emoji: '🍶',
                  label: 'Plastic Items Collected',
                  value: counters.plastic,
                  color: 'text-blue-400',
                  barColor: 'bg-blue-500',
                },
                {
                  emoji: '📊',
                  label: 'Total Waste Collected',
                  value: totalCollected,
                  color: 'text-cyan-400',
                  barColor: 'bg-cyan-500',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/5 rounded-xl p-3 flex items-center gap-4"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-300 text-xs truncate">
                        {item.label}
                      </span>
                      <motion.span
                        key={item.value}
                        initial={{ scale: 1.4, color: '#ffffff' }}
                        animate={{ scale: 1, color: '' }}
                        className={`font-bold text-lg ${item.color} ml-2 tabular-nums`}
                      >
                        {item.value}
                      </motion.span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${item.barColor} rounded-full`}
                        animate={{
                          width: `${Math.min((item.value / 20) * 100, 100)}%`,
                        }}
                        transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Status pill */}
            <div className="mt-4 flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  running
                    ? 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)] animate-pulse'
                    : 'bg-slate-500'
                }`}
              />
              <span className="text-xs text-slate-400">
                {running ? 'Simulation Running' : 'Simulation Paused / Idle'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-xs text-amber-400/70"
        >
          ⚠️ CONCEPTUAL SIMULATION — FOR DEMONSTRATION ONLY. This simulation
          represents the operational principle of AquaClean AI and is not a
          real-time system feed.
        </motion.p>
      </div>
    </section>
  );
};

export default Simulation;
