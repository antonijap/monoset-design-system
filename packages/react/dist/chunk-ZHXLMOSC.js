import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/FileUpload.tsx
import {
  forwardRef,
  useEffect,
  useRef,
  useState
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function normalizeFiles(files, multiple) {
  return multiple || files.length <= 1 ? files : files.slice(0, 1);
}
function acceptsFile(file, accept) {
  if (!accept?.trim()) return true;
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();
  return accept.split(",").some((rawToken) => {
    const token = rawToken.trim().toLowerCase();
    if (!token) return false;
    if (token.startsWith(".")) return fileName.endsWith(token);
    if (token.endsWith("/*")) {
      return fileType.startsWith(token.slice(0, -1));
    }
    return fileType === token;
  });
}
var FileUpload = forwardRef(
  function FileUpload2({
    files,
    defaultFiles = [],
    onFilesChange,
    onFilesRejected,
    accept,
    multiple = false,
    disabled = false,
    required = false,
    invalid = false,
    name,
    form,
    id,
    title,
    children,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    "aria-errormessage": ariaErrorMessage,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
    ...dataAttributes
  }, ref) {
    const inputRef = useRef(null);
    const initialDefaultFilesRef = useRef(null);
    if (initialDefaultFilesRef.current === null) {
      initialDefaultFilesRef.current = normalizeFiles([...defaultFiles], multiple);
    }
    const initialDefaultFiles = initialDefaultFilesRef.current;
    const [uncontrolledFiles, setUncontrolledFiles] = useState(
      initialDefaultFiles
    );
    const [over, setOver] = useState(false);
    const controlled = files !== void 0;
    const currentFiles = normalizeFiles(
      controlled ? files : uncontrolledFiles,
      multiple
    );
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
    const isRequired = required || ariaRequired === true || ariaRequired === "true";
    const effectiveAriaInvalid = isInvalid ? true : ariaInvalid;
    const effectiveAriaRequired = isRequired ? true : ariaRequired;
    const commitFiles = (nextFiles) => {
      if (disabled) return;
      const normalizedFiles = normalizeFiles(nextFiles, multiple);
      if (!controlled) setUncontrolledFiles(normalizedFiles);
      onFilesChange?.(normalizedFiles);
    };
    const processFiles = (nextFiles) => {
      if (disabled) return;
      const accepted = [];
      const rejected = [];
      for (const file of nextFiles) {
        if (acceptsFile(file, accept)) accepted.push(file);
        else rejected.push(file);
      }
      if (rejected.length > 0) onFilesRejected?.(rejected);
      if (accepted.length === 0) return;
      commitFiles(multiple ? accepted : accepted.slice(0, 1));
    };
    useEffect(() => {
      const input = inputRef.current;
      const ownerForm = input?.form;
      if (!input || !ownerForm) return;
      const handleFormData = (event) => {
        if (disabled || !name) return;
        const formData = event.formData;
        for (const file of currentFiles) {
          formData.append(name, file, file.name);
        }
      };
      const handleReset = () => {
        input.value = "";
        setOver(false);
        if (!controlled) setUncontrolledFiles(initialDefaultFiles);
      };
      ownerForm.addEventListener("formdata", handleFormData);
      ownerForm.addEventListener("reset", handleReset);
      return () => {
        ownerForm.removeEventListener("formdata", handleFormData);
        ownerForm.removeEventListener("reset", handleReset);
      };
    }, [controlled, currentFiles, disabled, initialDefaultFiles, name]);
    const accessibleLabel = ariaLabel ?? (ariaLabelledby ? void 0 : "Upload files");
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        title,
        ...dataAttributes,
        className: cx(
          "ms-fileupload",
          over && "ms-fileupload--over",
          disabled && "ms-fileupload--disabled",
          isInvalid && "ms-fileupload--invalid",
          className
        ),
        children: [
          /* @__PURE__ */ jsxs(
            "label",
            {
              className: "ms-fileupload__dropzone",
              "aria-disabled": disabled || void 0,
              onDragOver: (event) => {
                event.preventDefault();
                if (!disabled) setOver(true);
              },
              onDragLeave: () => setOver(false),
              onDrop: (event) => {
                event.preventDefault();
                setOver(false);
                if (!disabled) processFiles(Array.from(event.dataTransfer.files));
              },
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    ref: inputRef,
                    id,
                    type: "file",
                    accept,
                    multiple,
                    disabled,
                    form,
                    required: isRequired && currentFiles.length === 0,
                    "aria-required": effectiveAriaRequired,
                    "aria-invalid": effectiveAriaInvalid,
                    "aria-label": accessibleLabel,
                    "aria-labelledby": ariaLabelledby,
                    "aria-describedby": ariaDescribedby,
                    "aria-errormessage": ariaErrorMessage,
                    className: "ms-fileupload__input",
                    onChange: (event) => {
                      processFiles(Array.from(event.currentTarget.files ?? []));
                      event.currentTarget.value = "";
                    }
                  }
                ),
                children ?? /* @__PURE__ */ jsxs("span", { className: "ms-fileupload__hint", children: [
                  /* @__PURE__ */ jsx("span", { className: "ms-fileupload__title", children: multiple ? "Drop files or click to upload" : "Drop a file or click to upload" }),
                  /* @__PURE__ */ jsx("span", { className: "ms-fileupload__sub", children: accept || "Any file type" })
                ] })
              ]
            }
          ),
          currentFiles.length > 0 && /* @__PURE__ */ jsx("ul", { className: "ms-fileupload__files", "aria-live": "polite", children: currentFiles.map((file, index) => /* @__PURE__ */ jsxs(
            "li",
            {
              className: "ms-fileupload__file",
              children: [
                /* @__PURE__ */ jsx("span", { className: "ms-fileupload__filename", children: file.name }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "ms-fileupload__remove",
                    disabled,
                    "aria-label": `Remove ${file.name}`,
                    onClick: () => {
                      if (disabled) return;
                      commitFiles(
                        currentFiles.filter((_, fileIndex) => fileIndex !== index)
                      );
                    },
                    children: "Remove"
                  }
                )
              ]
            },
            `${file.name}-${file.size}-${file.lastModified}-${index}`
          )) })
        ]
      }
    );
  }
);

export {
  FileUpload
};
//# sourceMappingURL=chunk-ZHXLMOSC.js.map