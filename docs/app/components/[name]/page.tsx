import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComponentPage from "@/components/ui/ComponentPage";
import { getComponentDoc, getComponentDocs } from "@/lib/registry";

export function generateStaticParams() {
  return getComponentDocs().map((doc) => ({ name: doc.name }));
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[name]">): Promise<Metadata> {
  const { name } = await params;
  const doc = getComponentDoc(name);
  return doc ? { title: `${doc.title} · KAI UI`, description: doc.description } : {};
}

export default async function Page({ params }: PageProps<"/components/[name]">) {
  const { name } = await params;
  const doc = getComponentDoc(name);
  if (!doc) notFound();

  return <ComponentPage doc={doc} />;
}
