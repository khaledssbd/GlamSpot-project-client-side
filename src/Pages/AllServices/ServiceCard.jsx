import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const {
    _id,
    serviceImage,
    serviceName,
    servicePrice,
    serviceArea,
    serviceDescription,
    providerEmail,
    providerImage,
    providerName,
    totalBookings,
  } = service || {};
  return (
    <div className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all text-start border border-gray-300">
      <div className="flex justify-center items-center">
        <img className="rounded-lg" src={serviceImage} alt="" />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-gray-800 text-center my-4">
          {serviceName}
        </h1>

        <p title={serviceDescription} className="mt-2 text-sm text-gray-600 ">
          {serviceDescription.substring(0, 100)}...
        </p>
        <p className="mt-2 pt-2 text-sm font-bold text-gray-600 border-t border-gray-300">
          Provider Details:
        </p>
        <div className="flex justify-center items-center gap-4 mb-2 pb-2 border-b border-gray-300">
          <div className="rounded-full object-cover overflow-hidden w-10 h-10">
            <img src={providerImage} alt={providerName} />
          </div>
          <div>
            <p className="mt-2 text-sm  text-gray-600 ">Name: {providerName}</p>
            <p className="mt-2 text-sm  text-gray-600 ">
              Email: {providerEmail}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-around">
          <div className="text-left">
            <p className="mt-4 text-sm font-bold text-gray-600 ">
              Area: {serviceArea}
            </p>
            <p className="mt-2 text-sm font-bold text-gray-600 ">
              Price: ${servicePrice}
            </p>
            <p className="mt-2 text-sm font-bold text-gray-600 ">
              Bookings: {totalBookings}
            </p>
          </div>
          <Link to={`/service/${_id}`}>
            <button className="text-white hover:bg-red-700 bg-green-500 rounded-lg p-2">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
};
