export type Template = {
  id: number;
  kind: 'portrait-poster' | 'food-poster' | 'standard';
  title: string;
  description: string;
  image: string;
};
