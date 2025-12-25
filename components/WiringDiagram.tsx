import React from 'react';

interface Props {
  mode: 'standard' | 'budget';
}

export const WiringDiagram: React.FC<Props> = ({ mode }) => {
  const isBudget = mode === 'budget';

  return (
    <div className="space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full no-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-1">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold italic tracking-tighter">WIRING & SYSTEM PORTS</h2>
          <p className="text-slate-400 text-sm">Detail jalur Power Switch, LED Indikator, dan I/O Ports.</p>
        </div>
        <div className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border shrink-0 ${isBudget ? 'bg-orange-600/20 text-orange-400 border-orange-500/30' : 'bg-blue-600/20 text-blue-400 border-blue-500/30'}`}>
          {isBudget ? '300rb Mode (DIY Optimized)' : 'Standard Mode (Pro Layout)'}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-8 relative overflow-hidden flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-6">
          <h3 className="text-[10px] sm:text-sm font-bold text-slate-500 uppercase tracking-widest">Master Circuit & Power Management</h3>
        </div>
        
        <div className="w-full bg-[#0a0f1d] rounded-2xl border border-slate-800 p-2 sm:p-6 relative overflow-x-auto no-scrollbar shadow-2xl">
          <svg viewBox="0 0 1000 600" className="min-w-[800px] w-full h-auto font-mono text-[10px]" fill="none" stroke="currentColor">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
              <filter id="glow-red">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* ESP32 BOARD */}
            <g>
              <rect x="350" y="200" width="300" height="300" rx="10" className="stroke-slate-700 fill-slate-900" strokeWidth="3" />
              <text x="500" y="230" textAnchor="middle" className="fill-slate-400 font-bold text-[14px]">ESP32 DEVKIT V1</text>
              <text x="365" y="270" className="fill-slate-600 text-[9px]">G34 (DRV)</text>
              <text x="365" y="295" className="fill-slate-600 text-[9px]">G35 (TONE)</text>
              <text x="635" y="270" textAnchor="end" className="fill-slate-600 text-[9px]">VIN (9V)</text>
              <text x="635" y="295" textAnchor="end" className="fill-slate-600 text-[9px]">GND</text>
            </g>

            {/* POWER COMPONENTS */}
            <g>
              <rect x="750" y="50" width="80" height="80" rx="10" className="stroke-slate-700 fill-slate-800" strokeWidth="2" />
              <circle cx="790" cy="90" r="12" className="fill-black stroke-slate-600" />
              <text x="790" y="40" textAnchor="middle" className="fill-slate-500 font-bold">9V DC</text>

              <rect x="580" y="60" width="60" height="40" rx="4" className="stroke-slate-600 fill-slate-800" strokeWidth="2" />
              <path d="M610 65 V95" className="stroke-slate-400" strokeWidth="4" />
              <text x="610" y="50" textAnchor="middle" className="fill-slate-500 font-bold uppercase text-[8px]">Power Switch</text>

              <path d="M790 102 V140 H610 V100" className="stroke-red-600" strokeWidth="2.5" />
              <path d="M610 60 V30 H500 V200" className="stroke-red-500" strokeWidth="2.5" markerEnd="url(#arrow)" />
            </g>

            {/* INDICATOR LED */}
            <g>
              <circle cx="450" cy="90" r="8" className="fill-red-600 stroke-red-400" style={{filter: 'url(#glow-red)'}} />
              <text x="450" y="75" textAnchor="middle" className="fill-red-500 font-bold text-[8px]">PWR LED</text>
              <path d="M458 90 H500 V200" className="stroke-red-400" strokeWidth="1" />
            </g>

            {/* I/O JACKS */}
            <g>
              <rect x="50" y="250" width="60" height="80" rx="5" className="stroke-slate-700 fill-slate-800" />
              <text x="80" y="240" textAnchor="middle" className="fill-slate-500 font-bold text-[8px]">INPUT (JACK)</text>
              
              <rect x="890" y="250" width="60" height="80" rx="5" className="stroke-slate-700 fill-slate-800" />
              <text x="920" y="240" textAnchor="middle" className="fill-slate-500 font-bold text-[8px]">OUTPUT (JACK)</text>
            </g>
          </svg>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <h4 className="text-blue-400 font-bold text-xs uppercase mb-2">Audio Chain</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Input -> Buffer (TL072) -> ESP32 G34 (ADC) -> Processing -> {isBudget ? 'G25 (DAC)' : 'I2S Bus'} -> Output.
            </p>
          </div>
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <h4 className="text-orange-400 font-bold text-xs uppercase mb-2">Grounding</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Satukan semua ground (Jack In, Jack Out, ESP32, Potentiometers) ke satu titik untuk menghindari ground loop noise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};