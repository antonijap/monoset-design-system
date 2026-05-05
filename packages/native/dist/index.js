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
function Skeleton({ width = "100%", height = 17, radius: radius7 = 4 }) {
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
      style: [styles.msSkeleton, { width, height, borderRadius: radius7, opacity }]
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

// src/PasswordInput.tsx
import { forwardRef as forwardRef22, useState as useState9 } from "react";
import { Pressable as Pressable12, Text as Text16, View as View19 } from "react-native";
import { jsx as jsx24, jsxs as jsxs15 } from "react/jsx-runtime";
var PasswordInput = forwardRef22(
  function PasswordInput2({ hideToggle, style, ...rest }, ref) {
    const [visible, setVisible] = useState9(false);
    if (hideToggle) {
      return /* @__PURE__ */ jsx24(Input, { ref, secureTextEntry: true, style, ...rest });
    }
    return /* @__PURE__ */ jsxs15(View19, { style: { position: "relative", justifyContent: "center" }, children: [
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
import { forwardRef as forwardRef23, useCallback as useCallback2 } from "react";
import { Pressable as Pressable13, Text as Text17, View as View20 } from "react-native";
import { jsx as jsx25, jsxs as jsxs16 } from "react/jsx-runtime";
var NumberInput = forwardRef23(function NumberInput2({ value, defaultValue, onValueChange, min = -Infinity, max = Infinity, step = 1, disabled, placeholder, style }, ref) {
  const isControlled = value !== void 0;
  const current = isControlled ? value : defaultValue;
  const clamp = useCallback2((n) => Math.max(min, Math.min(max, n)), [min, max]);
  const change = (next) => {
    if (disabled) return;
    onValueChange?.(clamp(next));
  };
  return /* @__PURE__ */ jsxs16(
    View20,
    {
      style: [
        {
          flexDirection: "row",
          alignItems: "stretch",
          alignSelf: "flex-start",
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
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
            label: "\u2212",
            onPress: () => change((current ?? 0) - step),
            disabled: disabled || current !== void 0 && current <= min
          }
        ),
        /* @__PURE__ */ jsx25(
          Input,
          {
            ref,
            keyboardType: "numeric",
            value: current === void 0 ? "" : String(current),
            onChangeText: (t) => {
              if (t === "" || t === "-") return;
              const n = Number(t);
              if (Number.isFinite(n)) change(n);
            },
            editable: !disabled,
            placeholder,
            style: {
              minWidth: 60,
              textAlign: "center",
              borderWidth: 0,
              borderRadius: 0
            }
          }
        ),
        /* @__PURE__ */ jsx25(
          StepperButton,
          {
            label: "+",
            onPress: () => change((current ?? 0) + step),
            disabled: disabled || current !== void 0 && current >= max
          }
        )
      ]
    }
  );
});
function StepperButton({ label, onPress, disabled }) {
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
      accessibilityLabel: label === "+" ? "Increment" : "Decrement",
      children: /* @__PURE__ */ jsx25(Text17, { style: { fontSize: fontSize.lg, fontWeight: fontWeight.medium, color: colors.fg1 }, children: label })
    }
  );
}

// src/PinInput.tsx
import { forwardRef as forwardRef24, useEffect as useEffect8, useRef as useRef8, useState as useState10 } from "react";
import {
  TextInput as TextInput4,
  View as View21
} from "react-native";
import { jsx as jsx26 } from "react/jsx-runtime";
var DIGIT_RE = /^[0-9]$/;
var PinInput = forwardRef24(function PinInput2({ length = 6, value, defaultValue = "", onValueChange, onComplete, mask, disabled, autoFocus, style, "aria-label": ariaLabel = "One-time code" }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState10(defaultValue.slice(0, length));
  const current = (isControlled ? value : internal).padEnd(length, "").slice(0, length);
  const inputs = useRef8([]);
  const [focused, setFocused] = useState10(-1);
  useEffect8(() => {
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
    const arr = current.split("");
    arr[i] = ch;
    set(arr.join("").trimEnd());
    if (ch && i < length - 1) inputs.current[i + 1]?.focus();
  };
  const onKey = (i, e) => {
    if (e.nativeEvent.key === "Backspace" && !current[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };
  return /* @__PURE__ */ jsx26(View21, { ref, accessibilityRole: "none", accessibilityLabel: ariaLabel, style: [{ flexDirection: "row", gap: 8 }, style], children: Array.from({ length }, (_, i) => /* @__PURE__ */ jsx26(
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
        fontSize: 20,
        fontWeight: fontWeight.medium,
        color: colors.fg1,
        backgroundColor: disabled ? colors.bgMuted : colors.bg,
        borderWidth: 1,
        borderColor: focused === i ? colors.fg1 : colors.border,
        borderRadius: 12
      },
      accessibilityLabel: `Digit ${i + 1} of ${length}`
    },
    i
  )) });
});

// src/Tabs.tsx
import { forwardRef as forwardRef25, useState as useState11 } from "react";
import { Pressable as Pressable14, ScrollView, Text as Text18, View as View22 } from "react-native";
import { jsx as jsx27 } from "react/jsx-runtime";
var Tabs = forwardRef25(function Tabs2({ items, value, defaultValue, onValueChange, scrollable = true, style }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState11(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;
  const Container = scrollable ? ScrollView : View22;
  const containerProps = scrollable ? { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { paddingHorizontal: space[2] } } : { style: { flexDirection: "row" } };
  return /* @__PURE__ */ jsx27(
    View22,
    {
      ref,
      accessibilityRole: "tablist",
      style: [
        { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle, backgroundColor: colors.bg },
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
            children: typeof item.label === "string" ? /* @__PURE__ */ jsx27(Text18, { style: { fontSize: fontSize.base, fontWeight: active ? fontWeight.semibold : fontWeight.medium, color: active ? colors.fg1 : colors.fg3 }, children: item.label }) : item.label
          },
          item.value
        );
      }) })
    }
  );
});

// src/Popover.tsx
import { forwardRef as forwardRef26, useEffect as useEffect9, useRef as useRef9, useState as useState12 } from "react";
import {
  Animated as Animated8,
  Easing as Easing7,
  Modal as Modal3,
  Pressable as Pressable15
} from "react-native";
import { jsx as jsx28 } from "react/jsx-runtime";
var Popover = forwardRef26(function Popover2({ open, onClose, anchorRef, side = "bottom", sideOffset = 6, width, children, contentStyle }, ref) {
  const [anchor, setAnchor] = useState12(null);
  const [size, setSize] = useState12({ w: 0, h: 0 });
  const opacity = useRef9(new Animated8.Value(0)).current;
  const ty = useRef9(new Animated8.Value(side === "top" ? 4 : -4)).current;
  useEffect9(() => {
    if (open && anchorRef.current) {
      anchorRef.current.measureInWindow((x, y, w2, h) => setAnchor({ x, y, w: w2, h }));
    } else {
      setAnchor(null);
    }
  }, [open, anchorRef]);
  useEffect9(() => {
    if (open) {
      Animated8.parallel([
        Animated8.timing(opacity, { toValue: 1, duration: 140, easing: Easing7.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
        Animated8.timing(ty, { toValue: 0, duration: 180, easing: Easing7.bezier(0.3, 0, 0, 1), useNativeDriver: true })
      ]).start();
    } else {
      opacity.setValue(0);
      ty.setValue(side === "top" ? 4 : -4);
    }
  }, [open, opacity, ty, side]);
  if (!open || !anchor) return null;
  const w = width ?? anchor.w;
  const top = side === "bottom" ? anchor.y + anchor.h + sideOffset : anchor.y - size.h - sideOffset;
  const left = anchor.x;
  const onContentLayout = (e) => {
    setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });
  };
  return /* @__PURE__ */ jsx28(Modal3, { visible: true, transparent: true, animationType: "none", onRequestClose: onClose, statusBarTranslucent: true, children: /* @__PURE__ */ jsx28(Pressable15, { style: { flex: 1 }, onPress: onClose, children: /* @__PURE__ */ jsx28(
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
          width: w,
          backgroundColor: colors.bg,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 12,
          padding: 8,
          opacity,
          transform: [{ translateY: ty }]
        },
        shadow.lg,
        contentStyle
      ],
      children
    }
  ) }) });
});

// src/Combobox.tsx
import { forwardRef as forwardRef27, useState as useState13 } from "react";
import {
  Modal as Modal4,
  Pressable as Pressable16,
  ScrollView as ScrollView2,
  Text as Text19,
  TextInput as TextInput5,
  View as View24
} from "react-native";
import { jsx as jsx29, jsxs as jsxs17 } from "react/jsx-runtime";
function defaultFilter(q, o) {
  const query = q.toLowerCase();
  return o.label.toLowerCase().includes(query) || !!o.description?.toLowerCase().includes(query) || !!o.keywords?.some((k) => k.toLowerCase().includes(query));
}
var Combobox = forwardRef27(function Combobox2({ options, value, onValueChange, placeholder = "Select\u2026", searchPlaceholder = "Search\u2026", emptyMessage = "No results.", filter = defaultFilter, disabled, style }, ref) {
  const [open, setOpen] = useState13(false);
  const [query, setQuery] = useState13("");
  const selected = options.find((o) => o.value === value) || null;
  const filtered = query.trim() ? options.filter((o) => filter(query, o)) : options;
  return /* @__PURE__ */ jsxs17(View24, { ref, style, children: [
    /* @__PURE__ */ jsxs17(
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
          borderRadius: 12,
          backgroundColor: disabled ? colors.bgMuted : colors.bg,
          opacity: disabled ? 0.6 : 1
        }),
        children: [
          /* @__PURE__ */ jsx29(Text19, { style: { fontSize: fontSize.base, color: selected ? colors.fg1 : colors.fg4 }, children: selected ? selected.label : placeholder }),
          /* @__PURE__ */ jsx29(Text19, { style: { fontSize: 12, color: colors.fg3 }, children: "\u25BE" })
        ]
      }
    ),
    /* @__PURE__ */ jsx29(Modal4, { visible: open, animationType: "slide", transparent: true, onRequestClose: () => setOpen(false), children: /* @__PURE__ */ jsx29(Pressable16, { style: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }, onPress: () => setOpen(false), children: /* @__PURE__ */ jsxs17(
      Pressable16,
      {
        onPress: (e) => e.stopPropagation(),
        style: {
          marginTop: "auto",
          maxHeight: "80%",
          backgroundColor: colors.bg,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingTop: 12,
          paddingBottom: space[7]
        },
        children: [
          /* @__PURE__ */ jsx29(View24, { style: { width: 36, height: 5, borderRadius: 999, backgroundColor: colors.border, alignSelf: "center", marginBottom: space[3] } }),
          /* @__PURE__ */ jsx29(View24, { style: { paddingHorizontal: space[5], paddingBottom: space[3], borderBottomWidth: 1, borderBottomColor: colors.borderSubtle }, children: /* @__PURE__ */ jsx29(
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
          /* @__PURE__ */ jsx29(ScrollView2, { keyboardShouldPersistTaps: "handled", style: { maxHeight: 360 }, children: filtered.length === 0 ? /* @__PURE__ */ jsx29(View24, { style: { paddingVertical: space[7], alignItems: "center" }, children: /* @__PURE__ */ jsx29(Text19, { style: { fontSize: fontSize.sm, color: colors.fg3 }, children: emptyMessage }) }) : filtered.map((opt) => {
            const isSel = opt.value === value;
            return /* @__PURE__ */ jsx29(
              Pressable16,
              {
                disabled: opt.disabled,
                onPress: () => {
                  onValueChange?.(opt.value);
                  setOpen(false);
                  setQuery("");
                },
                style: ({ pressed }) => ({
                  paddingHorizontal: space[5],
                  paddingVertical: space[4],
                  backgroundColor: pressed ? colors.bgMuted : "transparent",
                  opacity: opt.disabled ? 0.5 : 1
                }),
                children: /* @__PURE__ */ jsxs17(View24, { style: { flexDirection: "row", alignItems: "center", gap: 10 }, children: [
                  /* @__PURE__ */ jsxs17(View24, { style: { flex: 1 }, children: [
                    /* @__PURE__ */ jsx29(Text19, { style: { fontSize: fontSize.base, fontWeight: isSel ? fontWeight.semibold : fontWeight.regular, color: colors.fg1 }, children: opt.label }),
                    opt.description && /* @__PURE__ */ jsx29(Text19, { style: { fontSize: fontSize.sm, color: colors.fg3, marginTop: 2 }, children: opt.description })
                  ] }),
                  isSel && /* @__PURE__ */ jsx29(Text19, { style: { color: colors.fg1, fontSize: 16 }, children: "\u2713" })
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
import { createContext as createContext3, useContext as useContext3, useEffect as useEffect10, useRef as useRef10, useState as useState14 } from "react";
import { Animated as Animated9, Easing as Easing8, Pressable as Pressable17, Text as Text20, View as View25 } from "react-native";
import { jsx as jsx30, jsxs as jsxs18 } from "react/jsx-runtime";
var Ctx3 = createContext3(null);
function Accordion({ type = "single", defaultValue, value, onValueChange, children, style }) {
  const isControlled = value !== void 0;
  const initialSet = (() => {
    const v = isControlled ? value : defaultValue;
    if (v === void 0) return /* @__PURE__ */ new Set();
    return new Set(Array.isArray(v) ? v : [v]);
  })();
  const [internal, setInternal] = useState14(initialSet);
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
  return /* @__PURE__ */ jsx30(Ctx3.Provider, { value: { open, toggle }, children: /* @__PURE__ */ jsx30(View25, { style, children }) });
}
function AccordionItem({ value, title, children, disabled }) {
  const ctx = useContext3(Ctx3);
  if (!ctx) throw new Error("AccordionItem must be used inside <Accordion>.");
  const isOpen = ctx.open.has(value);
  const rotate = useRef10(new Animated9.Value(isOpen ? 1 : 0)).current;
  useEffect10(() => {
    Animated9.timing(rotate, {
      toValue: isOpen ? 1 : 0,
      duration: 180,
      easing: Easing8.bezier(0.3, 0, 0, 1),
      useNativeDriver: true
    }).start();
  }, [isOpen, rotate]);
  const angle = rotate.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });
  return /* @__PURE__ */ jsxs18(View25, { style: { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle }, children: [
    /* @__PURE__ */ jsxs18(
      Pressable17,
      {
        accessibilityRole: "button",
        accessibilityState: { expanded: isOpen, disabled },
        disabled,
        onPress: () => ctx.toggle(value),
        style: ({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 14,
          paddingHorizontal: 4,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1
        }),
        children: [
          typeof title === "string" ? /* @__PURE__ */ jsx30(Text20, { style: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.fg1, flex: 1 }, children: title }) : /* @__PURE__ */ jsx30(View25, { style: { flex: 1 }, children: title }),
          /* @__PURE__ */ jsx30(Animated9.Text, { style: { color: colors.fg3, fontSize: 14, transform: [{ rotate: angle }] }, children: "\u25BE" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx30(View25, { style: { paddingBottom: 14, paddingHorizontal: 4 }, children: typeof children === "string" ? /* @__PURE__ */ jsx30(Text20, { style: { fontSize: fontSize.sm, color: colors.fg2, lineHeight: fontSize.sm * 1.55 }, children }) : children })
  ] });
}

// src/NavigationHeader.tsx
import { forwardRef as forwardRef28 } from "react";
import { Pressable as Pressable18, Text as Text21, View as View26 } from "react-native";
import { jsx as jsx31, jsxs as jsxs19 } from "react/jsx-runtime";
var NavigationHeader = forwardRef28(function NavigationHeader2({ title, leading, trailing, border = true, style }, ref) {
  return /* @__PURE__ */ jsxs19(
    View26,
    {
      ref,
      accessibilityRole: "header",
      style: [
        {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
          height: 56,
          backgroundColor: colors.bg,
          gap: 8,
          borderBottomWidth: border ? 1 : 0,
          borderBottomColor: colors.borderSubtle
        },
        style
      ],
      children: [
        /* @__PURE__ */ jsx31(View26, { style: { minWidth: 44, alignItems: "flex-start" }, children: leading }),
        /* @__PURE__ */ jsx31(View26, { style: { flex: 1, alignItems: "flex-start" }, children: typeof title === "string" ? /* @__PURE__ */ jsx31(Text21, { style: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 }, numberOfLines: 1, children: title }) : title }),
        /* @__PURE__ */ jsx31(View26, { style: { minWidth: 44, alignItems: "flex-end" }, children: trailing })
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
      children: /* @__PURE__ */ jsx31(Text21, { style: { fontSize: 22, color: colors.fg1, lineHeight: 22 }, children: "\u2039" })
    }
  );
}

// src/ActionSheet.tsx
import { forwardRef as forwardRef29 } from "react";
import { Pressable as Pressable19, Text as Text22, View as View27 } from "react-native";
import { jsx as jsx32, jsxs as jsxs20 } from "react/jsx-runtime";
var ActionSheet = forwardRef29(function ActionSheet2({ title, description, actions, cancelLabel = "Cancel", onClose, ...rest }, ref) {
  return /* @__PURE__ */ jsxs20(
    Sheet,
    {
      ref,
      onClose,
      grabber: false,
      ...rest,
      children: [
        (title || description) && /* @__PURE__ */ jsxs20(View27, { style: { paddingBottom: space[3], borderBottomWidth: 1, borderBottomColor: colors.borderSubtle, marginBottom: space[2] }, children: [
          title && /* @__PURE__ */ jsx32(Text22, { style: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 }, children: title }),
          description && /* @__PURE__ */ jsx32(Text22, { style: { fontSize: fontSize.sm, color: colors.fg3, marginTop: 2 }, children: description })
        ] }),
        /* @__PURE__ */ jsx32(View27, { children: actions.map((a, i) => /* @__PURE__ */ jsx32(
          Pressable19,
          {
            disabled: a.disabled,
            onPress: () => {
              a.onPress?.();
              onClose();
            },
            style: ({ pressed }) => ({
              paddingVertical: space[4],
              paddingHorizontal: space[4],
              backgroundColor: pressed ? colors.bgMuted : "transparent",
              borderRadius: 8,
              alignItems: "center",
              opacity: a.disabled ? 0.5 : 1
            }),
            accessibilityRole: "button",
            children: /* @__PURE__ */ jsx32(Text22, { style: {
              fontSize: fontSize.base,
              fontWeight: fontWeight.medium,
              color: a.destructive ? colors.statusDanger : colors.fg1
            }, children: a.label })
          },
          i
        )) }),
        /* @__PURE__ */ jsx32(View27, { style: { marginTop: space[3], borderTopWidth: 1, borderTopColor: colors.borderSubtle, paddingTop: space[3] }, children: /* @__PURE__ */ jsx32(
          Pressable19,
          {
            onPress: onClose,
            style: ({ pressed }) => ({
              paddingVertical: space[4],
              alignItems: "center",
              borderRadius: 8,
              backgroundColor: pressed ? colors.bgMuted : "transparent"
            }),
            accessibilityRole: "button",
            children: /* @__PURE__ */ jsx32(Text22, { style: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.fg2 }, children: cancelLabel })
          }
        ) })
      ]
    }
  );
});

// src/AppShell.tsx
import { forwardRef as forwardRef30 } from "react";
import { SafeAreaView, View as View28 } from "react-native";
import { jsx as jsx33, jsxs as jsxs21 } from "react/jsx-runtime";
var AppShell = forwardRef30(function AppShell2({ header, tabBar, children, backgroundColor = colors.bg, style }, ref) {
  return /* @__PURE__ */ jsx33(SafeAreaView, { style: [{ flex: 1, backgroundColor }, style], children: /* @__PURE__ */ jsxs21(View28, { ref, style: { flex: 1 }, children: [
    header,
    /* @__PURE__ */ jsx33(View28, { style: { flex: 1, minHeight: 0 }, children }),
    tabBar
  ] }) });
});

// src/Tooltip.tsx
import { useRef as useRef11, useState as useState15 } from "react";
import { Pressable as Pressable20, Text as Text23 } from "react-native";
import { Fragment, jsx as jsx34, jsxs as jsxs22 } from "react/jsx-runtime";
function Tooltip({ content, children, side = "top", width, longPressDelay = 400 }) {
  const triggerRef = useRef11(null);
  const [open, setOpen] = useState15(false);
  return /* @__PURE__ */ jsxs22(Fragment, { children: [
    /* @__PURE__ */ jsx34(
      Pressable20,
      {
        ref: triggerRef,
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
        width,
        contentStyle: { padding: 10, maxWidth: 240 },
        children: typeof content === "string" ? /* @__PURE__ */ jsx34(Text23, { style: { fontSize: fontSize.sm, color: colors.fg1 }, children: content }) : content
      }
    )
  ] });
}

// src/DatePicker.tsx
import { forwardRef as forwardRef31, useState as useState16 } from "react";
import {
  Modal as Modal5,
  Pressable as Pressable21,
  Text as Text24,
  View as View30
} from "react-native";
import { jsx as jsx35, jsxs as jsxs23 } from "react/jsx-runtime";
var WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
function defaultFormat(d, locale) {
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}
var DatePicker = forwardRef31(function DatePicker2({ value, defaultValue, onValueChange, min, max, locale, placeholder = "Pick a date", disabled, format = (d) => defaultFormat(d, locale), style }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState16(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internal;
  const [open, setOpen] = useState16(false);
  const [view, setView] = useState16(() => selected || /* @__PURE__ */ new Date());
  const set = (d) => {
    if (!isControlled) setInternal(d);
    onValueChange?.(d);
  };
  const isDisabled = (d) => {
    if (min && startOfDay(d) < startOfDay(min)) return true;
    if (max && startOfDay(d) > startOfDay(max)) return true;
    return false;
  };
  const firstOfMonth = new Date(view.getFullYear(), view.getMonth(), 1);
  const startWeekday = (firstOfMonth.getDay() + 6) % 7;
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
  return /* @__PURE__ */ jsxs23(View30, { ref, style, children: [
    /* @__PURE__ */ jsxs23(
      Pressable21,
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
          borderRadius: 12,
          backgroundColor: disabled ? colors.bgMuted : colors.bg,
          opacity: disabled ? 0.6 : 1,
          gap: 8
        }),
        children: [
          /* @__PURE__ */ jsx35(Text24, { style: { fontSize: fontSize.base, color: selected ? colors.fg1 : colors.fg4, flex: 1 }, children: selected ? format(selected) : placeholder }),
          /* @__PURE__ */ jsx35(Text24, { style: { fontSize: 14, color: colors.fg3 }, children: "\u{1F4C5}" })
        ]
      }
    ),
    /* @__PURE__ */ jsx35(Modal5, { visible: open, animationType: "slide", transparent: true, onRequestClose: () => setOpen(false), statusBarTranslucent: true, children: /* @__PURE__ */ jsx35(Pressable21, { style: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }, onPress: () => setOpen(false), children: /* @__PURE__ */ jsxs23(
      Pressable21,
      {
        onPress: (e) => e.stopPropagation(),
        style: {
          marginTop: "auto",
          backgroundColor: colors.bg,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingTop: 12,
          paddingHorizontal: space[5],
          paddingBottom: space[7]
        },
        children: [
          /* @__PURE__ */ jsx35(View30, { style: { width: 36, height: 5, borderRadius: 999, backgroundColor: colors.border, alignSelf: "center", marginBottom: space[4] } }),
          /* @__PURE__ */ jsxs23(View30, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: space[3] }, children: [
            /* @__PURE__ */ jsx35(NavBtn, { label: "\u2039", onPress: () => setView((v) => addMonths(v, -1)) }),
            /* @__PURE__ */ jsx35(Text24, { style: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 }, children: monthLabel }),
            /* @__PURE__ */ jsx35(NavBtn, { label: "\u203A", onPress: () => setView((v) => addMonths(v, 1)) })
          ] }),
          /* @__PURE__ */ jsx35(View30, { style: { flexDirection: "row", marginBottom: 4 }, children: WEEKDAYS.map((w) => /* @__PURE__ */ jsx35(Text24, { style: { flex: 1, textAlign: "center", fontSize: 10, color: colors.fg3, textTransform: "uppercase", letterSpacing: 0.5 }, children: w }, w)) }),
          /* @__PURE__ */ jsx35(View30, { style: { flexDirection: "row", flexWrap: "wrap" }, children: days.map((d) => {
            const inMonth = d.getMonth() === view.getMonth();
            const isSelected = selected && sameDay(d, selected);
            const isToday = sameDay(d, today);
            const off = isDisabled(d);
            return /* @__PURE__ */ jsx35(
              Pressable21,
              {
                disabled: off,
                onPress: () => {
                  set(d);
                  setOpen(false);
                },
                style: ({ pressed }) => ({
                  width: `${100 / 7}%`,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isSelected ? colors.accent : pressed && !off ? colors.bgMuted : "transparent",
                  borderRadius: 8
                }),
                accessibilityRole: "button",
                accessibilityState: { selected: !!isSelected, disabled: off },
                children: /* @__PURE__ */ jsx35(Text24, { style: {
                  fontSize: fontSize.sm,
                  color: off ? colors.fg4 : isSelected ? colors.accentFg : !inMonth ? colors.fg4 : colors.fg1,
                  fontWeight: isToday && !isSelected ? fontWeight.semibold : fontWeight.regular,
                  textDecorationLine: isToday && !isSelected ? "underline" : "none"
                }, children: d.getDate() })
              },
              d.toISOString()
            );
          }) }),
          selected && /* @__PURE__ */ jsx35(
            Pressable21,
            {
              onPress: () => {
                set(null);
                setOpen(false);
              },
              style: ({ pressed }) => ({
                marginTop: space[3],
                paddingVertical: space[3],
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: pressed ? colors.bgMuted : "transparent"
              }),
              children: /* @__PURE__ */ jsx35(Text24, { style: { fontSize: fontSize.sm, color: colors.fg3 }, children: "Clear" })
            }
          )
        ]
      }
    ) }) })
  ] });
});
function NavBtn({ label, onPress }) {
  return /* @__PURE__ */ jsx35(
    Pressable21,
    {
      onPress,
      hitSlop: 8,
      style: ({ pressed }) => ({
        width: 36,
        height: 36,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pressed ? colors.bgMuted : "transparent"
      }),
      children: /* @__PURE__ */ jsx35(Text24, { style: { fontSize: 18, color: colors.fg1, lineHeight: 18 }, children: label })
    }
  );
}
export {
  Accordion,
  AccordionItem,
  ActionSheet,
  Alert,
  AppShell,
  Avatar,
  Badge,
  Button,
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
  useToast
};
//# sourceMappingURL=index.js.map