import { Helmet } from 'react-helmet-async';
import { Typewriter } from 'react-simple-typewriter';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import deleteImg from '../../assets/delete.svg';
import updateImg from '../../assets/update.svg';
import eyeImg from '../../assets/eye.svg';
import { Link } from 'react-router-dom';


const ManageServices = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [fetchNow, setFetchNow] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [serviceToUpdate, setServiceToUpdate] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/my-services?email=${user?.email}`).then(res => {
      setServices(res.data);
    });
  }, [user?.email, axiosSecure, fetchNow]);

  const refetch = () => {
    setFetchNow(!fetchNow);
  };

  const handleDelete = id => {
    Swal.fire({
      title: 'Confirm to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(
            `${import.meta.env.VITE_API_URL}/delete-service/${id}?email=${
              user?.email
            }`
          )
          .then(data => {
            if (data.data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'This service has been deleted.',
                'success'
              );
              refetch();
            }
          });
      }
    });
  };

  const getDataForUpdate = async id => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/service-details/${id}`
    );
    setServiceToUpdate(data);
    setShowUpdateModal(true);
  };

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

    const { data } = await axiosSecure.patch(
      `${import.meta.env.VITE_API_URL}/update-service/${
        serviceToUpdate._id
      }?email=${user?.email}`,
      updateData
    );
    if (data.modifiedCount > 0) {
      Swal.fire('Updated!', 'Your service has been updated.', 'success');
      setShowUpdateModal(false);
      setServiceToUpdate({});
      refetch();
    }
  };

  const cancelUpdating = () => {
    setShowUpdateModal(false);
    setServiceToUpdate({});
  };

  return (
    <div className="my-10 sm:px-6">
      <Helmet>
        <title>GlamSpot | Manage Services</title>
      </Helmet>

      <span style={{ color: '#fa237d', fontWeight: 'bold', fontSize: '20px' }}>
        <Typewriter
          words={['Services I provide']}
          loop={50}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </span>

      {services.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-black mt-8">
          <table className="table table-zebra">
            {/* head starts here */}
            <thead className="bg-green-400">
              <tr>
                <th className="text-sm text-black">Sl</th>
                <th className="text-sm text-black">Service Name</th>
                <th className="text-sm text-black">Area</th>
                <th className="text-sm text-black">Price</th>
                <th className="text-sm text-black">Total Bookings</th>
                <th className="text-sm text-black">View Service</th>
                <th className="text-sm text-black">Update</th>
                <th className="text-sm text-black">Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row starts here */}
              {services?.map((service, i) => (
                <tr key={service._id}>
                  <th>{i + 1}.</th>
                  <td>{service.serviceName}</td>
                  <td>{service.serviceArea}</td>
                  <td>$ {service.servicePrice}</td>
                  <td>{service.totalBookings}</td>
                  <td>
                    <Link to={`/service/${service._id}`}>
                      <img src={eyeImg} alt="view-booking" className="w-6" />
                    </Link>
                  </td>
                  <td>
                    <div onClick={() => getDataForUpdate(service._id)}>
                      <img
                        src={updateImg}
                        alt="update-booking"
                        className="w-6"
                      />
                    </div>
                  </td>
                  <td>
                    <div onClick={() => handleDelete(service._id)}>
                      <img
                        src={deleteImg}
                        alt="delete-booking"
                        className="w-6"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="mt-20 text-xl font-bold">No service yet</h3>
      )}
      {showUpdateModal && (
        <div className=" fixed top-0 left-0 flex justify-center items-center h-screen w-full z-10">
          <div className="w-full md:w-2/3 h-5/6 rounded bg-blue-300 text-center">
            <h3 className="mt-8 text-xl font-bold">
              Update the service ({serviceToUpdate.serviceName})
            </h3>
            <div className="mt-8 mx-auto w-full md:w-2/3">
              <form onSubmit={handleUpdateService}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left side */}
                  <div className="flex-1">
                    <label className="block mt-4 mb-1">Service Name</label>
                    <input
                      className="w-full p-2 border rounded-lg focus:outline-green-500"
                      type="text"
                      required
                      defaultValue={serviceToUpdate.serviceName}
                      name="serviceName"
                    />

                    <label className="block mt-3 mb-1">
                      Service Image (1440px × 960px suits best)
                    </label>
                    <input
                      className="w-full p-2 border rounded-lg focus:outline-green-500"
                      type="text"
                      required
                      defaultValue={serviceToUpdate.serviceImage}
                      name="serviceImage"
                    />

                    <label className="block mt-4 mb-1">Service Area</label>
                    <input
                      className="w-full p-2 border rounded-lg focus:outline-green-500"
                      type="text"
                      required
                      defaultValue={serviceToUpdate.serviceArea}
                      name="serviceArea"
                    />

                    <label className="block mt-3 mb-1">
                      Service Description
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-lg focus:outline-green-500"
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
                    <label className="block mt-3 mb-1">Service Price</label>
                    <input
                      className="w-full p-2 border rounded-lg focus:outline-green-500"
                      type="text"
                      required
                      defaultValue={serviceToUpdate.servicePrice}
                      name="servicePrice"
                    />

                    <label className="block mt-3 mb-1 text-red-500">
                      Your Name {'(unchangeable)'}
                    </label>
                    <input
                      className="w-full p-2 border rounded-lg focus:outline-red-500"
                      type="text"
                      required
                      defaultValue={serviceToUpdate.providerName}
                      name="providerName"
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-red-500">
                      Your Email {'(unchangeable)'}
                    </label>
                    <input
                      className="w-full p-2 border rounded-lg focus:outline-red-500"
                      type="email"
                      required
                      defaultValue={serviceToUpdate.providerEmail}
                      name="providerEmail"
                      readOnly
                    />
                    <label className="block mt-3 mb-1 text-red-500">
                      Your Image {'(unchangeable)'}
                    </label>
                    <input
                      className="w-full p-2 border rounded-lg focus:outline-red-500"
                      type="text"
                      required
                      defaultValue={serviceToUpdate.providerImage}
                      name="providerImage"
                      readOnly
                    />
                  </div>
                </div>
                <input
                  className="mt-10 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  type="submit"
                  value="Update"
                />
                <button
                  className="ml-10 mt-10 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
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
