import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, X, Trophy, Volume2, VolumeX, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface SnakeGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Direction = 'UP';
const GAME_SPEED = 110;

export const SnakeGameModal: React.FC<SnakeGameModalProps> = ({ isOpen, onClose }) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('arsath_snake_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const directionRef = useRef<Direction>(INITIAL_DIRECTION);
  const isPlayingRef = useRef<boolean>(isPlaying);
  const isGameOverRef = useRef<boolean>(isGameOver);

  directionRef.current = direction;
  isPlayingRef.current = isPlaying;
  isGameOverRef.current = isGameOver;

  // Synthesize soft audio beeps
  const playBeep = useCallback((freq: number, type: OscillatorType = 'sine', duration: number = 0.08) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // AudioContext might be blocked before user gesture
    }
  }, [soundEnabled]);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    let isOnSnake = true;
    while (isOnSnake) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      isOnSnake = currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y);
      if (!isOnSnake) return newFood;
    }
    return { x: 5, y: 5 };
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const changeDirection = useCallback((newDir: Direction) => {
    const current = directionRef.current;
    if (newDir === 'UP' && current !== 'DOWN') setDirection('UP');
    if (newDir === 'DOWN' && current !== 'UP') setDirection('DOWN');
    if (newDir === 'LEFT' && current !== 'RIGHT') setDirection('LEFT');
    if (newDir === 'RIGHT' && current !== 'LEFT') setDirection('RIGHT');
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        changeDirection('UP');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        changeDirection('DOWN');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        changeDirection('LEFT');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        changeDirection('RIGHT');
      } else if (e.code === 'Space') {
        e.preventDefault();
        if (isGameOverRef.current) {
          resetGame();
        } else {
          setIsPlaying(prev => !prev);
        }
      } else if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, changeDirection, onClose]);

  // Main game loop
  useEffect(() => {
    if (!isPlaying || isGameOver || !isOpen) return;

    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        const currentDir = directionRef.current;

        switch (currentDir) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Boundary collision check
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setIsGameOver(true);
          setIsPlaying(false);
          playBeep(180, 'sawtooth', 0.25);
          return prevSnake;
        }

        // Self collision check
        if (prevSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
          setIsGameOver(true);
          setIsPlaying(false);
          playBeep(180, 'sawtooth', 0.25);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Eat food check
        if (head.x === food.x && head.y === food.y) {
          playBeep(520, 'sine', 0.08);
          setScore(s => {
            const nextScore = s + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              localStorage.setItem('arsath_snake_highscore', nextScore.toString());
            }
            return nextScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(interval);
  }, [isPlaying, isGameOver, food, generateFood, highScore, playBeep, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 flex flex-col gap-5"
        role="dialog"
        aria-label="Browser Snake Arcade Game"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs text-blue-400 font-mono uppercase tracking-wider">Mohamed Arsath Project Demo</div>
            <h3 className="text-xl font-bold tracking-tight text-white">Browser Snake Arcade</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={soundEnabled ? "Mute audio" : "Enable audio"}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-rose-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Score & Controls Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-950 border border-slate-800/80 rounded-xl text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-slate-400 font-medium">Score</span>
              <span className="text-lg font-bold font-mono text-emerald-400 tabular-nums">{score}</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5 text-amber-400">
              <Trophy className="w-3.5 h-3.5" />
              <span className="text-xs font-mono tabular-nums">{highScore}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isPlaying && !isGameOver && (
              <button
                onClick={() => setIsPlaying(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Start Game
              </button>
            )}
            {isPlaying && (
              <button
                onClick={() => setIsPlaying(false)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors"
              >
                Pause
              </button>
            )}
            {(isPlaying || isGameOver || score > 0) && (
              <button
                onClick={resetGame}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Game Canvas Area */}
        <div className="relative mx-auto aspect-square w-full max-w-[360px] bg-slate-950 border-2 border-slate-800 rounded-xl p-1 overflow-hidden select-none">
          {/* Grid render */}
          <div 
            className="w-full h-full grid"
            style={{ 
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              const isHead = snake[0]?.x === x && snake[0]?.y === y;
              const isBody = snake.slice(1).some(seg => seg.x === x && seg.y === y);
              const isFood = food.x === x && food.y === y;

              let cellStyle = "bg-slate-950/40";
              if (isHead) {
                cellStyle = "bg-emerald-400 rounded-sm shadow-sm shadow-emerald-500/50";
              } else if (isBody) {
                cellStyle = "bg-emerald-600/80 rounded-xs";
              } else if (isFood) {
                cellStyle = "bg-rose-500 rounded-full scale-90 animate-pulse";
              }

              return (
                <div
                  key={index}
                  className={`w-full h-full transition-colors duration-75 ${cellStyle}`}
                />
              );
            })}
          </div>

          {/* Overlays: Ready or Game Over */}
          {!isPlaying && !isGameOver && score === 0 && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Ready to Play?</h4>
              <p className="text-xs text-slate-400 max-w-xs mb-4">
                Use Arrow Keys or WASD to navigate. Eat the glowing fruit to grow and increase your high score!
              </p>
              <button
                onClick={() => setIsPlaying(true)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
              >
                Launch Game
              </button>
            </div>
          )}

          {isGameOver && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-150">
              <div className="text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">Game Over</div>
              <h4 className="text-2xl font-black text-white mb-2">Final Score: {score}</h4>
              <p className="text-xs text-slate-400 mb-5">
                {score >= highScore && score > 0 ? "🎉 Congratulations! New Personal Record!" : "Good run! Try again to beat the record."}
              </p>
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* Mobile / Screen Touch D-Pad */}
        <div className="flex flex-col items-center gap-1.5 pt-1">
          <div className="text-[11px] text-slate-400 font-mono">Controls: Arrow keys / Touch Pad</div>
          <div className="grid grid-cols-3 gap-1.5 w-36">
            <div />
            <button
              onClick={() => changeDirection('UP')}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-blue-600 rounded-lg flex items-center justify-center text-slate-200 transition-colors"
              aria-label="Move Up"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <div />
            <button
              onClick={() => changeDirection('LEFT')}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-blue-600 rounded-lg flex items-center justify-center text-slate-200 transition-colors"
              aria-label="Move Left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => changeDirection('DOWN')}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-blue-600 rounded-lg flex items-center justify-center text-slate-200 transition-colors"
              aria-label="Move Down"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => changeDirection('RIGHT')}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-blue-600 rounded-lg flex items-center justify-center text-slate-200 transition-colors"
              aria-label="Move Right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
