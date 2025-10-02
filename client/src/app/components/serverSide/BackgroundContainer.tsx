interface BackgroundContainerProps {
  backgroundImage: string;
  children: React.ReactNode;
}

export default function BackgroundContainer({
  backgroundImage,
  children,
}: BackgroundContainerProps) {
  return (
    <div
      className="relative w-full h-full bg-cover bg-center px-[14%] background-size: cover; background-position: center top;"
      style={{
        backgroundImage: `linear-gradient(transparent, #121317),url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-background/100" />
      <div className="mx-auto py-20 relative  z-10 h-full ">{children}</div>
    </div>
  );
}
