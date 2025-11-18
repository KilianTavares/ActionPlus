import BackgroundContainer from "../components/serverSide/BackgroundContainer";
import MediaUploadForm from "../components/clientSide/MediaUploadForm";

export default function upload() {
  return (
    <>
      <BackgroundContainer backgroundImage="https://image.tmdb.org/t/p/original/wJ20rOZ1VgkCqv1jeOQB2Brny9k.jpg?w=1920&h=1080">
        <section id="Hero" className=" max-w-xl flex flex-col gap-5 text-white">
          <div className="flex flex-col gap-5">
            <h1 className="text-7xl text-[#0DCAF0] font-bold">Upload Media</h1>
            <p>
              Share your content with our community. Upload movies, TV shows, and more!
            </p>
          </div>
        </section>
      </BackgroundContainer>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <MediaUploadForm />
      </section>
    </>
  );
}
