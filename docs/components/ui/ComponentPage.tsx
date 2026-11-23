import type { ComponentType } from "react";
import type { ComponentDoc } from "@/lib/registry";
import DocumentationSection from "@/components/ui/DocumentationSection";
import CodeBlock from "@/components/ui/CodeBlock";

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

const ComponentPage = async ({ doc }: Props) => {
  const Example = await loadExample(doc.name);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white/90 px-8 backdrop-blur">
        <span className="text-sm text-neutral-500">Components / {doc.title}</span>
        <span className="text-xs text-neutral-400">KAI UI</span>
      </header>

      <section className="mx-auto max-w-4xl px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">{doc.title}</h2>
          {doc.description && (
            <p className="mt-2 text-sm text-neutral-500">{doc.description}</p>
          )}
        </div>

        <div className="flex min-h-64 items-center justify-center rounded-lg border bg-white p-8">
          {Example ? (
            <Example />
          ) : (
            <p className="text-sm text-neutral-400">
              No preview yet. Add <code>examples/{doc.name}.tsx</code>.
            </p>
          )}
        </div>

        <DocumentationSection title="Installation">
          <CodeBlock>{doc.installCommand}</CodeBlock>
        </DocumentationSection>

        {doc.usage && (
          <DocumentationSection title="Usage">
            <CodeBlock>{doc.usage}</CodeBlock>
          </DocumentationSection>
        )}

        {doc.sources.map((source) => (
          <DocumentationSection
            key={source.path}
            title={doc.sources.length > 1 ? `Source · ${source.path}` : "Source"}
          >
            <CodeBlock>{source.code}</CodeBlock>
          </DocumentationSection>
        ))}
      </section>
    </>
  );
};

export default ComponentPage;
