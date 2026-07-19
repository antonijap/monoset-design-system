import { useCallback, useEffect, useRef, useState } from "react";

export async function copyText(text, clipboard = globalThis.navigator?.clipboard) {
  if (typeof clipboard?.writeText !== "function") return "failed";

  try {
    await clipboard.writeText(text);
    return "copied";
  } catch {
    return "failed";
  }
}

export function useClipboardCopy(text, resetAfter = 2000) {
  const [copyStatus, setCopyStatus] = useState("idle");
  const resetTimer = useRef();

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copy = useCallback(async () => {
    clearTimeout(resetTimer.current);
    setCopyStatus("idle");
    const nextStatus = await copyText(text);
    setCopyStatus(nextStatus);
    resetTimer.current = setTimeout(() => setCopyStatus("idle"), resetAfter);
  }, [resetAfter, text]);

  return { copy, copyStatus };
}
