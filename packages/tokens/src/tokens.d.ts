export declare const mono: Record<0 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000, string>;
export declare const font: { sans: string; mono: string };
export declare const text: Record<"xs" | "sm" | "base" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl", string>;
export declare const weight: { regular: 400; medium: 500; semibold: 600; bold: 700 };
export declare const leading: { tight: number; snug: number; normal: number; relaxed: number };
export declare const tracking: { tight: string; snug: string; normal: 0; wide: string; widest: string };
export declare const space: Record<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14, string>;
export declare const radius: Record<"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full", string>;
export declare const shadow: Record<"xs" | "sm" | "md" | "lg" | "xl" | "inset", string>;
export declare const easing: {
  standard: [number, number, number, number];
  emphasis: [number, number, number, number];
  exit: [number, number, number, number];
};
export declare const duration: { fast: number; base: number; slow: number };
export declare const container: Record<"sm" | "md" | "lg" | "xl" | "2xl", string>;
export declare const z: Record<"base" | "raised" | "sticky" | "overlay" | "modal" | "popover" | "toast", number>;

declare const tokens: {
  mono: typeof mono; font: typeof font; text: typeof text; weight: typeof weight;
  leading: typeof leading; tracking: typeof tracking; space: typeof space;
  radius: typeof radius; shadow: typeof shadow; easing: typeof easing;
  duration: typeof duration; container: typeof container; z: typeof z;
};
export default tokens;
