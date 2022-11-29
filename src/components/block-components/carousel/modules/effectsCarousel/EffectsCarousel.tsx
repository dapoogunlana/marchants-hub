import { Swiper, SwiperSlide } from "swiper/react";
import { EffectsCarouselProps } from "../../types/carouselTypes";

// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  FreeMode,
  Navigation,
  Pagination,
} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-coverflow";

import "./effectsCarousel.scss";

// install Swiper modules
SwiperCore.use([
  Autoplay,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Navigation,
  FreeMode,
  Pagination,
]);

const EffectsCarousel: React.FC<EffectsCarouselProps> = ({
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
  fade = false,
  cube = false,
  shadow = false,
  shadowOffset = 20,
  coverFlow = false,
  depth = 100,
  rotate = 40,
  modifier = 1,
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
    clickable: true, // if true, the pagination buttons will be functional
    renderBullet: customPagination
      ? function (index: number, className: string) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        }
      : undefined,
  };

  //   sets the type of effect
  const effectType = fade
    ? "fade"
    : cube
    ? "cube"
    : coverFlow
    ? "coverflow"
    : undefined;

  //   cube effect config
  const cubeEffectOptions = {
    shadow: shadow, // if true, it will add shadow to the cube effect
    slideShadows: true,
    shadowOffset: shadowOffset,
    shadowScale: 0.94,
  };

  //   cover flow effect config
  const coverFlowEffectOptions = {
    rotate: rotate,
    stretch: 0,
    depth: depth,
    modifier: modifier,
    slideShadows: true,
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
      effect={effectType}
      cubeEffect={effectType === "cube" ? cubeEffectOptions : undefined}
      coverflowEffect={
        effectType === "coverflow" ? coverFlowEffectOptions : undefined
      }
    >
      {mappedData}
    </Swiper>
  );
};

export default EffectsCarousel;
