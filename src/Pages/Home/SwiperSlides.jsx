import {
  Autoplay,
  Navigation,
  Pagination,
  A11y,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// npm i swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PropTypes from 'prop-types';
import 'swiper/css/effect-coverflow';

const SwiperSlides = ({ allServices }) => {
  return (
    <div>
      <h4
        className="font-play text-xl md:text-3xl font-medium my-10 md:my-16"
        // data-aos="zoom-out" ---> issue= it enlarges x-axis size of where it is used
      >
        Our services
      </h4>
      <div className="swiper-wrapper mb-20">
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 1 }}
          modules={[Autoplay, Navigation, Pagination, A11y]}
          spaceBetween={10}
          slidesPerView={2}
          pagination={{ clickable: true }}
        >
          {allServices?.map((s, i) => (
            <SwiperSlide key={i}>
              <img
                src={s.serviceImage}
                className="rounded-2xl px-1 w-full h-52 md:h-96"
                alt={s.serviceName}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperSlides;
SwiperSlides.propTypes = {
  allServices: PropTypes.array.isRequired,
};
