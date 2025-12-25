import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HardwareSection } from './components/HardwareSection';
import { SignalChain } from './components/SignalChain';
import { CodeGenerator } from './components/CodeGenerator';
import { MG300Simulator } from './components/MG300Simulator';
import { WiringDiagram } from './components/WiringDiagram';
import { EffectBlock } from './types';

const INITIAL_CHAIN: EffectBlock[] = [
  { id: 'gate', name: 'Noise Gate', type: 'DYNAMICS', enabled: true, parameters: [{ name: 'Threshold', value: 30, min: 0, max: 100 }] },
  { id: 'comp', name: 'Compressor', type: 'DYNAMICS', enabled: false, parameters: [{ name: 'Sustain', value: 50, min: 0, max: 100 }] },
  { id: 'efx', name: 'TS Drive', type: 'DRIVE', enabled: true, parameters: [{ name: 'Drive', value: 40, min: 0, max: 100 }, { name: 'Tone', value: 50, min: 0, max: 100 }] },
  { id: 'amp', name: 'Plexi 45', type: 'AMP', enabled: true, parameters: [{ name: 'Gain', value: 60, min: 0, max: 100 }] },
  { id: 'ir', name: '1960 Cabinet', type: 'CAB', enabled: true, parameters: [{ name: 'Distance', value: 20, min: 0, max: 100 }] },
  { id: 'mod', name: 'Chorus', type: 'MOD', enabled: false, parameters: [{ name: 'Rate', value: 40, min: 0, max: 100 }] },
  { id: 'delay', name: 'Digital Delay', type: 'DELAY', enabled: true, parameters: [{ name: 'Feedback', value: 30, min: 0, max: 100 }] },
  { id: 'rvb', name: 'Hall Reverb', type: 'REVERB', enabled: true, parameters: [{ name: 'Mix', value: 25, min: 0, max: 100 }] },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hardware' | 'signal' | 'simulator' | 'code' | 'wiring'>('simulator');
  const [signalChain, setSignalChain] = useState<EffectBlock[]>(INITIAL_CHAIN);
  const [budgetMode, setBudgetMode] = useState<'standard' | 'budget'>('standard');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const toggleEffect = (id: string) => {
    setSignalChain(prev => prev.map(block => 
      block.id === id ? { ...block, enabled: !block.enabled } : block
    ));
  };

  const updateParameter = (blockId: string, paramName: string, newValue: number) => {
    setSignalChain(prev => prev.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          parameters: block.parameters.map(p => 
            p.name === paramName ? { ...p, value: newValue } : p
          )
        };
      }
      return block;
    }));
  };

  const tabs = [
    { id: 'simulator', label: 'Simulasi' },
    { id: 'wiring', label: 'Wiring' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'signal', label: 'Signal' },
    { id: 'code', label: 'AI Code' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-100 overflow-x-hidden no-scrollbar">
      <Header />
      
      <nav className="flex bg-[#0f172a] border-b border-slate-800 sticky top-0 z-50 overflow-x-auto no-scrollbar">
        <div className="flex w-full min-w-max justify-center">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-4 text-xs sm:text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.id 
                  ? 'text-blue-400 border-blue-400 bg-blue-400/5' 
                  : 'text-slate-500 border-transparent hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl no-scrollbar">
        {activeTab === 'hardware' && <HardwareSection mode={budgetMode} onModeChange={setBudgetMode} />}
        {activeTab === 'wiring' && <WiringDiagram mode={budgetMode} />}
        {activeTab === 'simulator' && <MG300Simulator chain={signalChain} onToggle={toggleEffect} mode={budgetMode} />}
        {activeTab === 'signal' && <SignalChain chain={signalChain} onToggle={toggleEffect} onUpdateParam={updateParameter} />}
        {activeTab === 'code' && <CodeGenerator chain={signalChain} mode={budgetMode} />}
      </main>

      <footer className="bg-slate-900/50 border-t border-slate-800 py-6 text-center text-slate-600 text-[10px] sm:text-xs">
        <p>DIY Ardu-MG Multi-FX Lab &copy; {new Date().getFullYear()}. Educational Purpose Only.</p>
      </footer>
    </div>
  );
};

export default App;