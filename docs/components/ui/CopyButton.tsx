"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface Props {
  value: string;
  className?: string;
}

const CopyButton = ({ value, className = "" }: Props) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be unavailable (e.g. insecure context); fail quietly.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md opacity-60 transition-opacity hover:opacity-100 ${className}`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
};

export default CopyButton;
