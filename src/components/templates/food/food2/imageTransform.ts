export type ImageTransform = {
  scale: number;
  x: number;
  y: number;
  rotate: number;
  brightness: number;
  contrast: number;
};

export const defaultImageTransform: ImageTransform = {
  scale: 100,
  x: 0,
  y: 0,
  rotate: 0,
  brightness: 100,
  contrast: 100,
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
