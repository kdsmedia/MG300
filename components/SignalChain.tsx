import React from 'react';
import { EffectBlock } from '../types';

interface Props {
  chain: EffectBlock[];
  onToggle: (id: string) => void;
  onUpdateParam: (blockId: string, paramName: string, value: number) => void;
}

export const SignalChain: React.FC<Props> = ({ chain, onToggle, onUpdateParam }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700 w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Interactive Signal Chain</h2>
        <div className="text-[10px] sm:text-sm text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 shadow-sm">
          {chain.filter(b => b.enabled).length} Active Blocks
        </div>
      </div>

      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/10 via-blue-500/40 to-blue-500/10 -translate-y-1/2 hidden lg:block"></div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 relative z-10">
          {chain.map((block) => (
            <div 
              key={block.id}
              onClick={() => onToggle(block.id)}
              className={`
                cursor-pointer p-3 sm:p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center space-y-2 select-none
                ${block.enabled 
                  ? 'bg-blue-900/40 border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.2)] transform -translate-y-1' 
                  : 'bg-slate-900 border-slate-800 opacity-50 grayscale hover:opacity-100 hover:grayscale-0'
                }
              `}
            >
              <div className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">
                {block.type}
              </div>
              <div className="font-bold text-xs sm:text-sm h-8 sm:h-10 flex items-center justify-center leading-tight">
                {block.name}
              </div>
              <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${block.enabled ? 'bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,1)]' : 'bg-slate-700'}`}></div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {chain.filter(b => b.enabled).map(block => (
          <div key={`params-${block.id}`} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h3 className="font-bold text-blue-400 text-sm sm:text-base">{block.name}</h3>
              <span className="text-[8px] sm:text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded uppercase">Param Editor</span>
            </div>
            <div className="space-y-5">
              {block.parameters.map((param, i) => (
                <div key={i} className="space-y-2.5">
                  <div className="flex justify-between text-[10px] sm:text-xs font-medium">
                    <span className="text-slate-400">{param.name}</span>
                    <span className="text-blue-300 font-bold">{param.value}</span>
                  </div>
                  <input 
                    type="range" 
                    min={param.min} 
                    max={param.max} 
                    value={param.value}
                    onChange={(e) => onUpdateParam(block.id, param.name, parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {chain.filter(b => b.enabled).length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 italic border-2 border-dashed border-slate-800 rounded-3xl">
            Pilih blok efek di atas untuk mengaktifkannya.
          </div>
        )}
      </div>
    </div>
  );
};