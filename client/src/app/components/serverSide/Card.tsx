interface CardProps {
  header: string;
  subtext: string;
  icon?: React.ReactNode;
}

export default function Card({ header, subtext, icon }: CardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border max-w-sm border-white/20 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className="text-brand">{icon}</div>}
        <h3 className="text-xl font-bold text-white">{header}</h3>
      </div>
      <p className="text-gray-300">{subtext}</p>
    </div>
  );
}
