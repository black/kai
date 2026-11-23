import Tag from "@/components/kai/tag";

export default function TagExample() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Tag label="Design" />
      <Tag label="Engineering" />
      <Tag label="Research" />
    </div>
  );
}
