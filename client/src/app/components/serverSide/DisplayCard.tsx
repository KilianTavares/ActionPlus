"use client";

interface DisplayCardProps {
  backgroundImage: string;
  title: string;
  content: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export default function DisplayCard({
  backgroundImage,
  title,
  content,
  ctaText,
  onCtaClick,
}: DisplayCardProps) {
  return (
    <div
      className="relative h-60 w-full rounded-xl overflow-hidden bg-cover bg-top "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 transition-all duration-300 " />

      <div className="relative h-full p-6 flex flex-col justify-end text-white">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm font-semibold mb-4 opacity-90">{content}</p>
        <button
          onClick={onCtaClick}
          className="bg-brand hover:bg-brand/90 text-background font-bold py-2 px-6 rounded-full w-fit transition-all duration-300 hover:scale-105"
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}
