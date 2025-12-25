
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-b from-slate-900 to-slate-950 py-6 sm:py-8 border-b border-slate-800 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
            ARDU-MG <span className="font-light text-slate-400 block sm:inline">Multi-FX Lab</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
            Panduan rakit efek gitar berbasis Arduino/ESP32 dengan pemodelan DSP canggih.
            Meniru arsitektur TSAC-HD.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-2 rounded-xl border border-slate-700 shadow-inner">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <span className="text-[10px] sm:text-xs font-mono text-slate-300 uppercase tracking-widest font-bold">DSP Engine v1.2</span>
        </div>
      </div>
    </header>
  );
};
