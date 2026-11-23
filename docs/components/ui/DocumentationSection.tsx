interface Props{ 
  title: string;
  children: React.ReactNode; 
}

const DocumentationSection = (props:Props) => {
    const {title,children} = props
  return (
    <section className="mt-10">
      <h3 className="mb-3 text-lg font-medium">{title}</h3>
      {children}
    </section>
  );
}


export default DocumentationSection