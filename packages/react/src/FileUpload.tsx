import { forwardRef, useRef, useState, type DragEvent, type ReactNode } from "react";
import { cx } from "./cx";

export interface FileUploadProps {
  /** Files selected. */
  files?: File[];
  /** Fires when files are picked or dropped. */
  onFilesChange?: (files: File[]) => void;
  /** Native file input accept string, e.g. "image/*,.pdf". */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** Element rendered inside the dropzone. Defaults to a friendly hint. */
  children?: ReactNode;
  className?: string;
  /** Visually hidden label for the file input. */
  "aria-label"?: string;
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(function FileUpload(
  { files, onFilesChange, accept, multiple, disabled, children, className, "aria-label": ariaLabel = "Upload files" },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const update = (fl: FileList | null) => {
    if (!fl || disabled) return;
    const arr = multiple ? Array.from(fl) : [fl[0]].filter(Boolean);
    onFilesChange?.(arr as File[]);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOver(false);
    update(e.dataTransfer.files);
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      className={cx("ms-fileupload", over && "ms-fileupload--over", disabled && "ms-fileupload--disabled", className)}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => update(e.target.files)}
        className="ms-fileupload__input"
        tabIndex={-1}
      />
      {children ?? (
        <div className="ms-fileupload__hint">
          <span className="ms-fileupload__title">
            {files && files.length > 0
              ? files.length === 1 ? files[0].name : `${files.length} files selected`
              : "Drop a file or click to upload"}
          </span>
          {(!files || files.length === 0) && (
            <span className="ms-fileupload__sub">{accept ? accept : "Any file type"}</span>
          )}
        </div>
      )}
    </div>
  );
});
