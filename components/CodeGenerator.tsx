import React, { useState } from 'react';
import { geminiService } from '../services/gemini';
import { EffectBlock } from '../types';

interface Props {
  chain: EffectBlock[];
  mode: 'standard' | 'budget';
}

export const CodeGenerator: React.FC<Props> = ({ chain, mode }) => {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    const result = await geminiService.generateArduinoCode(chain, mode);
    setCode(result);
    setLoading(false);
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setLoading(true);
    const result = await geminiService.askDaqExpert(chatInput);
    setChatResponse(result);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl font-bold">DSP Engine Generator</h2>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${mode === 'budget' ? 'bg-orange-600/20 text-orange-400' : 'bg-blue-600/20 text-blue-400'}`}>
              Target: {mode === 'budget' ? 'Internal DAC' : 'I2S External DAC'}
            </span>
          </div>
          <p className="text-slate-400 mb-8 max-w-2xl leading-relaxed">
            Hasilkan kode C++ untuk ESP32 berdasarkan Signal Chain dan parameter yang telah Anda atur. 
            AI akan menyusun algoritma DSP yang dioptimalkan untuk performa rendah latensi.
          </p>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`
              bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-all flex items-center space-x-2 shadow-lg shadow-blue-500/20
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Merakit Algoritma...
              </span>
            ) : 'Compile & Generate Code'}
          </button>
        </div>
      </div>

      {code && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative group">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs font-mono text-slate-500 tracking-widest">ardu_mg_dsp.ino</span>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(code);
                alert("Kode disalin!");
              }}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-slate-300 uppercase font-bold border border-slate-700 transition-all"
            >
              Salin Kode
            </button>
          </div>
          <pre className="bg-slate-950 p-6 rounded-xl overflow-x-auto text-[13px] font-mono text-blue-300 leading-relaxed border border-slate-800 max-h-[600px] no-scrollbar selection:bg-blue-500/30">
            {code}
          </pre>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <span className="bg-slate-800 p-2 rounded-lg mr-3 shadow-inner">💡</span> 
          Konsultasi DSP Expert
        </h3>
        <form onSubmit={handleAsk} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Tanyakan hal teknis, misal: 'Cara mengurangi noise di DAC internal?'"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-slate-600 transition-all"
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white px-8 py-3 rounded-xl text-sm font-bold transition-all border border-blue-500/20"
          >
            Tanya AI
          </button>
        </form>
        {chatResponse && (
          <div className="mt-6 p-6 bg-[#0c1220] border-l-4 border-blue-500 rounded-r-xl text-sm text-slate-300 leading-relaxed shadow-lg">
             <div className="font-bold text-blue-400 mb-2 uppercase text-[10px] tracking-widest">Expert Reply:</div>
             {chatResponse}
          </div>
        )}
      </div>
    </div>
  );
};