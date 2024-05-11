import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';

const UpdateProfile = () => {
  const { updateUserProfile, user } = useAuth();
  const navigate = useNavigate();
  const handleRegister = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    updateUserProfile(name, photo)
      .then(() => {
        navigate('/user-profile');
        window.location.reload();
      })
      // .catch(error => console.log(error.message));
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
            Photo URL
          </label>
          <input
            type="text"
            required
            name="photo"
            placeholder="Your Photo URL"
            defaultValue={user?.photoURL}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label label-text text-red-500 text-base font-semibold mt-5">
            Email {'(unchangeable)'}
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
        <div className="form-control mt-6">
          <button className="btn btn-primary">Update</button>
        </div>
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
