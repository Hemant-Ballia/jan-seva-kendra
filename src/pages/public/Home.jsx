import HeroSlider from "../../components/home/HeroSlider";
import LiveTicker from "../../components/home/LiveTicker";
import QuickServices from "../../components/home/QuickServices";
import ServicesSection from "../../components/home/ServicesSection";
import ScholarshipSection from "../../components/home/ScholarshipSection";
import DocumentsChecklist from "../../components/home/DocumentsChecklist";
import TokenBooking from "../../components/home/TokenBooking";
import JobsSection from "../../components/home/JobsSection";
import GallerySection from "../../components/home/GallerySection";
import FAQSection from "../../components/home/FAQSection";

const Home = () => {
  return (
    <>
      <HeroSlider />
      <LiveTicker />

      <main className="relative w-full bg-slate-50 px-4 py-10 shadow-inner md:py-12">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:gap-8 lg:flex-row">
          <div className="flex w-full flex-col gap-6 md:gap-8 lg:w-[68%]">
            <QuickServices />
            <ServicesSection />
            <ScholarshipSection />
            <DocumentsChecklist />
          </div>

          <aside className="flex w-full shrink-0 flex-col gap-6 md:gap-8 lg:w-[32%]">
            <JobsSection />
            <TokenBooking />
          </aside>
        </div>

        <div className="mx-auto mt-8 max-w-7xl">
          <GallerySection />
        </div>
      </main>

      <FAQSection />
    </>
  );
};

export default Home;