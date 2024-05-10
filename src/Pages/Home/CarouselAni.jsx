import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
// npm i framer-motion

const CarouselAni = ({ allSpots }) => {
  const showSpots = allSpots.slice(0, 9);
  const till = showSpots.length;
  const [positionIndexes, setPositionIndexes] = useState(
    Array.from({ length: till }, (_, i) => i)
  );

  const handleNext = () => {
    setPositionIndexes(prevIndexes => {
      const updateIndexes = prevIndexes?.map(
        prevIndex => (prevIndex + 1) % till
      );
      return updateIndexes;
    });
  };
  const positions = [
    'center',
    'left1',
    'left2',
    'left3',
    'left',
    'right',
    'right3',
    'right2',
    'right1',
  ];
  const imageVariants = {
    center: { x: '0%', scale: 1, zIndex: 5 },
    left1: { x: '-18%', scale: 0.8, zIndex: 4 },
    left2: { x: '-32%', scale: 0.7, zIndex: 3 },
    left3: { x: '-44%', scale: 0.6, zIndex: 2 },
    left: { x: '-54%', scale: 0.5, zIndex: 1 },
    right: { x: '54%', scale: 0.5, zIndex: 1 },
    right3: { x: '44%', scale: 0.6, zIndex: 2 },
    right2: { x: '32%', scale: 0.7, zIndex: 3 },
    right1: { x: '18%', scale: 0.8, zIndex: 4 },
  };

  return (
    <div className="mt-10 md:mt-24 mb-0 md:mb-24">
      <h4
        className="font-play text-xl md:text-3xl font-medium -mb-20 lg:-mb-14"
        // data-aos="zoom-in"
      >
      
        <span style={{ color: '#fa237d', fontWeight: 'bold' }}>
          <Typewriter
            words={['Spots we plan']}
            loop={50}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h4>
      <div className="flex items-center flex-col justify-center">
        {showSpots?.map((h, i) => (
          <motion.img
            key={i}
            src={h.image}
            alt={h.estate_title}
            className="rounded-[12px] absolute w-[55%]"
            animate={positions[positionIndexes[i]]}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
          />
        ))}
        <button
          className="text-white mt-[310px] sm:mt-[400px] md:mt-[480px] lg:mt-[700px] bg-indigo-600 rounded-md py-2 px-4 mb-10"
          onClick={handleNext}
          // data-aos="zoom-out-up"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarouselAni;

CarouselAni.propTypes = {
  allSpots: PropTypes.array.isRequired,
};
