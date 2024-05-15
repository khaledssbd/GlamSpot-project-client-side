import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '../../Components/AllLootie/Loading';

const ServiceToDo = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const QueryClient = useQueryClient();

  // fetch data on start like useEffect
  const {
    data: servicesToDo = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['servicesToDo'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/services-to-do?email=${user?.email}`
      );
      return data;
    },
  });

  // update a service instance
  const updateServiceToDo = useMutation({
    mutationFn: async ({ newStatus, id }) => {
      const { data } = await axiosSecure.patch(
        `/update-service-status/${id}?email=${user?.email}`,
        { newStatus }
      );
      return data;
    },
    onSuccess: () => {
      Swal.fire('Updated!', 'Your Service Status has been updated.', 'success');
      refetch();
      QueryClient.invalidateQueries({ queryKey: ['servicesToDo'] });
    },
  });

  const handleServiceStatusChange = async (newStatus, id) => {
    await updateServiceToDo.mutateAsync({ newStatus, id });
    // const { data } = await axiosSecure.patch(
    //   `/update-service-status/${id}?email=${user?.email}`,
    //   { newStatus }
    // );
    // if (data.modifiedCount > 0) {
    //   Swal.fire('Updated!', 'Your Service Status has been updated.', 'success');
    //   refetch();
    // }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="my-10">
      <Helmet>
        <title>GlamSpot | Service To Do</title>
      </Helmet>

      <h3 className="flex justify-center items-center my-10 text-center text-[#fa237d] text-2xl font-bold">
        {servicesToDo.length}
        <span
          style={{ color: '#fa237d', fontWeight: 'bold', fontSize: '25px' }}
        >
          <Typewriter
            words={['- Service(s) to do']}
            loop={50}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </span>
      </h3>
      {servicesToDo.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {servicesToDo?.map((servicesToDo, i) => (
            <div
              key={i}
              className="p-3 bg-gray-300 rounded-xl flex flex-col"
              data-aos="zoom-out-up"
            >
              <div className="flex justify-center items-center">
                <img
                  className="rounded-lg border border-black"
                  src={servicesToDo.serviceImage}
                  alt={servicesToDo.serviceName}
                />
              </div>
              <h3 className="font-medium text-xl my-3 text-black">
                {servicesToDo.serviceName}
              </h3>
              <h3 className="mx-2 mb-3 text-base text-start text-black font-normal">
                Area: {servicesToDo.serviceArea}
              </h3>
              <h3 className="mx-2 mb-3 text-base text-start text-black font-normal">
                Price: ${servicesToDo.servicePrice}
              </h3>
              <h3 className="mx-2 mb-3 text-base text-start text-black font-normal">
                Customer Name: {servicesToDo.customerName}
              </h3>

              <h3 className="mx-2 mb-3 text-base text-start text-black font-normal">
                Service Date:{' '}
                {new Date(servicesToDo.serviceTakingDate).toLocaleDateString(
                  'en-GB',
                  {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }
                )}
              </h3>
              <div className="flex justify-start items-center gap-1 mx-2 mb-3">
                <h3 className="text-base text-black font-normal">Status: </h3>
                <select
                  name="serviceStatus"
                  className="p-2 border rounded-lg focus:outline-green-500"
                  type="text"
                  required
                  placeholder="Service Status"
                  disabled={servicesToDo.serviceStatus === 'Completed'}
                  onChange={e =>
                    handleServiceStatusChange(e.target.value, servicesToDo._id)
                  }
                  defaultValue={servicesToDo.serviceStatus}
                >
                  <option
                    hidden={servicesToDo.serviceStatus === 'Working'}
                    value="Pending"
                  >
                    Pending
                  </option>
                  <option value="Working">Working</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <Link to={`/service/${servicesToDo.serviceId}`}>
                <button className="mt-3 btn btn-primary text-white bg-blue-700 hover:bg-red-500">
                  View Service
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="mt-20 text-xl font-bold">No service to do</h3>
      )}
    </div>
  );
};

export default ServiceToDo;
