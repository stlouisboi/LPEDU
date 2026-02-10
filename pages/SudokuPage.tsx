
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Brain, 
  RotateCcw, 
  ChevronLeft, 
  Trophy, 
  ShieldCheck, 
  Trash2, 
  AlertCircle,
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * SudokuPage: The Discipline Trainer
 * A high-fidelity, professional Sudoku implementation designed for mobile precision.
 */

// Simple Sudoku logic
const isValid = (board: number[][], row: number, col: number, num: number) => {
  for (let x = 0; x < 9; x++) if (board[row][x] === num) return false;
  for (let x = 0; x < 9; x++) if (board[x][col] === num) return false;
  let startRow = row - row % 3, startCol = col - col % 3;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (board[i + startRow][j + startCol] === num) return false;
  return true;
};

const INITIAL_BOARD = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const SudokuPage = () => {
  const [board, setBoard] = useState<number[][]>(INITIAL_BOARD.map(row => [...row]));
  const [initialMask, setInitialMask] = useState<boolean[][]>(INITIAL_BOARD.map(row => row.map(cell => cell !== 0)));
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [errors, setErrors] = useState<[number, number][]>([]);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    document.title = "Discipline Trainer | LaunchPath™";
  }, []);

  const checkWin = (currentBoard: number[][]) => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (currentBoard[r][c] === 0) return false;
      }
    }
    setIsWon(true);
    return true;
  };

  const handleInput = (num: number) => {
    if (!selectedCell || initialMask[selectedCell[0]][selectedCell[1]] || isWon) return;
    
    const [r, c] = selectedCell;
    const newBoard = board.map(row => [...row]);
    
    if (num === 0) {
      newBoard[r][c] = 0;
      setBoard(newBoard);
      setErrors(errors.filter(([er, ec]) => er !== r || ec !== c));
      return;
    }

    if (!isValid(newBoard, r, c, num)) {
      setErrors([...errors.filter(([er, ec]) => er !== r || ec !== c), [r, c]]);
    } else {
      setErrors(errors.filter(([er, ec]) => er !== r || ec !== c));
    }

    newBoard[r][c] = num;
    setBoard(newBoard);
    checkWin(newBoard);
  };

  const resetGame = () => {
    setBoard(INITIAL_BOARD.map(row => [...row]));
    setErrors([]);
    setIsWon(false);
    setSelectedCell(null);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans selection:bg-signal-gold/20 overflow-x-hidden">
      {/* Header Bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#0F172A]/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-authority-blue rounded-xl flex items-center justify-center text-signal-gold shadow-lg border border-white/10">
               <Brain size={22} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold leading-none mb-1">Discipline Trainer</p>
               <p className="text-xs font-bold text-white uppercase tracking-widest opacity-60">System Registry: LP-MIND-01</p>
            </div>
         </div>
         <button onClick={resetGame} className="p-2 text-slate-400 hover:text-white transition-all active:scale-90">
            <RotateCcw size={20} />
         </button>
      </div>

      <main className="max-w-2xl mx-auto px-4 pt-32 pb-20 flex flex-col items-center">
        
        {/* Intro */}
        <div className="text-center mb-10 space-y-4 animate-reveal-up">
           <h1 className="text-3xl md:text-5xl font-black font-serif uppercase tracking-tight text-white leading-none">
             Order <span className="text-signal-gold italic">&</span> Precision.
           </h1>
           <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.2em] max-w-sm mx-auto">
             "The hallmark of an executive is the ability to maintain clinical focus under pressure."
           </p>
        </div>

        {/* Sudoku Board - Optimized for Mobile hit areas */}
        <div className="w-full aspect-square max-w-[500px] bg-slate-900 border-[3px] border-authority-blue rounded-2xl shadow-2xl overflow-hidden grid grid-cols-9 grid-rows-9 relative animate-in zoom-in-95 duration-700">
           {board.map((row, rIdx) => 
              row.map((cell, cIdx) => {
                const isSelected = selectedCell?.[0] === rIdx && selectedCell?.[1] === cIdx;
                const isInitial = initialMask[rIdx][cIdx];
                const hasError = errors.some(([er, ec]) => er === rIdx && ec === cIdx);
                const isHighlightArea = selectedCell && (selectedCell[0] === rIdx || selectedCell[1] === cIdx || (Math.floor(selectedCell[0]/3) === Math.floor(rIdx/3) && Math.floor(selectedCell[1]/3) === Math.floor(cIdx/3)));

                return (
                  <button
                    key={`${rIdx}-${cIdx}`}
                    onClick={() => setSelectedCell([rIdx, cIdx])}
                    className={`
                      relative flex items-center justify-center text-xl md:text-2xl font-black transition-all duration-200
                      border-[0.5px] border-white/5
                      ${(rIdx + 1) % 3 === 0 && rIdx < 8 ? 'border-b-2 border-b-authority-blue/40' : ''}
                      ${(cIdx + 1) % 3 === 0 && cIdx < 8 ? 'border-r-2 border-r-authority-blue/40' : ''}
                      ${isInitial ? 'text-slate-500 bg-black/20' : 'text-white'}
                      ${isSelected ? 'bg-signal-gold text-authority-blue z-10 scale-[1.05] rounded-lg shadow-xl' : isHighlightArea ? 'bg-white/5' : ''}
                      ${hasError ? 'bg-red-900/40 text-red-500' : ''}
                      active:scale-95 touch-manipulation
                    `}
                  >
                    {cell !== 0 ? cell : ''}
                  </button>
                )
              })
           )}
           
           {isWon && (
             <div className="absolute inset-0 bg-authority-blue/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 z-50">
                <div className="w-20 h-20 bg-signal-gold rounded-full flex items-center justify-center mb-6 shadow-2xl">
                   <Trophy size={40} className="text-authority-blue" />
                </div>
                <h2 className="text-4xl font-black font-serif uppercase tracking-tighter text-white mb-4">Discipline Verified.</h2>
                <p className="text-lg text-slate-300 font-bold mb-8 uppercase tracking-widest leading-relaxed">
                   Entity Displays Master-Level Cognitive Order.
                </p>
                <button onClick={resetGame} className="bg-signal-gold text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-xl active:scale-95 transition-all border-b-4 border-slate-900">
                   RE-INITIALIZE
                </button>
             </div>
           )}
        </div>

        {/* Control Pad - Large targets for mobile */}
        <div className="mt-10 w-full max-w-[500px] space-y-6">
           <div className="grid grid-cols-5 gap-3 sm:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleInput(num)}
                  className="aspect-square bg-white/5 border-2 border-white/5 rounded-2xl flex items-center justify-center text-xl md:text-2xl font-black hover:bg-authority-blue hover:text-white hover:border-signal-gold transition-all active:scale-90 touch-manipulation shadow-lg"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleInput(0)}
                className="aspect-square bg-red-900/20 border-2 border-red-900/30 rounded-2xl flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white transition-all active:scale-90 touch-manipulation"
              >
                <Trash2 size={24} />
              </button>
           </div>
        </div>

        {/* Institutional Footnote */}
        <div className="mt-16 w-full max-w-[500px] p-8 bg-white/5 rounded-[2.5rem] border border-white/5 flex items-start space-x-6">
           <div className="p-4 bg-signal-gold/10 rounded-2xl text-signal-gold shrink-0">
             <Zap size={24}/>
           </div>
           <div className="space-y-2">
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">Training Protocol</h4>
             <p className="text-xs font-medium text-slate-400 leading-relaxed uppercase tracking-tighter">
               Daily cognitive discipline exercises are required for Tier 1 fleet operators to minimize administrative fatigue.
             </p>
           </div>
        </div>

        <Link to="/resources" className="mt-12 inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-signal-gold transition-colors group">
          <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Resource Library
        </Link>

      </main>

      {/* Style for sparkles or specific effects if needed */}
      <style>{`
        @keyframes sparkle-burst {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SudokuPage;
