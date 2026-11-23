interface Props {
  id: string;
  title: string;
  children: React.ReactNode;
}

const DocumentationSection = ({ id, title, children }: Props) => (
  <section id={id} className="mt-16">
    <h2 className="mb-5 border-t border-ink pt-3 text-[1.75rem] tracking-[-0.03em]">
      <a href={`#${id}`} className="transition-colors hover:text-blue">
        {title}
      </a>
    </h2>
    {children}
  </section>
);

export default DocumentationSection;
