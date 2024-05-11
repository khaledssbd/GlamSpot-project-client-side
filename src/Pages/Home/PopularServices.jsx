import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const PopularServices = ({ allServices }) => {
  return (
    <div>
      <h4 className="font-play text-xl md:text-3xl font-medium">
        <span style={{ color: '#fa237d', fontWeight: 'bold' }}>
          <Typewriter
            words={[
              'Popular Services',
              'Haircut & Styling',
              'Facial Spa',
              'Manicure & Pedicure',
              'Massage Therapy',
              'Makeup Artistry',
              'Barber Services',
              'Waxing & Threading',
              'Spa Packages',
            ]}
            loop={50}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h4>
      <div className="my-16 flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices?.slice(2, 8).map(service => (
            <div
              key={service._id}
              className="p-3 bg-gray-300 rounded-xl flex flex-col"
              data-aos="zoom-out-up"
            >
              <div className="flex justify-center items-center">
                <img
                  className="h-64 rounded-lg"
                  src={service.serviceImage}
                  alt=""
                />
              </div>
              <h3 className="font-medium text-lg my-5 text-red-600">
                Area: {service.serviceArea}
              </h3>
              <p className="font-medium text-sm text-gray-700 text-justify mx-5 flex-grow">
                {service.serviceDescription}
              </p>
              <Link to={`/service/${service._id}`}>
                <button className="btn btn-primary text-white bg-blue-700 mt-5">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Link to={'/all-services'}>
        <button className="mb-10 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
          Show All
        </button>
      </Link>
    </div>
  );
};

export default PopularServices;
PopularServices.propTypes = {
  allServices: PropTypes.array.isRequired,
};
