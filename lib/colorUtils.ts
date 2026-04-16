import { colorPalettes } from '@/constants/design';

export const getColorPalette = (paletteName: string) => {
  return colorPalettes[paletteName as keyof typeof colorPalettes] || colorPalettes.luxury;
};

export const generateCSSVariables = (palette: any) => {
  const variables = `
    --color-primary: ${palette.primary};
    --color-secondary: ${palette.secondary};
    --color-accent: ${palette.accent};
    --color-success: ${palette.success};
    --color-danger: ${palette.danger};
    --color-warning: ${palette.warning};
    --color-info: ${palette.info};
    --color-light: ${palette.light};
  `;
  return variables;
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

export const lightenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const factor = 1 + percent / 100;
  const r = Math.min(255, Math.round(rgb.r * factor));
  const g = Math.min(255, Math.round(rgb.g * factor));
  const b = Math.min(255, Math.round(rgb.b * factor));
  
  return rgbToHex(r, g, b);
};

export const darkenColor = (hex: string, percent: number): string => {
  return lightenColor(hex, -percent);
};
