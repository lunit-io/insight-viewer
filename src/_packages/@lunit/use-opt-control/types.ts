export const controls = ['none', 'pen', 'pan', 'adjust', 'magnify'] as const;
export type Control = typeof controls[number];