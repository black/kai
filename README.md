# KAI UI

Copy-paste React components, distributed as a [shadcn](https://ui.shadcn.com) registry and documented on a static Next.js site.

- **Docs:** https://black.github.io/kai/
- **Registry:** `https://black.github.io/kai/r/{name}.json`

| Component | Install |
| --- | --- |
| Button | `npx shadcn@latest add @kai/button` |
| Tag | `npx shadcn@latest add @kai/tag` |

## Using the components

Add the KAI registry to your project's `components.json`:

```json
{
  "registries": {
    "@kai": "https://black.github.io/kai/r/{name}.json"
  }
}
```

Then install any component by name:

```bash
npx shadcn@latest add @kai/button
```

The component's source is copied into `components/kai/` in your project, so you own the code and can change it freely.

```tsx
import Button from "@/components/kai/button";

export default function Page() {
  return <Button label="Click me" />;
}
```

## Repository layout

```
kai/
├── registry.json          # Registry manifest: every component's name, title, description, files
├── r/                     # Built registry items served to the shadcn CLI (one JSON per component)
├── docs/                  # Documentation site (Next.js, static export)
│   ├── components/kai/    # Component source shown in the docs and installed by the CLI
│   ├── examples/          # One demo per component: rendered as the preview, shown as "Usage"
│   ├── lib/registry.ts    # Reads registry.json + files on disk to build every docs page
│   ├── components/ui/     # Docs-site UI (page template, sidebar, code blocks, theme toggle)
│   └── app/               # Routes: / (landing) and /components/[name]
└── .github/workflows/
    └── deploy-docs.yml    # Builds the docs and publishes them with r/ to GitHub Pages
```

## Adding a component

The docs are generated from `registry.json` and files on disk, so there is no docs page to write by hand.

1. **Write the component** at `docs/components/kai/<name>.tsx`.
2. **Register it** in `registry.json`:

   ```json
   {
     "name": "badge",
     "type": "registry:component",
     "title": "Badge",
     "description": "A small status label.",
     "files": [
       {
         "path": "components/ui/badge.tsx",
         "type": "registry:component",
         "target": "components/kai/badge.tsx"
       }
     ]
   }
   ```

   The docs read the source from `docs/<target>`, so `target` must match where you saved the file in step 1.

3. **Add an example** at `docs/examples/<name>.tsx` with a default export:

   ```tsx
   import Badge from "@/components/kai/badge";

   export default function BadgeExample() {
     return <Badge label="New" />;
   }
   ```

   This file is rendered as the live preview, and its source is shown as the usage snippet. Without it, the page still builds and shows a "No preview yet" note.

4. **Publish the registry item** as `r/<name>.json` with the component's source embedded under `files[].content`. Use an existing file in `r/` as the template. This is the file the shadcn CLI downloads.

The sidebar entry, the `/components/<name>` page, the install command, the preview, the usage snippet and the source code all appear automatically.

## Running the docs locally

```bash
cd docs
npm install
npm run dev
```

Open http://localhost:3000.

To build the static site into `docs/out/`, run:

```bash
npm run build
```

The site is built with `output: "export"`, so `next start` is not used. Serve `docs/out/` with any static file server.

## Deployment

Every push to `main` that touches `docs/`, `r/` or the workflow runs [`deploy-docs.yml`](.github/workflows/deploy-docs.yml). The workflow:

1. Builds the docs with `PAGES_BASE_PATH=/kai`, so links and assets work under `https://black.github.io/kai/`.
2. Copies `r/` into `docs/out/r` so the registry is served next to the docs.
3. Publishes `docs/out` to GitHub Pages.

If the repository is renamed or served from a custom domain, change or remove `PAGES_BASE_PATH` in the workflow.

To reproduce the Pages build locally, run this from PowerShell:

```powershell
$env:PAGES_BASE_PATH='/kai'; npm run build
```

Avoid Git Bash for this command, because it rewrites `/kai` into a Windows path.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, static export)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Shiki](https://shiki.style) for build-time syntax highlighting
- [Geist](https://vercel.com/font) and [Lucide](https://lucide.dev) icons
