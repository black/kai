import { codeToHtml } from "shiki";
import CopyButton from "@/components/ui/CopyButton";

interface Props {
  code: string;
  lang?: string;
  /** Shown in the block's header bar, e.g. a file path. */
  title?: string;
}

/** Syntax-highlighted code on a dark panel, rendered at build time. */
const CodeBlock = async ({ code, lang = "tsx", title }: Props) => {
  const html = await codeToHtml(code.trimEnd(), { lang, theme: "vesper" });

  return (
    <div className="code-block overflow-hidden rounded-lg bg-night text-night-ink">
      <div className="flex h-10 items-center justify-between border-b border-night-line pl-4 pr-1">
        <span className="font-mono text-xs text-night-muted">{title ?? lang}</span>
        <CopyButton value={code} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default CodeBlock;
