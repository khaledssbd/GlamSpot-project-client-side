import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import googleSvg from '../../assets/google.svg';
// import facebookSvg from '../../assets/facebook.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  // const { logIn, signInWithSocial, facebookProvider, googleProvider } = useAuth();
  const { logIn, signInWithSocial, googleProvider } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    logIn(email, password)
      .then(() => {
        navigate(location?.state ? location.state : '/');
        toast.success('Account logged-in successfully!');
      })
      .catch(error => {
        if (error.message === 'Firebase: Error (auth/invalid-credential).') {
          toast.error('Email or password is wrong, try again or reset..');
        }
      });
  };

  const socialSignIn = provider => {
    signInWithSocial(provider).then(() => {
      navigate(location?.state ? location.state : '/');
      toast.success('Successfully logged in');
    });
  };

  return (
    <div className="mb-5 md:mb-10">
      <Helmet>
        <title>GlamSpot | Login</title>
      </Helmet>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-medium my-10 text-center">
        Please Login
      </h2>
      <form onSubmit={handleLogin} className=" md:w-3/4 lg:w-1/2 mx-auto">
        <div className="form-control">
          <label className="label label-text">Email</label>
          <input
            type="email"
            required
            name="email"
            placeholder="Your Email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label label-text">Password</label>
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
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <div className="">
        <h2 className="text-xl mt-10 mb-4">Login With</h2>
        <div className="flex justify-center gap-8">
          <button
            onClick={() => {
              socialSignIn(googleProvider);
            }}
          >
            <img className="w-9" src={googleSvg} alt="Google" />
          </button>
          {/* <button
            onClick={() => {
              socialSignIn(facebookProvider);
            }}
          >
            <img className="w-9" src={facebookSvg} alt="Facebook" />
          </button> */}
        </div>
      </div>
      <p className="text-center mt-4">
        Do not have an account?
        <Link className="text-blue-600 font-bold ml-2" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
