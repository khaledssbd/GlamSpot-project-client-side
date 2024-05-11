import { useState } from 'react';
import { motion } from 'framer-motion';
// npm i framer-motion
import Image_1 from '../../assets/1.png';
import Image_2 from '../../assets/2.jpg';

const SlidesFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleflip = () => {
    setIsFlipped(!isFlipped);
    setIsAnimating(!isAnimating);
  };
  return (
    <div className="mt-24 mb-16">
      <h4
        className="font-play text-xl md:text-3xl font-medium mb-4"
        data-aos="zoom-out-down"
      >
        Slides of Services{' (click on the Image)'}
      </h4>

      <div className="flex justify-center h-[600px] items-center cursor-pointer ">
        <div
          className="flip-card w-[850px] h-[568px] rounded-md"
          onClick={handleflip}
        >
          <motion.div
            className="flip-card-inner w-[100%] h-[100%]"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 360 }}
            transition={{ duration: 0.6, animationDirection: 'normal' }}
          >
            <div
              className="flip-card-front w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4"
              style={{ backgroundImage: `url(${Image_1})` }}
            ></div>
            <div
              className="flip-card-back w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4"
              style={{ backgroundImage: `url(${Image_2})` }}
            ></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SlidesFlip;
