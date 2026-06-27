import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { heroSlides } from "../../configs/heroSlides";
import { useLang } from "../../context/LangContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const { lang } = useLang();
  const activeLang = lang === "hi" ? "hi" : "en";
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsPhone(window.innerWidth <= 640);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section id="home" className="relative w-full overflow-hidden bg-slate-900">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        pagination={{
          clickable: true,
          el: ".hero-pagination",
        }}
        className="relative w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full overflow-hidden"
              style={{
                height: isPhone ? "285px" : "40vw",
                minHeight: isPhone ? "285px" : "410px",
                maxHeight: isPhone ? "285px" : "570px",
              }}
            >
              <img
                src={slide.image}
                alt={slide.title[activeLang]}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  objectPosition: isPhone
                    ? slide.mobilePosition || "right center"
                    : slide.imagePosition || "center center",
                  filter: "brightness(1.06) contrast(1.04) saturate(1.05)",
                }}
                loading={index === 0 ? "eager" : "lazy"}
                draggable="false"
              />

              {!isPhone && (
                <>
                  <div className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-black/58 via-black/28 to-transparent" />

                  <div className="relative z-10 flex h-full w-full items-center pl-[5%] pr-[5%]">
                    <div className="w-[36%] min-w-[290px] max-w-[520px]">
                      <h1
                        className="font-bold leading-tight text-white"
                        style={{
                          fontSize: "max(30px, min(2.6vw, 42px))",
                          textShadow: "0 2px 5px rgba(0,0,0,0.55)",
                        }}
                      >
                        {slide.title[activeLang]}
                      </h1>

                      <p
                        className="mt-4 w-full max-w-[440px] font-medium leading-6 text-white"
                        style={{
                          fontSize: "max(14px, min(1vw, 16px))",
                          textShadow: "0 2px 4px rgba(0,0,0,0.55)",
                        }}
                      >
                        {slide.subtitle[activeLang]}
                      </p>

                      <Link
                        to={slide.buttonLink}
                        className="mt-6 inline-flex items-center gap-2 rounded-sm bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                      >
                        <span>{slide.buttonText[activeLang]}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </SwiperSlide>
        ))}

        {!isPhone && (
          <>
            <button
              type="button"
              className="hero-prev absolute left-5 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/15 text-white hover:bg-black/30"
              aria-label={
                activeLang === "en" ? "Previous slide" : "पिछली स्लाइड"
              }
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="hero-next absolute right-5 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/15 text-white hover:bg-black/30"
              aria-label={activeLang === "en" ? "Next slide" : "अगली स्लाइड"}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <div className="hero-pagination absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2" />
      </Swiper>
    </section>
  );
};

export default HeroSlider;