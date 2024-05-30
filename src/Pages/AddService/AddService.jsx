import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { Typewriter } from 'react-simple-typewriter';
import axios from 'axios';

const image_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddService = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleAddService = async e => {
    e.preventDefault();
    const form = e.target;

    const serviceImage = form.serviceImage.files[0];
    const serviceName = form.serviceName.value;
    const servicePrice = form.servicePrice.value;
    const serviceArea = form.serviceArea.value;
    const serviceDescription = form.serviceDescription.value;
    const providerEmail = form.providerEmail.value;
    const providerImage = form.providerImage.value;
    const providerName = form.providerName.value;
    const totalBookings = 0;

    const formData = new FormData();
    formData.append('image', serviceImage);

    try {
      const { data } = await axios.post(image_hosting_api, formData);
      const imageUrl = data.data.display_url;

      const serviceDoc = {
        serviceImage: imageUrl,
        serviceName,
        servicePrice,
        serviceArea,
        serviceDescription,
        providerEmail,
        providerImage,
        providerName,
        totalBookings,
      };

      const { data: serviceConf } = await axiosSecure.post(
        `/add-service?email=${user?.email}`,
        serviceDoc
      );

      if (serviceConf.insertedId) {
        toast.success('Service added successfully');
        navigate('/manage-services');
      }
    } catch (err) {
      toast.error(err.message);
      return;
    }
  };
  return (
    <div className="my-10">
      <Helmet>
        <title>GlamSpot | Add Service</title>
      </Helmet>
      <div className="text-center">
        {/* <h3 className="text-2xl font-bold">Add your service</h3> */}
        <span
          style={{ color: '#fa237d', fontWeight: 'bold', fontSize: '25px' }}
        >
          <Typewriter
            words={['Add your service']}
            loop={50}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </span>
        <div className="mt-8 mx-auto w-full md:w-2/3">
          <form onSubmit={handleAddService}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left side */}
              <div className="flex-1">
                <label className="block mt-4 mb-1">Service Name</label>
                <input
                  className="w-full p-2 border rounded-lg focus:outline-green-500"
                  type="text"
                  required
                  name="serviceName"
                  placeholder="Service name"
                />

                <label className="block mt-4 mb-1">Service Image</label>
                <input
                  required
                  type="file"
                  name="serviceImage"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                />

                <label className="block mt-4 mb-1">Service Price in $</label>
                <input
                  className="w-full p-2 border rounded-lg focus:outline-green-500"
                  type="number"
                  required
                  name="servicePrice"
                  placeholder="Service price"
                />

                <label className="block mt-4 mb-1">Service Description</label>
                <textarea
                  className="w-full p-2 border rounded-lg focus:outline-green-500"
                  name="serviceDescription"
                  required
                  placeholder="Service description"
                  cols="1"
                  rows="2"
                />
              </div>
              {/* Right side */}
              <div className="flex-1">
                <label className="block mt-4 mb-1">Service Area</label>
                <input
                  className="w-full p-2 border rounded-lg focus:outline-green-500"
                  type="text"
                  required
                  name="serviceArea"
                  placeholder="Service area"
                />

                <label className="block mt-5 mb-1 text-red-500">
                  Your name {'(fixed)'}
                </label>
                <input
                  className="w-full p-2 border rounded-lg focus:outline-red-500"
                  type="text"
                  required
                  name="providerName"
                  placeholder="Your name"
                  defaultValue={user?.displayName}
                  readOnly
                />

                <label className="block mt-5 mb-1 text-red-500">
                  Your Image {'(fixed)'}
                </label>
                <input
                  className="w-full p-2 border rounded-lg focus:outline-red-500"
                  type="text"
                  required
                  name="providerImage"
                  placeholder="Your imageURL"
                  defaultValue={user?.photoURL}
                  readOnly
                />

                <label className="block mt-5 mb-1 text-red-500">
                  Your Email {'(fixed)'}
                </label>
                <input
                  className="w-full p-2 border rounded-lg focus:outline-red-500"
                  type="email"
                  required
                  name="providerEmail"
                  placeholder="Your email"
                  defaultValue={user?.email}
                  readOnly
                />
              </div>
            </div>
            <input
              className="mt-10 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer"
              type="submit"
              value="Add Service"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
