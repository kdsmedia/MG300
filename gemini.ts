
import { GoogleGenAI } from "@google/genai";
import { EffectBlock } from "../types";

export class GeminiService {
  async generateArduinoCode(chain: EffectBlock[], buildMode: 'standard' | 'budget') {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const activeBlocks = chain.filter(b => b.enabled).map(b => `${b.name} (${JSON.stringify(b.parameters)})`).join(', ');
    
    const dspType = buildMode === 'standard' 
      ? "I2S External DAC (PCM5102A) via BCLK:26, WSEL:25, DOUT:22" 
      : "Internal 8-bit DAC via Pin G25 (dacWrite)";

    const prompt = `Act as a world-class DSP Audio Engineer. 
    Write a complete Arduino/ESP32 C++ .ino code for a guitar pedal.
    
    SYSTEM MODE: ${dspType}
    ACTIVE EFFECT CHAIN: ${activeBlocks}.
    
    HARDWARE MAPPING:
    - Potentiometer 1 (GPIO 34) -> Primary Drive/Gain of the first Drive block.
    - Potentiometer 2 (GPIO 35) -> Tone/Filter control.
    - Potentiometer 3 (GPIO 32) -> Modulation/Mix control.
    - Potentiometer 4 (GPIO 33) -> Master Volume Level.
    
    REQUIREMENTS:
    1. Include an interrupt-based audio loop or a high-speed Task on Core 1.
    2. Implement the ${buildMode === 'standard' ? 'I2S protocol' : 'direct dacWrite'} for output.
    3. Use fixed-point or optimized floating-point math for:
       - Overdrive: Soft-clipping tan-approx or cubic distortion.
       - Delay: Circular buffer with lerp interpolation.
       - Noise Gate: Fast-attack, slow-release gate logic.
    4. Ensure basic safety: DC offset removal for internal DAC mode.
    
    Output ONLY the code with professional comments explaining the DSP math.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          temperature: 0.4, // Lower temperature for more stable code output
          thinkingConfig: { thinkingBudget: 4096 }
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "// Error: Gagal menghasilkan kode. Pastikan API Key valid dan coba lagi.";
    }
  }

  async askDaqExpert(question: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an expert in DIY audio electronics, Arduino DSP, and Guitar Pedal building. 
        Context: Building a NUX MG300 clone using ESP32.
        Answer this question briefly and technically: ${question}`,
      });
      return response.text;
    } catch (error) {
      return "Terdapat kendala saat menghubungi asisten AI.";
    }
  }
}

export const geminiService = new GeminiService();
