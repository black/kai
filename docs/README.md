# KAI UI — documentation site

The Next.js site behind https://black.github.io/kai/. For how to use the components and how the registry works, see the [project README](../README.md).

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # static export to out/
```

## How pages are generated

Every page comes from `../registry.json` plus files on disk. No page is written by hand.

| Source | Becomes |
| --- | --- |
| `../registry.json` item: `name`, `title`, `description` | Sidebar entry, `/components/<name>` page, title and description, install command |
| `components/kai/<name>.tsx` (the item's `target`) | The **Source** code block |
| `examples/<name>.tsx` (default export) | The live **Preview** and the **Usage** code block |
| `components.json` → `registries["@kai"]` | The "Registry JSON" link and the setup snippet on the home page |

To add a component, follow [Adding a component](../README.md#adding-a-component) in the project README.

## Where things live

| Path | What it does |
| --- | --- |
| `lib/registry.ts` | Reads the registry and files once at build time |
| `app/page.tsx` | Landing page |
| `app/components/layout.tsx` | Sidebar layout for component pages |
| `app/components/[name]/page.tsx` | One static page per registry item |
| `components/ui/ComponentPage.tsx` | Template for a component page |
| `components/ui/CodeBlock.tsx` | Code highlighted with Shiki at build time |
| `components/ui/ThemeToggle.tsx` | Light/dark switch, saved in `localStorage` |
| `app/globals.css` | Color tokens for light and dark mode |

## Static export and GitHub Pages

`next.config.ts` sets `output: "export"` and reads the base path from `PAGES_BASE_PATH`. The deploy workflow sets it to `/kai`. Cache Components and Partial Prefetching are turned off because they need a running Next.js server.
