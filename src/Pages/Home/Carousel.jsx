import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'
import bgimg1 from '../../assets/carousel1.jpg';
import bgimg2 from '../../assets/carousel2.jpg'
import bgimg3 from '../../assets/carousel3.jpg'

const Carousel=()=> {
  return (
    <div className="container px-6 py-10 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text="Discover Your Perfect Look in Minutes with Our Skilled Professionals"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text="Elevate Your Beauty Routine with Our Top-notch Services"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text="Transform Your Look in Minutes with Our Expert Stylists"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Carousel;