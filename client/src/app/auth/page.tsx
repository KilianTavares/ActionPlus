import BackgroundContainer from "../components/serverSide/BackgroundContainer";
import AuthForm from "../components/clientSide/AuthForm";
export default function ContactUs() {
  return (
    <>
      <BackgroundContainer backgroundImage="https://image.tmdb.org/t/p/original/wJ20rOZ1VgkCqv1jeOQB2Brny9k.jpg?w=1920&h=1080">
        <section id="Hero" className=" max-w-xl flex flex-col gap-5 text-white">
          <div className="flex flex-col gap-5">
            <h1 className="text-7xl text-[#0DCAF0] font-bold">
              Sign up / Login
            </h1>
          </div>
        </section>
      </BackgroundContainer>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <AuthForm />
      </section>
    </>
  );
}
