
import React from 'react';

const BOM_DATA = {
  standard: [
    { category: 'Pemrosesan', items: [{ name: 'ESP32 DevKit V1', price: 55000 }, { name: 'I2S DAC PCM5102A', price: 45000 }] },
    { category: 'Analog', items: [{ name: 'IC TL072 + Passives', price: 37000 }] },
    { category: 'Kontrol', items: [{ name: '3x Footswitch Metal SPST', price: 45000 }, { name: '4x Potentiometer Alpha (DRV, TON, GAIN, MST)', price: 40000 }, { name: 'OLED 0.96"', price: 35000 }, { name: 'Power Switch Toggle Metal', price: 12000 }, { name: 'Red LED 5mm + Resistor', price: 2000 }] },
    { category: 'Casing', items: [{ name: 'Aluminium 1590BB', price: 95000 }, { name: 'High-quality Jacks', price: 55000 }] },
    { category: 'Lainnya', items: [{ name: 'PCB & Wiring', price: 25000 }] }
  ],
  budget: [
    { category: 'Pemrosesan', items: [{ name: 'ESP32 DevKit V1', price: 55000 }, { name: 'Internal DAC (Skip PCM5102)', price: 0 }] },
    { category: 'Analog', items: [{ name: 'IC TL072 + Passives', price: 37000 }] },
    { category: 'Kontrol', items: [{ name: '3x Push Button Plastic', price: 6000 }, { name: '4x Generic Potentiometer (DRV, TON, GAIN, MST)', price: 20000 }, { name: 'OLED 0.96" (Keep for UI)', price: 35000 }, { name: 'Power Switch Slide Kecil', price: 3000 }, { name: 'Red LED 3mm + Resistor', price: 1500 }] },
    { category: 'Casing', items: [{ name: 'Box Plastik X6', price: 15000 }, { name: 'Generic Jacks', price: 20000 }] },
    { category: 'Lainnya', items: [{ name: 'PCB, Wiring & Foil Shielding', price: 25000 }] }
  ]
};

interface Props {
  mode: 'standard' | 'budget';
  onModeChange: (mode: 'standard' | 'budget') => void;
}

export const HardwareSection: React.FC<Props> = ({ mode, onModeChange }) => {
  const currentBOM = mode === 'standard' ? BOM_DATA.standard : BOM_DATA.budget;
  const totalCost = currentBOM.reduce((acc, cat) => 
    acc + cat.items.reduce((sum, item) => sum + item.price, 0), 0
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Budget Toggle */}
      <div className="flex flex-col items-center bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <h3 className="text-lg font-bold mb-4 italic tracking-tight">Configuration Settings</h3>
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 w-full max-w-md">
          <button 
            onClick={() => onModeChange('standard')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'standard' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Standard Build
          </button>
          <button 
            onClick={() => onModeChange('budget')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'budget' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Paket Hemat (300rb)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-1 rounded-3xl p-8 flex flex-col justify-between border shadow-xl ${mode === 'standard' ? 'bg-blue-600/10 border-blue-500/30' : 'bg-orange-600/10 border-orange-500/30'}`}>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Total Biaya Rakit</span>
            <h2 className="text-4xl font-black mt-2 tracking-tighter">Rp {totalCost.toLocaleString('id-ID')}</h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed italic">
              {mode === 'budget' 
                ? 'Optimal untuk pemula dengan dana terbatas. Fokus pada fungsionalitas inti dengan box plastik.' 
                : 'Kualitas premium dengan box aluminium dan DAC eksternal untuk sound stage yang lebih luas.'}
            </p>
          </div>
          <div className="mt-8 space-y-4">
             <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
               <h4 className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Pin Compatibility</h4>
               <p className="text-[11px] text-slate-400 leading-tight">ESP32 Pinout sudah dikalibrasi untuk resistor 10k pada input potensiometer.</p>
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h3 className="font-bold mb-6 flex items-center text-lg">
            <span className="bg-slate-800 p-2 rounded-lg mr-3 shadow-inner">📋</span>
            Bill of Materials ({mode === 'budget' ? 'Paket Hemat' : 'Standard'})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {currentBOM.map((cat, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-[11px] uppercase font-black text-blue-500 tracking-widest border-b border-slate-800 pb-2">{cat.category}</h4>
                {cat.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-1 border-b border-slate-800/30 last:border-0 group">
                    <span className={`transition-colors ${item.price === 0 ? 'text-slate-500 italic' : 'text-slate-300 group-hover:text-blue-300'}`}>{item.name}</span>
                    <span className="font-mono text-xs text-slate-500">
                      {item.price > 0 ? `Rp ${item.price.toLocaleString('id-ID')}` : 'Free'}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zero-Error Pre-Build Checklist */}
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <h3 className="text-xl font-bold mb-8 flex items-center text-slate-100">
          <span className="bg-blue-600 p-2 rounded-xl mr-4 text-white shadow-lg">✓</span> 
          Pre-Build Checklist (Zero Error Guide)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all">
             <div className="text-blue-400 font-black text-xs mb-3 uppercase tracking-widest">Langkah 1</div>
             <h4 className="font-bold text-slate-200 mb-2">Cek Polaritas DC</h4>
             <p className="text-xs text-slate-500 leading-relaxed">
               Gunakan adaptor Center Negative (9V gitar). Pastikan dioda 1N4007 terpasang sebelum VIN ESP32 untuk mencegah kerusakan jika terbalik.
             </p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all">
             <div className="text-blue-400 font-black text-xs mb-3 uppercase tracking-widest">Langkah 2</div>
             <h4 className="font-bold text-slate-200 mb-2">Shielding & Ground</h4>
             <p className="text-xs text-slate-500 leading-relaxed">
               Jika menggunakan box plastik, lapisi bagian dalam dengan aluminium foil. Hubungkan foil ke Ground untuk menghilangkan dengung (hum).
             </p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all">
             <div className="text-blue-400 font-black text-xs mb-3 uppercase tracking-widest">Langkah 3</div>
             <h4 className="font-bold text-slate-200 mb-2">Uji ADC Pin</h4>
             <p className="text-xs text-slate-500 leading-relaxed">
               Hubungkan kaki tengah Potensiometer ke Pin G34, G35, G32, G33. Pastikan tegangan di Pin tersebut 0-3.3V, jangan lebih!
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
