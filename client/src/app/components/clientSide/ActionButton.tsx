import Link from "next/link";

interface ActionButtonProps {
  text: string;
  href: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
}

export default function ActionButton({ text, href, beforeIcon, afterIcon }: ActionButtonProps) {
  return (
    <Link href={href} className="bg-brand inline-flex items-center gap-2 hover:bg-brand/90 text-background w-fit font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-brand/20 group">
      {beforeIcon && <div className="group-hover:translate-x-1 transition-transform">{beforeIcon}</div>}
      {text}
      {afterIcon && <div className="group-hover:translate-x-1 transition-transform">{afterIcon}</div>}
    </Link>
  );
}