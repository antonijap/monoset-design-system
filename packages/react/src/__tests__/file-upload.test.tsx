import { createRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { FileUpload } from "../index";

function createFile(
  name: string,
  type = "text/plain",
  contents = name,
) {
  return new File([contents], name, { type, lastModified: 1 });
}

function dispatchFormData(form: HTMLFormElement) {
  const formData = new FormData();
  const event = new Event("formdata");
  Object.defineProperty(event, "formData", { value: formData });
  form.dispatchEvent(event);
  return formData;
}

describe("FileUpload", () => {
  it("uses a focusable native file input inside a label and keeps the file list outside it", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLDivElement>();
    const file = createFile("notes.txt");
    render(
      <FileUpload
        ref={ref}
        aria-label="Attach documents"
        defaultFiles={[file]}
        id="documents"
        title="Project documents"
        className="documents"
        data-testid="upload-root"
        data-state="ready"
      />,
    );

    const root = screen.getByTestId("upload-root");
    const input = screen.getByLabelText("Attach documents");
    const dropzone = root.querySelector("label");
    const remove = screen.getByRole("button", { name: "Remove notes.txt" });

    expect(ref.current).toBe(root);
    expect(root).toHaveClass("ms-fileupload", "documents");
    expect(root).toHaveAttribute("title", "Project documents");
    expect(root).toHaveAttribute("data-state", "ready");
    expect(input).toHaveAttribute("id", "documents");
    expect(input).toHaveAttribute("type", "file");
    expect(input).not.toHaveAttribute("tabindex", "-1");
    expect(dropzone).toContainElement(input);
    expect(dropzone).not.toContainElement(remove);

    await user.tab();
    expect(document.activeElement).toBe(input);
  });

  it("stores uncontrolled picks, replaces each batch, and removes individual files", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    const first = createFile("first.txt");
    const second = createFile("second.txt");
    const replacement = createFile("replacement.txt");
    render(
      <FileUpload
        aria-label="Upload documents"
        defaultFiles={[first]}
        multiple
        onFilesChange={onFilesChange}
      />,
    );

    const input = screen.getByLabelText("Upload documents") as HTMLInputElement;
    expect(screen.getByText("first.txt")).toBeInTheDocument();

    await user.upload(input, [first, second]);
    expect(onFilesChange).toHaveBeenLastCalledWith([first, second]);
    expect(screen.getByText("second.txt")).toBeInTheDocument();

    await user.upload(input, replacement);
    expect(onFilesChange).toHaveBeenLastCalledWith([replacement]);
    expect(screen.queryByText("first.txt")).not.toBeInTheDocument();
    expect(screen.getByText("replacement.txt")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Remove replacement.txt" }),
    );
    expect(onFilesChange).toHaveBeenLastCalledWith([]);
    expect(screen.queryByText("replacement.txt")).not.toBeInTheDocument();
  });

  it("keeps controlled files authoritative", async () => {
    const user = userEvent.setup();
    const selected = createFile("selected.txt");
    const next = createFile("next.txt");
    const onFilesChange = vi.fn();
    const { rerender } = render(
      <FileUpload
        aria-label="Upload file"
        files={[selected]}
        onFilesChange={onFilesChange}
      />,
    );

    const input = screen.getByLabelText("Upload file") as HTMLInputElement;
    await user.upload(input, next);
    expect(onFilesChange).toHaveBeenLastCalledWith([next]);
    expect(screen.getByText("selected.txt")).toBeInTheDocument();
    expect(screen.queryByText("next.txt")).not.toBeInTheDocument();

    rerender(
      <FileUpload
        aria-label="Upload file"
        files={[next]}
        onFilesChange={onFilesChange}
      />,
    );
    expect(screen.queryByText("selected.txt")).not.toBeInTheDocument();
    expect(screen.getByText("next.txt")).toBeInTheDocument();
  });

  it("clears the picker so selecting the same file again emits another change", async () => {
    const user = userEvent.setup();
    const file = createFile("repeat.txt");
    const onFilesChange = vi.fn();
    render(
      <FileUpload
        aria-label="Upload file"
        onFilesChange={onFilesChange}
      />,
    );

    const input = screen.getByLabelText("Upload file") as HTMLInputElement;
    await user.upload(input, file);
    expect(input.value).toBe("");
    await user.upload(input, file);

    expect(onFilesChange).toHaveBeenCalledTimes(2);
    expect(onFilesChange).toHaveBeenLastCalledWith([file]);
    expect(input.value).toBe("");
  });

  it("filters picked and dropped files by extension, exact MIME, and wildcard MIME", async () => {
    const user = userEvent.setup({ applyAccept: false });
    const pdf = createFile("brief.PDF", "application/pdf");
    const json = createFile("settings.data", "application/json");
    const image = createFile("cover.bin", "image/png");
    const text = createFile("notes.txt", "text/plain");
    const onFilesChange = vi.fn();
    const onFilesRejected = vi.fn();
    render(
      <FileUpload
        aria-label="Upload assets"
        accept=".pdf, application/json, image/*"
        multiple
        onFilesChange={onFilesChange}
        onFilesRejected={onFilesRejected}
      />,
    );

    const input = screen.getByLabelText("Upload assets") as HTMLInputElement;
    await user.upload(input, [pdf, json, image, text]);
    expect(onFilesChange).toHaveBeenLastCalledWith([pdf, json, image]);
    expect(onFilesRejected).toHaveBeenLastCalledWith([text]);

    const replacement = createFile("replacement.pdf", "");
    fireEvent.drop(input.closest("label") as HTMLLabelElement, {
      dataTransfer: { files: [replacement, text] },
    });
    expect(onFilesChange).toHaveBeenLastCalledWith([replacement]);
    expect(onFilesRejected).toHaveBeenLastCalledWith([text]);
    expect(screen.getByText("replacement.pdf")).toBeInTheDocument();
  });

  it("preserves the current selection when every file in a batch is rejected", () => {
    const current = createFile("current.pdf", "application/pdf");
    const rejected = createFile("rejected.txt", "text/plain");
    const onFilesChange = vi.fn();
    const onFilesRejected = vi.fn();
    render(
      <FileUpload
        aria-label="Upload PDF"
        accept="application/pdf"
        defaultFiles={[current]}
        onFilesChange={onFilesChange}
        onFilesRejected={onFilesRejected}
      />,
    );

    const input = screen.getByLabelText("Upload PDF") as HTMLInputElement;
    fireEvent.drop(input.closest("label") as HTMLLabelElement, {
      dataTransfer: { files: [rejected] },
    });

    expect(onFilesRejected).toHaveBeenCalledWith([rejected]);
    expect(onFilesChange).not.toHaveBeenCalled();
    expect(screen.getByText("current.pdf")).toBeInTheDocument();
  });

  it("keeps only the first accepted file in single-file mode", async () => {
    const user = userEvent.setup();
    const first = createFile("first.txt");
    const second = createFile("second.txt");
    const onFilesChange = vi.fn();
    render(
      <FileUpload aria-label="Upload file" onFilesChange={onFilesChange} />,
    );

    await user.upload(
      screen.getByLabelText("Upload file") as HTMLInputElement,
      [first, second],
    );

    expect(onFilesChange).toHaveBeenLastCalledWith([first]);
    expect(screen.getByText("first.txt")).toBeInTheDocument();
    expect(screen.queryByText("second.txt")).not.toBeInTheDocument();
  });

  it("normalizes default and controlled arrays in single-file mode", () => {
    const firstDefault = createFile("first-default.txt");
    const secondDefault = createFile("second-default.txt");
    const firstControlled = createFile("first-controlled.txt");
    const secondControlled = createFile("second-controlled.txt");
    render(
      <>
        <FileUpload
          aria-label="Default upload"
          defaultFiles={[firstDefault, secondDefault]}
        />
        <FileUpload
          aria-label="Controlled upload"
          files={[firstControlled, secondControlled]}
        />
      </>,
    );

    expect(screen.getByText("first-default.txt")).toBeInTheDocument();
    expect(screen.queryByText("second-default.txt")).not.toBeInTheDocument();
    expect(screen.getByText("first-controlled.txt")).toBeInTheDocument();
    expect(screen.queryByText("second-controlled.txt")).not.toBeInTheDocument();
  });

  it("uses custom children as the prompt while retaining the selected list", () => {
    const file = createFile("portfolio.pdf", "application/pdf");
    render(
      <FileUpload aria-label="Upload portfolio" defaultFiles={[file]}>
        <span>Choose your portfolio</span>
      </FileUpload>,
    );

    expect(screen.getByText("Choose your portfolio")).toBeInTheDocument();
    expect(screen.getByText("portfolio.pdf")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remove portfolio.pdf" }),
    ).toBeInTheDocument();
  });

  it("blocks picking, dropping, and removal while disabled", async () => {
    const user = userEvent.setup();
    const current = createFile("current.txt");
    const next = createFile("next.txt");
    const onFilesChange = vi.fn();
    const onFilesRejected = vi.fn();
    render(
      <FileUpload
        aria-label="Upload file"
        defaultFiles={[current]}
        disabled
        name="attachment"
        onFilesChange={onFilesChange}
        onFilesRejected={onFilesRejected}
      />,
    );

    const input = screen.getByLabelText("Upload file") as HTMLInputElement;
    const remove = screen.getByRole("button", { name: "Remove current.txt" });
    expect(input).toBeDisabled();
    expect(remove).toBeDisabled();

    await user.upload(input, next);
    fireEvent.drop(input.closest("label") as HTMLLabelElement, {
      dataTransfer: { files: [next] },
    });
    await user.click(remove);

    expect(onFilesChange).not.toHaveBeenCalled();
    expect(onFilesRejected).not.toHaveBeenCalled();
    expect(screen.getByText("current.txt")).toBeInTheDocument();
  });

  it("submits current files to internal and external forms and omits disabled files", () => {
    const internal = createFile("internal.txt");
    const external = createFile("external.txt");
    const disabled = createFile("disabled.txt");
    render(
      <>
        <form data-testid="internal-form">
          <FileUpload
            aria-label="Internal upload"
            name="documents"
            defaultFiles={[internal]}
          />
        </form>
        <form id="external-form" data-testid="external-form" />
        <FileUpload
          aria-label="External upload"
          name="documents"
          form="external-form"
          defaultFiles={[external]}
        />
        <FileUpload
          aria-label="Disabled upload"
          name="disabled"
          form="external-form"
          defaultFiles={[disabled]}
          disabled
        />
      </>,
    );

    expect(
      dispatchFormData(
        screen.getByTestId("internal-form") as HTMLFormElement,
      ).getAll("documents"),
    ).toEqual([internal]);
    const externalData = dispatchFormData(
      screen.getByTestId("external-form") as HTMLFormElement,
    );
    expect(externalData.getAll("documents")).toEqual([external]);
    expect(externalData.has("disabled")).toBe(false);
  });

  it("restores uncontrolled default files when its owner form resets", async () => {
    const user = userEvent.setup();
    const initial = createFile("initial.txt");
    const changedDefault = createFile("changed-default.txt");
    const next = createFile("next.txt");
    const { rerender } = render(
      <form data-testid="upload-form">
        <FileUpload
          aria-label="Upload file"
          name="attachment"
          defaultFiles={[initial]}
        />
      </form>,
    );

    await user.upload(
      screen.getByLabelText("Upload file") as HTMLInputElement,
      next,
    );
    expect(screen.getByText("next.txt")).toBeInTheDocument();

    rerender(
      <form data-testid="upload-form">
        <FileUpload
          aria-label="Upload file"
          name="attachment"
          defaultFiles={[changedDefault]}
        />
      </form>,
    );

    fireEvent.reset(screen.getByTestId("upload-form"));
    await waitFor(() =>
      expect(screen.getByText("initial.txt")).toBeInTheDocument(),
    );
    expect(screen.queryByText("next.txt")).not.toBeInTheDocument();
  });

  it("uses current files for native required validity", async () => {
    const user = userEvent.setup();
    render(
      <form data-testid="upload-form">
        <FileUpload
          aria-label="Required attachment"
          name="attachment"
          required
        />
      </form>,
    );

    const form = screen.getByTestId("upload-form") as HTMLFormElement;
    const input = screen.getByLabelText(
      "Required attachment",
    ) as HTMLInputElement;
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toBeRequired();
    expect(form.checkValidity()).toBe(false);

    await user.upload(input, createFile("required.txt"));
    expect(input).not.toHaveAttribute("required");
    expect(form.checkValidity()).toBe(true);

    await user.click(
      screen.getByRole("button", { name: "Remove required.txt" }),
    );
    expect(input).toBeRequired();
    expect(form.checkValidity()).toBe(false);
  });

  it("forwards explicit ARIA and invalid metadata to the native input", () => {
    render(
      <>
        <span id="upload-label">Attachments</span>
        <span id="upload-help">PDF only</span>
        <span id="upload-error">Choose a valid file</span>
        <FileUpload
          aria-labelledby="upload-label"
          aria-describedby="upload-help"
          aria-errormessage="upload-error"
          aria-invalid="true"
          aria-required="true"
          name="documents"
          form="external-form"
          data-kind="documents"
        />
        <form id="external-form" />
      </>,
    );

    const input = screen.getByLabelText("Attachments");
    expect(input).toHaveAttribute("aria-describedby", "upload-help");
    expect(input).toHaveAttribute("aria-errormessage", "upload-error");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("form", "external-form");
    expect(input).not.toHaveAttribute("name");
    expect(input.closest(".ms-fileupload")).toHaveClass("ms-fileupload--invalid");
    expect(input.closest(".ms-fileupload")).toHaveAttribute(
      "data-kind",
      "documents",
    );
  });

  it("has no obvious accessibility violations", async () => {
    const { container } = render(
      <FileUpload
        aria-label="Upload documents"
        defaultFiles={[createFile("brief.pdf", "application/pdf")]}
        accept="application/pdf"
        multiple
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
