import Header from "../components/clientSide/Header";
import Footer from "../components/clientSide/Footer";

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-[#121317]">{children}</main>
      <Footer />
    </>
  );
}
