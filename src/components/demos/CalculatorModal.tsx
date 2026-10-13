import React, { useState, useEffect, useCallback } from 'react';
import { X, Delete, RotateCcw, History } from 'lucide-react';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HistoryItem {
  expression: string;
  result: string;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ isOpen, onClose }) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);

  const handleDigit = useCallback((digit: string) => {
    setDisplayValue(prev => {
      if (hasEvaluated) {
        setHasEvaluated(false);
        setExpression('');
        return digit;
      }
      if (prev === '0' || prev === 'Error') {
        return digit;
      }
      // Max input length guard
      if (prev.length >= 16) return prev;
      return prev + digit;
    });
  }, [hasEvaluated]);

  const handleDecimal = useCallback(() => {
    setDisplayValue(prev => {
      if (hasEvaluated) {
        setHasEvaluated(false);
        setExpression('');
        return '0.';
      }
      if (prev.includes('.')) return prev;
      return prev + '.';
    });
  }, [hasEvaluated]);

  const handleOperator = useCallback((op: string) => {
    setHasEvaluated(false);
    if (displayValue === 'Error') return;

    if (expression && !hasEvaluated) {
      // Evaluate chained operations safely
      try {
        const fullExpr = `${expression} ${displayValue}`;
        const sanitized = fullExpr.replace(/×/g, '*').replace(/÷/g, '/');
        // eslint-disable-next-line no-eval
        const res = Function(`'use strict'; return (${sanitized})`)();
        const formattedRes = Number.isFinite(res) ? String(Math.round(res * 1e8) / 1e8) : 'Error';
        setExpression(`${formattedRes} ${op}`);
        setDisplayValue(formattedRes);
        return;
      } catch {
        // Fallback
      }
    }

    setExpression(`${displayValue} ${op}`);
    setDisplayValue('0');
  }, [displayValue, expression, hasEvaluated]);

  const handleEvaluate = useCallback(() => {
    if (!expression || hasEvaluated) return;

    try {
      const fullExpr = `${expression} ${displayValue}`;
      const sanitized = fullExpr.replace(/×/g, '*').replace(/÷/g, '/');
      
      // Check division by zero
      if (sanitized.includes('/ 0') && !sanitized.includes('/ 0.')) {
        setDisplayValue('Cannot divide by 0');
        setExpression('');
        setHasEvaluated(true);
        return;
      }

      // eslint-disable-next-line no-eval
      const res = Function(`'use strict'; return (${sanitized})`)();
      const formattedRes = Number.isFinite(res) ? String(Math.round(res * 1e8) / 1e8) : 'Error';

      setHistory(prev => [{ expression: fullExpr, result: formattedRes }, ...prev.slice(0, 9)]);
      setDisplayValue(formattedRes);
      setExpression(fullExpr + ' =');
      setHasEvaluated(true);
    } catch {
      setDisplayValue('Error');
      setExpression('');
      setHasEvaluated(true);
    }
  }, [displayValue, expression, hasEvaluated]);

  const handleClear = () => {
    setDisplayValue('0');
    setExpression('');
    setHasEvaluated(false);
  };

  const handleDelete = useCallback(() => {
    if (hasEvaluated) {
      handleClear();
      return;
    }
    setDisplayValue(prev => {
      if (prev.length <= 1 || prev === 'Error') return '0';
      return prev.slice(0, -1);
    });
  }, [hasEvaluated]);

  const handleToggleSign = () => {
    if (displayValue === '0' || displayValue === 'Error') return;
    setDisplayValue(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev);
  };

  const handlePercentage = () => {
    if (displayValue === 'Error') return;
    const val = parseFloat(displayValue);
    if (!isNaN(val)) {
      setDisplayValue(String(val / 100));
    }
  };

  const handleSqrt = () => {
    if (displayValue === 'Error') return;
    const val = parseFloat(displayValue);
    if (val < 0) {
      setDisplayValue('Invalid Input');
      setHasEvaluated(true);
    } else {
      const res = Math.sqrt(val);
      setDisplayValue(String(Math.round(res * 1e8) / 1e8));
      setExpression(`√(${val})`);
      setHasEvaluated(true);
    }
  };

  // Keyboard support
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === '.') {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === '+') {
        e.preventDefault();
        handleOperator('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleOperator('-');
      } else if (e.key === '*') {
        e.preventDefault();
        handleOperator('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEvaluate();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleDigit, handleDecimal, handleOperator, handleEvaluate, handleDelete, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100 flex flex-col gap-4"
        role="dialog"
        aria-label="Calculator Application"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="text-xs text-blue-400 font-mono uppercase tracking-wider">Mohamed Arsath Project Demo</div>
            <h3 className="text-lg font-bold tracking-tight text-white">Precision Calculator</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-lg transition-colors ${showHistory ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              title="Toggle history tape"
            >
              <History className="w-4 h-4" />
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

        {/* Display Screen */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-end justify-center min-h-[90px] shadow-inner">
          <div className="text-xs font-mono text-slate-400 truncate max-w-full h-5">
            {expression || '\u00A0'}
          </div>
          <div className="text-3xl font-mono font-bold text-white tracking-tight tabular-nums truncate max-w-full">
            {displayValue}
          </div>
        </div>

        {/* History Tape Drawer */}
        {showHistory && (
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 max-h-36 overflow-y-auto flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1">
              <span>Calculation History</span>
              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="text-rose-400 hover:underline text-[11px]"
                >
                  Clear
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <div className="text-slate-500 py-3 text-center italic">No prior calculations yet</div>
            ) : (
              history.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDisplayValue(item.result);
                    setExpression('');
                    setShowHistory(false);
                  }}
                  className="flex flex-col items-end text-right p-1.5 rounded hover:bg-slate-800 transition-colors text-slate-300"
                >
                  <span className="text-[11px] text-slate-500 font-mono">{item.expression}</span>
                  <span className="font-mono font-semibold text-emerald-400">{item.result}</span>
                </button>
              ))
            )}
          </div>
        )}

        {/* Keypad Grid */}
        <div className="grid grid-cols-4 gap-2 text-sm font-semibold select-none">
          {/* Row 1 */}
          <button
            onClick={handleClear}
            className="p-3 rounded-xl bg-slate-800 text-rose-400 hover:bg-rose-500/20 transition-colors flex items-center justify-center font-bold"
          >
            AC
          </button>
          <button
            onClick={handleDelete}
            className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors flex items-center justify-center"
            title="Backspace"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            onClick={handlePercentage}
            className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            %
          </button>
          <button
            onClick={() => handleOperator('÷')}
            className="p-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors text-base"
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => handleDigit('7')}
            className="p-3 rounded-xl bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
          >
            7
          </button>
          <button
            onClick={() => handleDigit('8')}
            className="p-3 rounded-xl bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
          >
            8
          </button>
          <button
            onClick={() => handleDigit('9')}
            className="p-3 rounded-xl bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
          >
            9
          </button>
          <button
            onClick={() => handleOperator('×')}
            className="p-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors text-base"
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => handleDigit('4')}
            className="p-3 rounded-xl bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
          >
            4
          </button>
          <button
            onClick={() => handleDigit('5')}
            className="p-3 rounded-xl bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
          >
            5
          </button>
          <button
            onClick={() => handleDigit('6')}
            className="p-3 rounded-xl bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
          >
            6
          </button>
          <button
            onClick={() => handleOperator('-')}
            className="p-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors text-base"
          >
            −
          </button>

          {/* Row 4 */}
          <button
            onClick={() => handleDigit('1')}
            className="p-3 rounded-xl bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
          >
            1
          </button>
          <button
            onClick={() => handleDigit('2')}
            className="p-3 rounded-xl bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
          >
            2
          </button>
          <button
            onClick={() => handleDigit('3')}
            className="p-3 rounded-xl bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
          >
            3
          </button>
          <button
            onClick={() => handleOperator('+')}
            className="p-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors text-base"
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={handleToggleSign}
            className="p-3 rounded-xl bg-slate-800/80 text-slate-300 hover:bg-slate-700 transition-colors text-xs"
          >
            ±
          </button>
          <button
            onClick={() => handleDigit('0')}
            className="p-3 rounded-xl bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="p-3 rounded-xl bg-slate-800/80 text-white hover:bg-slate-700 transition-colors text-base font-bold"
          >
            .
          </button>
          <button
            onClick={handleEvaluate}
            className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/30 text-base font-bold"
          >
            =
          </button>
        </div>

        {/* Footer note */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
          <span>Keyboard active (0-9, +, -, *, /, Enter)</span>
          <button
            onClick={handleSqrt}
            className="hover:text-blue-400 transition-colors font-mono"
          >
            Function: √x
          </button>
        </div>
      </div>
    </div>
  );
};
