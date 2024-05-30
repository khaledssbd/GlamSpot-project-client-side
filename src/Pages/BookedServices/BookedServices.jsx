import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { Typewriter } from 'react-simple-typewriter';
import deleteImg from '../../assets/delete.svg';
import updateImg from '../../assets/update.svg';
import eyeImg from '../../assets/eye.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '../../Components/AllLootie/Loading';
import xButtonSVG from '../../assets/x-button.svg';

// for export pdf
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const BookedServices = () => {
  const { user } = useAuth();
  const doc = new jsPDF();

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [bookingToUpdate, setBookingToUpdate] = useState({});
  const [serviceTakingDate, setServiceTakingDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const QueryClient = useQueryClient();

  // fetch data on start like useEffect
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return data;
    },
  });

  // delete a booking instance
  const deleteBooking = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosSecure.delete(
        `/delete-booking/${id}?email=${user?.email}`
      );
      return data;
    },
    onSuccess: () => {
      Swal.fire('Deleted!', 'Your Booking has been deleted.', 'success');
      refetch();
      // QueryClient.invalidateQueries({ queryKey: ['my-bookings'] });
    },
  });

  const handleDelete = (id, serviceStatus) => {
    if (serviceStatus === 'Completed') {
      return toast.error(
        "You cannot delete a booking with the status 'Completed'.",
        { duration: 3000 }
      );
    }
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
        await deleteBooking.mutateAsync({ id });
      }
    });
  };

  // get data and show modal to update a booking
  const getDataForUpdate = async (id, serviceStatus) => {
    if (serviceStatus === 'Completed') {
      return toast.error(
        "You cannot update a booking with the status 'Completed'.",
        { duration: 3000 }
      );
    }
    const { data } = await axiosSecure.get(
      `/booking-details/${id}?email=${user?.email}`
    );
    setBookingToUpdate(data);
    setServiceTakingDate(data.serviceTakingDate);
    setShowUpdateModal(true);
  };

  // update a service instance
  const updateBooking = useMutation({
    mutationFn: async ({ updateData }) => {
      const { data } = await axiosSecure.patch(
        `/update-booking/${bookingToUpdate._id}?email=${user?.email}`,
        updateData
      );
      return data;
    },
    onSuccess: () => {
      setShowUpdateModal(false);
      Swal.fire('Updated!', 'Your Booking has been updated.', 'success');
      // refetch();
      setBookingToUpdate({});
      QueryClient.invalidateQueries({ queryKey: ['my-services'] });
    },
  });

  const handleUpdateBooking = async e => {
    e.preventDefault();
    const form = e.target;
    const instruction = form.instruction.value;
    const updateData = { instruction, serviceTakingDate };
    await updateBooking.mutateAsync({ updateData });
  };

  const cancelUpdating = () => {
    setShowUpdateModal(false);
    setBookingToUpdate({});
  };

  const handleExportPDF = () => {
    doc.autoTable({ html: '#booked-table', bodyStyles: {fillColor: 'yellow'} });
    doc.save('booked-services.pdf');

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
        <title>GlamSpot | Booked Services</title>
      </Helmet>

      <span style={{ color: '#fa237d', fontWeight: 'bold', fontSize: '25px' }}>
        <Typewriter
          words={['My Booked Services']}
          loop={50}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </span>
      <div className="text-end">
        <button
          className="btn bg-green-400 text-white"
          onClick={handleExportPDF}
        >
          Export PDF
        </button>
      </div>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-black mt-8">
          <table className="table table-zebra" id='booked-table'>
            {/* head starts here */}
            <thead className="bg-green-400">
              <tr>
                <th className="text-sm text-black">Sl</th>
                <th className="text-sm text-black">Service Name</th>
                <th className="text-sm text-black">Area</th>
                <th className="text-sm text-black">Price</th>
                <th className="text-sm text-black">Provider Name</th>
                <th className="text-sm text-black">Service Taking Date</th>
                <th className="text-sm text-black">Status</th>
                <th className="text-sm text-black">View Details</th>
                <th className="text-sm text-black">Update</th>
                <th className="text-sm text-black">Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row starts here */}
              {bookings?.map((booking, i) => (
                <tr key={booking._id}>
                  <th>{i + 1}.</th>
                  <td>{booking.serviceName}</td>
                  <td>{booking.serviceArea}</td>
                  <td>$ {booking.servicePrice}</td>
                  <td>{booking.providerName}</td>
                  <td>
                    {new Date(booking.serviceTakingDate).toLocaleDateString(
                      'en-GB',
                      {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }
                    )}
                  </td>
                  <td
                    className={`inline-flex items-center mt-2 px-3 py-1 rounded-full gap-x-2 ${
                      booking.serviceStatus === 'Pending' &&
                      'bg-yellow-100/90 text-yellow-600'
                    } ${
                      booking.serviceStatus === 'Working' &&
                      'bg-blue-100/90 text-blue-500'
                    } ${
                      booking.serviceStatus === 'Completed' &&
                      'bg-emerald-100/90 text-emerald-600'
                    }`}
                  >
                    {booking.serviceStatus}
                  </td>
                  <td>
                    <Link to={`/service/${booking.serviceId}`}>
                      <img src={eyeImg} alt="view-booking" className="w-6" />
                    </Link>
                  </td>
                  <td>
                    <div
                      onClick={() =>
                        getDataForUpdate(booking._id, booking.serviceStatus)
                      }
                    >
                      <img
                        src={updateImg}
                        alt="update-booking"
                        className="w-6"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      onClick={() =>
                        handleDelete(booking._id, booking.serviceStatus)
                      }
                    >
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
        <h3 className="mt-20 text-xl font-bold">No booking yet</h3>
      )}
      {showUpdateModal && (
        <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-full z-10">
          <div className="w-full md:w-2/3 h-5/6 rounded-xl bg-blue-200 text-center">
            <div className="card-actions justify-end">
              <button
                onClick={cancelUpdating}
                className="btn btn-square btn-sm"
              >
                <img src={xButtonSVG} alt="close" />
              </button>
            </div>
            <h3 className="mt-2 md:mt-8 text-base md:text-xl font-bold text-black">
              Update the booking ({bookingToUpdate.serviceName})
            </h3>
            <div className="md:mt-8 mx-auto w-full md:w-2/3">
              <form onSubmit={handleUpdateBooking}>
                <div className="grid grid-cols-2 gap-8">
                  {/* Left side */}
                  <div className="flex-1">
                    <label className="block mt-4 mb-1 text-red-500 text-sm">
                      Service Name {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-red-500 text-sm"
                      type="text"
                      required
                      defaultValue={bookingToUpdate.serviceName}
                      name="name"
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-red-500 text-sm">
                      Service Image (1440px × 960px suits best)
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-red-500 text-sm"
                      type="text"
                      required
                      defaultValue={bookingToUpdate.serviceImage}
                      name="image"
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-red-500 text-sm">
                      Service ID {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-red-500 text-sm"
                      type="text"
                      required
                      defaultValue={bookingToUpdate._id}
                      name="id"
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-red-500 text-sm">
                      Provider Name {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-red-500 text-sm"
                      type="text"
                      required
                      defaultValue={bookingToUpdate.providerName}
                      name="providerName"
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-red-500 text-sm">
                      Provider Email {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-red-500 text-sm"
                      type="email"
                      required
                      defaultValue={bookingToUpdate.providerEmail}
                      name="providerEmail"
                      readOnly
                    />
                  </div>
                  {/* Right side */}
                  <div className="flex-1">
                    <label className="block mt-4 mb-1 text-red-500 text-sm">
                      Price in $ {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-red-500 text-sm"
                      type="text"
                      required
                      defaultValue={bookingToUpdate.servicePrice}
                      name="price"
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-red-500 text-sm">
                      Your name {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-red-500 text-sm"
                      type="text"
                      required
                      name="user_email"
                      placeholder="Your email"
                      defaultValue={user?.displayName}
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-red-500 text-sm">
                      Your Email {'(fixed)'}
                    </label>
                    <input
                      className="md:w-full p-2 border rounded-lg focus:outline-red-500 text-sm"
                      type="email"
                      required
                      name="user_email"
                      placeholder="Your email"
                      defaultValue={user?.email}
                      readOnly
                    />

                    <label className="block mt-3 mb-1 text-sm text-black">
                      Your instruction
                    </label>
                    <textarea
                      className="w-3/4 md:w-full p-2 border rounded-lg focus:outline-green-500 text-sm"
                      name="instruction"
                      required
                      placeholder="Enter your instruction"
                      defaultValue={bookingToUpdate.instruction}
                      cols="1"
                      rows="2"
                    />

                    <label className="block mt-1 text-sm text-black">
                      Service taking date
                    </label>
                    <DatePicker
                      className="md:w-full p-2 border rounded-lg text-sm"
                      selected={serviceTakingDate}
                      onChange={date => setServiceTakingDate(date)}
                      dateFormat="dd/MM/yyyy"
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

export default BookedServices;
