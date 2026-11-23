import SidebarNav from "@/components/ui/SidebarNav";
import { getComponentDocs } from "@/lib/registry";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  const items = getComponentDocs().map(({ name, title }) => ({ name, title }));

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:flex lg:gap-12">
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto pb-10 pt-8 lg:block">
        <SidebarNav items={items} />
      </aside>

      {/* Mobile strip */}
      <div className="sticky top-16 z-20 -mx-4 border-b border-line bg-paper/90 backdrop-blur-md sm:-mx-6 lg:hidden">
        <SidebarNav items={items} orientation="horizontal" />
      </div>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
