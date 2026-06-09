import Home from "@/components/Home";
import AboutPage from "@/components/About";
import ScrollArrow from "@/components/ScrollArrow";

export default function HomePage() {
  return (
    <>
      <div className="bg-black text-white">
        <Home />
        <ScrollArrow />
        <AboutPage />
      </div>
    </>
  );
}
