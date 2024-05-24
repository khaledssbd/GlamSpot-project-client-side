import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { TbFidgetSpinner } from 'react-icons/tb';

const image_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProfile = () => {
  const { updateUserProfile, user } = useAuth();
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    const image = form.image.files[0];
    const formData = new FormData();
    formData.append('image', image);

    setUpdating(true);
    try {
      const { data } = await axios.post(image_hosting_api, formData);
      await updateUserProfile(name, data.data.display_url).then(() => {
        toast.success('Profile Updated Successfully!');
        navigate('/user-profile');
        setUpdating(false);
        window.location.reload();
      });
    } catch (error) {
      setUpdating(false);
      toast.error(error);
    }

    setUpdating(false);
  };

  return (
    <div className="mb-10">
      <Helmet>
        <title>GlamSpot | Update Profile</title>
      </Helmet>
      <h2 className="text-xl sm:text-2xl mt-10 mb-5 text-center font-bold">
        Update your Profile
      </h2>
      <form onSubmit={handleRegister} className=" md:w-3/4 lg:w-1/2 mx-auto">
        <div className="form-control">
          <label className="label label-text text-base font-semibold">
            Name
          </label>
          <input
            type="text"
            required
            name="name"
            placeholder="Your Name"
            defaultValue={user?.displayName}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label label-text text-base font-semibold mt-5">
            Select Image:
          </label>
          <input
            type="file"
            accept="image/*"
            required
            name="image"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control">
          <label className="label label-text text-red-500 text-base font-semibold mt-5">
            Email {'(fixed)'}
          </label>
          <input
            type="email"
            required
            name="email"
            placeholder="Your Email"
            value={user?.email}
            className="input input-bordered"
            readOnly
          />
        </div>
        <button
          disabled={updating}
          type="submit"
          className="bg-primary w-full rounded-md py-3 text-white mt-6"
        >
          {updating ? (
            <TbFidgetSpinner className="animate-spin m-auto" />
          ) : (
            'Update'
          )}
        </button>
      </form>

      <p className="text-center mt-4">
        Want to check your profile?{' '}
        <Link
          className="text-blue-600 text-sm font-bold ml-2"
          to="/user-profile"
        >
          Click here
        </Link>
      </p>
    </div>
  );
};

export default UpdateProfile;
