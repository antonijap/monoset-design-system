import {
  styles
} from "./chunk-O2ZPIIJJ.js";
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
} from "./chunk-4MC4DKCY.js";

// src/Button.tsx
import { forwardRef } from "react";
import { Pressable, Text } from "react-native";
import { jsx, jsxs } from "react/jsx-runtime";
var Button = forwardRef(function Button2({ variant = "secondary", size = "md", disabled, leading, trailing, children, style, ...rest }, ref) {
  const sizeStyle = size === "sm" ? styles.msBtnSm : size === "lg" ? styles.msBtnLg : styles.msBtnMd;
  const variantStyle = disabled ? styles.msBtnDisabled : variant === "primary" ? styles.msBtnPrimary : variant === "ghost" ? styles.msBtnGhost : variant === "danger" ? styles.msBtnDanger : styles.msBtnSecondary;
  const labelVariantStyle = disabled ? styles.msBtnLabelDisabled : variant === "primary" ? styles.msBtnLabelPrimary : variant === "ghost" ? styles.msBtnLabelGhost : variant === "danger" ? styles.msBtnLabelDanger : styles.msBtnLabelSecondary;
  return /* @__PURE__ */ jsxs(
    Pressable,
    {
      ref,
      disabled,
      android_ripple: { color: variant === "primary" || variant === "danger" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)" },
      style: ({ pressed }) => [
        styles.msBtn,
        sizeStyle,
        variantStyle,
        pressed && !disabled && { opacity: 0.85 },
        style
      ],
      ...rest,
      children: [
        leading,
        /* @__PURE__ */ jsx(Text, { style: [
          styles.msBtnLabel,
          size === "sm" && styles.msBtnLabelSm,
          size === "lg" && styles.msBtnLabelLg,
          labelVariantStyle,
          leading ? { marginLeft: 6 } : null,
          trailing ? { marginRight: 6 } : null
        ], children }),
        trailing
      ]
    }
  );
});

// src/Card.tsx
import { forwardRef as forwardRef2 } from "react";
import { View } from "react-native";
import { jsx as jsx2 } from "react/jsx-runtime";
var Card = forwardRef2(function Card2({ variant = "default", children, style, ...rest }, ref) {
  return /* @__PURE__ */ jsx2(
    View,
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
  View as View2,
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
  return /* @__PURE__ */ jsxs2(View2, { style: [styles.msField, style], children: [
    label && /* @__PURE__ */ jsx3(Text2, { style: styles.msFieldLabel, children: label }),
    children,
    error ? /* @__PURE__ */ jsx3(Text2, { style: styles.msFieldError, children: error }) : help ? /* @__PURE__ */ jsx3(Text2, { style: styles.msFieldHelp, children: help }) : null
  ] });
}

// src/Layout.tsx
import { forwardRef as forwardRef4 } from "react";
import { View as View3 } from "react-native";
import { jsx as jsx4 } from "react/jsx-runtime";
var alignMap = {
  stretch: "stretch",
  start: "flex-start",
  center: "center",
  end: "flex-end"
};
var Stack = forwardRef4(function Stack2({ gap = 4, align = "stretch", children, style, ...rest }, ref) {
  return /* @__PURE__ */ jsx4(
    View3,
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
    View3,
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
      style: ({ pressed }) => [
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }
      ],
      ...rest,
      children: /* @__PURE__ */ jsx5(Animated.View, { style: [styles.msSwitchTrack, { backgroundColor: trackBg }], children: /* @__PURE__ */ jsx5(Animated.View, { style: [styles.msSwitchThumb, { transform: [{ translateX: thumbX }] }] }) })
    }
  );
});

// src/Spinner.tsx
import { forwardRef as forwardRef6, useEffect as useEffect2, useRef as useRef2 } from "react";
import { Animated as Animated2, Easing as Easing2 } from "react-native";
import { jsx as jsx6 } from "react/jsx-runtime";
var Spinner = forwardRef6(function Spinner2({ size = 16, color = colors.fg1, label = "Loading" }, _ref) {
  const angle = useRef2(new Animated2.Value(0)).current;
  useEffect2(() => {
    Animated2.loop(
      Animated2.timing(angle, {
        toValue: 1,
        duration: 800,
        easing: Easing2.linear,
        useNativeDriver: true
      })
    ).start();
  }, [angle]);
  const rotate = angle.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  return /* @__PURE__ */ jsx6(
    Animated2.View,
    {
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
import { useEffect as useEffect3, useRef as useRef3 } from "react";
import { Animated as Animated3, Easing as Easing3 } from "react-native";
import { jsx as jsx7 } from "react/jsx-runtime";
function Skeleton({ width = "100%", height = 17, radius: radius2 = 4 }) {
  const opacity = useRef3(new Animated3.Value(0.6)).current;
  useEffect3(() => {
    Animated3.loop(
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
    ).start();
  }, [opacity]);
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
import { View as View4, Text as Text3, Image } from "react-native";
import { jsx as jsx8 } from "react/jsx-runtime";
function initials(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "").join("");
}
var Avatar = forwardRef7(function Avatar2({ name, source, size = "md", style, ...rest }, ref) {
  const sizeStyle = size === "sm" ? styles.msAvatarSm : size === "lg" ? styles.msAvatarLg : styles.msAvatarMd;
  const textStyle = size === "sm" ? styles.msAvatarTextSm : size === "lg" ? styles.msAvatarTextLg : styles.msAvatarTextMd;
  return /* @__PURE__ */ jsx8(View4, { ref, style: [styles.msAvatar, sizeStyle, style], ...rest, children: source ? /* @__PURE__ */ jsx8(Image, { source, style: { width: "100%", height: "100%" } }) : /* @__PURE__ */ jsx8(Text3, { style: [styles.msAvatarText, textStyle], children: initials(name) }) });
});

// src/Badge.tsx
import { forwardRef as forwardRef8 } from "react";
import { View as View5, Text as Text4 } from "react-native";
import { jsx as jsx9, jsxs as jsxs3 } from "react/jsx-runtime";
var Badge = forwardRef8(function Badge2({ variant = "neutral", children, leading, style, ...rest }, ref) {
  const variantStyle = variant === "solid" ? styles.msBadgeSolid : variant === "outline" ? styles.msBadgeOutline : variant === "success" ? styles.msBadgeSuccess : variant === "danger" ? styles.msBadgeDanger : styles.msBadgeNeutral;
  const textVariantStyle = variant === "solid" ? styles.msBadgeTextSolid : variant === "outline" ? styles.msBadgeTextOutline : variant === "success" ? styles.msBadgeTextSuccess : variant === "danger" ? styles.msBadgeTextDanger : styles.msBadgeTextNeutral;
  return /* @__PURE__ */ jsxs3(View5, { ref, style: [styles.msBadge, variantStyle, style], ...rest, children: [
    leading,
    /* @__PURE__ */ jsx9(Text4, { style: [styles.msBadgeText, textVariantStyle], children })
  ] });
});

// src/Alert.tsx
import { forwardRef as forwardRef9 } from "react";
import { View as View6, Text as Text5 } from "react-native";
import { jsx as jsx10, jsxs as jsxs4 } from "react/jsx-runtime";
var DEFAULT_GLYPH = {
  info: "i",
  success: "\u2713",
  warning: "!",
  danger: "!"
};
var Alert = forwardRef9(function Alert2({ variant = "info", title, children, icon, style, ...rest }, ref) {
  const variantStyle = variant === "success" ? styles.msAlertSuccess : variant === "warning" ? styles.msAlertWarning : variant === "danger" ? styles.msAlertDanger : styles.msAlertInfo;
  const iconWrapStyle = variant === "success" ? styles.msAlertIconWrapSuccess : variant === "warning" ? styles.msAlertIconWrapWarning : variant === "danger" ? styles.msAlertIconWrapDanger : styles.msAlertIconWrapInfo;
  const iconColorStyle = variant === "success" ? styles.msAlertIconSuccess : variant === "warning" ? styles.msAlertIconWarning : variant === "danger" ? styles.msAlertIconDanger : null;
  return /* @__PURE__ */ jsxs4(View6, { ref, style: [styles.msAlert, variantStyle, style], ...rest, children: [
    /* @__PURE__ */ jsx10(View6, { style: [styles.msAlertIconWrap, iconWrapStyle], children: icon ?? /* @__PURE__ */ jsx10(Text5, { style: [styles.msAlertIcon, iconColorStyle], children: DEFAULT_GLYPH[variant] }) }),
    /* @__PURE__ */ jsxs4(View6, { style: styles.msAlertBody, children: [
      title && /* @__PURE__ */ jsx10(Text5, { style: styles.msAlertTitle, children: title }),
      typeof children === "string" ? /* @__PURE__ */ jsx10(Text5, { style: styles.msAlertMessage, children }) : children
    ] })
  ] });
});

// src/Divider.tsx
import { forwardRef as forwardRef10 } from "react";
import { View as View7 } from "react-native";
import { jsx as jsx11 } from "react/jsx-runtime";
var Divider = forwardRef10(function Divider2({ orientation = "horizontal", style, ...rest }, ref) {
  return /* @__PURE__ */ jsx11(
    View7,
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
import { View as View8, Text as Text6 } from "react-native";
import { jsx as jsx12, jsxs as jsxs5 } from "react/jsx-runtime";
var EmptyState = forwardRef11(function EmptyState2({ title, body, icon, action, style, ...rest }, ref) {
  return /* @__PURE__ */ jsxs5(View8, { ref, style: [styles.msEmpty, style], ...rest, children: [
    icon && /* @__PURE__ */ jsx12(View8, { style: styles.msEmptyIcon, children: icon }),
    /* @__PURE__ */ jsx12(Text6, { style: styles.msEmptyTitle, children: title }),
    body && (typeof body === "string" ? /* @__PURE__ */ jsx12(Text6, { style: styles.msEmptyBody, children: body }) : /* @__PURE__ */ jsx12(View8, { children: body })),
    action
  ] });
});

// src/ListItem.tsx
import { forwardRef as forwardRef12 } from "react";
import { Pressable as Pressable3, View as View9, Text as Text7 } from "react-native";
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
        /* @__PURE__ */ jsxs6(View9, { style: styles.msListItemBody, children: [
          typeof title === "string" ? /* @__PURE__ */ jsx13(Text7, { style: styles.msListItemTitle, numberOfLines: 1, children: title }) : title,
          subtitle && (typeof subtitle === "string" ? /* @__PURE__ */ jsx13(Text7, { style: styles.msListItemSubtitle, numberOfLines: 1, children: subtitle }) : subtitle)
        ] }),
        trailing ?? (chevron && tappable ? /* @__PURE__ */ jsx13(Text7, { style: styles.msListItemChevron, children: "\u203A" }) : null)
      ]
    }
  );
});

// src/Checkbox.tsx
import { forwardRef as forwardRef13, useState as useState3 } from "react";
import { Pressable as Pressable4, Text as Text8, View as View10 } from "react-native";
import { jsx as jsx14, jsxs as jsxs7 } from "react/jsx-runtime";
var Checkbox = forwardRef13(function Checkbox2({ checked, defaultChecked, onCheckedChange, label, disabled, style, ...rest }, ref) {
  const isControlled = checked !== void 0;
  const [internal, setInternal] = useState3(!!defaultChecked);
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
        /* @__PURE__ */ jsx14(View10, { style: [styles.msCheck, value && styles.msCheckChecked], children: value && /* @__PURE__ */ jsx14(Text8, { style: styles.msCheckCheckmark, children: "\u2713" }) }),
        label && (typeof label === "string" ? /* @__PURE__ */ jsx14(Text8, { style: styles.msCheckLabel, children: label }) : label)
      ]
    }
  );
});

// src/RadioGroup.tsx
import { createContext, forwardRef as forwardRef14, useContext, useState as useState4 } from "react";
import { Pressable as Pressable5, Text as Text9, View as View11 } from "react-native";
import { jsx as jsx15, jsxs as jsxs8 } from "react/jsx-runtime";
var Ctx = createContext(null);
function RadioGroup({ value, defaultValue, onValueChange, disabled, children, style, ...rest }) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState4(defaultValue);
  const current = isControlled ? value : internal;
  const setValue = (v) => {
    if (disabled) return;
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };
  return /* @__PURE__ */ jsx15(Ctx.Provider, { value: { value: current, setValue, disabled }, children: /* @__PURE__ */ jsx15(View11, { style, accessibilityRole: "radiogroup", ...rest, children }) });
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
        /* @__PURE__ */ jsx15(View11, { style: [styles.msRadio, checked && styles.msRadioChecked], children: checked && /* @__PURE__ */ jsx15(View11, { style: styles.msRadioDot }) }),
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
import { forwardRef as forwardRef16, useEffect as useEffect4, useRef as useRef4 } from "react";
import { Animated as Animated4, View as View12 } from "react-native";
import { jsx as jsx17 } from "react/jsx-runtime";
var Progress = forwardRef16(function Progress2({ value, max = 100, style, ...rest }, ref) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const width = useRef4(new Animated4.Value(pct)).current;
  useEffect4(() => {
    Animated4.timing(width, {
      toValue: pct,
      duration: 280,
      useNativeDriver: false
    }).start();
  }, [pct, width]);
  return /* @__PURE__ */ jsx17(
    View12,
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
import { forwardRef as forwardRef17, useEffect as useEffect5, useRef as useRef5 } from "react";
import {
  Animated as Animated5,
  Easing as Easing4,
  Modal,
  Pressable as Pressable7,
  View as View13,
  Text as Text11
} from "react-native";
import { jsx as jsx18, jsxs as jsxs10 } from "react/jsx-runtime";
var Sheet = forwardRef17(function Sheet2({ open, onClose, title, description, grabber = true, children, ...rest }, ref) {
  const translateY = useRef5(new Animated5.Value(40)).current;
  const opacity = useRef5(new Animated5.Value(0)).current;
  useEffect5(() => {
    Animated5.parallel([
      Animated5.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: open ? 180 : 120,
        easing: Easing4.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      }),
      Animated5.timing(translateY, {
        toValue: open ? 0 : 40,
        duration: open ? 280 : 180,
        easing: Easing4.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      })
    ]).start();
  }, [open, opacity, translateY]);
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
              grabber && /* @__PURE__ */ jsx18(View13, { style: styles.msSheetGrabber }),
              title && /* @__PURE__ */ jsx18(Text11, { style: styles.msSheetTitle, children: title }),
              description && /* @__PURE__ */ jsx18(Text11, { style: styles.msSheetDesc, children: description }),
              /* @__PURE__ */ jsx18(View13, { style: { marginTop: title || description ? 16 : 0 }, children })
            ]
          }
        )
      ] })
    }
  );
});

// src/Dialog.tsx
import { forwardRef as forwardRef18, useEffect as useEffect6, useRef as useRef6 } from "react";
import {
  Animated as Animated6,
  Easing as Easing5,
  Modal as Modal2,
  Pressable as Pressable8,
  View as View14,
  Text as Text12
} from "react-native";
import { jsx as jsx19, jsxs as jsxs11 } from "react/jsx-runtime";
var Dialog = forwardRef18(function Dialog2({ open, onClose, title, description, dismissible = true, children, ...rest }, ref) {
  const opacity = useRef6(new Animated6.Value(0)).current;
  const scale = useRef6(new Animated6.Value(0.96)).current;
  useEffect6(() => {
    Animated6.parallel([
      Animated6.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: open ? 180 : 120,
        easing: Easing5.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      }),
      Animated6.timing(scale, {
        toValue: open ? 1 : 0.96,
        duration: open ? 220 : 140,
        easing: Easing5.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      })
    ]).start();
  }, [open, opacity, scale]);
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
              /* @__PURE__ */ jsx19(View14, { style: { marginTop: title || description ? 16 : 0 }, children })
            ]
          }
        )
      ] })
    }
  );
});

// src/Toast.tsx
import { createContext as createContext2, useCallback, useContext as useContext2, useEffect as useEffect7, useMemo, useRef as useRef7, useState as useState5 } from "react";
import { Animated as Animated7, Easing as Easing6, Pressable as Pressable9, Text as Text13, View as View15 } from "react-native";
import { jsx as jsx20, jsxs as jsxs12 } from "react/jsx-runtime";
var Ctx2 = createContext2(null);
var nextId = 1;
function ToastProvider({ children, defaultDuration = 3500 }) {
  const [items, setItems] = useState5([]);
  const dismiss = useCallback((id) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const toast = useCallback((item) => {
    const id = nextId++;
    setItems((prev) => [...prev, { id, ...item }]);
    setTimeout(() => dismiss(id), item.duration ?? defaultDuration);
    return id;
  }, [defaultDuration, dismiss]);
  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
  return /* @__PURE__ */ jsxs12(Ctx2.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsx20(View15, { style: styles.msToastWrap, pointerEvents: "box-none", children: items.map((t) => /* @__PURE__ */ jsx20(ToastView, { item: t, onDismiss: () => dismiss(t.id) }, t.id)) })
  ] });
}
function ToastView({ item, onDismiss }) {
  const opacity = useRef7(new Animated7.Value(0)).current;
  const ty = useRef7(new Animated7.Value(20)).current;
  useEffect7(() => {
    Animated7.parallel([
      Animated7.timing(opacity, { toValue: 1, duration: 180, easing: Easing6.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
      Animated7.timing(ty, { toValue: 0, duration: 220, easing: Easing6.bezier(0.3, 0, 0, 1), useNativeDriver: true })
    ]).start();
  }, [opacity, ty]);
  return /* @__PURE__ */ jsxs12(Animated7.View, { style: [styles.msToast, { opacity, transform: [{ translateY: ty }], marginBottom: 8 }], children: [
    /* @__PURE__ */ jsx20(Text13, { style: styles.msToastTitle, children: item.title }),
    item.action && /* @__PURE__ */ jsx20(Pressable9, { onPress: () => {
      item.onActionPress?.();
      onDismiss();
    }, children: /* @__PURE__ */ jsx20(Text13, { style: styles.msToastAction, children: item.action }) })
  ] });
}
function useToast() {
  const ctx = useContext2(Ctx2);
  if (!ctx) throw new Error("useToast must be called inside <ToastProvider>.");
  return ctx;
}

// src/Slider.tsx
import { forwardRef as forwardRef19, useState as useState6 } from "react";
import { View as View16 } from "react-native";
import { jsx as jsx21, jsxs as jsxs13 } from "react/jsx-runtime";
var Slider = forwardRef19(function Slider2({ value, onValueChange, min = 0, max = 100, step = 1, disabled, style, ...rest }, ref) {
  const [trackWidth, setTrackWidth] = useState6(0);
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const updateFromX = (x) => {
    if (disabled || trackWidth === 0) return;
    const ratio = Math.max(0, Math.min(1, x / trackWidth));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.max(min, Math.min(max, stepped));
    if (clamped !== value) onValueChange(clamped);
  };
  return /* @__PURE__ */ jsxs13(
    View16,
    {
      ref,
      accessibilityRole: "adjustable",
      accessibilityValue: { min, max, now: value },
      onLayout: (e) => setTrackWidth(e.nativeEvent.layout.width),
      onStartShouldSetResponder: () => !disabled,
      onMoveShouldSetResponder: () => !disabled,
      onResponderGrant: (e) => updateFromX(e.nativeEvent.locationX),
      onResponderMove: (e) => updateFromX(e.nativeEvent.locationX),
      style: [
        { paddingVertical: 16, justifyContent: "center", opacity: disabled ? 0.5 : 1 },
        style
      ],
      ...rest,
      children: [
        /* @__PURE__ */ jsx21(View16, { style: styles.msSliderTrack, children: /* @__PURE__ */ jsx21(View16, { style: [styles.msSliderFill, { width: `${pct * 100}%` }] }) }),
        /* @__PURE__ */ jsx21(
          View16,
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
import { forwardRef as forwardRef20, useState as useState7 } from "react";
import { Pressable as Pressable10, Text as Text14, View as View17 } from "react-native";
import { jsx as jsx22 } from "react/jsx-runtime";
var SegmentedControl = forwardRef20(function SegmentedControl2({ items, value, defaultValue, onValueChange, style, ...rest }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState7(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;
  return /* @__PURE__ */ jsx22(View17, { ref, style: [styles.msSegmented, style], role: "tablist", ...rest, children: items.map((item) => {
    const active = item.value === current;
    return /* @__PURE__ */ jsx22(
      Pressable10,
      {
        role: "tab",
        accessibilityState: { selected: active },
        disabled: item.disabled,
        onPress: () => {
          if (!isControlled) setInternal(item.value);
          onValueChange?.(item.value);
        },
        style: [styles.msSegmentedItem, active && styles.msSegmentedItemActive],
        children: typeof item.label === "string" ? /* @__PURE__ */ jsx22(Text14, { style: [styles.msSegmentedText, active && styles.msSegmentedTextActive], children: item.label }) : item.label
      },
      item.value
    );
  }) });
});

// src/TabBar.tsx
import { forwardRef as forwardRef21, useState as useState8 } from "react";
import { Pressable as Pressable11, Text as Text15, View as View18 } from "react-native";
import { jsx as jsx23, jsxs as jsxs14 } from "react/jsx-runtime";
var TabBar = forwardRef21(function TabBar2({ items, value, defaultValue, onValueChange, style, ...rest }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState8(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;
  return /* @__PURE__ */ jsx23(View18, { ref, role: "tablist", style: [styles.msTabBar, style], ...rest, children: items.map((item) => {
    const active = item.value === current;
    return /* @__PURE__ */ jsxs14(
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
export {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Dialog,
  Divider,
  EmptyState,
  Field,
  Inline,
  Input,
  ListItem,
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
  ToastProvider,
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
  useToast
};
//# sourceMappingURL=index.js.map