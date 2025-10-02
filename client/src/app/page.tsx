"use client";

import Image from "next/image";
import Header from "./components/clientSide/Header";
import BackgroundContainer from "./components/serverSide/BackgroundContainer";
import Card from "./components/serverSide/Card";
import SectionHeader from "./components/clientSide/SectionHeader";
import DisplayCard from "./components/serverSide/DisplayCard";
import ActionButton from "./components/clientSide/ActionButton";
import Footer from "./components/clientSide/Footer";
import {
  featuresCards,
  exploreOurContentCards,
  featuresContentCards,
  faqCards,
} from "./constants/data";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-[#121317] ">
        <BackgroundContainer backgroundImage="https://image.tmdb.org/t/p/original/wJ20rOZ1VgkCqv1jeOQB2Brny9k.jpg?w=1920&h=1080">
          <section
            id="Hero"
            className=" max-w-xl flex flex-col gap-5 text-white"
          >
            <div className="flex flex-col gap-5">
              <h1 className="text-7xl text-[#0DCAF0] font-bold">Action+</h1>
              <p>Your Ultimate Streaming Experience</p>
              <p>
                Discover thousands of movies and TV shows, all in one place.
                Stream your favorite content in high quality, completely free.
              </p>
            </div>
            <div className="flex flex-col gap-10">
              <form className="relative group">
                <input
                  type="text"
                  className="w-full text-[#ffffff] backdrop-blur-md border border-[#1A1E23] rounded-xl py-4 px-6 pr-12  focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-transparent transition-all duration-300"
                  placeholder="Search for movies, TV shows..."
                  defaultValue=""
                  aria-label="Search"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand hover:text-brand/80 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0DCAF0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </button>
              </form>
              <ActionButton
                text="Start Exploring"
                href="/explore"
                beforeIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                  </svg>
                }
                afterIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                }
              />
            </div>
          </section>
          <div className="flex gap-4 mt-10">
            {featuresCards.map((card, index) => (
              <Card
                key={index}
                header={card.heading}
                subtext={card.subtext}
                icon={card.icon}
              />
            ))}
          </div>
        </BackgroundContainer>
        <section className="pt-10">
          <div>
            <SectionHeader
              title="Explore our content"
              subtitle="From latest blockbuster movies to trending TV shows, Fmovies offers a vast selection of entertainment options for every taste"
            />
            <div className="flex gap-6 mt-8 w-4/5 mx-auto">
              {exploreOurContentCards.map((card, index) => (
                <DisplayCard
                  key={index}
                  backgroundImage={card.backgroundImage}
                  title={card.title}
                  content={card.content}
                  ctaText={card.ctaText}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="mt-36">
          <div>
            <SectionHeader
              title="Features of Action+"
              subtitle="Experience the best streaming service with these amazing features"
            />
            <div className="flex flex-wrap gap-4 mt-8 items-center justify-center w-4/5 mx-auto">
              {featuresContentCards.map((card, index) => (
                <Card
                  key={index}
                  header={card.header}
                  subtext={card.subtext}
                  icon={card.icon}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="mt-36 mx-auto w-fit ">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Get answers to common questions about our streaming service"
          />
          <div className="grid grid-cols-2 gap-4 mt-8 justify-center mb-4 mx-auto">
            {faqCards.map((card, index) => (
              <Card
                key={index}
                header={card.header}
                subtext={card.subtext}
                icon={card.icon}
              />
            ))}
          </div>
          <ActionButton
            text="Start Exploring"
            href="/explore"
            beforeIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="6 3 20 12 6 21 6 3"></polygon>
              </svg>
            }
            afterIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            }
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
