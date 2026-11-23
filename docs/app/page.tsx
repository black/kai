import { notFound } from "next/navigation";
import ComponentPage from "@/components/ui/ComponentPage";
import { getComponentDocs } from "@/lib/registry";

// The home page shows the first component in the registry.
export default function Home() {
  const [first] = getComponentDocs();
  if (!first) notFound();

  return <ComponentPage doc={first} />;
}
