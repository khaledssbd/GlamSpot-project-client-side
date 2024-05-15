import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const Slide = ({ image, text }) => {
  return (
    <div
      className="w-full bg-center bg-cover h-[20rem] md:h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/20">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-rose-600 lg:text-4xl">
            {text}
          </h1>
          <br />
          <Link
            to="/all-services"
            className="w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
          >
            Book Service & Hire Expert
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;

Slide.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
