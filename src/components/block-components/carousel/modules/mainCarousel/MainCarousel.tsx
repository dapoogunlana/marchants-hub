import { Swiper, SwiperSlide } from "swiper/react";
import { MainCarouselProps } from "../../types/carouselTypes";

// import Swiper core and required modules
import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import "./mainCarousel.scss";

// install Swiper modules
SwiperCore.use([Autoplay, Navigation, FreeMode, Pagination]);

const MainCarousel: React.FC<MainCarouselProps> = ({
  data,
  navigation = false,
  autoPlay = false,
  delay,
  disableOnInteraction = false,
  pauseOnMouseEnter = false,
  reverseDirection = false,
  stopOnLastSlide = false,
  pagination = false,
  customPagination,
  loop = false,
  freeMode = false,
  slidesPerView = 1,
  spaceBetween = 0,
}) => {
  // autoPlay config
  const autoPlayOptions = {
    delay: delay || 3000, // determines the delay time
    disableOnInteraction: disableOnInteraction, // if true, autoplay will stop when the user interacts with the slider
    pauseOnMouseEnter: pauseOnMouseEnter, // if true, autoplay will be paused when the mouse is on the swiper div
    reverseDirection: reverseDirection, // if true, it will enable autoplay in reverse direction
    stopOnLastSlide: stopOnLastSlide, // if true, autoplay will stop on last slide
  };

  // pagination config
  const paginationOptions = {
    clickable: true,
    renderBullet: customPagination
      ? function (index: number, className: string) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        }
      : undefined,
  };

  const mappedData = data.map((item: JSX.Element, index: number) => {
    return <SwiperSlide key={index}>{item}</SwiperSlide>;
  });
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      autoplay={autoPlay ? autoPlayOptions : false}
      pagination={pagination ? paginationOptions : false}
      navigation={navigation}
      loop={loop}
      freeMode={freeMode}
    >
      {mappedData}
    </Swiper>
  );
};

export default MainCarousel;
