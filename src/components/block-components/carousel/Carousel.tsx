import { EffectsCarousel, MainCarousel } from "./modules";
import { EffectsCarouselProps, MainCarouselProps } from "./types/carouselTypes";

const Carousel = (props: MainCarouselProps) => <MainCarousel {...props} />;
Carousel.Effects = (props: EffectsCarouselProps) => (
  <EffectsCarousel {...props} />
);

export default Carousel;
