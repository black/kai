import "server-only";

import fs from "node:fs";
import path from "node:path";

/**
 * Everything the docs site shows is derived from the shadcn registry
 * (`../registry.json`) plus the files on disk. To document a new component:
 *
 *   1. Add an item to `registry.json` (name, title, description, files).
 *   2. Put the component at the item's `target` path (e.g. components/kai/foo.tsx).
 *   3. Add `examples/<name>.tsx` with a default-exported demo. It is rendered
 *      as the live preview and its source is shown as the "Usage" snippet.
 */

const DOCS_ROOT = process.cwd();
const REGISTRY_PATH = path.join(DOCS_ROOT, "..", "registry.json");
const EXAMPLES_DIR = path.join(DOCS_ROOT, "examples");

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  files?: RegistryFile[];
}

interface Registry {
  name: string;
  homepage?: string;
  items: RegistryItem[];
}

export interface ComponentDoc {
  name: string;
  title: string;
  description: string;
  installCommand: string;
  /** Source of the example file, shown as the usage snippet. */
  usage: string | null;
  /** Source of each component file, as installed into the user's project. */
  sources: { path: string; code: string }[];
}

function readIfExists(file: string): string | null {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf-8").replace(/\r\n/g, "\n") : null;
}

// Read once at module scope: the registry doesn't change between requests,
// so it becomes part of the static shell.
const registry: Registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));

const docs: ComponentDoc[] = registry.items.map((item) => ({
  name: item.name,
  title: item.title ?? item.name,
  description: item.description ?? "",
  installCommand: `npx shadcn@latest add @kai/${item.name}`,
  usage: readIfExists(path.join(/*turbopackIgnore: true*/ EXAMPLES_DIR, `${item.name}.tsx`)),
  sources: (item.files ?? []).flatMap((file) => {
    const displayPath = file.target ?? file.path;
    // Prefer the copy that lives in the docs app (at its install target),
    // fall back to the path relative to the registry root.
    const code =
      (file.target && readIfExists(path.join(/*turbopackIgnore: true*/ DOCS_ROOT, file.target))) ||
      readIfExists(path.join(/*turbopackIgnore: true*/ DOCS_ROOT, "..", file.path));
    return code ? [{ path: displayPath, code }] : [];
  }),
}));

export const registryInfo = { name: registry.name, homepage: registry.homepage };

export function getComponentDocs(): ComponentDoc[] {
  return docs;
}

export function getComponentDoc(name: string): ComponentDoc | undefined {
  return docs.find((doc) => doc.name === name);
}
