export interface MainCarouselProps {
  data: JSX.Element[];
  navigation?: boolean;
  autoPlay?: boolean;
  delay?: number;
  stopOnLastSlide?: boolean;
  reverseDirection?: boolean;
  pauseOnMouseEnter?: boolean;
  disableOnInteraction?: boolean;
  pagination?: boolean;
  customPagination?: boolean;
  loop?: boolean;
  freeMode?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
}

export interface EffectsCarouselProps extends MainCarouselProps {
  fade?: boolean;
  cube?: boolean;
  shadow?: boolean;
  shadowOffset?: number;
  coverFlow?: boolean;
  depth?: number;
  rotate?: number;
  modifier?: number;
}
