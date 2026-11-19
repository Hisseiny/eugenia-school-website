import assert from "node:assert/strict";
import test from "node:test";
import { sandboxConfig, sandboxAllowed, sendSandbox } from "../src/scripts/sandbox-form.ts";

test("sandbox requires an endpoint and an exact explicitly allowed host", () => {
  assert.equal(sandboxAllowed(sandboxConfig(), "localhost"), false);
  assert.equal(sandboxAllowed(sandboxConfig("https://base.test"), "localhost"), false);
  const config = sandboxConfig("https://base.test", "127.0.0.1, preview.test");
  assert.equal(sandboxAllowed(config, "preview.test"), true);
  for (const host of ["localhost", "sub.preview.test", "preview.test.evil"]) assert.equal(sandboxAllowed(config, host), false);
});

test("build configuration rejects invalid endpoints and production hosts", () => {
  for (const url of ["not a URL", "ftp://base.test", "javascript:alert(1)", "https://user:password@base.test"]) {
    assert.throws(() => sandboxConfig(url), /PUBLIC_SANDBOX_FORM_ENDPOINT/);
  }
  for (const host of ["eugeniaschool.com", "www.eugeniaschool.com", "TEST.EUGENIASCHOOL.COM", "eugeniaschool.com.", "https://preview.test"]) {
    assert.throws(() => sandboxConfig("", host), /PUBLIC_SANDBOX_HOSTS/);
  }
  assert.deepEqual(sandboxConfig("", "preview-eugeniaschool.com").hosts, ["preview-eugeniaschool.com"]);
});

test("sandbox posts named fields as simple JSON text and accepts 2xx", async () => {
  let calls = 0;
  await sendSandbox("https://base.test", "contact", { email: "test+horama@example.com", message: "" }, async (url, options) => {
    calls++;
    assert.equal(url, "https://base.test");
    assert.equal(options.method, "POST");
    assert.equal(options.headers["Content-Type"], "text/plain;charset=UTF-8");
    assert.equal(options.credentials, "omit");
    assert.deepEqual(JSON.parse(options.body), { formType: "contact", fields: { email: "test+horama@example.com", message: "" } });
    return new Response(null, { status: 204 });
  });
  assert.equal(calls, 1);
});

test("HTTP, network and timeout errors reject, allowing a retry", async () => {
  await assert.rejects(sendSandbox("https://base.test", "contact", {}, async () => new Response(null, { status: 500 })), /HTTP 500/);
  await assert.rejects(sendSandbox("https://base.test", "contact", {}, async () => { throw new Error("network"); }), /network/);
  await assert.rejects(sendSandbox("https://base.test", "contact", {}, (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(new Error("timeout")));
  }), 5), /timeout/);
  await sendSandbox("https://base.test", "contact", {}, async () => new Response(null, { status: 200 }));
});
