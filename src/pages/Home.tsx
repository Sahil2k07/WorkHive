import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import HeroSection from "@/components/home/HeroSection";
import LatestJobs from "@/components/home/LatestJobs";
import useGetJobs from "@/hooks/useGetJobs";

function Home() {
  useGetJobs();
  return (
    <section className="bg-hivebg-200">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <section className="bg-slate-100">
        <LatestJobs />
        <Footer />
      </section>
    </section>
  );
}

export default Home;
