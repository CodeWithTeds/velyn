export type ImageTransform = {
  brightness: number;
  contrast: number;
  rotate: number;
  scale: number;
  x: number;
  y: number;
};

export const defaultImageTransform: ImageTransform = {
  brightness: 100,
  contrast: 110,
  rotate: 0,
  scale: 100,
  x: 0,
  y: 0,
};

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
