import React from 'react';
import { EffectBlock } from '../types';

interface Props {
  chain: EffectBlock[];
  onToggle: (id: string) => void;
  mode: 'standard' | 'budget';
}

export const MG300Simulator: React.FC<Props> = ({ chain, onToggle, mode }) => {
  const isBudget = mode === 'budget';

  return (
    <div className="flex flex-col items-center py-6 sm:py-10 animate-in fade-in duration-700 w-full max-w-full">
      
      <div className="mb-6 sm:mb-8 bg-slate-900 border border-slate-800 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4 shadow-lg">
        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${isBudget ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'}`}></div>
        <span className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-slate-300">
          {isBudget ? 'Visual Model: Paket Hemat' : 'Visual Model: Standard Build'}
        </span>
      </div>

      {/* Main Pedal Body */}
      <div className={`
        relative w-full max-w-4xl rounded-[30px] sm:rounded-[40px] p-4 sm:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-500 border-x border-b border-black/20
        ${isBudget 
          ? 'bg-[#2a2d2e] border-t-2 border-slate-700' 
          : 'bg-[#b1b3b3] border-t-4 border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),0_30px_60px_-15px_rgba(0,0,0,0.7)]'
        }
      `}>
        
        {/* Power LED Visual */}
        <div className="absolute top-4 left-10 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_10px_red] animate-pulse"></div>
          <span className="text-[8px] font-black text-red-600 tracking-tighter uppercase">PWR</span>
        </div>

        {/* Physical Power Switch Simulation */}
        <div className="absolute top-[-25px] right-20 flex flex-col items-center">
           <div className={`w-8 h-10 rounded-t-lg border-x-2 border-t-2 ${isBudget ? 'bg-[#444] border-[#222]' : 'bg-[#222] border-[#555]'}`}>
             <div className="w-2 h-4 bg-slate-400 mx-auto mt-1 rounded shadow-md"></div>
           </div>
           <span className="text-[7px] font-bold text-slate-500 mt-1 uppercase">POWER</span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          
          {/* Left Control Panel */}
          <div className="flex-1 flex flex-col order-2 lg:order-1">
            
            {/* Display Screen */}
            <div className="bg-black rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 shadow-inner border-[3px] sm:border-4 border-[#555] min-h-[160px] sm:min-h-[180px] flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <span className={`text-[8px] sm:text-[10px] font-black tracking-widest uppercase ${isBudget ? 'text-orange-500' : 'text-blue-400'}`}>
                  {isBudget ? 'INTERNAL DAC (8-BIT)' : 'TSAC-HD MODELING'}
                </span>
                <span className="text-[8px] sm:text-[10px] text-orange-400 font-bold">PRESET 01A</span>
              </div>
              
              <div className="flex-1 flex flex-col justify-center items-center py-4">
                <div className="flex flex-wrap justify-center gap-1 mb-3">
                  {chain.map((block) => (
                    <div 
                      key={block.id}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${block.enabled ? (isBudget ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]') : 'bg-slate-800'}`}
                    ></div>
                  ))}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tighter italic text-center">
                  {chain.find(b => b.type === 'AMP')?.name || 'BYPASS'}
                </h3>
                {isBudget && <p className="text-[7px] sm:text-[8px] text-orange-600 font-bold uppercase mt-2">Lo-Fi Mode Active</p>}
              </div>

              <div className="mt-auto h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className={`h-full animate-pulse ${isBudget ? 'bg-orange-500' : 'bg-blue-500'}`} style={{width: '65%'}}></div>
              </div>
            </div>

            {/* Knobs Section */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-10">
              {['DRIVE', 'TONE', 'AMP GAIN', 'MASTER'].map((label) => (
                <div key={label} className="flex flex-col items-center gap-1.5 sm:gap-2">
                  <div className={`
                    w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative border-2
                    ${isBudget ? 'bg-[#333] border-[#222]' : 'bg-[#1a1a1a] border-[#333] shadow-[0_5px_10px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.2)]'}
                  `}>
                     <div className={`w-0.5 sm:w-1 h-2.5 sm:h-3 absolute top-1 rounded-full ${isBudget ? 'bg-orange-500/40' : 'bg-white/40'}`}></div>
                  </div>
                  <span className={`text-[8px] sm:text-[10px] font-black tracking-tight ${isBudget ? 'text-slate-500' : 'text-[#444]'}`}>{label}</span>
                </div>
              ))}
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-center gap-3 sm:gap-6 mb-8 sm:mb-12">
              {['EDIT', 'SAVE', 'MODE', 'JAM'].map(btn => (
                <div key={btn} className="flex flex-col items-center gap-1">
                  <button className={`w-8 h-5 sm:w-10 sm:h-6 rounded shadow-md border-b-[3px] sm:border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all ${isBudget ? 'bg-[#444]' : 'bg-[#2a2a2a]'}`}></button>
                  <span className="text-[8px] sm:text-[9px] font-bold text-[#555]">{btn}</span>
                </div>
              ))}
            </div>

            {/* Footswitches */}
            <div className="mt-auto flex justify-around items-end pt-4 sm:pt-10 mb-4 sm:mb-0">
              {['DOWN', 'UP'].map((dir, i) => (
                <div key={i} className="flex flex-col items-center group cursor-pointer">
                  {isBudget ? (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-red-700 shadow-[0_6px_0_#7f1d1d,0_12px_12px_rgba(0,0,0,0.4)] flex items-center justify-center border-t-2 border-red-500 active:translate-y-1.5 active:shadow-[0_2px_0_#7f1d1d] transition-all">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-red-600 border border-red-400"></div>
                    </div>
                  ) : (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#d1d5db] shadow-[0_8px_0_#9ca3af,0_15px_15px_rgba(0,0,0,0.3)] flex items-center justify-center border-t-2 border-white/50 active:translate-y-1.5 active:shadow-[0_2px_0_#9ca3af] transition-all">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#9ca3af] flex items-center justify-center">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#9ca3af]/20"></div>
                      </div>
                    </div>
                  )}
                  <span className={`mt-6 sm:mt-8 text-[9px] sm:text-[11px] font-black tracking-widest uppercase ${isBudget ? 'text-slate-600' : 'text-[#555]'}`}>
                    {dir} / {i === 0 ? 'CTRL' : 'TAP'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Expression Pedal */}
          <div className="w-full lg:w-48 flex flex-col items-center order-1 lg:order-2">
             <div className={`
               w-28 sm:w-32 h-[200px] lg:h-[450px] rounded-2xl sm:rounded-3xl shadow-[5px_10px_20px_rgba(0,0,0,0.5)] border-l-2 lg:border-l-4 border-t-2 lg:border-t-4 border-white/5 flex lg:flex-col p-3 lg:p-4 relative overflow-hidden group transition-colors duration-500
               ${isBudget ? 'bg-[#121212]' : 'bg-[#1a1a1a]'}
             `}>
               <div className="flex-1 flex flex-row lg:flex-col gap-1.5 lg:gap-2 overflow-hidden">
                 {Array.from({length: 12}).map((_, i) => (
                   <div key={i} className={`flex-1 lg:h-4 lg:w-full rounded-full shadow-inner border-b border-white/5 ${isBudget ? 'bg-[#1a1a1a]' : 'bg-[#222]'}`}></div>
                 ))}
               </div>
               <div className="hidden lg:flex h-24 w-full flex-col items-center justify-center">
                  <div className={`text-[10px] font-black tracking-widest uppercase mb-2 ${isBudget ? 'text-slate-700' : 'text-[#444]'}`}>
                    {isBudget ? 'DIY-PEDAL' : 'NUX MG-300'}
                  </div>
                  <div className={`w-4 h-4 rounded-full border animate-pulse ${isBudget ? 'bg-orange-600/20 border-orange-900' : 'bg-red-600/20 border-red-900'}`}></div>
               </div>
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
             </div>
             <span className="mt-3 lg:mt-6 text-[9px] sm:text-[11px] font-black text-[#555] tracking-widest uppercase text-center">
               {isBudget ? 'EXP (OPTIONAL)' : 'EXP PEDAL'}
             </span>
          </div>

        </div>
        
        <div className={`absolute top-4 sm:top-8 right-8 sm:right-12 font-black italic text-lg sm:text-xl tracking-tighter opacity-30 sm:opacity-50 hidden sm:block ${isBudget ? 'text-slate-700' : 'text-[#9ca3af]'}`}>
          {isBudget ? 'ARDU-MG' : 'NUX'}
        </div>
        
      </div>

      {/* Control Info */}
      <div className="mt-10 sm:mt-12 text-center w-full max-w-lg bg-slate-900/50 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800/50">
        <h4 className="font-bold text-slate-300 mb-3 text-sm italic">New System Features:</h4>
        <ul className="text-slate-500 text-[10px] sm:text-xs text-left space-y-1.5 list-disc list-inside">
          <li><strong>Master Switch:</strong> Terletak di bagian atas pedal (Visual Sim).</li>
          <li><strong>LED Merah:</strong> Indikator status daya aktif (Visual Sim & Wiring).</li>
          <li><strong>Pot Map:</strong> Terhubung ke G34, G35, G32, G33.</li>
        </ul>
      </div>
    </div>
  );
};