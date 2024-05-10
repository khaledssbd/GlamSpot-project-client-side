import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../Components/AllLootie/Loading';
import useAuth from '../hooks/useAuth';
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return (
    <Navigate state={location.pathname} to="/login" replace={true}></Navigate>
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
