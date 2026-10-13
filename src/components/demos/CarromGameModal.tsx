import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, RotateCcw, Target, Zap } from 'lucide-react';

interface CarromGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Piece {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: 'white' | 'black' | 'queen';
  pocketed: boolean;
}

interface Striker {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isAiming: boolean;
  angle: number; // in radians
  power: number; // 0 to 100
}

const BOARD_SIZE = 360;
const POCKET_RADIUS = 20;
const FRICTION = 0.982;
const BASELINE_Y = BOARD_SIZE - 55;

export const CarromGameModal: React.FC<CarromGameModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState<number>(0);
  const [strikesLeft, setStrikesLeft] = useState<number>(10);
  const [strikerBaselineX, setStrikerBaselineX] = useState<number>(BOARD_SIZE / 2);
  const [strikePower, setStrikePower] = useState<number>(55);
  const [aimAngleDeg, setAimAngleDeg] = useState<number>(270); // pointing straight up
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("Line up your striker, aim, and strike!");

  // Initialize carrom pieces in center
  const createInitialPieces = useCallback((): Piece[] => {
    const pieces: Piece[] = [];
    const cx = BOARD_SIZE / 2;
    const cy = BOARD_SIZE / 2;
    const pieceRadius = 8.5;

    // Queen at center
    pieces.push({
      id: 0,
      x: cx,
      y: cy,
      vx: 0,
      vy: 0,
      radius: pieceRadius,
      color: 'queen',
      pocketed: false
    });

    // 6 surrounding pieces (3 white, 3 black alternating)
    const dist = 18;
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      pieces.push({
        id: i + 1,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        radius: pieceRadius,
        color: i % 2 === 0 ? 'white' : 'black',
        pocketed: false
      });
    }

    // Outer ring pieces (additional 6 pieces)
    const dist2 = 34;
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + Math.PI / 6;
      pieces.push({
        id: i + 7,
        x: cx + Math.cos(angle) * dist2,
        y: cy + Math.sin(angle) * dist2,
        vx: 0,
        vy: 0,
        radius: pieceRadius,
        color: i % 2 === 0 ? 'black' : 'white',
        pocketed: false
      });
    }

    return pieces;
  }, []);

  const piecesRef = useRef<Piece[]>(createInitialPieces());
  const strikerRef = useRef<Striker>({
    x: BOARD_SIZE / 2,
    y: BASELINE_Y,
    vx: 0,
    vy: 0,
    radius: 13,
    isAiming: true,
    angle: (270 * Math.PI) / 180,
    power: 55
  });

  const pockets = [
    { x: POCKET_RADIUS + 4, y: POCKET_RADIUS + 4 },
    { x: BOARD_SIZE - (POCKET_RADIUS + 4), y: POCKET_RADIUS + 4 },
    { x: POCKET_RADIUS + 4, y: BOARD_SIZE - (POCKET_RADIUS + 4) },
    { x: BOARD_SIZE - (POCKET_RADIUS + 4), y: BOARD_SIZE - (POCKET_RADIUS + 4) }
  ];

  const resetGame = () => {
    piecesRef.current = createInitialPieces();
    strikerRef.current = {
      x: BOARD_SIZE / 2,
      y: BASELINE_Y,
      vx: 0,
      vy: 0,
      radius: 13,
      isAiming: true,
      angle: (270 * Math.PI) / 180,
      power: 55
    };
    setStrikerBaselineX(BOARD_SIZE / 2);
    setScore(0);
    setStrikesLeft(10);
    setIsSimulating(false);
    setStatusMessage("Board reset! Line up your striker and shoot.");
  };

  const handleShoot = () => {
    if (isSimulating || strikesLeft <= 0) return;

    const angleRad = (aimAngleDeg * Math.PI) / 180;
    const speed = (strikePower / 100) * 16 + 2;

    strikerRef.current.x = strikerBaselineX;
    strikerRef.current.y = BASELINE_Y;
    strikerRef.current.vx = Math.cos(angleRad) * speed;
    strikerRef.current.vy = Math.sin(angleRad) * speed;
    strikerRef.current.isAiming = false;

    setStrikesLeft(prev => prev - 1);
    setIsSimulating(true);
    setStatusMessage("Striker in motion!");
  };

  // Canvas drawing & Physics Animation Loop
  useEffect(() => {
    if (!isOpen) return;

    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // 1. Clear & Draw Carrom Board
      ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

      // Wooden border
      ctx.fillStyle = '#291811';
      ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

      // Playing surface
      const borderThickness = 14;
      ctx.fillStyle = '#f4e4ba'; // cream carrom wood surface
      ctx.fillRect(
        borderThickness,
        borderThickness,
        BOARD_SIZE - borderThickness * 2,
        BOARD_SIZE - borderThickness * 2
      );

      // Board pattern & Center circle
      ctx.save();
      const cx = BOARD_SIZE / 2;
      const cy = BOARD_SIZE / 2;

      // Center decorative circles
      ctx.strokeStyle = '#991b1b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 38, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#fee2e2';
      ctx.fill();
      ctx.stroke();

      // Baselines
      ctx.strokeStyle = '#b91c1c';
      ctx.lineWidth = 1;
      // Top baseline
      ctx.beginPath();
      ctx.moveTo(60, 55);
      ctx.lineTo(BOARD_SIZE - 60, 55);
      ctx.stroke();
      // Bottom baseline
      ctx.beginPath();
      ctx.moveTo(60, BASELINE_Y);
      ctx.lineTo(BOARD_SIZE - 60, BASELINE_Y);
      ctx.stroke();
      // Baseline red end circles
      [60, BOARD_SIZE - 60].forEach(bx => {
        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.arc(bx, BASELINE_Y, 7, 0, Math.PI * 2);
        ctx.fill();
      });

      // Pockets
      pockets.forEach(p => {
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(p.x, p.y, POCKET_RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.restore();

      // 2. Physics Update
      const pieces = piecesRef.current;
      const striker = strikerRef.current;
      let motionDetected = false;

      // Update striker
      if (!striker.isAiming) {
        striker.x += striker.vx;
        striker.y += striker.vy;
        striker.vx *= FRICTION;
        striker.vy *= FRICTION;

        // Bounce off walls
        const minX = borderThickness + striker.radius;
        const maxX = BOARD_SIZE - borderThickness - striker.radius;
        const minY = borderThickness + striker.radius;
        const maxY = BOARD_SIZE - borderThickness - striker.radius;

        if (striker.x < minX) { striker.x = minX; striker.vx = -striker.vx * 0.85; }
        if (striker.x > maxX) { striker.x = maxX; striker.vx = -striker.vx * 0.85; }
        if (striker.y < minY) { striker.y = minY; striker.vy = -striker.vy * 0.85; }
        if (striker.y > maxY) { striker.y = maxY; striker.vy = -striker.vy * 0.85; }

        if (Math.abs(striker.vx) > 0.08 || Math.abs(striker.vy) > 0.08) {
          motionDetected = true;
        } else {
          striker.vx = 0;
          striker.vy = 0;
        }

        // Check if striker pocketed (foul penalty)
        pockets.forEach(p => {
          const dist = Math.hypot(striker.x - p.x, striker.y - p.y);
          if (dist < POCKET_RADIUS + 2 && !striker.isAiming) {
            striker.vx = 0;
            striker.vy = 0;
            striker.x = -100; // remove from board
            setStatusMessage("⚠️ Striker Pocketed! Foul penalty (-5 pts)");
            setScore(s => Math.max(0, s - 5));
          }
        });
      }

      // Update pieces
      pieces.forEach(piece => {
        if (piece.pocketed) return;

        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.vx *= FRICTION;
        piece.vy *= FRICTION;

        // Bounce off walls
        const minX = borderThickness + piece.radius;
        const maxX = BOARD_SIZE - borderThickness - piece.radius;
        const minY = borderThickness + piece.radius;
        const maxY = BOARD_SIZE - borderThickness - piece.radius;

        if (piece.x < minX) { piece.x = minX; piece.vx = -piece.vx * 0.85; }
        if (piece.x > maxX) { piece.x = maxX; piece.vx = -piece.vx * 0.85; }
        if (piece.y < minY) { piece.y = minY; piece.vy = -piece.vy * 0.85; }
        if (piece.y > maxY) { piece.y = maxY; piece.vy = -piece.vy * 0.85; }

        if (Math.abs(piece.vx) > 0.08 || Math.abs(piece.vy) > 0.08) {
          motionDetected = true;
        } else {
          piece.vx = 0;
          piece.vy = 0;
        }

        // Pocket sink check
        pockets.forEach(p => {
          const dist = Math.hypot(piece.x - p.x, piece.y - p.y);
          if (dist < POCKET_RADIUS + 4) {
            piece.pocketed = true;
            piece.vx = 0;
            piece.vy = 0;
            if (piece.color === 'queen') {
              setScore(s => s + 25);
              setStatusMessage("👑 Queen Pocketed! +25 Points!");
            } else if (piece.color === 'white') {
              setScore(s => s + 10);
              setStatusMessage("⚪ White Piece Pocketed! +10 Points!");
            } else {
              setScore(s => s + 5);
              setStatusMessage("⚫ Black Piece Pocketed! +5 Points!");
            }
          }
        });
      });

      // Striker to Piece Collisions
      if (!striker.isAiming && striker.x > 0) {
        pieces.forEach(piece => {
          if (piece.pocketed) return;
          const dx = piece.x - striker.x;
          const dy = piece.y - striker.y;
          const dist = Math.hypot(dx, dy);
          const minDist = striker.radius + piece.radius;

          if (dist < minDist && dist > 0) {
            // Normal vector
            const nx = dx / dist;
            const ny = dy / dist;

            // Relative velocity
            const kx = striker.vx - piece.vx;
            const ky = striker.vy - piece.vy;
            const p = 2 * (nx * kx + ny * ky) / (1 + 0.6); // Mass ratio (striker is heavier)

            striker.vx -= p * 0.6 * nx;
            striker.vy -= p * 0.6 * ny;
            piece.vx += p * nx;
            piece.vy += p * ny;

            // Separate overlapping circles
            const overlap = (minDist - dist) * 0.5;
            striker.x -= overlap * nx;
            striker.y -= overlap * ny;
            piece.x += overlap * nx;
            piece.y += overlap * ny;
          }
        });
      }

      // Piece to Piece Collisions
      for (let i = 0; i < pieces.length; i++) {
        for (let j = i + 1; j < pieces.length; j++) {
          const p1 = pieces[i];
          const p2 = pieces[j];
          if (p1.pocketed || p2.pocketed) continue;

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = p1.radius + p2.radius;

          if (dist < minDist && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const kx = p1.vx - p2.vx;
            const ky = p1.vy - p2.vy;
            const p = nx * kx + ny * ky;

            p1.vx -= p * nx;
            p1.vy -= p * ny;
            p2.vx += p * nx;
            p2.vy += p * ny;

            const overlap = (minDist - dist) * 0.5;
            p1.x -= overlap * nx;
            p1.y -= overlap * ny;
            p2.x += overlap * nx;
            p2.y += overlap * ny;
          }
        }
      }

      // Check if all motion stopped -> return striker to aiming baseline
      if (!striker.isAiming && !motionDetected) {
        striker.isAiming = true;
        striker.x = strikerBaselineX;
        striker.y = BASELINE_Y;
        striker.vx = 0;
        striker.vy = 0;
        setIsSimulating(false);
      }

      // 3. Render Pieces
      pieces.forEach(p => {
        if (p.pocketed) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.color === 'queen') {
          ctx.fillStyle = '#dc2626'; // Red Queen
          ctx.fill();
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else if (p.color === 'white') {
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          ctx.fillStyle = '#1e293b';
          ctx.fill();
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.restore();
      });

      // 4. Render Striker & Aim Line
      if (striker.isAiming) {
        // Aim line
        const angleRad = (aimAngleDeg * Math.PI) / 180;
        const aimLength = (strikePower / 100) * 80 + 20;
        const aimEndX = strikerBaselineX + Math.cos(angleRad) * aimLength;
        const aimEndY = BASELINE_Y + Math.sin(angleRad) * aimLength;

        ctx.save();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(strikerBaselineX, BASELINE_Y);
        ctx.lineTo(aimEndX, aimEndY);
        ctx.stroke();

        // Arrow head or target ring
        ctx.beginPath();
        ctx.arc(aimEndX, aimEndY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
        ctx.restore();

        // Striker disc
        ctx.save();
        ctx.beginPath();
        ctx.arc(strikerBaselineX, BASELINE_Y, striker.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0284c7';
        ctx.fill();
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner circle icon
        ctx.beginPath();
        ctx.arc(strikerBaselineX, BASELINE_Y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      } else if (striker.x > 0) {
        // Striker in motion
        ctx.save();
        ctx.beginPath();
        ctx.arc(striker.x, striker.y, striker.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0284c7';
        ctx.fill();
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, aimAngleDeg, strikePower, strikerBaselineX, pockets]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 flex flex-col gap-4"
        role="dialog"
        aria-label="Browser Carrom Mini Game"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="text-xs text-blue-400 font-mono uppercase tracking-wider">Mohamed Arsath Project Demo</div>
            <h3 className="text-xl font-bold tracking-tight text-white">Carrom Mini Game Simulation</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-1">
              <span className="text-slate-400">Score</span>
              <span className="text-base font-bold font-mono text-emerald-400 tabular-nums">{score}</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-baseline gap-1">
              <span className="text-slate-400">Strikes Left</span>
              <span className="text-base font-bold font-mono text-blue-400 tabular-nums">{strikesLeft}</span>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Board
          </button>
        </div>

        {/* Status prompt */}
        <div className="text-xs text-center font-medium py-1 px-2 rounded-lg bg-slate-800/60 text-slate-300">
          {statusMessage}
        </div>

        {/* Carrom Canvas */}
        <div className="relative mx-auto aspect-square w-full max-w-[340px] rounded-xl overflow-hidden shadow-xl border border-slate-800 bg-slate-950 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={BOARD_SIZE}
            height={BOARD_SIZE}
            className="w-full h-full block"
          />
        </div>

        {/* Interactive Controls Panel */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex flex-col gap-3">
          {/* Baseline Slider */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Position Striker</span>
              <span className="font-mono text-slate-300">{Math.round(strikerBaselineX)} px</span>
            </div>
            <input
              type="range"
              min={70}
              max={BOARD_SIZE - 70}
              value={strikerBaselineX}
              disabled={isSimulating || strikesLeft <= 0}
              onChange={e => setStrikerBaselineX(Number(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
            />
          </div>

          {/* Aim Angle & Power Slider */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Target className="w-3 h-3 text-sky-400" /> Aim Angle</span>
                <span className="font-mono text-slate-300">{aimAngleDeg}°</span>
              </div>
              <input
                type="range"
                min={210}
                max={330}
                value={aimAngleDeg}
                disabled={isSimulating || strikesLeft <= 0}
                onChange={e => setAimAngleDeg(Number(e.target.value))}
                className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-400" /> Power</span>
                <span className="font-mono text-slate-300">{strikePower}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={strikePower}
                disabled={isSimulating || strikesLeft <= 0}
                onChange={e => setStrikePower(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
              />
            </div>
          </div>

          {/* Strike Button */}
          <button
            onClick={handleShoot}
            disabled={isSimulating || strikesLeft <= 0}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Zap className="w-4 h-4 fill-current" />
            {strikesLeft <= 0 ? "No Strikes Remaining — Reset Board" : isSimulating ? "Discs in Motion..." : "Strike Disc!"}
          </button>
        </div>
      </div>
    </div>
  );
};
