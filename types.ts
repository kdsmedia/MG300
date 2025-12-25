
export interface HardwareComponent {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'MCU' | 'AUDIO' | 'CONTROL' | 'POWER';
}

export interface EffectBlock {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  parameters: EffectParameter[];
}

export interface EffectParameter {
  name: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
}

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};
