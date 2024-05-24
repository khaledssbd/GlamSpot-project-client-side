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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allServices?.slice(2, 8)?.map(service => (
            <div
              key={service._id}
              className="p-3 bg-gray-200 border border-gray-400 shadow-md rounded-xl flex flex-col"
              data-aos="zoom-out-up"
            >
              <div className="flex justify-center items-center">
                <img
                  className="h-64 rounded-lg border border-black"
                  src={service.serviceImage}
                  alt={service.serviceName}
                />
              </div>
              <h3 className="font-medium text-xl my-3 text-black">
                {service.serviceName}
              </h3>
              <div className="flex gap-3 mx-5 mb-3 text-base text-black font-normal">
                Price: ${service.servicePrice}
              </div>

              <p className="font-medium text-sm text-gray-700 text-justify mx-5 flex-grow">
                {service.serviceDescription.slice(0, 100)}
              </p>

              <div className="mx-5 mt-2 flex items-center gap-4 mb-2 border-t border-gray-300">
                <div className="rounded-full object-cover overflow-hidden w-10 h-10">
                  <img src={service.providerImage} alt={service.providerName} />
                </div>

                <p className="text-base text-black text-left">
                  By: {service.providerName}
                </p>
              </div>
              <Link to={`/service/${service._id}`}>
                <button className="btn btn-primary text-white bg-blue-700 hover:bg-red-500">
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
