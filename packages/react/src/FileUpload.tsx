import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type AriaAttributes,
  type DragEvent,
  type ReactNode,
} from "react";
import { cx } from "./cx";

export interface FileUploadProps {
  [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
  /** Files selected by a controlled state owner. */
  files?: File[];
  /** Initial files when the component owns its state. */
  defaultFiles?: File[];
  /** Fires when a picked, dropped, or removed file changes the selection. */
  onFilesChange?: (files: File[]) => void;
  /** Fires with files that do not match `accept`. */
  onFilesRejected?: (files: File[]) => void;
  /** Native file input accept string, such as `image/*,.pdf`. */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  name?: string;
  form?: string;
  id?: string;
  title?: string;
  /** Replaces the default prompt inside the dropzone. */
  children?: ReactNode;
  className?: string;
  "aria-label"?: AriaAttributes["aria-label"];
  "aria-labelledby"?: AriaAttributes["aria-labelledby"];
  "aria-describedby"?: AriaAttributes["aria-describedby"];
  "aria-errormessage"?: AriaAttributes["aria-errormessage"];
  "aria-invalid"?: AriaAttributes["aria-invalid"];
  "aria-required"?: AriaAttributes["aria-required"];
}

function normalizeFiles(files: File[], multiple: boolean) {
  return multiple || files.length <= 1 ? files : files.slice(0, 1);
}

function acceptsFile(file: File, accept?: string) {
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

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  function FileUpload(
    {
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
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    const initialDefaultFilesRef = useRef<File[] | null>(null);
    if (initialDefaultFilesRef.current === null) {
      initialDefaultFilesRef.current = normalizeFiles([...defaultFiles], multiple);
    }
    const initialDefaultFiles = initialDefaultFilesRef.current;
    const [uncontrolledFiles, setUncontrolledFiles] = useState<File[]>(
      initialDefaultFiles,
    );
    const [over, setOver] = useState(false);
    const controlled = files !== undefined;
    const currentFiles = normalizeFiles(
      controlled ? files : uncontrolledFiles,
      multiple,
    );
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
    const isRequired =
      required || ariaRequired === true || ariaRequired === "true";
    const effectiveAriaInvalid = isInvalid ? true : ariaInvalid;
    const effectiveAriaRequired = isRequired ? true : ariaRequired;

    const commitFiles = (nextFiles: File[]) => {
      if (disabled) return;
      const normalizedFiles = normalizeFiles(nextFiles, multiple);
      if (!controlled) setUncontrolledFiles(normalizedFiles);
      onFilesChange?.(normalizedFiles);
    };

    const processFiles = (nextFiles: File[]) => {
      if (disabled) return;

      const accepted: File[] = [];
      const rejected: File[] = [];
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

      const handleFormData = (event: Event) => {
        if (disabled || !name) return;
        const formData = (event as FormDataEvent).formData;
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

    const accessibleLabel =
      ariaLabel ?? (ariaLabelledby ? undefined : "Upload files");

    return (
      <div
        ref={ref}
        title={title}
        {...dataAttributes}
        className={cx(
          "ms-fileupload",
          over && "ms-fileupload--over",
          disabled && "ms-fileupload--disabled",
          isInvalid && "ms-fileupload--invalid",
          className,
        )}
      >
        <label
          className="ms-fileupload__dropzone"
          aria-disabled={disabled || undefined}
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(event: DragEvent<HTMLLabelElement>) => {
            event.preventDefault();
            setOver(false);
            if (!disabled) processFiles(Array.from(event.dataTransfer.files));
          }}
        >
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            form={form}
            required={isRequired && currentFiles.length === 0}
            aria-required={effectiveAriaRequired}
            aria-invalid={effectiveAriaInvalid}
            aria-label={accessibleLabel}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            aria-errormessage={ariaErrorMessage}
            className="ms-fileupload__input"
            onChange={(event) => {
              processFiles(Array.from(event.currentTarget.files ?? []));
              event.currentTarget.value = "";
            }}
          />
          {children ?? (
            <span className="ms-fileupload__hint">
              <span className="ms-fileupload__title">
                {multiple
                  ? "Drop files or click to upload"
                  : "Drop a file or click to upload"}
              </span>
              <span className="ms-fileupload__sub">
                {accept || "Any file type"}
              </span>
            </span>
          )}
        </label>

        {currentFiles.length > 0 && (
          <ul className="ms-fileupload__files" aria-live="polite">
            {currentFiles.map((file, index) => (
              <li
                key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                className="ms-fileupload__file"
              >
                <span className="ms-fileupload__filename">{file.name}</span>
                <button
                  type="button"
                  className="ms-fileupload__remove"
                  disabled={disabled}
                  aria-label={`Remove ${file.name}`}
                  onClick={() => {
                    if (disabled) return;
                    commitFiles(
                      currentFiles.filter((_, fileIndex) => fileIndex !== index),
                    );
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);
