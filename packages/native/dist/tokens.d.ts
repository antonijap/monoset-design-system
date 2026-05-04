/**
 * Monoset design tokens for React Native.
 * Exported as plain JS so they're usable in StyleSheet, Animated, or any RN context.
 *
 * Mirror of the web kit's @monoset/tokens (--mono-*, --space-*, --radius-*, etc.)
 * with the same step values. Numbers in spacing/radius are in pixels.
 */
declare const mono: {
    readonly 0: "#ffffff";
    readonly 50: "#fafafa";
    readonly 100: "#f4f4f5";
    readonly 200: "#e8e8ea";
    readonly 300: "#d4d4d7";
    readonly 400: "#a1a1a6";
    readonly 500: "#71717a";
    readonly 600: "#52525a";
    readonly 700: "#3f3f45";
    readonly 800: "#27272b";
    readonly 900: "#18181b";
    readonly 1000: "#09090b";
};
declare const colors: {
    readonly bg: "#ffffff";
    readonly bgSubtle: "#fafafa";
    readonly bgMuted: "#f4f4f5";
    readonly fg1: "#09090b";
    readonly fg2: "#3f3f45";
    readonly fg3: "#71717a";
    readonly fg4: "#a1a1a6";
    readonly borderSubtle: "#e8e8ea";
    readonly border: "#d4d4d7";
    readonly accent: "#09090b";
    readonly accentFg: "#ffffff";
    readonly accentHover: "#27272b";
    readonly statusSuccess: "#2e4a33";
    readonly statusWarning: "#7a5a1a";
    readonly statusDanger: "#a83232";
};
declare const space: {
    readonly 0: 0;
    readonly 1: 2;
    readonly 2: 4;
    readonly 3: 8;
    readonly 4: 12;
    readonly 5: 16;
    readonly 6: 20;
    readonly 7: 24;
    readonly 8: 32;
    readonly 9: 40;
    readonly 10: 48;
    readonly 11: 64;
    readonly 12: 80;
    readonly 13: 96;
    readonly 14: 128;
};
declare const radius: {
    readonly none: 0;
    readonly xs: 2;
    readonly sm: 4;
    readonly md: 6;
    readonly lg: 8;
    readonly xl: 12;
    readonly full: 9999;
};
declare const fontSize: {
    readonly xs: 11;
    readonly sm: 13;
    readonly base: 17;
    readonly lg: 20;
    readonly xl: 22;
    readonly "2xl": 28;
    readonly "3xl": 34;
    readonly "4xl": 44;
    readonly "5xl": 56;
};
declare const fontWeight: {
    readonly regular: "400";
    readonly medium: "500";
    readonly semibold: "600";
    readonly bold: "700";
};
declare const lineHeight: {
    readonly tight: 1.15;
    readonly snug: 1.3;
    readonly normal: 1.5;
    readonly relaxed: 1.7;
};
declare const shadow: {
    readonly sm: {
        readonly shadowColor: "#000";
        readonly shadowOpacity: 0.06;
        readonly shadowRadius: 2;
        readonly shadowOffset: {
            readonly width: 0;
            readonly height: 1;
        };
        readonly elevation: 1;
    };
    readonly md: {
        readonly shadowColor: "#000";
        readonly shadowOpacity: 0.08;
        readonly shadowRadius: 6;
        readonly shadowOffset: {
            readonly width: 0;
            readonly height: 2;
        };
        readonly elevation: 3;
    };
    readonly lg: {
        readonly shadowColor: "#000";
        readonly shadowOpacity: 0.12;
        readonly shadowRadius: 16;
        readonly shadowOffset: {
            readonly width: 0;
            readonly height: 6;
        };
        readonly elevation: 6;
    };
};
declare const tokens: {
    readonly mono: {
        readonly 0: "#ffffff";
        readonly 50: "#fafafa";
        readonly 100: "#f4f4f5";
        readonly 200: "#e8e8ea";
        readonly 300: "#d4d4d7";
        readonly 400: "#a1a1a6";
        readonly 500: "#71717a";
        readonly 600: "#52525a";
        readonly 700: "#3f3f45";
        readonly 800: "#27272b";
        readonly 900: "#18181b";
        readonly 1000: "#09090b";
    };
    readonly colors: {
        readonly bg: "#ffffff";
        readonly bgSubtle: "#fafafa";
        readonly bgMuted: "#f4f4f5";
        readonly fg1: "#09090b";
        readonly fg2: "#3f3f45";
        readonly fg3: "#71717a";
        readonly fg4: "#a1a1a6";
        readonly borderSubtle: "#e8e8ea";
        readonly border: "#d4d4d7";
        readonly accent: "#09090b";
        readonly accentFg: "#ffffff";
        readonly accentHover: "#27272b";
        readonly statusSuccess: "#2e4a33";
        readonly statusWarning: "#7a5a1a";
        readonly statusDanger: "#a83232";
    };
    readonly space: {
        readonly 0: 0;
        readonly 1: 2;
        readonly 2: 4;
        readonly 3: 8;
        readonly 4: 12;
        readonly 5: 16;
        readonly 6: 20;
        readonly 7: 24;
        readonly 8: 32;
        readonly 9: 40;
        readonly 10: 48;
        readonly 11: 64;
        readonly 12: 80;
        readonly 13: 96;
        readonly 14: 128;
    };
    readonly radius: {
        readonly none: 0;
        readonly xs: 2;
        readonly sm: 4;
        readonly md: 6;
        readonly lg: 8;
        readonly xl: 12;
        readonly full: 9999;
    };
    readonly fontSize: {
        readonly xs: 11;
        readonly sm: 13;
        readonly base: 17;
        readonly lg: 20;
        readonly xl: 22;
        readonly "2xl": 28;
        readonly "3xl": 34;
        readonly "4xl": 44;
        readonly "5xl": 56;
    };
    readonly fontWeight: {
        readonly regular: "400";
        readonly medium: "500";
        readonly semibold: "600";
        readonly bold: "700";
    };
    readonly lineHeight: {
        readonly tight: 1.15;
        readonly snug: 1.3;
        readonly normal: 1.5;
        readonly relaxed: 1.7;
    };
    readonly shadow: {
        readonly sm: {
            readonly shadowColor: "#000";
            readonly shadowOpacity: 0.06;
            readonly shadowRadius: 2;
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 1;
            };
            readonly elevation: 1;
        };
        readonly md: {
            readonly shadowColor: "#000";
            readonly shadowOpacity: 0.08;
            readonly shadowRadius: 6;
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 2;
            };
            readonly elevation: 3;
        };
        readonly lg: {
            readonly shadowColor: "#000";
            readonly shadowOpacity: 0.12;
            readonly shadowRadius: 16;
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 6;
            };
            readonly elevation: 6;
        };
    };
};
type Tokens = typeof tokens;

export { type Tokens, colors, tokens as default, fontSize, fontWeight, lineHeight, mono, radius, shadow, space, tokens };
