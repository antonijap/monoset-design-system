import * as react from 'react';
import { ReactNode, AriaAttributes } from 'react';

interface FileUploadProps {
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
declare const FileUpload: react.ForwardRefExoticComponent<FileUploadProps & react.RefAttributes<HTMLDivElement>>;

export { FileUpload, type FileUploadProps };
