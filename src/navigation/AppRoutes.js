import React, { useContext } from 'react';
import {
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import AllRoutes from '../utils/AllRoutes';


const AppRoutes = () => {
    return (
        <Routes>
            {AllRoutes.map((route, index) => {
                return (
                    <Route key={index} path={route.path} caseSensitive={false} element={
                        <AuthPrivateRoute role={route.access}>
                            {route.component}
                        </AuthPrivateRoute>
                    } />
                )
            })}
        </Routes>
    )
}

export default AppRoutes


function AuthPrivateRoute({ children, role, ...props }) {
    let { auth, data } = useAuth(role);
    let redirectPath = '/login';
    const currentPath = window.location.pathname

    if (role !== 'All') {
        if (data?.role !== role) {
            redirectPath = '/permission-denied'
        } else if (auth === false) {
            redirectPath = '/login'
        }
    }

    if (role === 'NoAuth') {
        redirectPath = auth ? '/dashboard' : currentPath
    }
    let isSamePage = currentPath === redirectPath;
    return auth ? children : !isSamePage ? <Navigate to={redirectPath} /> : children
}

function useAuth(userType) {
    const { getUser } = useContext(AppContext)
    let isUserLoggedIn = { auth: false, data: {} };
    if (getUser() !== null) {
        isUserLoggedIn.data = getUser();
        const isUserDataEmpty = Object.keys(getUser()).length === 0
        if (!isUserDataEmpty) {
            if (userType === 'user') {
                isUserLoggedIn.auth = getUser().role === 'user'
            } else if (userType === 'admin') {
                isUserLoggedIn.auth = getUser().role === 'admin'
            } else if (userType === 'All') {
                isUserLoggedIn.auth = !isUserDataEmpty
            }
        }

    }
    return isUserLoggedIn;

}
