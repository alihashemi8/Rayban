import assert from "node:assert/strict";
import {
  initialContent,
  validateContent,
  safeUrl,
  mergeRealProjects,
  render,
} from "../.ssr-build/entry-server.js";
const clone = () => structuredClone(initialContent);
assert.equal(
  validateContent(clone()),
  true,
  "Seed content must restore successfully",
);
assert.equal(
  validateContent({ members: [], projects: [] }),
  true,
  "Empty collections remain supported",
);
assert.equal(
  validateContent({ members: [], projects: [{ id: "broken" }] }),
  false,
  "Truncated projects must be rejected",
);
const dangling = clone();
dangling.projects[0].contributors["Project lead"] = "missing-member";
assert.equal(
  validateContent(dangling),
  false,
  "Unknown contributor references must be rejected",
);
const duplicate = clone();
duplicate.members.push(duplicate.members[0]);
assert.equal(
  validateContent(duplicate),
  false,
  "Duplicate member identities must be rejected",
);
const unsafe = clone();
unsafe.members[0].github = "javascript:alert(1)";
assert.equal(validateContent(unsafe), false, "Script URLs must be rejected");
const unsafeImage = clone();
unsafeImage.projects[0].image = "data:text/html,<script>alert(1)</script>";
assert.equal(
  validateContent(unsafeImage),
  false,
  "Non-web image URLs must be rejected",
);
const incomplete = clone();
incomplete.projects[0].title = ["Only one language"];
assert.equal(
  validateContent(incomplete),
  false,
  "Missing title variants must be rejected",
);
assert.equal(safeUrl("https://example.com/project"), true);
assert.equal(safeUrl("file:///private"), false);
console.log(
  "Content validation checks passed: round trip, empty state, malformed data, references, duplicate identities, URL safety and bilingual shape.",
);
const oldContent = clone();
oldContent.projects = oldContent.projects.filter(
  (p) => !["raein", "bokhar"].includes(p.id),
);
oldContent.members[0].bio = "Edited biography";
const upgraded = mergeRealProjects(oldContent);
assert.equal(validateContent(upgraded), true);
assert.equal(upgraded.members[0].bio, "Edited biography");
assert.equal(upgraded.projects.length, oldContent.projects.length + 2);
assert.deepEqual(
  mergeRealProjects(upgraded),
  upgraded,
  "Migration must be idempotent",
);
const editedReal = clone();
editedReal.projects[0].title[0] = "Edited real project";
assert.equal(
  mergeRealProjects(editedReal).projects.find((p) => p.id === "raein").title[0],
  "Edited real project",
);
const full = clone();
full.projects = Array.from({ length: 100 }, (_, i) => ({
  ...full.projects[0],
  id: `saved-${i}`,
}));
assert.equal(
  mergeRealProjects(full).projects.length,
  100,
  "Migration must not discard projects or exceed the limit",
);
for (const route of [
  "/projects",
  "/contact",
  "/projects/raein",
  "/projects/bokhar",
])
  assert.match(render(route), /<h1/, "Public pages have a heading");
assert.match(
  render("/"),
  /project-grid project-rail/,
  "Home projects have a horizontal rail",
);
assert.doesNotMatch(
  render("/projects"),
  /project-grid project-rail/,
  "Directory uses its own grid",
);
assert.match(render("/contact"), /tel:\+989045911122/);
console.log(
  "Migration and route checks passed: edited data preserved, limits respected, public pages, horizontal home rail and telephone link.",
);
