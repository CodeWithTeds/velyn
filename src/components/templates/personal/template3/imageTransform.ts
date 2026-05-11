export type ImageTransform = {
  scale: number;
  x: number;
  y: number;
  rotate: number;
  brightness: number;
  contrast: number;
};

export const defaultImageTransform: ImageTransform = {
  scale: 116,
  x: 0,
  y: 3,
  rotate: 0,
  brightness: 104,
  contrast: 112,
};

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
