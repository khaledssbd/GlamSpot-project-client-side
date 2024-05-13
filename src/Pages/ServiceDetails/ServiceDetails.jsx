import { Helmet } from 'react-helmet-async';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ServiceDetails = () => {
  const service = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [serviceTakingDate, setServiceTakingDate] = useState(new Date());
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    _id,
    serviceName,
    serviceImage,
    servicePrice,
    serviceArea,
    serviceDescription,
    providerEmail,
    providerImage,
    providerName,
    totalBookings,
  } = service || {};

  const handleBooking = async e => {
    e.preventDefault();

    const form = e.target;
    const instruction = form.instruction.value;
    const serviceId = _id;
    const customerEmail = user?.email;
    const customerName = user?.displayName;
    const serviceStatus = 'Pending';

    const bookingInfo = {
      serviceId,
      serviceName,
      serviceImage,
      servicePrice,
      serviceArea,
      providerName,
      providerEmail,
      customerName,
      customerEmail,
      instruction,
      serviceTakingDate,
      serviceStatus,
    };

    // if (customerEmail === providerEmail) {
    //   return toast.error("You can't book your own service");
    // }

    try {
      const { data } = await axiosSecure.post(
        `/book-now?email=${user?.email}`,
        bookingInfo
      );
      if (data.insertedId) {
        toast.success('Booking done Successfully!');
        navigate('/booked-services');
      }
    } catch (error) {
      toast.success(error.response.data);
    }
  };

  const cancelBooking = () => {
    setShowBookingForm(false);
    setServiceTakingDate(new Date());
  };

  return (
    <div className="my-6 md:my-11">
      <Helmet>
        <title>GlamSpot | {serviceName}</title>
      </Helmet>
      <div className="flex justify-center items-center mb-5 md:mb-10 animate__animated animate__backInUp">
        <img
          className="h-1/2 rounded-xl"
          src={serviceImage}
          alt={serviceName}
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="col-span-2 flex flex-col gap-5 animate__animated animate__backInUp">
          <h3 className="font-play text-[20px] md:text-[40px] font-bold">
            {serviceName}
          </h3>

          <div className="ml-10 sm:20 md:ml-40 space-y-3">
            <div className="flex gap-3 text-base font-normal">
              Price: ${servicePrice}
            </div>
            <div className="flex gap-3 text-base font-normal">
              Bookings: {totalBookings}
            </div>
            <div className="text-left">
              <h3 className="text-start text-base font-normal">
                Description: {serviceDescription}
              </h3>
            </div>
          </div>

          <div className="flex gap-2 mt-5"></div>
        </div>

        <div className="animate__animated animate__backInUp min-w-80 ml-20 lg:ml-0">
          <div className="lg:mt-28 ml-4 flex flex-col mb-6">
            <h3 className="text-base font-medium mb-2">Provider-</h3>
            <div className="flex justify-center items-center gap-4 mb-2 pb-2 border-t border-gray-300">
              <div className="rounded-full object-cover overflow-hidden w-14">
                <img src={providerImage} alt={providerName} />
              </div>
              <div>
                <p className="mt-2 text-sm  text-left">Name: {providerName}</p>
                <p className="mt-2 text-sm text-left">Email: {providerEmail}</p>
                <h3 className="mt-2 flex items-center">
                  Area:
                  <IoLocationOutline /> {serviceArea}
                </h3>
              </div>
            </div>
            <div className="text-center mt-5">
              <button
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="btn text-xs md:text-sm bg-blue-500 hover:bg-green-500 text-white hover:text-black"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {showBookingForm && (
        <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-full z-10">
          <div className="w-full md:w-2/3 h-5/6 rounded bg-blue-200 text-center">
            <h3 className="mt-2 md:mt-8 text-base md:text-xl font-bold">
              Book the service ({serviceName})
            </h3>
            <div className="md:mt-8 mx-auto w-full md:w-2/3">
              <form onSubmit={handleBooking}>
                <div className="grid grid-cols-2 gap-4">
                  {/* Left side */}
                  <div className="flex-1">
                    <label className="block mt-4 mb-1 text-sm text-red-500">
                      Service Name {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg text-sm focus:outline-red-500"
                      type="text"
                      required
                      defaultValue={serviceName}
                      name="name"
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-sm text-red-500">
                      Service Image (1440px × 960px suits best) {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg text-sm focus:outline-red-500"
                      type="text"
                      required
                      defaultValue={serviceImage}
                      name="image"
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-sm text-red-500">
                      Service ID {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg text-sm focus:outline-red-500"
                      type="text"
                      required
                      defaultValue={_id}
                      name="id"
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-sm text-red-500">
                      Provider Email {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg text-sm focus:outline-red-500"
                      type="email"
                      required
                      defaultValue={providerEmail}
                      name="providerEmail"
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-sm text-red-500">
                      Provider Name {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg text-sm focus:outline-red-500"
                      type="text"
                      required
                      defaultValue={providerName}
                      name="providerName"
                      readOnly
                    />
                  </div>
                  {/* Right side */}
                  <div className="flex-1">
                    <label className="block mt-4 mb-1 text-sm text-red-500">
                      Price in $ {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg text-sm focus:outline-red-500"
                      type="text"
                      required
                      defaultValue={servicePrice}
                      name="price"
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-sm text-red-500">
                      Your name {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg text-sm focus:outline-red-500"
                      type="text"
                      required
                      name="user_email"
                      placeholder="Your name"
                      defaultValue={user?.displayName}
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-sm text-red-500">
                      Your Email {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg text-sm focus:outline-red-500"
                      type="email"
                      required
                      name="user_email"
                      placeholder="Your email"
                      defaultValue={user?.email}
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-sm">
                      Your instruction
                    </label>
                    <textarea
                      className="w-3/4 md:w-full p-2 border rounded-lg text-sm focus:outline-green-500"
                      name="instruction"
                      required
                      placeholder="Enter your instruction"
                      cols="1"
                      rows="2"
                    />

                    <label className="block mt-1 text-sm">
                      Service taking date
                    </label>
                    <DatePicker
                      className="w-full p-2 border rounded-lg text-sm"
                      selected={serviceTakingDate}
                      onChange={date => setServiceTakingDate(date)}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>
                <input
                  className="mt-2 md:mt-10 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  type="submit"
                  value="Purchase"
                />
                <button
                  className="ml-10 mt-2 md:mt-10 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  onClick={cancelBooking}
                >
                  Not Now
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
