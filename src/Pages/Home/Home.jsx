import { useLoaderData } from 'react-router-dom';
import Hero from './Hero';
import { Helmet } from 'react-helmet-async';
// npm i react-helmet-async
import SlidesFlip from './SlidesFlip';
import SwiperSlides from './SwiperSlides';
import CarouselAni from './CarouselAni';
import PopularServices from './PopularServices';
import Carousel from './Carousel';

const Home = () => {
  const allServices = useLoaderData();
  return (
    <div>
      <Helmet>
        <title>GlamSpot | Home</title>
      </Helmet>
      <Hero />
      <CarouselAni allServices={allServices}></CarouselAni>
      <Carousel/>
      <SwiperSlides allServices={allServices}></SwiperSlides>
      <PopularServices allServices={allServices} />
      <SlidesFlip />
    </div>
  );
};

export default Home;
