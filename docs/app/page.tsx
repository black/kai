"use client";

import { useState } from "react";
import ButtonPreview from "@/components/kai/button";
import DocumentationSection from "@/components/ui/DocumentationSection";

const components = [
  {
    name: "Button",
    description: "A simple button component.",
    id: "button",
  },
  {
    name: "Tag",
    description: "A label for categorizing or highlighting content.",
    id: "tag",
  },
];

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("button");

  const selected = components.find((item) => item.id === activeComponent)!;

  return (
    <main className="flex min-h-screen bg-white text-neutral-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-white px-5 py-6">
        <div className="mb-8">
          <h1 className="text-xl font-semibold tracking-tight">KAI UI</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Component Registry
          </p>
        </div>

        <div>
          <p className="mb-2 px-3 text-xs font-medium tracking-wider text-neutral-400">
            COMPONENTS
          </p>

          <nav className="space-y-1">
            {components.map((component) => (
              <button
                key={component.id}
                onClick={() => setActiveComponent(component.id)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  activeComponent === component.id
                    ? "bg-neutral-100 font-medium text-neutral-900"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                {component.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t pt-4">
          <a
            href="https://github.com/black/kai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
          >
            GitHub
            <span>↗</span>
          </a>
        </div>
      </aside>

      {/* Documentation pane */}
      <section className="ml-64 min-w-0 flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white/90 px-8 backdrop-blur">
          <span className="text-sm text-neutral-500">
            Components / {selected.name}
          </span>

          <span className="text-xs text-neutral-400">KAI UI</span>
        </header>

        <div className="mx-auto max-w-4xl px-8 py-12">
          {activeComponent === "button" && (
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Button
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                  A simple button component.
                </p>
              </div>

              {/* Preview */}
              <div className="flex min-h-64 items-center justify-center rounded-lg border bg-white p-8">
                <ButtonPreview />
              </div>

              {/* Installation */}
              <DocumentationSection title="Installation">
                <CodeBlock>
                  npx shadcn@latest add @kai/button
                </CodeBlock>
              </DocumentationSection>

              {/* Usage */}
              <DocumentationSection title="Usage">
                <CodeBlock>
{`import Button from "@/components/kai/button";

<Button label="Click me" />`}
                </CodeBlock>
              </DocumentationSection>

              {/* Source */}
              <DocumentationSection title="Source">
                <CodeBlock>
{`interface Props {
  label?: string;
  onClick?: () => void;
}

const Button = (props: Props) => {
  const { label, onClick } = props;

  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;`}
                </CodeBlock>
              </DocumentationSection>
            </section>
          )}

          {activeComponent === "tag" && (
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Tag
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                  A label for categorizing or highlighting content.
                </p>
              </div>

              {/* Preview */}
              <div className="flex min-h-64 items-center justify-center gap-3 rounded-lg border bg-white p-8">
                <span className="rounded-md bg-neutral-100 px-3 py-1.5 text-sm">
                  Default
                </span>

                <span className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white">
                  Active
                </span>

                <span className="rounded-md border px-3 py-1.5 text-sm">
                  Outline
                </span>
              </div>

              {/* Installation */}
              <DocumentationSection title="Installation">
                <CodeBlock>
                  npx shadcn@latest add @kai/tag
                </CodeBlock>
              </DocumentationSection>

              {/* Usage */}
              <DocumentationSection title="Usage">
                <CodeBlock>
{`import Tag from "@/components/kai/tag";

<Tag>Active</Tag>`}
                </CodeBlock>
              </DocumentationSection>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

/* Documentation section */



/* Code block */

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-lg border bg-neutral-50 p-4 text-sm leading-6 text-neutral-800">
      <code>{children}</code>
    </pre>
  );
}