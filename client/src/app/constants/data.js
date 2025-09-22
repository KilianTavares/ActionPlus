const featuresCards = [
  {
    heading: "4K Ultra HD",
    subtext: "Ultra HD streaming",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="15" x="2" y="3" rx="2" />
        <path d="m22 8-6 4 6 4V8Z" />
      </svg>
    ),
  },
  {
    heading: "Unlimited Access",
    subtext: "Stream without limits",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M12 15v5" />
        <path d="M8 19h8" />
      </svg>
    ),
  },
  {
    heading: "Multi-Device",
    subtext: "Watch anywhere, anytime",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="10" height="14" x="3" y="8" rx="2" />
        <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
        <path d="M8 18h.01" />
      </svg>
    ),
  },
  {
    heading: "HD Quality",
    subtext: "Crystal clear streaming",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 12V6l8 6-8 6V12z" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
];

const exploreOurContentCards = [
  {
    backgroundImage:
      "https://image.tmdb.org/t/p/original/enNubozHn9pXi0ycTVYUWfpHZm.jpg",
    title: "Latest Movies",
    content: "Discover the newest blockbuster releases and trending films",
    ctaText: "Watch Now",
  },
  {
    backgroundImage:
      "https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg?w=900&h=240",
    title: "TV Series",
    content: "Binge-watch your favorite series and discover new shows",
    ctaText: "Start Series",
  },
  // {
  //   backgroundImage:
  //     "https://image.tmdb.org/t/p/original/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
  //   title: "Action Collection",
  //   content: "High-octane action movies and adrenaline-pumping adventures",
  //   ctaText: "Explore Action",
  // },
];

const featuresContentCards = [
  {
    header: "4K Ultra HD",
    subtext: "Experience crystal-clear streaming in stunning 4K resolution",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="15" x="2" y="3" rx="2" />
        <path d="m22 8-6 4 6 4V8Z" />
      </svg>
    ),
  },
  {
    header: "Offline Downloads",
    subtext: "Download your favorite content and watch anywhere, anytime",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    ),
  },
  {
    header: "Multi-Device Sync",
    subtext: "Seamlessly switch between devices and continue watching",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="10" height="14" x="3" y="8" rx="2" />
        <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
        <path d="M8 18h.01" />
      </svg>
    ),
  },
  {
    header: "No Ads Experience",
    subtext: "Enjoy uninterrupted streaming without any advertisements",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m4.9 4.9 14.2 14.2" />
      </svg>
    ),
  },
  {
    header: "Smart Recommendations",
    subtext: "AI-powered suggestions based on your viewing preferences",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      </svg>
    ),
  },
  {
    header: "Family Profiles",
    subtext: "Create separate profiles for each family member",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m22 21-3-3 3-3" />
        <path d="M16 3h5v5" />
      </svg>
    ),
  },
];

const faqCards = [
  {
    header: "Is Action+ really free?",
    subtext:
      "Yes! Action+ is completely free with no hidden fees or subscription costs. Enjoy unlimited streaming.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    header: "How many devices can I use?",
    subtext:
      "Stream on unlimited devices including phones, tablets, laptops, and smart TVs with your single account.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="10" height="14" x="3" y="8" rx="2" />
        <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
        <path d="M8 18h.01" />
      </svg>
    ),
  },
  {
    header: "Do I need to create an account?",
    subtext:
      "No account required! Start watching immediately. Create an account only if you want to save favorites.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    header: "What video quality is available?",
    subtext:
      "We offer multiple quality options from 480p to 4K Ultra HD, automatically adjusted based on your connection.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="15" x="2" y="3" rx="2" />
        <path d="m22 8-6 4 6 4V8Z" />
      </svg>
    ),
  },
];
export {
  featuresCards,
  exploreOurContentCards,
  featuresContentCards,
  faqCards
};