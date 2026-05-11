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
  x: 3,
  y: 4,
  rotate: -1,
  brightness: 96,
  contrast: 112,
};

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
