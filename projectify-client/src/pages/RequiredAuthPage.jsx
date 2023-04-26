import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useStore from '../hooks/useStore';
import { LOGIN_LINK, UNAUTHORIZED_LINK } from '../routes/route';

const RequiredAuthPage = ({ allowedRoles }) => {
    const location = useLocation();
    // const token = getToken();
    const { auth } = useStore();

    return (
        auth?.isLoggedIn && auth?.roles?.find(role => allowedRoles?.includes(role?.authority))?.authority
            ? <Outlet />
            : auth?.email
                ? <Navigate to={UNAUTHORIZED_LINK} state={{ from: location }} replace />
                : <Navigate to={LOGIN_LINK} state={{ from: location }} replace />
    )
}

export default RequiredAuthPage