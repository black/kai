import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";
import { getComponentDocs, getRegistryUrlTemplate } from "@/lib/registry";

export default function Home() {
  const docs = getComponentDocs();
  const registryUrl = getRegistryUrlTemplate();
  const setup = JSON.stringify({ registries: { "@kai": registryUrl } }, null, 2);

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-[1440px] px-4 pb-14 pt-10 sm:px-6 sm:pt-16">
        <h1 className="text-[clamp(3rem,8vw,5.6rem)] font-normal leading-none tracking-[-0.05em]">
          KAI UI <span className="text-blue">Components</span>
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-md bg-blue-soft px-2.5 py-0.5 text-blue">shadcn registry</span>
          <span className="text-muted">
            {docs.length} component{docs.length === 1 ? "" : "s"} · copy-paste React + Tailwind
          </span>
        </div>
      </section>

      {/* Night band: every component */}
      <section className="bg-night text-night-ink">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
          <p className="eyebrow !text-night-muted">Components</p>
          <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc, i) => (
              <Link
                key={doc.name}
                href={`/components/${doc.name}`}
                className="group border-t border-night-line pt-4 transition-colors hover:border-night-ink"
              >
                <p className="eyebrow !text-night-muted">
                  {String(i + 1).padStart(2, "0")} · {doc.name}
                </p>
                <p className="mt-2 flex items-center gap-2 text-xl tracking-[-0.02em]">
                  {doc.title}
                  <ArrowRight
                    size={16}
                    className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </p>
                {doc.description && (
                  <p className="mt-1 text-sm font-light text-night-muted">{doc.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Setup */}
      {registryUrl && (
        <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Getting started</p>
            <h2 className="mt-3 text-4xl tracking-[-0.035em] sm:text-[2.9rem] sm:leading-[1.08]">
              Add the registry once
            </h2>
            <p className="mt-4 max-w-md text-lg font-light text-muted">
              Point the shadcn CLI at the KAI registry in your <code className="font-mono text-[0.9em]">components.json</code>,
              then install any component by name.
            </p>
          </div>
          <div className="space-y-4">
            <CodeBlock code={setup} lang="json" title="components.json" />
            {docs[0] && (
              <CodeBlock
                code={docs[0].installCommand}
                lang="bash"
                title="Terminal"
              />
            )}
          </div>
        </section>
      )}
    </main>
  );
}
