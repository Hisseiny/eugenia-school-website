import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(readFileSync("src/scripts/rotating-line.ts", "utf8"), {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;

function fixture({ withButton = true } = {}) {
  const listeners = new Map(), timers = new Map();
  let observer, nextId = 0;
  const on = (name, fn) => listeners.set(name, fn);
  const items = Array.from({ length: 6 }, (_, index) => {
    const classes = new Set(index === 0 ? ["is-active"] : []);
    return {
      classList: { add: (v) => classes.add(v), remove: (v) => classes.delete(v), toggle: (v, yes) => yes ? classes.add(v) : classes.delete(v), contains: (v) => classes.has(v) },
      style: { removeProperty() {} },
      animate: () => ({ playState: "running", play() {}, pause() {}, finish() {}, cancel() {} }),
    };
  });
  const button = withButton ? { disabled: true, addEventListener: on, setAttribute() {}, textContent: "" } : null;
  const heading = {};
  const root = {
    dataset: {}, classList: { add() {} }, addEventListener: on, contains: () => false,
    querySelectorAll: () => items, querySelector: (selector) => selector === "h2" ? heading : withButton ? button : null,
  };
  const reduced = { matches: false, addEventListener: (_, fn) => listeners.set("reduce", fn) };
  const document = { hidden: false, querySelectorAll: () => [root], addEventListener: on };
  const IO = class { constructor(fn) { observer = fn; } observe() {} };
  vm.runInNewContext(source, {
    document, window: { matchMedia: () => reduced, IntersectionObserver: IO, addEventListener: on },
    IntersectionObserver: IO, getComputedStyle: () => ({ getPropertyValue: () => "" }),
    setTimeout: (fn) => { timers.set(++nextId, fn); return nextId; },
    clearTimeout: (id) => timers.delete(id),
  });
  return {
    items, timers, button, reduced, document,
    event: (name, event = {}) => listeners.get(name)(event),
    visible: (ratio) => observer([{ intersectionRatio: ratio }]),
    tick: () => { const [id, fn] = [...timers][0]; timers.delete(id); fn(); },
    active: () => items.findIndex((item) => item.classList.contains("is-active")),
  };
}
test("rotation waits for 50% visibility and ends on the last item after three loops", () => {
  const f = fixture();
  assert.equal(f.timers.size, 0);
  f.visible(.49); assert.equal(f.timers.size, 0);
  f.visible(.5);
  for (let i = 0; i < 17; i++) f.tick();
  assert.equal(f.active(), 5);
  assert.equal(f.timers.size, 0);
  assert.equal(f.button.disabled, true);
});
test("hover, focus, manual pause, hidden tab and offscreen all suspend rotation", () => {
  const f = fixture(); f.visible(1);
  for (const [pause, resume] of [["mouseenter", "mouseleave"], ["focusin", "focusout"], ["click", "click"]]) {
    f.event(pause); assert.equal(f.timers.size, 0);
    f.event(resume); assert.equal(f.timers.size, 1);
  }
  f.document.hidden = true; f.event("visibilitychange"); assert.equal(f.timers.size, 0);
  f.document.hidden = false; f.event("visibilitychange"); assert.equal(f.timers.size, 1);
  f.visible(0); assert.equal(f.timers.size, 0);
});
test("reduced motion restores the first item and suppresses timers", () => {
  const f = fixture(); f.visible(1); f.tick(); assert.equal(f.active(), 1);
  f.reduced.matches = true; f.event("reduce");
  assert.equal(f.active(), 0); assert.equal(f.timers.size, 0); assert.equal(f.button.disabled, true);
});
test("rotation completes and reduced motion works without a pause button", () => {
  const f = fixture({ withButton: false });
  f.visible(1);
  f.tick();
  assert.equal(f.active(), 1);
  f.reduced.matches = true;
  f.event("reduce");
  assert.equal(f.active(), 0);
  assert.equal(f.timers.size, 0);
  f.reduced.matches = false;
  f.event("reduce");
  for (let i = 0; i < 17; i++) f.tick();
  assert.equal(f.active(), 5);
  assert.equal(f.timers.size, 0);
});
