import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Input.tsx
import {
  createContext,
  forwardRef,
  useContext,
  useId
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var FieldContext = createContext(null);
function mergeTokens(...values) {
  const tokens = values.flatMap((value) => value?.split(/\s+/).filter(Boolean) ?? []);
  return tokens.length > 0 ? [...new Set(tokens)].join(" ") : void 0;
}
var Input = forwardRef(function Input2({
  invalid,
  className,
  id,
  required,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...rest
}, ref) {
  const field = useContext(FieldContext);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...rest,
      ref,
      id: field?.id ?? id,
      required: field?.required || required,
      "aria-describedby": mergeTokens(ariaDescribedBy, field?.describedBy),
      "aria-invalid": field?.invalid ? true : invalid ? true : ariaInvalid,
      className: cx("ms-input", className)
    }
  );
});
var Textarea = forwardRef(function Textarea2({
  invalid,
  className,
  rows = 4,
  id,
  required,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...rest
}, ref) {
  const field = useContext(FieldContext);
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      ...rest,
      ref,
      rows,
      id: field?.id ?? id,
      required: field?.required || required,
      "aria-describedby": mergeTokens(ariaDescribedBy, field?.describedBy),
      "aria-invalid": field?.invalid ? true : invalid ? true : ariaInvalid,
      className: cx("ms-input", className)
    }
  );
});
function FieldControl({ children }) {
  const field = useContext(FieldContext);
  if (!field) {
    throw new Error("Field.Control must be used within Field");
  }
  return children({
    id: field.id,
    "aria-labelledby": field.labelId,
    "aria-describedby": field.describedBy,
    "aria-invalid": field.invalid ? true : void 0,
    required: field.required ? true : void 0
  });
}
var FieldRoot = forwardRef(function Field({
  label,
  description,
  error,
  children,
  id: idProp,
  rootId,
  required = false,
  invalid: invalidProp = false,
  className,
  ...rest
}, ref) {
  const generatedId = useId();
  const id = idProp ?? `ms-field-${generatedId}`;
  const labelId = `${id}-label`;
  const hasDescription = description !== void 0 && description !== null && description !== false;
  const hasError = error !== void 0 && error !== null && error !== false;
  const descriptionId = hasDescription ? `${id}-description` : void 0;
  const errorId = hasError ? `${id}-error` : void 0;
  const describedBy = mergeTokens(descriptionId, errorId);
  const invalid = invalidProp || hasError;
  return /* @__PURE__ */ jsxs("div", { ...rest, ref, id: rootId, className: cx("ms-field", className), children: [
    /* @__PURE__ */ jsx(
      "label",
      {
        id: labelId,
        className: "ms-field__label",
        htmlFor: id,
        onClick: (event) => {
          const control = document.getElementById(id);
          if (control instanceof HTMLElement && !control.matches("input, textarea, select, button")) {
            event.preventDefault();
            control.querySelector("[tabindex]:not([tabindex='-1'])")?.focus();
          }
        },
        children: label
      }
    ),
    /* @__PURE__ */ jsx(FieldContext.Provider, { value: { id, labelId, describedBy, invalid, required }, children }),
    hasDescription && /* @__PURE__ */ jsx("span", { id: descriptionId, className: "ms-field__description", children: description }),
    hasError && /* @__PURE__ */ jsx("span", { id: errorId, role: "alert", className: "ms-field__error", children: error })
  ] });
});
var Field2 = Object.assign(FieldRoot, { Control: FieldControl });

export {
  Input,
  Textarea,
  Field2 as Field
};
//# sourceMappingURL=chunk-U54SG3NW.js.map