import { Helmet } from 'react-helmet-async';
import { Typewriter } from 'react-simple-typewriter';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import deleteImg from '../../assets/delete.svg';
import updateImg from '../../assets/update.svg';
import eyeImg from '../../assets/eye.svg';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '../../Components/AllLootie/Loading';

const ManageServices = () => {
  const { user } = useAuth();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [serviceToUpdate, setServiceToUpdate] = useState({});
  const axiosSecure = useAxiosSecure();
  const QueryClient = useQueryClient();

  // fetch data on start like useEffect
  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['my-services'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-services?email=${user?.email}`
      );
      return data;
    },
  });

  // delete a service instance
  const deleteService = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosSecure.delete(
        `/delete-service/${id}?email=${user?.email}`
      );
      return data;
    },
    onSuccess: () => {
      Swal.fire('Deleted!', 'This service has been deleted.', 'success');
      refetch();
      // QueryClient.invalidateQueries({ queryKey: ['my-services'] });
    },
  });

  const handleDeleteService = id => {
    Swal.fire({
      title: 'Confirm to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        await deleteService.mutateAsync({ id });
      }
    });
  };

  // get data and show modal to update a service
  const getDataForUpdate = async id => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/service-details/${id}`
    );
    setServiceToUpdate(data);
    setShowUpdateModal(true);
  };

  // update a service instance
  const updateService = useMutation({
    mutationFn: async ({ updateData }) => {
      const { data } = await axiosSecure.patch(
        `/update-service/${serviceToUpdate._id}?email=${user?.email}`,
        updateData
      );
      return data;
    },
    onSuccess: () => {
      Swal.fire('Updated!', 'Your service has been updated.', 'success');
      setShowUpdateModal(false);
      setServiceToUpdate({});
      // refetch();
      QueryClient.invalidateQueries({ queryKey: ['my-services'] });
    },
  });

  const handleUpdateService = async e => {
    e.preventDefault();
    const form = e.target;
    const serviceImage = form.serviceImage.value;
    const serviceName = form.serviceName.value;
    const servicePrice = form.servicePrice.value;
    const serviceArea = form.serviceArea.value;
    const serviceDescription = form.serviceDescription.value;

    const updateData = {
      serviceImage,
      serviceName,
      servicePrice,
      serviceArea,
      serviceDescription,
    };
    await updateService.mutateAsync({ updateData });
  };

  const cancelUpdating = () => {
    setShowUpdateModal(false);
    setServiceToUpdate({});
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="my-10 sm:px-6">
      <Helmet>
        <title>GlamSpot | Manage Services</title>
      </Helmet>

      <h3 className="flex justify-center items-center my-10 text-center text-[#fa237d] text-2xl font-bold">
        {services.length}
        <span
          style={{ color: '#fa237d', fontWeight: 'bold', fontSize: '25px' }}
        >
          <Typewriter
            words={['- Service(s) I provide']}
            loop={50}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </span>
      </h3>
      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services?.map((service, i) => (
            <div
              key={i}
              className="p-3 bg-gray-300 rounded-xl flex flex-col"
              data-aos="zoom-out-up"
            >
              <div className="flex justify-center items-center">
                <img
                  className="rounded-lg border border-black"
                  src={service.serviceImage}
                  alt={service.serviceName}
                />
              </div>
              <h3 className="flex-grow font-medium text-base md:text-lg lg:text-xl my-3 text-black">
                {service.serviceName}
              </h3>
              <h3 className="flex gap-3 mx-5 mb-3  text-base text-black font-normal">
                Area: {service.serviceArea}
              </h3>
              <h3 className="flex gap-3 mx-5 mb-3 text-base text-black font-normal">
                Price: ${service.servicePrice}
              </h3>
              <h3 className="flex gap-3 mx-5 mb-3 text-base text-black font-normal">
                Total Bookings: {service.totalBookings}
              </h3>

              <div className="flex justify-around items-center border rounded-md border-gray-500 p-2">
                <Link to={`/service/${service._id}`}>
                  <img src={eyeImg} alt="view-booking" className="w-6" />
                </Link>

                <div onClick={() => getDataForUpdate(service._id)}>
                  <img src={updateImg} alt="update-booking" className="w-6" />
                </div>

                <div onClick={() => handleDeleteService(service._id)}>
                  <img src={deleteImg} alt="delete-booking" className="w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="mt-20 text-xl font-bold">No service yet</h3>
      )}
      {showUpdateModal && (
        <div className=" fixed top-0 left-0 flex justify-center items-center h-screen w-full z-10">
          <div className="w-full md:w-2/3 h-5/6 rounded bg-blue-300 text-center">
            <h3 className="mt-3 mb-2 md:mt-8 text-base md:text-xl font-bold">
              Update the service ({serviceToUpdate.serviceName})
            </h3>
            <div className="md:mt-8 mx-auto w-full md:w-2/3">
              <form onSubmit={handleUpdateService}>
                <div className="grid grid-cols-2 gap-8">
                  {/* Left side */}
                  <div className="flex-1">
                    <label className="block mt-4 mb-1 text-sm">
                      Service Name
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-green-500 text-sm"
                      type="text"
                      required
                      defaultValue={serviceToUpdate.serviceName}
                      name="serviceName"
                    />

                    <label className="block mt-3 mb-1 text-sm">
                      Service Image (1440px × 960px suits best)
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-green-500 text-sm"
                      type="text"
                      required
                      defaultValue={serviceToUpdate.serviceImage}
                      name="serviceImage"
                    />

                    <label className="block mt-4 mb-1 text-sm">
                      Service Area
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-green-500 text-sm"
                      type="text"
                      required
                      defaultValue={serviceToUpdate.serviceArea}
                      name="serviceArea"
                    />

                    <label className="block mt-3 mb-1 text-sm">
                      Service Description
                    </label>
                    <textarea
                      className="w-3/4 md:w-full p-2 border rounded-lg focus:outline-green-500 text-sm"
                      name="serviceDescription"
                      required
                      placeholder="Enter your instruction"
                      defaultValue={serviceToUpdate.serviceDescription}
                      cols="1"
                      rows="2"
                    />
                  </div>
                  {/* Right side */}
                  <div className="flex-1">
                    <label className="block mt-3 mb-1 text-sm">
                      Service Price
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-green-500 text-sm"
                      type="number"
                      required
                      defaultValue={serviceToUpdate.servicePrice}
                      name="servicePrice"
                    />

                    <label className="block mt-3 mb-1 text-red-500 text-sm">
                      Your Name {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-red-500 text-sm"
                      type="text"
                      required
                      defaultValue={serviceToUpdate.providerName}
                      name="providerName"
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-red-500 text-sm">
                      Your Email {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-red-500 text-sm"
                      type="email"
                      required
                      defaultValue={serviceToUpdate.providerEmail}
                      name="providerEmail"
                      readOnly
                    />
                    <label className="block mt-3 mb-1 text-red-500 text-sm">
                      Your Image {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-red-500 text-sm"
                      type="text"
                      required
                      defaultValue={serviceToUpdate.providerImage}
                      name="providerImage"
                      readOnly
                    />
                  </div>
                </div>
                <input
                  className="mt-2 md:mt-10 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-gray-700 focus:outline-none cursor-pointer"
                  type="submit"
                  value="Update"
                />
                <button
                  className="ml-10 mt-2 md:mt-10 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  onClick={cancelUpdating}
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

export default ManageServices;
