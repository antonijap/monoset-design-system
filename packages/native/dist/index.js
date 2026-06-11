import {
  styles
} from "./chunk-NKOVPEOD.js";
import {
  colors,
  fontSize,
  fontWeight,
  lineHeight,
  mono,
  radius,
  shadow,
  space,
  tokens
} from "./chunk-HQARWLYL.js";

// src/Button.tsx
import { forwardRef } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { jsx, jsxs } from "react/jsx-runtime";
var Button = forwardRef(function Button2({ variant = "secondary", size = "md", disabled, loading, leading, trailing, children, style, ...rest }, ref) {
  const sizeStyle = size === "sm" ? styles.msBtnSm : size === "lg" ? styles.msBtnLg : styles.msBtnMd;
  const variantStyle = disabled && !loading ? styles.msBtnDisabled : variant === "primary" ? styles.msBtnPrimary : variant === "ghost" ? styles.msBtnGhost : variant === "danger" ? styles.msBtnDanger : styles.msBtnSecondary;
  const labelVariantStyle = disabled && !loading ? styles.msBtnLabelDisabled : variant === "primary" ? styles.msBtnLabelPrimary : variant === "ghost" ? styles.msBtnLabelGhost : variant === "danger" ? styles.msBtnLabelDanger : styles.msBtnLabelSecondary;
  const spinnerColor = variant === "primary" ? colors.accentFg : colors.fg1;
  return /* @__PURE__ */ jsxs(
    Pressable,
    {
      ref,
      disabled: disabled || loading,
      accessibilityState: loading ? { busy: true, disabled: true } : void 0,
      android_ripple: { color: variant === "primary" || variant === "danger" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)" },
      style: ({ pressed }) => [
        styles.msBtn,
        sizeStyle,
        variantStyle,
        pressed && !disabled && !loading && { opacity: 0.85 },
        style
      ],
      ...rest,
      children: [
        loading ? /* @__PURE__ */ jsx(ActivityIndicator, { size: "small", color: spinnerColor }) : leading,
        /* @__PURE__ */ jsx(Text, { style: [
          styles.msBtnLabel,
          size === "sm" && styles.msBtnLabelSm,
          size === "lg" && styles.msBtnLabelLg,
          labelVariantStyle,
          loading || leading ? { marginLeft: 6 } : null,
          trailing ? { marginRight: 6 } : null
        ], children }),
        trailing
      ]
    }
  );
});

// src/Card.tsx
import { forwardRef as forwardRef2 } from "react";
import { View as View2 } from "react-native";
import { jsx as jsx2 } from "react/jsx-runtime";
var Card = forwardRef2(function Card2({ variant = "default", children, style, ...rest }, ref) {
  return /* @__PURE__ */ jsx2(
    View2,
    {
      ref,
      style: [
        styles.msCard,
        variant === "elevated" && styles.msCardElevated,
        variant === "inset" && styles.msCardInset,
        style
      ],
      ...rest,
      children
    }
  );
});

// src/Input.tsx
import { forwardRef as forwardRef3, useState } from "react";
import {
  TextInput,
  View as View3,
  Text as Text2
} from "react-native";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var Input = forwardRef3(function Input2({ invalid, editable = true, onFocus, onBlur, style, ...rest }, ref) {
  const [focused, setFocused] = useState(false);
  return /* @__PURE__ */ jsx3(
    TextInput,
    {
      ref,
      editable,
      placeholderTextColor: colors.fg4,
      onFocus: (e) => {
        setFocused(true);
        onFocus?.(e);
      },
      onBlur: (e) => {
        setFocused(false);
        onBlur?.(e);
      },
      style: [
        styles.msInput,
        focused && styles.msInputFocused,
        invalid && styles.msInputError,
        !editable && styles.msInputDisabled,
        style
      ],
      ...rest
    }
  );
});
function Field({ label, help, error, children, style }) {
  return /* @__PURE__ */ jsxs2(View3, { style: [styles.msField, style], children: [
    label && /* @__PURE__ */ jsx3(Text2, { style: styles.msFieldLabel, children: label }),
    children,
    error ? /* @__PURE__ */ jsx3(Text2, { style: styles.msFieldError, children: error }) : help ? /* @__PURE__ */ jsx3(Text2, { style: styles.msFieldHelp, children: help }) : null
  ] });
}

// src/Layout.tsx
import { forwardRef as forwardRef4 } from "react";
import { View as View4 } from "react-native";
import { jsx as jsx4 } from "react/jsx-runtime";
var alignMap = {
  stretch: "stretch",
  start: "flex-start",
  center: "center",
  end: "flex-end"
};
var Stack = forwardRef4(function Stack2({ gap = 4, align = "stretch", children, style, ...rest }, ref) {
  return /* @__PURE__ */ jsx4(
    View4,
    {
      ref,
      style: [styles.msStack, { gap: space[gap], alignItems: alignMap[align] }, style],
      ...rest,
      children
    }
  );
});
var justifyMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around"
};
var Inline = forwardRef4(function Inline2({ gap = 3, align = "center", justify = "start", wrap, children, style, ...rest }, ref) {
  return /* @__PURE__ */ jsx4(
    View4,
    {
      ref,
      style: [
        styles.msInline,
        {
          gap: space[gap],
          alignItems: alignMap[align],
          justifyContent: justifyMap[justify],
          flexWrap: wrap ? "wrap" : "nowrap"
        },
        style
      ],
      ...rest,
      children
    }
  );
});

// src/Switch.tsx
import { forwardRef as forwardRef5, useEffect, useRef, useState as useState2 } from "react";
import { Animated, Easing, Pressable as Pressable2 } from "react-native";
import { jsx as jsx5 } from "react/jsx-runtime";
var TRACK_COLOR_OFF = colors.border;
var TRACK_COLOR_ON = colors.accent;
var THUMB_TRAVEL = 20;
var Switch = forwardRef5(function Switch2({ checked, defaultChecked, onCheckedChange, disabled, label, ...rest }, ref) {
  const isControlled = checked !== void 0;
  const [internal, setInternal] = useState2(!!defaultChecked);
  const value = isControlled ? !!checked : internal;
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: 180,
      easing: Easing.bezier(0.3, 0, 0, 1),
      useNativeDriver: false
      // backgroundColor needs the JS driver
    }).start();
  }, [value, progress]);
  const trackBg = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [TRACK_COLOR_OFF, TRACK_COLOR_ON]
  });
  const thumbX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, THUMB_TRAVEL]
  });
  const onPress = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };
  return /* @__PURE__ */ jsx5(
    Pressable2,
    {
      ref,
      role: "switch",
      accessibilityState: { checked: value, disabled },
      accessibilityLabel: label,
      onPress,
      disabled,
      hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
      style: ({ pressed }) => [
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }
      ],
      ...rest,
      children: /* @__PURE__ */ jsx5(Animated.View, { style: [styles.msSwitchTrack, { backgroundColor: trackBg }], children: /* @__PURE__ */ jsx5(Animated.View, { style: [styles.msSwitchThumb, { transform: [{ translateX: thumbX }] }] }) })
    }
  );
});

// src/Spinner.tsx
import { forwardRef as forwardRef6, useEffect as useEffect3, useRef as useRef2 } from "react";
import { Animated as Animated2, Easing as Easing2 } from "react-native";

// src/useReducedMotion.ts
import { useEffect as useEffect2, useState as useState3 } from "react";
import { AccessibilityInfo } from "react-native";
function useReducedMotion() {
  const [reduced, setReduced] = useState3(false);
  useEffect2(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (mounted) setReduced(value);
    });
    const sub = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduced);
    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);
  return reduced;
}

// src/Spinner.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var Spinner = forwardRef6(function Spinner2({ size = 16, color = colors.fg1, label = "Loading" }, ref) {
  const angle = useRef2(new Animated2.Value(0)).current;
  const reduceMotion = useReducedMotion();
  useEffect3(() => {
    if (reduceMotion) return;
    const anim = Animated2.loop(
      Animated2.timing(angle, {
        toValue: 1,
        duration: 800,
        easing: Easing2.linear,
        useNativeDriver: true
      })
    );
    anim.start();
    return () => anim.stop();
  }, [angle, reduceMotion]);
  const rotate = angle.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  return /* @__PURE__ */ jsx6(
    Animated2.View,
    {
      ref,
      accessibilityRole: "progressbar",
      accessibilityLabel: label,
      style: [
        styles.msSpinner,
        { width: size, height: size, borderColor: colors.border, borderTopColor: color },
        { transform: [{ rotate }] }
      ]
    }
  );
});

// src/Skeleton.tsx
import { useEffect as useEffect4, useRef as useRef3 } from "react";
import { Animated as Animated3, Easing as Easing3 } from "react-native";
import { jsx as jsx7 } from "react/jsx-runtime";
function Skeleton({ width = "100%", height = 17, radius: radius2 = 4 }) {
  const opacity = useRef3(new Animated3.Value(0.6)).current;
  const reduceMotion = useReducedMotion();
  useEffect4(() => {
    if (reduceMotion) {
      opacity.setValue(0.8);
      return;
    }
    const anim = Animated3.loop(
      Animated3.sequence([
        Animated3.timing(opacity, {
          toValue: 1,
          duration: 900,
          easing: Easing3.inOut(Easing3.ease),
          useNativeDriver: true
        }),
        Animated3.timing(opacity, {
          toValue: 0.6,
          duration: 900,
          easing: Easing3.inOut(Easing3.ease),
          useNativeDriver: true
        })
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [opacity, reduceMotion]);
  return /* @__PURE__ */ jsx7(
    Animated3.View,
    {
      accessibilityRole: "progressbar",
      accessibilityLabel: "Loading",
      style: [styles.msSkeleton, { width, height, borderRadius: radius2, opacity }]
    }
  );
}

// src/Avatar.tsx
import { forwardRef as forwardRef7 } from "react";
import { View as View7, Text as Text3, Image } from "react-native";
import { jsx as jsx8 } from "react/jsx-runtime";
function initials(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "").join("");
}
var Avatar = forwardRef7(function Avatar2({ name, source, size = "md", style, ...rest }, ref) {
  const sizeStyle = size === "sm" ? styles.msAvatarSm : size === "lg" ? styles.msAvatarLg : styles.msAvatarMd;
  const textStyle = size === "sm" ? styles.msAvatarTextSm : size === "lg" ? styles.msAvatarTextLg : styles.msAvatarTextMd;
  return /* @__PURE__ */ jsx8(View7, { ref, style: [styles.msAvatar, sizeStyle, style], ...rest, children: source ? /* @__PURE__ */ jsx8(Image, { source, style: { width: "100%", height: "100%" } }) : /* @__PURE__ */ jsx8(Text3, { style: [styles.msAvatarText, textStyle], children: initials(name) }) });
});

// src/Badge.tsx
import { forwardRef as forwardRef8 } from "react";
import { View as View8, Text as Text4 } from "react-native";
import { jsx as jsx9, jsxs as jsxs3 } from "react/jsx-runtime";
var Badge = forwardRef8(function Badge2({ variant = "neutral", children, leading, style, ...rest }, ref) {
  const variantStyle = variant === "solid" ? styles.msBadgeSolid : variant === "outline" ? styles.msBadgeOutline : variant === "success" ? styles.msBadgeSuccess : variant === "danger" ? styles.msBadgeDanger : styles.msBadgeNeutral;
  const textVariantStyle = variant === "solid" ? styles.msBadgeTextSolid : variant === "outline" ? styles.msBadgeTextOutline : variant === "success" ? styles.msBadgeTextSuccess : variant === "danger" ? styles.msBadgeTextDanger : styles.msBadgeTextNeutral;
  return /* @__PURE__ */ jsxs3(View8, { ref, style: [styles.msBadge, variantStyle, style], ...rest, children: [
    leading,
    /* @__PURE__ */ jsx9(Text4, { style: [styles.msBadgeText, textVariantStyle], children })
  ] });
});

// src/Alert.tsx
import { forwardRef as forwardRef9 } from "react";
import { View as View9, Text as Text5 } from "react-native";
import { Info, Check, AlertCircle } from "lucide-react-native";
import { jsx as jsx10, jsxs as jsxs4 } from "react/jsx-runtime";
var Alert = forwardRef9(function Alert2({ variant = "info", title, children, icon, style, ...rest }, ref) {
  const variantStyle = variant === "success" ? styles.msAlertSuccess : variant === "warning" ? styles.msAlertWarning : variant === "danger" ? styles.msAlertDanger : styles.msAlertInfo;
  const iconWrapStyle = variant === "success" ? styles.msAlertIconWrapSuccess : variant === "warning" ? styles.msAlertIconWrapWarning : variant === "danger" ? styles.msAlertIconWrapDanger : styles.msAlertIconWrapInfo;
  const iconColor = colors.fg1;
  const DefaultIcon = variant === "success" ? Check : variant === "info" ? Info : AlertCircle;
  const accessibilityRole = variant === "danger" || variant === "warning" ? "alert" : "text";
  return /* @__PURE__ */ jsxs4(
    View9,
    {
      ref,
      accessibilityRole,
      style: [styles.msAlert, variantStyle, style],
      ...rest,
      children: [
        /* @__PURE__ */ jsx10(View9, { style: [styles.msAlertIconWrap, iconWrapStyle], children: icon ?? /* @__PURE__ */ jsx10(DefaultIcon, { size: 16, color: iconColor, strokeWidth: 2 }) }),
        /* @__PURE__ */ jsxs4(View9, { style: styles.msAlertBody, children: [
          title && /* @__PURE__ */ jsx10(Text5, { style: styles.msAlertTitle, children: title }),
          typeof children === "string" ? /* @__PURE__ */ jsx10(Text5, { style: styles.msAlertMessage, children }) : children
        ] })
      ]
    }
  );
});

// src/Divider.tsx
import { forwardRef as forwardRef10 } from "react";
import { View as View10 } from "react-native";
import { jsx as jsx11 } from "react/jsx-runtime";
var Divider = forwardRef10(function Divider2({ orientation = "horizontal", style, ...rest }, ref) {
  return /* @__PURE__ */ jsx11(
    View10,
    {
      ref,
      role: "separator",
      style: [
        styles.msDivider,
        orientation === "vertical" ? styles.msDividerVertical : styles.msDividerHorizontal,
        style
      ],
      ...rest
    }
  );
});

// src/EmptyState.tsx
import { forwardRef as forwardRef11 } from "react";
import { View as View11, Text as Text6 } from "react-native";
import { jsx as jsx12, jsxs as jsxs5 } from "react/jsx-runtime";
var EmptyState = forwardRef11(function EmptyState2({ title, body, icon, action, style, ...rest }, ref) {
  return /* @__PURE__ */ jsxs5(View11, { ref, style: [styles.msEmpty, style], ...rest, children: [
    icon && /* @__PURE__ */ jsx12(View11, { style: styles.msEmptyIcon, children: icon }),
    /* @__PURE__ */ jsx12(Text6, { style: styles.msEmptyTitle, children: title }),
    body && (typeof body === "string" ? /* @__PURE__ */ jsx12(Text6, { style: styles.msEmptyBody, children: body }) : /* @__PURE__ */ jsx12(View11, { children: body })),
    action && /* @__PURE__ */ jsx12(View11, { style: { marginTop: space[3] }, children: action })
  ] });
});

// src/ListItem.tsx
import { forwardRef as forwardRef12 } from "react";
import { Pressable as Pressable3, View as View12, Text as Text7 } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { jsx as jsx13, jsxs as jsxs6 } from "react/jsx-runtime";
var ListItem = forwardRef12(function ListItem2({ title, subtitle, leading, trailing, chevron, onPress, style, ...rest }, ref) {
  const tappable = !!onPress;
  return /* @__PURE__ */ jsxs6(
    Pressable3,
    {
      ref,
      onPress,
      disabled: !tappable,
      style: ({ pressed }) => [
        styles.msListItem,
        pressed && tappable && styles.msListItemPressed,
        style
      ],
      ...rest,
      children: [
        leading,
        /* @__PURE__ */ jsxs6(View12, { style: styles.msListItemBody, children: [
          typeof title === "string" ? /* @__PURE__ */ jsx13(Text7, { style: styles.msListItemTitle, numberOfLines: 1, children: title }) : title,
          subtitle && (typeof subtitle === "string" ? /* @__PURE__ */ jsx13(Text7, { style: styles.msListItemSubtitle, numberOfLines: 1, children: subtitle }) : subtitle)
        ] }),
        trailing ?? (chevron && tappable ? /* @__PURE__ */ jsx13(ChevronRight, { size: 16, color: colors.fg4, strokeWidth: 2 }) : null)
      ]
    }
  );
});

// src/Checkbox.tsx
import { forwardRef as forwardRef13, useState as useState4 } from "react";
import { Pressable as Pressable4, Text as Text8, View as View13 } from "react-native";
import { Check as Check2 } from "lucide-react-native";
import { jsx as jsx14, jsxs as jsxs7 } from "react/jsx-runtime";
var Checkbox = forwardRef13(function Checkbox2({ checked, defaultChecked, onCheckedChange, label, disabled, style, ...rest }, ref) {
  const isControlled = checked !== void 0;
  const [internal, setInternal] = useState4(!!defaultChecked);
  const value = isControlled ? !!checked : internal;
  const onPress = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };
  return /* @__PURE__ */ jsxs7(
    Pressable4,
    {
      ref,
      role: "checkbox",
      accessibilityState: { checked: value, disabled },
      onPress,
      disabled,
      style: ({ pressed }) => [
        styles.msCheckRow,
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style
      ],
      ...rest,
      children: [
        /* @__PURE__ */ jsx14(View13, { style: [styles.msCheck, value && styles.msCheckChecked], children: value && /* @__PURE__ */ jsx14(Check2, { size: 14, color: colors.accentFg, strokeWidth: 3 }) }),
        label && (typeof label === "string" ? /* @__PURE__ */ jsx14(Text8, { style: styles.msCheckLabel, children: label }) : label)
      ]
    }
  );
});

// src/RadioGroup.tsx
import { createContext, forwardRef as forwardRef14, useContext, useState as useState5 } from "react";
import { Pressable as Pressable5, Text as Text9, View as View14 } from "react-native";
import { jsx as jsx15, jsxs as jsxs8 } from "react/jsx-runtime";
var Ctx = createContext(null);
function RadioGroup({ value, defaultValue, onValueChange, disabled, children, style, ...rest }) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState5(defaultValue);
  const current = isControlled ? value : internal;
  const setValue = (v) => {
    if (disabled) return;
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };
  return /* @__PURE__ */ jsx15(Ctx.Provider, { value: { value: current, setValue, disabled }, children: /* @__PURE__ */ jsx15(View14, { style, accessibilityRole: "radiogroup", ...rest, children }) });
}
var Radio = forwardRef14(function Radio2({ value, label, disabled: itemDisabled, style, ...rest }, ref) {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Radio must be used inside <RadioGroup>.");
  const checked = ctx.value === value;
  const disabled = itemDisabled || ctx.disabled;
  return /* @__PURE__ */ jsxs8(
    Pressable5,
    {
      ref,
      role: "radio",
      accessibilityState: { checked, disabled },
      onPress: () => ctx.setValue(value),
      disabled,
      style: ({ pressed }) => [
        styles.msRadioRow,
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style
      ],
      ...rest,
      children: [
        /* @__PURE__ */ jsx15(View14, { style: [styles.msRadio, checked && styles.msRadioChecked], children: checked && /* @__PURE__ */ jsx15(View14, { style: styles.msRadioDot }) }),
        label && (typeof label === "string" ? /* @__PURE__ */ jsx15(Text9, { style: styles.msRadioLabel, children: label }) : label)
      ]
    }
  );
});

// src/Chip.tsx
import { forwardRef as forwardRef15 } from "react";
import { Pressable as Pressable6, Text as Text10 } from "react-native";
import { jsx as jsx16, jsxs as jsxs9 } from "react/jsx-runtime";
var Chip = forwardRef15(function Chip2({ selected, onSelectedChange, leading, trailing, children, onPress, style, ...rest }, ref) {
  const handlePress = (e) => {
    onPress?.(e);
    onSelectedChange?.(!selected);
  };
  return /* @__PURE__ */ jsxs9(
    Pressable6,
    {
      ref,
      onPress: handlePress,
      accessibilityState: { selected },
      style: ({ pressed }) => [
        styles.msChip,
        pressed && !selected && styles.msChipPressed,
        selected && styles.msChipSelected,
        style
      ],
      ...rest,
      children: [
        leading,
        /* @__PURE__ */ jsx16(Text10, { style: [styles.msChipText, selected && styles.msChipTextSelected], children }),
        trailing
      ]
    }
  );
});

// src/Progress.tsx
import { forwardRef as forwardRef16, useEffect as useEffect5, useRef as useRef4 } from "react";
import { Animated as Animated4, View as View16 } from "react-native";
import { jsx as jsx17 } from "react/jsx-runtime";
var Progress = forwardRef16(function Progress2({ value, max = 100, style, ...rest }, ref) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const width = useRef4(new Animated4.Value(pct)).current;
  useEffect5(() => {
    Animated4.timing(width, {
      toValue: pct,
      duration: 280,
      useNativeDriver: false
    }).start();
  }, [pct, width]);
  return /* @__PURE__ */ jsx17(
    View16,
    {
      ref,
      accessibilityRole: "progressbar",
      accessibilityValue: { min: 0, max: 100, now: pct },
      style: [styles.msProgressTrack, style],
      ...rest,
      children: /* @__PURE__ */ jsx17(
        Animated4.View,
        {
          style: [
            styles.msProgressFill,
            { width: width.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }) }
          ]
        }
      )
    }
  );
});

// src/Sheet.tsx
import { forwardRef as forwardRef17, useEffect as useEffect6, useRef as useRef5 } from "react";
import {
  Animated as Animated5,
  Easing as Easing4,
  Modal,
  Pressable as Pressable7,
  View as View17,
  Text as Text11
} from "react-native";
import { jsx as jsx18, jsxs as jsxs10 } from "react/jsx-runtime";
var Sheet = forwardRef17(function Sheet2({ open, onClose, title, description, grabber = true, children, ...rest }, ref) {
  const reduceMotion = useReducedMotion();
  const translateY = useRef5(new Animated5.Value(40)).current;
  const opacity = useRef5(new Animated5.Value(0)).current;
  useEffect6(() => {
    Animated5.parallel([
      Animated5.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: reduceMotion ? 0 : open ? 180 : 120,
        easing: Easing4.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      }),
      Animated5.timing(translateY, {
        toValue: open ? 0 : 40,
        duration: reduceMotion ? 0 : open ? 280 : 180,
        easing: Easing4.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      })
    ]).start();
  }, [open, opacity, translateY, reduceMotion]);
  return /* @__PURE__ */ jsx18(
    Modal,
    {
      visible: open,
      transparent: true,
      animationType: "none",
      onRequestClose: onClose,
      statusBarTranslucent: true,
      ...rest,
      children: /* @__PURE__ */ jsxs10(Animated5.View, { style: { flex: 1, opacity }, children: [
        /* @__PURE__ */ jsx18(Pressable7, { style: styles.msSheetScrim, onPress: onClose }),
        /* @__PURE__ */ jsxs10(
          Animated5.View,
          {
            ref,
            style: [styles.msSheet, { transform: [{ translateY }] }],
            accessibilityViewIsModal: true,
            children: [
              grabber && /* @__PURE__ */ jsx18(View17, { style: styles.msSheetGrabber }),
              title && /* @__PURE__ */ jsx18(Text11, { style: styles.msSheetTitle, children: title }),
              description && /* @__PURE__ */ jsx18(Text11, { style: styles.msSheetDesc, children: description }),
              /* @__PURE__ */ jsx18(View17, { style: { marginTop: title || description ? 16 : 0 }, children })
            ]
          }
        )
      ] })
    }
  );
});

// src/Dialog.tsx
import { forwardRef as forwardRef18, useEffect as useEffect7, useRef as useRef6 } from "react";
import {
  Animated as Animated6,
  Easing as Easing5,
  Modal as Modal2,
  Pressable as Pressable8,
  View as View18,
  Text as Text12
} from "react-native";
import { jsx as jsx19, jsxs as jsxs11 } from "react/jsx-runtime";
var Dialog = forwardRef18(function Dialog2({ open, onClose, title, description, dismissible = true, children, ...rest }, ref) {
  const reduceMotion = useReducedMotion();
  const opacity = useRef6(new Animated6.Value(0)).current;
  const scale = useRef6(new Animated6.Value(0.96)).current;
  useEffect7(() => {
    Animated6.parallel([
      Animated6.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: reduceMotion ? 0 : open ? 180 : 120,
        easing: Easing5.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      }),
      Animated6.timing(scale, {
        toValue: open ? 1 : 0.96,
        duration: reduceMotion ? 0 : open ? 220 : 140,
        easing: Easing5.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      })
    ]).start();
  }, [open, opacity, scale, reduceMotion]);
  return /* @__PURE__ */ jsx19(
    Modal2,
    {
      visible: open,
      transparent: true,
      animationType: "none",
      onRequestClose: onClose,
      statusBarTranslucent: true,
      ...rest,
      children: /* @__PURE__ */ jsxs11(Animated6.View, { style: [styles.msDialogScrim, { opacity }], children: [
        /* @__PURE__ */ jsx19(
          Pressable8,
          {
            style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
            onPress: dismissible ? onClose : void 0
          }
        ),
        /* @__PURE__ */ jsxs11(
          Animated6.View,
          {
            ref,
            style: [styles.msDialog, { transform: [{ scale }] }],
            accessibilityViewIsModal: true,
            children: [
              title && /* @__PURE__ */ jsx19(Text12, { style: styles.msDialogTitle, children: title }),
              description && /* @__PURE__ */ jsx19(Text12, { style: styles.msDialogDesc, children: description }),
              /* @__PURE__ */ jsx19(View18, { style: { marginTop: title || description ? 16 : 0 }, children })
            ]
          }
        )
      ] })
    }
  );
});

// src/Toast.tsx
import { createContext as createContext2, useCallback, useContext as useContext2, useEffect as useEffect8, useMemo, useRef as useRef7, useState as useState6 } from "react";
import { Animated as Animated7, Easing as Easing6, Pressable as Pressable9, Text as Text13, View as View19 } from "react-native";
import { jsx as jsx20, jsxs as jsxs12 } from "react/jsx-runtime";
var Ctx2 = createContext2(null);
var nextId = 1;
function ToastProvider({ children, defaultDuration = 3500 }) {
  const [items, setItems] = useState6([]);
  const timers = useRef7(/* @__PURE__ */ new Map());
  const dismiss = useCallback((id) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const toast = useCallback((item) => {
    const id = nextId++;
    setItems((prev) => [...prev, { id, ...item }]);
    timers.current.set(id, setTimeout(() => dismiss(id), item.duration ?? defaultDuration));
    return id;
  }, [defaultDuration, dismiss]);
  useEffect8(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);
  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
  return /* @__PURE__ */ jsxs12(Ctx2.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsx20(View19, { style: styles.msToastWrap, pointerEvents: "box-none", children: items.map((t) => /* @__PURE__ */ jsx20(ToastView, { item: t, onDismiss: () => dismiss(t.id) }, t.id)) })
  ] });
}
function ToastView({ item, onDismiss }) {
  const opacity = useRef7(new Animated7.Value(0)).current;
  const ty = useRef7(new Animated7.Value(20)).current;
  const reduceMotion = useReducedMotion();
  useEffect8(() => {
    Animated7.parallel([
      Animated7.timing(opacity, { toValue: 1, duration: reduceMotion ? 0 : 180, easing: Easing6.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
      Animated7.timing(ty, { toValue: 0, duration: reduceMotion ? 0 : 220, easing: Easing6.bezier(0.3, 0, 0, 1), useNativeDriver: true })
    ]).start();
  }, [opacity, ty, reduceMotion]);
  return /* @__PURE__ */ jsxs12(Animated7.View, { style: [styles.msToast, { opacity, transform: [{ translateY: ty }], marginBottom: 8 }], children: [
    /* @__PURE__ */ jsx20(Text13, { style: styles.msToastTitle, children: item.title }),
    item.action && /* @__PURE__ */ jsx20(
      Pressable9,
      {
        accessibilityRole: "button",
        hitSlop: { top: 12, bottom: 12, left: 8, right: 8 },
        onPress: () => {
          item.onActionPress?.();
          onDismiss();
        },
        children: /* @__PURE__ */ jsx20(Text13, { style: styles.msToastAction, children: item.action })
      }
    )
  ] });
}
function useToast() {
  const ctx = useContext2(Ctx2);
  if (!ctx) throw new Error("useToast must be called inside <ToastProvider>.");
  return ctx;
}

// src/Slider.tsx
import { forwardRef as forwardRef19, useState as useState7 } from "react";
import { View as View20 } from "react-native";
import { jsx as jsx21, jsxs as jsxs13 } from "react/jsx-runtime";
var Slider = forwardRef19(function Slider2({ value, onValueChange, min = 0, max = 100, step = 1, disabled, style, ...rest }, ref) {
  const [trackWidth, setTrackWidth] = useState7(0);
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const updateFromX = (x) => {
    if (disabled || trackWidth === 0) return;
    const ratio = Math.max(0, Math.min(1, x / trackWidth));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.max(min, Math.min(max, stepped));
    if (clamped !== value) onValueChange(clamped);
  };
  const stepValue = (delta) => {
    if (disabled) return;
    const clamped = Math.max(min, Math.min(max, value + delta));
    if (clamped !== value) onValueChange(clamped);
  };
  return /* @__PURE__ */ jsxs13(
    View20,
    {
      ref,
      accessibilityRole: "adjustable",
      accessibilityValue: { min, max, now: value },
      accessibilityActions: [{ name: "increment" }, { name: "decrement" }],
      onAccessibilityAction: (e) => {
        if (e.nativeEvent.actionName === "increment") stepValue(step);
        else if (e.nativeEvent.actionName === "decrement") stepValue(-step);
      },
      onLayout: (e) => setTrackWidth(e.nativeEvent.layout.width),
      onStartShouldSetResponder: () => !disabled,
      onMoveShouldSetResponder: () => !disabled,
      onResponderGrant: (e) => updateFromX(e.nativeEvent.locationX),
      onResponderMove: (e) => updateFromX(e.nativeEvent.locationX),
      style: [
        { paddingVertical: 20, justifyContent: "center", opacity: disabled ? 0.5 : 1 },
        style
      ],
      ...rest,
      children: [
        /* @__PURE__ */ jsx21(View20, { style: styles.msSliderTrack, children: /* @__PURE__ */ jsx21(View20, { style: [styles.msSliderFill, { width: `${pct * 100}%` }] }) }),
        /* @__PURE__ */ jsx21(
          View20,
          {
            style: [
              styles.msSliderThumb,
              { left: `${pct * 100}%`, marginLeft: -12 }
            ]
          }
        )
      ]
    }
  );
});

// src/SegmentedControl.tsx
import { forwardRef as forwardRef20, useState as useState8, Fragment } from "react";
import { Pressable as Pressable10, Text as Text14, View as View21 } from "react-native";
import { jsx as jsx22, jsxs as jsxs14 } from "react/jsx-runtime";
var SegmentedControl = forwardRef20(function SegmentedControl2({ items, value, defaultValue, onValueChange, style, ...rest }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState8(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;
  const activeIndex = items.findIndex((i) => i.value === current);
  return /* @__PURE__ */ jsx22(View21, { ref, style: [styles.msSegmented, style], role: "tablist", ...rest, children: items.map((item, i) => {
    const active = i === activeIndex;
    const showSeparator = i > 0 && i !== activeIndex && i - 1 !== activeIndex;
    return /* @__PURE__ */ jsxs14(Fragment, { children: [
      i > 0 && /* @__PURE__ */ jsx22(View21, { style: [styles.msSegmentedSeparator, !showSeparator && { opacity: 0 }], "aria-hidden": true }),
      /* @__PURE__ */ jsx22(
        Pressable10,
        {
          role: "tab",
          accessibilityState: { selected: active, disabled: item.disabled },
          disabled: item.disabled,
          onPress: () => {
            if (!isControlled) setInternal(item.value);
            onValueChange?.(item.value);
          },
          style: [
            styles.msSegmentedItem,
            active && styles.msSegmentedItemActive,
            item.disabled && { opacity: 0.4 }
          ],
          children: typeof item.label === "string" ? /* @__PURE__ */ jsx22(Text14, { style: [styles.msSegmentedText, active && styles.msSegmentedTextActive], children: item.label }) : item.label
        }
      )
    ] }, item.value);
  }) });
});

// src/TabBar.tsx
import { forwardRef as forwardRef21, useState as useState9 } from "react";
import { Pressable as Pressable11, Text as Text15, View as View22 } from "react-native";
import { jsx as jsx23, jsxs as jsxs15 } from "react/jsx-runtime";
var TabBar = forwardRef21(function TabBar2({ items, value, defaultValue, onValueChange, style, ...rest }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState9(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;
  return /* @__PURE__ */ jsx23(View22, { ref, role: "tablist", style: [styles.msTabBar, style], ...rest, children: items.map((item) => {
    const active = item.value === current;
    return /* @__PURE__ */ jsxs15(
      Pressable11,
      {
        role: "tab",
        accessibilityState: { selected: active },
        onPress: () => {
          if (!isControlled) setInternal(item.value);
          onValueChange?.(item.value);
        },
        style: styles.msTabBarItem,
        children: [
          item.icon?.({ active }),
          typeof item.label === "string" ? /* @__PURE__ */ jsx23(Text15, { style: [styles.msTabBarLabel, active && styles.msTabBarLabelActive], children: item.label }) : item.label
        ]
      },
      item.value
    );
  }) });
});

// src/PasswordInput.tsx
import { forwardRef as forwardRef22, useState as useState10 } from "react";
import { Pressable as Pressable12, Text as Text16, View as View23 } from "react-native";
import { jsx as jsx24, jsxs as jsxs16 } from "react/jsx-runtime";
var PasswordInput = forwardRef22(
  function PasswordInput2({ hideToggle, style, ...rest }, ref) {
    const [visible, setVisible] = useState10(false);
    if (hideToggle) {
      return /* @__PURE__ */ jsx24(Input, { ref, secureTextEntry: true, style, ...rest });
    }
    return /* @__PURE__ */ jsxs16(View23, { style: { position: "relative", justifyContent: "center" }, children: [
      /* @__PURE__ */ jsx24(
        Input,
        {
          ref,
          secureTextEntry: !visible,
          style: [{ paddingRight: 70 }, style],
          ...rest
        }
      ),
      /* @__PURE__ */ jsx24(
        Pressable12,
        {
          onPress: () => setVisible((v) => !v),
          style: ({ pressed }) => ({
            position: "absolute",
            right: 6,
            height: 32,
            paddingHorizontal: 10,
            justifyContent: "center",
            borderRadius: 6,
            backgroundColor: pressed ? colors.bgMuted : "transparent"
          }),
          hitSlop: 8,
          accessibilityLabel: visible ? "Hide password" : "Show password",
          children: /* @__PURE__ */ jsx24(Text16, { style: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.fg2 }, children: visible ? "Hide" : "Show" })
        }
      )
    ] });
  }
);

// src/NumberInput.tsx
import { forwardRef as forwardRef23, useCallback as useCallback2, useState as useState11 } from "react";
import { Pressable as Pressable13, View as View24 } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { jsx as jsx25, jsxs as jsxs17 } from "react/jsx-runtime";
var NumberInput = forwardRef23(function NumberInput2({ value, defaultValue, onValueChange, min = -Infinity, max = Infinity, step = 1, disabled, placeholder, style }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState11(defaultValue);
  const current = isControlled ? value : internal;
  const [draft, setDraft] = useState11(null);
  const clamp = useCallback2((n) => Math.max(min, Math.min(max, n)), [min, max]);
  const commit = (next) => {
    if (disabled) return;
    const c = clamp(next);
    setDraft(null);
    if (!isControlled) setInternal(c);
    onValueChange?.(c);
  };
  return /* @__PURE__ */ jsxs17(
    View24,
    {
      style: [
        {
          flexDirection: "row",
          alignItems: "stretch",
          alignSelf: "flex-start",
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.xl,
          backgroundColor: colors.bg,
          overflow: "hidden",
          opacity: disabled ? 0.6 : 1
        },
        style
      ],
      children: [
        /* @__PURE__ */ jsx25(
          StepperButton,
          {
            kind: "decrement",
            onPress: () => commit((current ?? 0) - step),
            disabled: disabled || current !== void 0 && current <= min
          }
        ),
        /* @__PURE__ */ jsx25(
          Input,
          {
            ref,
            keyboardType: "numeric",
            value: draft !== null ? draft : current === void 0 ? "" : String(current),
            onChangeText: (t) => {
              setDraft(t);
              if (t === "" || t === "-") return;
              const n = Number(t);
              if (Number.isFinite(n)) {
                if (!isControlled) setInternal(n);
                onValueChange?.(n);
              }
            },
            onBlur: () => {
              if (draft !== null) {
                const n = Number(draft);
                if (Number.isFinite(n) && draft !== "" && draft !== "-") commit(n);
                setDraft(null);
              }
            },
            editable: !disabled,
            placeholder,
            style: {
              width: 44,
              textAlign: "center",
              borderWidth: 0,
              borderRadius: 0
            }
          }
        ),
        /* @__PURE__ */ jsx25(
          StepperButton,
          {
            kind: "increment",
            onPress: () => commit((current ?? 0) + step),
            disabled: disabled || current !== void 0 && current >= max
          }
        )
      ]
    }
  );
});
function StepperButton({ kind, onPress, disabled }) {
  const Icon = kind === "increment" ? Plus : Minus;
  return /* @__PURE__ */ jsx25(
    Pressable13,
    {
      onPress,
      disabled,
      style: ({ pressed }) => ({
        backgroundColor: pressed ? colors.bgMuted : colors.bgSubtle,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        minWidth: 44,
        opacity: disabled ? 0.4 : 1
      }),
      accessibilityRole: "button",
      accessibilityState: { disabled: !!disabled },
      accessibilityLabel: kind === "increment" ? "Increase" : "Decrease",
      children: /* @__PURE__ */ jsx25(Icon, { size: 18, strokeWidth: 2, color: colors.fg1 })
    }
  );
}

// src/PinInput.tsx
import { forwardRef as forwardRef24, useEffect as useEffect9, useRef as useRef8, useState as useState12 } from "react";
import {
  TextInput as TextInput4,
  View as View25
} from "react-native";
import { jsx as jsx26 } from "react/jsx-runtime";
var DIGIT_RE = /^[0-9]$/;
var PinInput = forwardRef24(function PinInput2({ length = 6, value, defaultValue = "", onValueChange, onComplete, mask, disabled, autoFocus, style, "aria-label": ariaLabel = "One-time code" }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState12(defaultValue.slice(0, length));
  const current = (isControlled ? value : internal).padEnd(length, "").slice(0, length);
  const inputs = useRef8([]);
  const [focused, setFocused] = useState12(-1);
  useEffect9(() => {
    if (autoFocus) inputs.current[0]?.focus();
  }, [autoFocus]);
  const set = (next) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
    if (next.length === length) onComplete?.(next);
  };
  const onChange = (i, raw) => {
    if (disabled) return;
    if (raw.length > 1) {
      const cleaned = raw.replace(/\s+/g, "").slice(0, length);
      if ([...cleaned].every((c) => DIGIT_RE.test(c))) {
        set(cleaned);
        const focusIdx = Math.min(cleaned.length, length - 1);
        inputs.current[focusIdx]?.focus();
      }
      return;
    }
    const ch = raw.slice(-1);
    if (ch && !DIGIT_RE.test(ch)) return;
    const arr = Array.from({ length }, (_, k) => current[k] ?? "");
    arr[i] = ch;
    set(arr.join(""));
    if (ch && i < length - 1) inputs.current[i + 1]?.focus();
  };
  const onKey = (i, e) => {
    if (e.nativeEvent.key === "Backspace" && !current[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };
  return /* @__PURE__ */ jsx26(View25, { ref, accessibilityRole: "text", accessibilityLabel: ariaLabel, style: [{ flexDirection: "row", gap: 6 }, style], children: Array.from({ length }, (_, i) => /* @__PURE__ */ jsx26(
    TextInput4,
    {
      ref: (el) => {
        inputs.current[i] = el;
      },
      value: current[i] || "",
      onChangeText: (t) => onChange(i, t),
      onKeyPress: (e) => onKey(i, e),
      onFocus: () => setFocused(i),
      onBlur: () => setFocused(-1),
      editable: !disabled,
      keyboardType: "number-pad",
      maxLength: 1,
      secureTextEntry: mask,
      textContentType: i === 0 ? "oneTimeCode" : "none",
      autoComplete: i === 0 ? "one-time-code" : "off",
      style: {
        width: 44,
        height: 52,
        textAlign: "center",
        fontSize: fontSize.lg,
        fontWeight: fontWeight.medium,
        color: colors.fg1,
        backgroundColor: disabled ? colors.bgMuted : colors.bg,
        borderWidth: 1,
        borderColor: focused === i ? colors.fg1 : colors.border,
        borderRadius: radius.xl
      },
      accessibilityLabel: `Digit ${i + 1} of ${length}`
    },
    i
  )) });
});

// src/Tabs.tsx
import { forwardRef as forwardRef25, useState as useState13 } from "react";
import { Pressable as Pressable14, ScrollView, StyleSheet, Text as Text17, View as View26 } from "react-native";
import { jsx as jsx27 } from "react/jsx-runtime";
var Tabs = forwardRef25(function Tabs2({ items, value, defaultValue, onValueChange, scrollable = true, style }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState13(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;
  const Container = scrollable ? ScrollView : View26;
  const containerProps = scrollable ? { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { paddingHorizontal: space[2] } } : { style: { flexDirection: "row" } };
  return /* @__PURE__ */ jsx27(
    View26,
    {
      ref,
      accessibilityRole: "tablist",
      style: [
        { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderSubtle, backgroundColor: colors.bg },
        style
      ],
      children: /* @__PURE__ */ jsx27(Container, { ...containerProps, children: items.map((item) => {
        const active = item.value === current;
        return /* @__PURE__ */ jsx27(
          Pressable14,
          {
            accessibilityRole: "tab",
            accessibilityState: { selected: active, disabled: item.disabled },
            disabled: item.disabled,
            onPress: () => {
              if (!isControlled) setInternal(item.value);
              onValueChange?.(item.value);
            },
            style: ({ pressed }) => ({
              paddingHorizontal: space[4],
              paddingVertical: space[4],
              opacity: item.disabled ? 0.4 : pressed ? 0.7 : 1,
              borderBottomWidth: 2,
              borderBottomColor: active ? colors.fg1 : "transparent",
              marginBottom: -1
            }),
            children: typeof item.label === "string" ? /* @__PURE__ */ jsx27(Text17, { style: { fontSize: fontSize.md, fontWeight: active ? fontWeight.semibold : fontWeight.medium, color: active ? colors.fg1 : colors.fg3 }, children: item.label }) : item.label
          },
          item.value
        );
      }) })
    }
  );
});

// src/Popover.tsx
import { forwardRef as forwardRef26, useEffect as useEffect10, useRef as useRef9, useState as useState14 } from "react";
import {
  Animated as Animated8,
  Easing as Easing7,
  Modal as Modal3,
  Pressable as Pressable15,
  useWindowDimensions
} from "react-native";
import { jsx as jsx28 } from "react/jsx-runtime";
var Popover = forwardRef26(function Popover2({ open, onClose, anchorRef, side = "bottom", sideOffset = 6, width, children, contentStyle }, ref) {
  const reduceMotion = useReducedMotion();
  const { width: windowWidth } = useWindowDimensions();
  const [anchor, setAnchor] = useState14(null);
  const [size, setSize] = useState14({ w: 0, h: 0 });
  const [origin, setOrigin] = useState14({ x: 0, y: 0 });
  const [host, setHost] = useState14(null);
  const backdropRef = useRef9(null);
  const opacity = useRef9(new Animated8.Value(0)).current;
  const ty = useRef9(new Animated8.Value(side === "top" ? 4 : -4)).current;
  useEffect10(() => {
    if (open && anchorRef.current) {
      anchorRef.current.measureInWindow((x, y, w2, h) => setAnchor({ x, y, w: w2, h }));
    } else {
      setAnchor(null);
    }
  }, [open, anchorRef]);
  useEffect10(() => {
    if (open) {
      Animated8.parallel([
        Animated8.timing(opacity, { toValue: 1, duration: reduceMotion ? 0 : 140, easing: Easing7.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
        Animated8.timing(ty, { toValue: 0, duration: reduceMotion ? 0 : 180, easing: Easing7.bezier(0.3, 0, 0, 1), useNativeDriver: true })
      ]).start();
    } else {
      Animated8.parallel([
        Animated8.timing(opacity, { toValue: 0, duration: reduceMotion ? 0 : 140, easing: Easing7.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
        Animated8.timing(ty, { toValue: side === "top" ? 4 : -4, duration: reduceMotion ? 0 : 180, easing: Easing7.bezier(0.3, 0, 0, 1), useNativeDriver: true })
      ]).start();
    }
  }, [open, opacity, ty, side, reduceMotion]);
  if (!open || !anchor) return null;
  const EDGE = 12;
  const hostW = host?.w ?? windowWidth;
  const isAuto = width === "auto";
  const maxW = hostW - EDGE * 2;
  const w = isAuto ? void 0 : Math.min(width ?? anchor.w, maxW);
  const panelW = w ?? size.w;
  const anchorLeft = anchor.x - origin.x;
  const anchorRight = anchor.x + anchor.w - origin.x;
  let left = anchorLeft;
  if (panelW > 0) {
    if (anchorLeft + panelW > hostW - EDGE) left = anchorRight - panelW;
    left = Math.max(EDGE, Math.min(left, hostW - panelW - EDGE));
  }
  let top = (side === "bottom" ? anchor.y + anchor.h + sideOffset : anchor.y - size.h - sideOffset) - origin.y;
  if (host && size.h > 0) {
    top = Math.max(EDGE, Math.min(top, host.h - size.h - EDGE));
  }
  const onContentLayout = (e) => {
    setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });
  };
  return /* @__PURE__ */ jsx28(Modal3, { visible: true, transparent: true, animationType: "none", onRequestClose: onClose, statusBarTranslucent: true, children: /* @__PURE__ */ jsx28(
    Pressable15,
    {
      ref: backdropRef,
      style: { flex: 1 },
      onPress: onClose,
      onLayout: (e) => {
        const { width: lw, height: lh } = e.nativeEvent.layout;
        setHost({ w: lw, h: lh });
        backdropRef.current?.measureInWindow((x, y) => setOrigin({ x, y }));
      },
      children: /* @__PURE__ */ jsx28(
        Animated8.View,
        {
          ref,
          onStartShouldSetResponder: () => true,
          onLayout: onContentLayout,
          style: [
            {
              position: "absolute",
              top,
              left,
              ...w !== void 0 ? { width: w } : null,
              backgroundColor: colors.bg,
              borderColor: colors.borderSubtle,
              borderWidth: 1,
              borderRadius: radius.xl,
              padding: 8,
              opacity,
              transform: [{ translateY: ty }]
            },
            shadow.lg,
            contentStyle
          ],
          children
        }
      )
    }
  ) });
});

// src/Combobox.tsx
import { forwardRef as forwardRef27, useMemo as useMemo2, useState as useState15 } from "react";
import {
  Modal as Modal4,
  Pressable as Pressable16,
  ScrollView as ScrollView2,
  Text as Text18,
  TextInput as TextInput5,
  View as View28
} from "react-native";
import { Check as Check3, ChevronDown } from "lucide-react-native";
import { jsx as jsx29, jsxs as jsxs18 } from "react/jsx-runtime";
function defaultFilter(q, o) {
  const query = q.toLowerCase();
  return o.label.toLowerCase().includes(query) || !!o.description?.toLowerCase().includes(query) || !!o.keywords?.some((k) => k.toLowerCase().includes(query));
}
var Combobox = forwardRef27(function Combobox2({ options, value, onValueChange, placeholder = "Select\u2026", searchPlaceholder = "Search\u2026", emptyMessage = "No results.", filter = defaultFilter, disabled, style }, ref) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState15(false);
  const [query, setQuery] = useState15("");
  const selected = options.find((o) => o.value === value) || null;
  const filtered = useMemo2(
    () => query.trim() ? options.filter((o) => filter(query, o)) : options,
    [query, options, filter]
  );
  const close = () => {
    setOpen(false);
    setQuery("");
  };
  return /* @__PURE__ */ jsxs18(View28, { ref, style, children: [
    /* @__PURE__ */ jsxs18(
      Pressable16,
      {
        onPress: () => !disabled && setOpen(true),
        accessibilityRole: "combobox",
        accessibilityState: { expanded: open, disabled },
        disabled,
        style: ({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 14,
          paddingVertical: 12,
          minHeight: 44,
          borderWidth: 1,
          borderColor: pressed ? colors.fg3 : colors.border,
          borderRadius: radius.xl,
          backgroundColor: disabled ? colors.bgMuted : colors.bg,
          opacity: disabled ? 0.6 : 1
        }),
        children: [
          /* @__PURE__ */ jsx29(Text18, { style: { fontSize: fontSize.base, color: selected ? colors.fg1 : colors.fg4 }, children: selected ? selected.label : placeholder }),
          /* @__PURE__ */ jsx29(ChevronDown, { size: 18, color: colors.fg3, strokeWidth: 2 })
        ]
      }
    ),
    /* @__PURE__ */ jsx29(Modal4, { visible: open, animationType: reduceMotion ? "none" : "slide", transparent: true, onRequestClose: close, children: /* @__PURE__ */ jsx29(Pressable16, { style: { flex: 1, backgroundColor: colors.scrim }, onPress: close, children: /* @__PURE__ */ jsxs18(
      Pressable16,
      {
        onPress: (e) => e.stopPropagation(),
        style: {
          marginTop: "auto",
          maxHeight: "80%",
          backgroundColor: colors.bg,
          borderTopLeftRadius: radius.xl,
          borderTopRightRadius: radius.xl,
          paddingTop: 12,
          paddingBottom: space[7]
        },
        children: [
          /* @__PURE__ */ jsx29(View28, { style: { width: 36, height: 5, borderRadius: 999, backgroundColor: colors.border, alignSelf: "center", marginBottom: space[3] } }),
          /* @__PURE__ */ jsx29(View28, { style: { paddingHorizontal: space[5], paddingBottom: space[3], borderBottomWidth: 1, borderBottomColor: colors.borderSubtle }, children: /* @__PURE__ */ jsx29(
            TextInput5,
            {
              value: query,
              onChangeText: setQuery,
              placeholder: searchPlaceholder,
              placeholderTextColor: colors.fg4,
              autoFocus: true,
              style: {
                fontSize: fontSize.base,
                color: colors.fg1,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                backgroundColor: colors.bgSubtle
              }
            }
          ) }),
          /* @__PURE__ */ jsx29(ScrollView2, { keyboardShouldPersistTaps: "handled", style: { maxHeight: 360 }, children: filtered.length === 0 ? /* @__PURE__ */ jsx29(View28, { style: { paddingVertical: space[7], alignItems: "center" }, children: /* @__PURE__ */ jsx29(Text18, { style: { fontSize: fontSize.sm, color: colors.fg3 }, children: emptyMessage }) }) : filtered.map((opt) => {
            const isSel = opt.value === value;
            return /* @__PURE__ */ jsx29(
              Pressable16,
              {
                disabled: opt.disabled,
                onPress: () => {
                  onValueChange?.(opt.value);
                  close();
                },
                style: ({ pressed }) => ({
                  paddingHorizontal: space[5],
                  paddingVertical: space[4],
                  backgroundColor: pressed ? colors.bgMuted : "transparent",
                  opacity: opt.disabled ? 0.5 : 1
                }),
                children: /* @__PURE__ */ jsxs18(View28, { style: { flexDirection: "row", alignItems: "center", gap: 10 }, children: [
                  /* @__PURE__ */ jsxs18(View28, { style: { flex: 1 }, children: [
                    /* @__PURE__ */ jsx29(Text18, { style: { fontSize: fontSize.base, fontWeight: isSel ? fontWeight.semibold : fontWeight.regular, color: colors.fg1 }, children: opt.label }),
                    opt.description && /* @__PURE__ */ jsx29(Text18, { style: { fontSize: fontSize.sm, color: colors.fg3, marginTop: 2 }, children: opt.description })
                  ] }),
                  isSel && /* @__PURE__ */ jsx29(Check3, { size: 16, color: colors.fg1, strokeWidth: 2 })
                ] })
              },
              opt.value
            );
          }) })
        ]
      }
    ) }) })
  ] });
});

// src/Accordion.tsx
import { createContext as createContext3, useContext as useContext3, useEffect as useEffect11, useRef as useRef10, useState as useState16 } from "react";
import { Animated as Animated9, Easing as Easing8, Pressable as Pressable17, StyleSheet as StyleSheet2, Text as Text19, View as View29 } from "react-native";
import { ChevronDown as ChevronDown2 } from "lucide-react-native";
import { jsx as jsx30, jsxs as jsxs19 } from "react/jsx-runtime";
var Ctx3 = createContext3(null);
function Accordion({ type = "single", defaultValue, value, onValueChange, children, style }) {
  const isControlled = value !== void 0;
  const initialSet = (() => {
    const v = isControlled ? value : defaultValue;
    if (v === void 0) return /* @__PURE__ */ new Set();
    return new Set(Array.isArray(v) ? v : [v]);
  })();
  const [internal, setInternal] = useState16(initialSet);
  const open = isControlled ? new Set(Array.isArray(value) ? value : value === void 0 ? [] : [value]) : internal;
  const setOpen = (next) => {
    if (!isControlled) setInternal(next);
    if (type === "single") onValueChange?.([...next][0] ?? "");
    else onValueChange?.([...next]);
  };
  const toggle = (id) => {
    const next = new Set(open);
    if (next.has(id)) next.delete(id);
    else {
      if (type === "single") next.clear();
      next.add(id);
    }
    setOpen(next);
  };
  return /* @__PURE__ */ jsx30(Ctx3.Provider, { value: { open, toggle }, children: /* @__PURE__ */ jsx30(View29, { style, children }) });
}
function AccordionItem({ value, title, children, disabled }) {
  const ctx = useContext3(Ctx3);
  if (!ctx) throw new Error("AccordionItem must be used inside <Accordion>.");
  const isOpen = ctx.open.has(value);
  const reduceMotion = useReducedMotion();
  const rotate = useRef10(new Animated9.Value(isOpen ? 1 : 0)).current;
  useEffect11(() => {
    Animated9.timing(rotate, {
      toValue: isOpen ? 1 : 0,
      duration: reduceMotion ? 0 : 180,
      easing: Easing8.bezier(0.3, 0, 0, 1),
      useNativeDriver: true
    }).start();
  }, [isOpen, rotate, reduceMotion]);
  const angle = rotate.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });
  return /* @__PURE__ */ jsxs19(View29, { style: { borderBottomWidth: StyleSheet2.hairlineWidth, borderBottomColor: colors.borderSubtle }, children: [
    /* @__PURE__ */ jsxs19(
      Pressable17,
      {
        accessibilityRole: "button",
        accessibilityLabel: typeof title === "string" ? title : void 0,
        accessibilityState: { expanded: isOpen, disabled },
        disabled,
        onPress: () => ctx.toggle(value),
        style: ({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 14,
          paddingHorizontal: 0,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1
        }),
        children: [
          typeof title === "string" ? /* @__PURE__ */ jsx30(Text19, { style: { fontSize: fontSize.base, fontWeight: fontWeight.medium, color: colors.fg1, flex: 1 }, children: title }) : /* @__PURE__ */ jsx30(View29, { style: { flex: 1 }, children: title }),
          /* @__PURE__ */ jsx30(Animated9.View, { style: { transform: [{ rotate: angle }] }, children: /* @__PURE__ */ jsx30(ChevronDown2, { size: 18, color: colors.fg3, strokeWidth: 2 }) })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx30(View29, { style: { paddingBottom: 14, paddingHorizontal: 0 }, children: typeof children === "string" ? /* @__PURE__ */ jsx30(Text19, { style: { fontSize: fontSize.sm, color: colors.fg2, lineHeight: fontSize.sm * 1.55 }, children }) : children })
  ] });
}

// src/NavigationHeader.tsx
import { forwardRef as forwardRef28 } from "react";
import { Pressable as Pressable18, StyleSheet as StyleSheet3, Text as Text20, View as View30 } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { jsx as jsx31, jsxs as jsxs20 } from "react/jsx-runtime";
var NavigationHeader = forwardRef28(function NavigationHeader2({ title, leading, trailing, border = true, style }, ref) {
  return /* @__PURE__ */ jsxs20(
    View30,
    {
      ref,
      accessibilityRole: "header",
      style: [
        {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
          height: 56,
          backgroundColor: colors.bg,
          gap: 8,
          borderBottomWidth: border ? StyleSheet3.hairlineWidth : 0,
          borderBottomColor: colors.borderSubtle
        },
        style
      ],
      children: [
        /* @__PURE__ */ jsx31(View30, { style: { minWidth: 44, alignItems: "flex-start" }, children: leading }),
        /* @__PURE__ */ jsx31(View30, { style: { flex: 1, alignItems: "center" }, children: typeof title === "string" ? /* @__PURE__ */ jsx31(Text20, { style: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.fg1, textAlign: "center" }, numberOfLines: 1, children: title }) : title }),
        /* @__PURE__ */ jsx31(View30, { style: { minWidth: 44, alignItems: "flex-end" }, children: trailing })
      ]
    }
  );
});
function NavigationBack({ onPress, label = "Back" }) {
  return /* @__PURE__ */ jsx31(
    Pressable18,
    {
      onPress,
      accessibilityRole: "button",
      accessibilityLabel: label,
      hitSlop: 8,
      style: ({ pressed }) => ({
        width: 40,
        height: 40,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pressed ? colors.bgMuted : "transparent"
      }),
      children: /* @__PURE__ */ jsx31(ChevronLeft, { size: 26, color: colors.fg1, strokeWidth: 2 })
    }
  );
}

// src/ActionSheet.tsx
import { forwardRef as forwardRef29, Fragment as Fragment2 } from "react";
import { Pressable as Pressable19, StyleSheet as StyleSheet4, Text as Text21, View as View31 } from "react-native";
import { jsx as jsx32, jsxs as jsxs21 } from "react/jsx-runtime";
var ActionSheet = forwardRef29(function ActionSheet2({ title, description, actions, cancelLabel = "Cancel", onClose, ...rest }, ref) {
  return /* @__PURE__ */ jsxs21(
    Sheet,
    {
      ref,
      onClose,
      grabber: false,
      ...rest,
      children: [
        (title || description) && /* @__PURE__ */ jsxs21(View31, { style: {
          alignItems: "center",
          paddingBottom: space[4],
          marginBottom: space[2],
          borderBottomWidth: StyleSheet4.hairlineWidth,
          borderBottomColor: colors.borderSubtle
        }, children: [
          title && /* @__PURE__ */ jsx32(Text21, { style: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, color: colors.fg1, textAlign: "center" }, children: title }),
          description && /* @__PURE__ */ jsx32(Text21, { style: { fontSize: fontSize.sm, color: colors.fg3, marginTop: space[1], textAlign: "center" }, children: description })
        ] }),
        /* @__PURE__ */ jsx32(View31, { children: actions.map((a, i) => /* @__PURE__ */ jsxs21(Fragment2, { children: [
          i > 0 && /* @__PURE__ */ jsx32(View31, { style: { height: StyleSheet4.hairlineWidth, backgroundColor: colors.borderSubtle }, "aria-hidden": true }),
          /* @__PURE__ */ jsxs21(
            Pressable19,
            {
              disabled: a.disabled,
              onPress: () => {
                a.onPress?.();
                onClose();
              },
              style: ({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: space[4],
                minHeight: 52,
                paddingVertical: space[4],
                paddingHorizontal: space[2],
                backgroundColor: pressed ? colors.bgMuted : "transparent",
                borderRadius: 8,
                opacity: a.disabled ? 0.4 : 1
              }),
              accessibilityRole: "button",
              accessibilityState: { disabled: a.disabled },
              accessibilityHint: a.destructive ? "This action cannot be undone" : void 0,
              children: [
                a.icon,
                /* @__PURE__ */ jsx32(Text21, { style: {
                  fontSize: fontSize.base,
                  color: a.destructive ? colors.statusDanger : colors.fg1
                }, children: a.label })
              ]
            }
          )
        ] }, i)) }),
        /* @__PURE__ */ jsx32(
          Pressable19,
          {
            onPress: onClose,
            style: ({ pressed }) => ({
              marginTop: space[4],
              minHeight: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? colors.border : colors.bgMuted,
              borderRadius: 12
            }),
            accessibilityRole: "button",
            children: /* @__PURE__ */ jsx32(Text21, { style: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.fg1 }, children: cancelLabel })
          }
        )
      ]
    }
  );
});

// src/AppShell.tsx
import { forwardRef as forwardRef30 } from "react";
import { SafeAreaView, View as View32 } from "react-native";
import { jsx as jsx33, jsxs as jsxs22 } from "react/jsx-runtime";
var AppShell = forwardRef30(function AppShell2({ header, tabBar, children, backgroundColor = colors.bg, style }, ref) {
  return /* @__PURE__ */ jsx33(SafeAreaView, { style: [{ flex: 1, backgroundColor }, style], children: /* @__PURE__ */ jsxs22(View32, { ref, style: { flex: 1 }, children: [
    header,
    /* @__PURE__ */ jsx33(View32, { style: { flex: 1, minHeight: 0 }, children }),
    tabBar
  ] }) });
});

// src/Tooltip.tsx
import { useRef as useRef11, useState as useState17 } from "react";
import { Pressable as Pressable20, Text as Text22 } from "react-native";
import { Fragment as Fragment3, jsx as jsx34, jsxs as jsxs23 } from "react/jsx-runtime";
function Tooltip({ content, children, side = "top", width, longPressDelay = 400 }) {
  const triggerRef = useRef11(null);
  const [open, setOpen] = useState17(false);
  return /* @__PURE__ */ jsxs23(Fragment3, { children: [
    /* @__PURE__ */ jsx34(
      Pressable20,
      {
        ref: triggerRef,
        accessibilityRole: "button",
        accessibilityLabel: typeof content === "string" ? content : void 0,
        accessibilityHint: "Long press to show the label",
        onLongPress: () => setOpen(true),
        delayLongPress: longPressDelay,
        children
      }
    ),
    /* @__PURE__ */ jsx34(
      Popover,
      {
        open,
        onClose: () => setOpen(false),
        anchorRef: triggerRef,
        side,
        width: width ?? "auto",
        contentStyle: {
          backgroundColor: colors.fg1,
          borderWidth: 0,
          borderRadius: 8,
          paddingVertical: 6,
          paddingHorizontal: 10,
          maxWidth: 240
        },
        children: typeof content === "string" ? /* @__PURE__ */ jsx34(Text22, { style: { fontSize: fontSize.sm, color: mono[0] }, children: content }) : content
      }
    )
  ] });
}

// src/DatePicker.tsx
import { forwardRef as forwardRef32, useState as useState19 } from "react";
import {
  Modal as Modal5,
  Pressable as Pressable22,
  Text as Text24,
  View as View35
} from "react-native";
import { Calendar as CalendarIcon } from "lucide-react-native";

// src/Calendar.tsx
import { forwardRef as forwardRef31, useState as useState18 } from "react";
import { Pressable as Pressable21, Text as Text23, View as View34 } from "react-native";
import { ChevronLeft as ChevronLeft2, ChevronRight as ChevronRight2 } from "lucide-react-native";
import { jsx as jsx35, jsxs as jsxs24 } from "react/jsx-runtime";
function startOfDay(d) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function addMonths(d, n) {
  const c = new Date(d);
  c.setMonth(c.getMonth() + n);
  return c;
}
function weekdayLabels(locale, weekStartsOn) {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const base = new Date(2021, 0, 4);
  const labels = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    labels.push(fmt.format(d));
  }
  if (weekStartsOn === 0) labels.unshift(labels.pop());
  return labels;
}
var Calendar = forwardRef31(function Calendar2({ value, defaultValue, onValueChange, month, defaultMonth, onMonthChange, min, max, locale, weekStartsOn = 1, style }, ref) {
  const isControlled = value !== void 0;
  const [internalSel, setInternalSel] = useState18(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internalSel;
  const monthControlled = month !== void 0;
  const [internalMonth, setInternalMonth] = useState18(() => month ?? defaultMonth ?? selected ?? /* @__PURE__ */ new Date());
  const view = monthControlled ? month : internalMonth;
  const setView = (d) => {
    if (!monthControlled) setInternalMonth(d);
    onMonthChange?.(d);
  };
  const select = (d) => {
    if (!isControlled) setInternalSel(d);
    onValueChange?.(d);
  };
  const isDisabled = (d) => {
    if (min && startOfDay(d) < startOfDay(min)) return true;
    if (max && startOfDay(d) > startOfDay(max)) return true;
    return false;
  };
  const firstOfMonth = new Date(view.getFullYear(), view.getMonth(), 1);
  const startWeekday = (firstOfMonth.getDay() - weekStartsOn + 7) % 7;
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - startWeekday);
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  const monthLabel = view.toLocaleDateString(locale, { month: "long", year: "numeric" });
  const today = startOfDay(/* @__PURE__ */ new Date());
  return /* @__PURE__ */ jsxs24(View34, { ref, style, children: [
    /* @__PURE__ */ jsxs24(View34, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: space[4] }, children: [
      /* @__PURE__ */ jsx35(NavBtn, { accessibilityLabel: "Previous month", onPress: () => setView(addMonths(view, -1)), children: /* @__PURE__ */ jsx35(ChevronLeft2, { size: 20, color: colors.fg1, strokeWidth: 2 }) }),
      /* @__PURE__ */ jsx35(Text23, { style: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 }, children: monthLabel }),
      /* @__PURE__ */ jsx35(NavBtn, { accessibilityLabel: "Next month", onPress: () => setView(addMonths(view, 1)), children: /* @__PURE__ */ jsx35(ChevronRight2, { size: 20, color: colors.fg1, strokeWidth: 2 }) })
    ] }),
    /* @__PURE__ */ jsx35(View34, { style: { flexDirection: "row", marginBottom: space[3] }, children: weekdayLabels(locale, weekStartsOn).map((w, i) => /* @__PURE__ */ jsx35(Text23, { style: { flex: 1, textAlign: "center", fontSize: fontSize.xs, color: colors.fg3, textTransform: "uppercase", letterSpacing: 0.5 }, children: w }, i)) }),
    /* @__PURE__ */ jsx35(View34, { style: { flexDirection: "row", flexWrap: "wrap" }, children: days.map((d) => {
      const inMonth = d.getMonth() === view.getMonth();
      const isSelected = selected && sameDay(d, selected);
      const isToday = sameDay(d, today);
      const off = isDisabled(d);
      return /* @__PURE__ */ jsx35(
        Pressable21,
        {
          disabled: off,
          onPress: () => select(d),
          accessibilityRole: "button",
          accessibilityState: { selected: !!isSelected, disabled: off },
          accessibilityLabel: d.toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
          style: { width: `${100 / 7}%`, height: 44, alignItems: "center", justifyContent: "center" },
          children: ({ pressed }) => /* @__PURE__ */ jsx35(View34, { style: {
            width: 38,
            height: 38,
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isSelected ? colors.accent : pressed && !off ? colors.bgMuted : "transparent",
            borderWidth: isToday && !isSelected ? 1 : 0,
            borderColor: colors.border
          }, children: /* @__PURE__ */ jsx35(Text23, { style: {
            fontSize: fontSize.base,
            color: off ? colors.fg4 : isSelected ? colors.accentFg : !inMonth ? colors.fg4 : colors.fg1,
            fontWeight: isToday && !isSelected ? fontWeight.semibold : fontWeight.regular
          }, children: d.getDate() }) })
        },
        d.toISOString()
      );
    }) })
  ] });
});
function NavBtn({ accessibilityLabel, onPress, children }) {
  return /* @__PURE__ */ jsx35(
    Pressable21,
    {
      onPress,
      hitSlop: 8,
      accessibilityRole: "button",
      accessibilityLabel,
      style: ({ pressed }) => ({
        width: 36,
        height: 36,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pressed ? colors.bgMuted : "transparent"
      }),
      children
    }
  );
}

// src/DatePicker.tsx
import { jsx as jsx36, jsxs as jsxs25 } from "react/jsx-runtime";
function defaultFormat(d, locale) {
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}
var DatePicker = forwardRef32(function DatePicker2({ value, defaultValue, onValueChange, min, max, locale, placeholder = "Pick a date", disabled, format = (d) => defaultFormat(d, locale), style }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState19(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internal;
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState19(false);
  const [view, setView] = useState19(() => selected || /* @__PURE__ */ new Date());
  const set = (d) => {
    if (!isControlled) setInternal(d);
    onValueChange?.(d);
  };
  return /* @__PURE__ */ jsxs25(View35, { ref, style, children: [
    /* @__PURE__ */ jsxs25(
      Pressable22,
      {
        onPress: () => !disabled && setOpen(true),
        disabled,
        accessibilityRole: "button",
        accessibilityState: { disabled },
        style: ({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 14,
          paddingVertical: 12,
          minHeight: 44,
          borderWidth: 1,
          borderColor: pressed ? colors.fg3 : colors.border,
          borderRadius: radius.xl,
          backgroundColor: disabled ? colors.bgMuted : colors.bg,
          opacity: disabled ? 0.6 : 1,
          gap: 8
        }),
        children: [
          /* @__PURE__ */ jsx36(Text24, { style: { fontSize: fontSize.base, color: selected ? colors.fg1 : colors.fg4, flex: 1 }, children: selected ? format(selected) : placeholder }),
          /* @__PURE__ */ jsx36(CalendarIcon, { size: 18, color: colors.fg3, strokeWidth: 2 })
        ]
      }
    ),
    /* @__PURE__ */ jsx36(Modal5, { visible: open, animationType: reduceMotion ? "none" : "slide", transparent: true, onRequestClose: () => setOpen(false), statusBarTranslucent: true, children: /* @__PURE__ */ jsx36(Pressable22, { style: { flex: 1, backgroundColor: colors.scrim }, onPress: () => setOpen(false), children: /* @__PURE__ */ jsxs25(
      Pressable22,
      {
        onPress: (e) => e.stopPropagation(),
        style: {
          marginTop: "auto",
          backgroundColor: colors.bg,
          borderTopLeftRadius: radius.xl,
          borderTopRightRadius: radius.xl,
          paddingTop: 12,
          paddingHorizontal: space[5],
          paddingBottom: space[7]
        },
        children: [
          /* @__PURE__ */ jsx36(View35, { style: { width: 36, height: 5, borderRadius: 999, backgroundColor: colors.border, alignSelf: "center", marginBottom: space[4] } }),
          /* @__PURE__ */ jsx36(
            Calendar,
            {
              value: selected,
              month: view,
              onMonthChange: setView,
              onValueChange: (d) => {
                set(d);
                setOpen(false);
              },
              min,
              max,
              locale
            }
          ),
          selected && /* @__PURE__ */ jsx36(
            Pressable22,
            {
              onPress: () => {
                set(null);
                setOpen(false);
              },
              style: ({ pressed }) => ({
                marginTop: space[3],
                paddingVertical: space[3],
                alignItems: "center",
                borderRadius: radius.lg,
                backgroundColor: pressed ? colors.bgMuted : "transparent"
              }),
              children: /* @__PURE__ */ jsx36(Text24, { style: { fontSize: fontSize.sm, color: colors.fg3 }, children: "Clear" })
            }
          )
        ]
      }
    ) }) })
  ] });
});

// src/BottomSheet.tsx
import { forwardRef as forwardRef33, useEffect as useEffect12, useRef as useRef12 } from "react";
import {
  Animated as Animated10,
  Easing as Easing9,
  Modal as Modal6,
  PanResponder,
  Pressable as Pressable23,
  View as View36,
  Text as Text25
} from "react-native";
import { jsx as jsx37, jsxs as jsxs26 } from "react/jsx-runtime";
var HIDDEN = 1e3;
var DISMISS_DISTANCE = 120;
var DISMISS_VELOCITY = 0.8;
var BottomSheet = forwardRef33(function BottomSheet2({ open, onClose, title, description, grabber = true, dragToDismiss = true, children, ...rest }, ref) {
  const reduceMotion = useReducedMotion();
  const translateY = useRef12(new Animated10.Value(HIDDEN)).current;
  const opacity = useRef12(new Animated10.Value(0)).current;
  const onCloseRef = useRef12(onClose);
  onCloseRef.current = onClose;
  const dragRef = useRef12(dragToDismiss);
  dragRef.current = dragToDismiss;
  const reduceRef = useRef12(reduceMotion);
  reduceRef.current = reduceMotion;
  useEffect12(() => {
    Animated10.parallel([
      Animated10.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: reduceMotion ? 0 : open ? 180 : 120,
        easing: Easing9.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      }),
      Animated10.timing(translateY, {
        toValue: open ? 0 : HIDDEN,
        duration: reduceMotion ? 0 : open ? 280 : 180,
        easing: Easing9.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      })
    ]).start();
  }, [open, opacity, translateY, reduceMotion]);
  const pan = useRef12(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => dragRef.current && g.dy > 4 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > DISMISS_DISTANCE || g.vy > DISMISS_VELOCITY) {
          Animated10.timing(translateY, {
            toValue: HIDDEN,
            duration: reduceRef.current ? 0 : 200,
            easing: Easing9.bezier(0.3, 0, 0, 1),
            useNativeDriver: true
          }).start(() => onCloseRef.current());
        } else {
          Animated10.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start();
        }
      }
    })
  ).current;
  return /* @__PURE__ */ jsx37(
    Modal6,
    {
      visible: open,
      transparent: true,
      animationType: "none",
      onRequestClose: onClose,
      statusBarTranslucent: true,
      ...rest,
      children: /* @__PURE__ */ jsxs26(Animated10.View, { style: { flex: 1, opacity }, children: [
        /* @__PURE__ */ jsx37(Pressable23, { style: styles.msSheetScrim, onPress: onClose, accessibilityLabel: "Close" }),
        /* @__PURE__ */ jsxs26(
          Animated10.View,
          {
            ref,
            style: [styles.msSheet, { transform: [{ translateY }] }],
            accessibilityViewIsModal: true,
            children: [
              /* @__PURE__ */ jsxs26(View36, { ...pan.panHandlers, children: [
                grabber && /* @__PURE__ */ jsx37(View36, { style: styles.msSheetGrabber }),
                title && /* @__PURE__ */ jsx37(Text25, { style: styles.msSheetTitle, children: title }),
                description && /* @__PURE__ */ jsx37(Text25, { style: styles.msSheetDesc, children: description })
              ] }),
              /* @__PURE__ */ jsx37(View36, { style: { marginTop: title || description ? 16 : 0 }, children })
            ]
          }
        )
      ] })
    }
  );
});
export {
  Accordion,
  AccordionItem,
  ActionSheet,
  Alert,
  AppShell,
  Avatar,
  Badge,
  BottomSheet,
  Button,
  Calendar,
  Card,
  Checkbox,
  Chip,
  Combobox,
  DatePicker,
  Dialog,
  Divider,
  EmptyState,
  Field,
  Inline,
  Input,
  ListItem,
  NavigationBack,
  NavigationHeader,
  NumberInput,
  PasswordInput,
  PinInput,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  SegmentedControl,
  Sheet,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  Switch,
  TabBar,
  Tabs,
  ToastProvider,
  Tooltip,
  colors,
  fontSize,
  fontWeight,
  lineHeight,
  mono,
  radius,
  shadow,
  space,
  styles,
  tokens,
  useReducedMotion,
  useToast
};
//# sourceMappingURL=index.js.map