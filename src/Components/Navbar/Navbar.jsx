import { Link, NavLink } from 'react-router-dom';
import userImg from '../../assets/user.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
// import SUN from '../../assets/sun.svg';
// import DARK from '../../assets/dark.png';
import MOON from '../../assets/moon.svg';
import LIGHT from '../../assets/light.png';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // theme change part start
  const [theme, setTheme] = useState();
  useEffect(() => {
    const localTheme = localStorage.getItem('GlamSpot-theme');
    if (localTheme) {
      setTheme(localTheme);
      document.querySelector('html').setAttribute('data-theme', localTheme);
    } else {
      setTheme('light');
      localStorage.setItem('GlamSpot-theme', 'light');
      document.querySelector('html').setAttribute('data-theme', 'light');
    }
  }, []);

  const handleToggle = () => {
    const localTheme = localStorage.getItem('GlamSpot-theme');
    if (localTheme === 'light') {
      setTheme('luxury');
      localStorage.setItem('GlamSpot-theme', 'luxury');
      document.querySelector('html').setAttribute('data-theme', 'luxury');
      return;
    }
    setTheme('light');
    localStorage.setItem('GlamSpot-theme', 'light');
    document.querySelector('html').setAttribute('data-theme', 'light');
  };
  // theme change part end

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('You logged out successfully!');
      })
      .catch(error => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'text-red-500 border-b-4 border-red-500 mr-2'
              : 'hover:text-red-500 mr-2'
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'text-red-500 border-b-4 border-red-500 mr-2'
              : 'hover:text-red-500 mr-2'
          }
          to="/all-services"
        >
          Services
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <div className="hidden lg:flex dropdown dropdown-bottom">
              <div tabIndex={0}>Dashboard</div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-red-500' : 'hover:text-red-500'
                    }
                    to="/add-service"
                  >
                    Add Service
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-red-500' : 'hover:text-red-500'
                    }
                    to="/manage-service"
                  >
                    Manage Service
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-red-500' : 'hover:text-red-500'
                    }
                    to="/booked-service"
                  >
                    Booked Service
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-red-500' : 'hover:text-red-500'
                    }
                    to="/service-to-do"
                  >
                    Service To Do
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          {/* links for mobile device */}
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'text-red-500 border-b-4 border-red-500 flex lg:hidden'
                  : 'hover:text-red-500 flex lg:hidden'
              }
              to="/add-service"
            >
              Add Service
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'text-red-500 border-b-4 border-red-500 flex lg:hidden'
                  : 'hover:text-red-500 flex lg:hidden'
              }
              to="/manage-service"
            >
              Manage Service
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'text-red-500 border-b-4 border-red-500 flex lg:hidden'
                  : 'hover:text-red-500 flex lg:hidden'
              }
              to="/booked-service"
            >
              Booked Service
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'text-red-500 border-b-4 border-red-500 flex lg:hidden'
                  : 'hover:text-red-500 flex lg:hidden'
              }
              to="/service-to-do"
            >
              Service To Do
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-200 rounded-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="btn -ml-6 sm:-ml-0 btn-ghost hover:bg-black hover:text-black text-lg sm:text-xl md:text-3xl font-bold"
        >
          <button className="flex justify-center items-center gap-1">
            <img
              className="w-5 md:w-10 rounded-lg"
              src="/favicon.png"
              alt="GlamSpot"
            />
            <span className="bg-gradient-to-r from-primary to-red-500 text-transparent bg-clip-text">
              GlamSpot
            </span>{' '}
          </button>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {/* Dark theme toggle */}
        {theme === 'light' ? (
          <img onClick={handleToggle} className="w-10" src={MOON} alt="" />
        ) : (
          <img onClick={handleToggle} className="w-10" src={LIGHT} alt="" />
        )}
        {/* User image part */}
        {user ? (
          <>
            {/* <label className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  title={
                    user?.displayName ? user?.displayName : 'No Name Set Yet'
                  }
                  src={user?.photoURL || userImg}
                />
              </div>
            </label> */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="m-1 btn btn-ghost btn-circle avatar"
              >
                <div
                  className="w-10 rounded-full"
                  data-tooltip-id="userName"
                  data-tooltip-content={
                    user?.displayName ? user?.displayName : 'No Name Set Yet'
                  }
                  data-tooltip-place="top"
                >
                  <img
                    src={user?.photoURL || userImg}
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                  />

                  <Tooltip id="userName" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36 -ml-20"
              >
                <li>
                  <Link
                    to="/update-profile"
                    className="hover:bg-blue-500 hover:text-white font-bold"
                  >
                    Update Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user-profile"
                    className="hover:bg-blue-500 hover:text-white font-bold"
                  >
                    User Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="hover:bg-red-500 hover:text-white font-bold"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>

            <button
              onClick={handleLogOut}
              className="btn btn-outline bg-red-500 hover:bg-red-900 text-white"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-outline bg-blue-600 hover:bg-black text-white hover:text-white">
                Login
              </button>
            </Link>
            {/* <Link to="/register">
              <button className="btn btn-outline bg-blue-600 hover:bg-black text-white hover:text-white hidden sm:flex">
                Register
              </button>
            </Link> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
