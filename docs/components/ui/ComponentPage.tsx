import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getComponentDocs, getRegistryItemUrl, type ComponentDoc } from "@/lib/registry";
import DocumentationSection from "@/components/ui/DocumentationSection";
import CodeBlock from "@/components/ui/CodeBlock";
import CopyButton from "@/components/ui/CopyButton";

interface Props {
  doc: ComponentDoc;
}

async function loadExample(name: string): Promise<ComponentType | null> {
  try {
    const mod = await import(`@/examples/${name}.tsx`);
    return mod.default;
  } catch {
    return null;
  }
}

const pad = (n: number) => String(n).padStart(2, "0");

const ComponentPage = async ({ doc }: Props) => {
  const Example = await loadExample(doc.name);
  const registryUrl = getRegistryItemUrl(doc.name);

  const all = getComponentDocs();
  const index = all.findIndex((d) => d.name === doc.name);
  const prev = all[index - 1];
  const next = all[index + 1];

  const toc = [
    { id: "preview", title: "Preview" },
    ...(doc.usage ? [{ id: "usage", title: "Usage" }] : []),
    ...(doc.sources.length ? [{ id: "source", title: "Source" }] : []),
  ];

  return (
    <article className="pb-24 pt-8 lg:pt-10">
      {/* Title */}
      <p className="eyebrow">Component · {pad(index + 1)}</p>
      <h1 className="mt-3 text-[clamp(2.75rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.045em]">
        {doc.title}
      </h1>
      {doc.description && (
        <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-muted sm:text-xl">
          {doc.description}
        </p>
      )}

      <hr className="my-10 border-line" />

      {/* On this page + install card */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0">
          <p className="eyebrow">On this page</p>
          <ul className="mt-3 border-t border-ink">
            {toc.map((item) => (
              <li key={item.id} className="border-b border-line">
                <a
                  href={`#${item.id}`}
                  className="flex items-center justify-between py-3 transition-colors hover:text-blue"
                >
                  {item.title}
                  <ArrowRight size={15} strokeWidth={1.5} className="text-muted" />
                </a>
              </li>
            ))}
            {registryUrl && (
              <li className="border-b border-line">
                <a
                  href={registryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 transition-colors hover:text-blue"
                >
                  Registry JSON
                  <ArrowUpRight size={15} strokeWidth={1.5} className="text-muted" />
                </a>
              </li>
            )}
          </ul>
        </div>

        <div id="installation" className="min-w-0 rounded-lg bg-night p-6 text-night-ink sm:p-7">
          <p className="eyebrow !text-night-muted">Installation</p>
          <p className="mt-4 text-2xl leading-tight tracking-[-0.03em] sm:text-[1.75rem]">
            Add {doc.title} to your project with one command.
          </p>
          <div className="mt-6 flex items-center justify-between gap-2 rounded-md border border-night-line pl-4 pr-1">
            <code className="overflow-x-auto whitespace-nowrap py-3 font-mono text-[13px]">
              <span className="select-none text-night-muted">$ </span>
              {doc.installCommand}
            </code>
            <CopyButton value={doc.installCommand} />
          </div>
        </div>
      </div>

      {/* Preview */}
      <DocumentationSection id="preview" title="Preview">
        <div className="bg-grid flex min-h-80 items-center justify-center overflow-x-auto rounded-lg border border-line p-6 sm:p-10">
          {Example ? (
            <Example />
          ) : (
            <p className="eyebrow">No preview yet — add examples/{doc.name}.tsx</p>
          )}
        </div>
      </DocumentationSection>

      {doc.usage && (
        <DocumentationSection id="usage" title="Usage">
          <CodeBlock code={doc.usage} title={`examples/${doc.name}.tsx`} />
        </DocumentationSection>
      )}

      {doc.sources.length > 0 && (
        <DocumentationSection id="source" title="Source">
          <div className="space-y-6">
            {doc.sources.map((source) => (
              <CodeBlock key={source.path} code={source.code} title={source.path} />
            ))}
          </div>
        </DocumentationSection>
      )}

      {/* Prev / next */}
      {(prev || next) && (
        <nav className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/components/${prev.name}`}
              className="group rounded-lg border border-line p-5 transition-colors hover:bg-card"
            >
              <span className="eyebrow flex items-center gap-1.5">
                <ArrowLeft size={13} /> Previous
              </span>
              <span className="mt-2 block text-lg tracking-[-0.02em] group-hover:text-blue">
                <span className="font-mono text-sm text-muted">{pad(index)}</span> {prev.title}
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link
              href={`/components/${next.name}`}
              className="group rounded-lg border border-line p-5 text-right transition-colors hover:bg-card"
            >
              <span className="eyebrow flex items-center justify-end gap-1.5">
                Next <ArrowRight size={13} />
              </span>
              <span className="mt-2 block text-lg tracking-[-0.02em] group-hover:text-blue">
                <span className="font-mono text-sm text-muted">{pad(index + 2)}</span> {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
};

export default ComponentPage;
