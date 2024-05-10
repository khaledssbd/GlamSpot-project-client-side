import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// npm i swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PropTypes from 'prop-types';
import 'swiper/css/effect-coverflow';

const SwiperSlides = ({ allSpots }) => {
  return (
    <div>
      <h4
        className="font-play text-xl md:text-3xl font-medium my-10 md:my-16"
        data-aos="zoom-out"
      >
        Swiper Slides
      </h4>
      <div className="swiper-wrapper mb-20">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 1 }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={5}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {allSpots?.map((spot, i) => (
            <SwiperSlide key={i}>
              <img
                src={spot.image}
                className="rounded-2xl px-1 w-full h-52 md:h-96"
                alt={spot.tourists_spot_name}
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
  allSpots: PropTypes.array.isRequired,
};
