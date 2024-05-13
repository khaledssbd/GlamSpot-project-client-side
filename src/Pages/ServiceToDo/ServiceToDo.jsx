import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import eyeImg from '../../assets/eye.svg';
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

      <span style={{ color: '#fa237d', fontWeight: 'bold', fontSize: '25px' }}>
        <Typewriter
          words={['Services To Do']}
          loop={50}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </span>
      {servicesToDo.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-black mt-8">
          <table className="table table-zebra">
            {/* head starts here */}
            <thead className="bg-green-400">
              <tr>
                <th className="text-sm text-black">Sl</th>
                <th className="text-sm text-black">Service Name</th>
                <th className="text-sm text-black">Price</th>
                <th className="text-sm text-black">Customer Name</th>
                <th className="text-sm text-black">Customer Email</th>
                <th className="text-sm text-black">Service Taking Date</th>
                <th className="text-sm text-black">View Details</th>
                <th className="text-sm text-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row starts here */}
              {servicesToDo?.map((servicesToDo, i) => (
                <tr key={servicesToDo._id}>
                  <th>{i + 1}.</th>
                  <td>{servicesToDo.serviceName}</td>
                  <td>${servicesToDo.servicePrice}</td>
                  <td>{servicesToDo.customerName}</td>
                  <td>{servicesToDo.customerEmail}</td>
                  <td>
                    {new Date(
                      servicesToDo.serviceTakingDate
                    ).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <Link to={`/service/${servicesToDo.serviceId}`}>
                      <img src={eyeImg} alt="view-booking" className="w-6" />
                    </Link>
                  </td>
                  <td>
                    <select
                      name="serviceStatus"
                      className="p-2 border rounded-lg focus:outline-green-500"
                      type="text"
                      required
                      placeholder="Service Status"
                      disabled={servicesToDo.serviceStatus === 'Completed'}
                      onChange={e =>
                        handleServiceStatusChange(
                          e.target.value,
                          servicesToDo._id
                        )
                      }
                      defaultValue={servicesToDo.serviceStatus}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Working">Working</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="mt-20 text-xl font-bold">No service to do</h3>
      )}
    </div>
  );
};

export default ServiceToDo;
