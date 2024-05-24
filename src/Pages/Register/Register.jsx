import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import googleSvg from '../../assets/google.svg';
import facebookSvg from '../../assets/facebook.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import bgImg from '../../assets/heroImg.jpg';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../../Components/AllLootie/Loading';

const image_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const [registering, setRegistering] = useState(false);
  const {
    user,
    createUser,
    verifyUser,
    logOut,
    signInWithSocial,
    googleProvider,
    facebookProvider,
    updateUserProfile,
  } = useAuth();

  const navigate = useNavigate();
  const [passError, setPassError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const emailRef = useRef(null);

  const handleRegister = async e => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    setEmailError('');
    setPassError('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Must use a valid email address');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPassError('Password must have at least one Uppercase letter');
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPassError('Password must have at least one Lowercase letter');
      return;
    }

    if (!/[!@#$%^&*=+]/.test(password)) {
      setPassError(
        'Password must have at least one special character like !,@,#,$,%,^,&,*,=,+'
      );
      return;
    }

    if (!/\d{2,}/.test(password)) {
      setPassError('Password must have at least 2 numbers');
      return;
    }

    if (password.length < 8) {
      setPassError('Password must be of at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setPassError("Password and Confirm Password didn't match");
      return;
    }

    if (!isChecked) {
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    setRegistering(true);

    try {
      const { data } = await axios.post(image_hosting_api, formData);
      const result = await createUser(email, password);
      await updateUserProfile(name, data.data.display_url);
      await logOut();
      await verifyUser(result.user);

      setRegistering(false);
      navigate('/login');
      Swal.fire(
        'Account created!',
        'You must verify your email. Check your inbox.',
        'success'
      );
    } catch (error) {
      setRegistering(false);
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        navigate('/login');
        toast.error('Account already exists. Please log in.');
      } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
        setEmailError('Must use a valid email address');
      } else {
        toast.error('An error occurred during registration. Please try again.');
      }
    }
    setRegistering(false);
  };

  const socialSignIn = async provider => {
    await signInWithSocial(provider);
    navigate(location?.state ? location.state : '/');
    toast.success('Successfully registered');
  };

  if (registering) {
    return (
      <div className="flex justify-center items-center pt-44">
        <Loading />
      </div>
    );
  }

  if (user) {
    return navigate('/');
  }

  return (
    <div
      className="my-5 md:my-10 p-5 md:p-10"
      style={{
        borderRadius: '24px',
        background: `linear-gradient(0deg, rgba(21, 11, 43, 0.90) 0%, rgba(21, 11, 43, 0.40) 100%), url(${bgImg}) lightgray 0px -18.896px / 100% 123.31% no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: 'auto',
      }}
    >
      <Helmet>
        <title>GlamSpot | Register</title>
      </Helmet>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-center text-white">
        Register
      </h2>
      <form onSubmit={handleRegister} className="md:w-3/4 lg:w-1/2 mx-auto">
        <div className="form-control">
          <label className="label label-text text-white">Name</label>
          <input
            type="text"
            required
            name="name"
            placeholder="Your Name"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label label-text text-white mt-2">Email</label>
          <input
            type="email"
            required
            name="email"
            ref={emailRef}
            placeholder="Your Email"
            className="input input-bordered"
          />
          {emailError && (
            <small className="text-red-500 text-left mt-1">{emailError}</small>
          )}
        </div>
        <div className="form-control">
          <label className="label label-text text-white mt-2">
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
          <label className="label label-text text-white mt-2">Password</label>
          <div className="flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              name="password"
              placeholder="Your Password"
              className="input input-bordered w-full"
              autoComplete="true"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="-ml-10"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {passError && (
            <small className="text-red-500 text-left mt-1">{passError}</small>
          )}
        </div>
        <div className="form-control">
          <label className="label label-text text-white mt-2">
            Confirm Password
          </label>
          <div className="flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              name="confirmPassword"
              placeholder="Your Password"
              className="input input-bordered w-full"
              autoComplete="true"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="-ml-10"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left pl-1 my-2">
              <input
                className="mr-1"
                onChange={event => setIsChecked(event.target.checked)}
                type="checkbox"
              />
              <small className="text-sm mt-1 text-white">
                Do you agree with our terms and conditions?
              </small>
            </div>
            {!isChecked && (
              <small className="text-red-500 mt-1">
                Please check on Terms and Conditions..
              </small>
            )}
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
      <div className="">
        <h2 className="text-xl text-white mt-10 mb-4">Register With</h2>
        <div className="flex justify-center gap-8">
          <button
            onClick={() => {
              socialSignIn(googleProvider);
            }}
          >
            <img className="w-9" src={googleSvg} alt="Google" />
          </button>
          <button
            onClick={() => {
              socialSignIn(facebookProvider);
            }}
          >
            <img className="w-9" src={facebookSvg} alt="Facebook" />
          </button>
        </div>
      </div>
      <p className="text-center text-white mt-4">
        Already have an account?{' '}
        <Link className="text-blue-600 font-bold ml-2" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
