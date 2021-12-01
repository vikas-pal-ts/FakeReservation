import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import AppRoutes from './AppRoutes';

const AppNavigation = ({ children }) => {
    return (
        <Router>
            <>
                <AppRoutes />
                {children}
            </>
        </Router>
    )
}

export default AppNavigation
