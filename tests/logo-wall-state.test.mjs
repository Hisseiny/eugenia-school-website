import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const exports = {};
vm.runInNewContext(ts.transpileModule(readFileSync("src/scripts/logo-wall-state.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports });
const { wallDimensions, chooseCell, adjacent, replacementDelay } = exports;
test("wall exposes 12/9/6 cells at the specified breakpoints", () => {
  for (const [width, count, columns] of [[1440,12,6],[1025,12,6],[1024,9,3],[640,9,3],[639,6,2]]) {
    const size = wallDimensions(width);
    assert.equal(size.count, count); assert.equal(size.columns, columns);
  }
});
test("one thousand choices per breakpoint exclude recent and adjacent cells", () => {
  let seed = 17;
  const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  for (const width of [1440,800,390]) {
    const { count, columns } = wallDimensions(width);
    let recent = [];
    for (let i = 0; i < 1000; i++) {
      const choice = chooseCell(count, columns, recent, random);
      assert.notEqual(choice, undefined);
      assert.ok(!recent.includes(choice));
      if (recent.length) assert.ok(!adjacent(choice, recent.at(-1), columns));
      recent = [...recent, choice].slice(-3);
    }
  }
});
test("replacement delay lies between 1100 and 1600 milliseconds", () => {
  assert.equal(replacementDelay(() => 0), 1100);
  assert.equal(replacementDelay(() => 1), 1600);
});
