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

export const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));
