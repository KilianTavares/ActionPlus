interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center text-white">
      <h4 className="text-4xl font-bold">
        <span className="inline-block w-1 h-6 bg-brand rounded-full mr-4"></span>
        {title}
      </h4>
      <p className="text-sm">{subtitle}</p>
    </div>
  );
}