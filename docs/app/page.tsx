import { notFound, redirect } from "next/navigation";
import { getComponentDocs } from "@/lib/registry";

// No landing page: "/" opens the first component's docs.
export default function Home() {
  const first = getComponentDocs()[0];
  if (!first) notFound();
  redirect(`/components/${first.name}`);
}
