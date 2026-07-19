import assert from "node:assert/strict";
import test from "node:test";
import { copyText } from "../ui/useClipboardCopy.js";

test("copyText waits for the clipboard before reporting success", async () => {
  let resolveWrite;
  let settled = false;
  const result = copyText("npm install @monoset/react", {
    writeText: () => new Promise((resolve) => {
      resolveWrite = resolve;
    }),
  });
  result.then(() => {
    settled = true;
  });

  await Promise.resolve();
  assert.equal(settled, false);

  resolveWrite();
  assert.equal(await result, "copied");
});

test("copyText reports a rejected clipboard write", async () => {
  const clipboard = {
    writeText: async () => {
      throw new Error("permission denied");
    },
  };

  assert.equal(await copyText("Button", clipboard), "failed");
});

test("copyText reports a missing Clipboard API", async () => {
  assert.equal(await copyText("Button", undefined), "failed");
  assert.equal(await copyText("Button", {}), "failed");
});
