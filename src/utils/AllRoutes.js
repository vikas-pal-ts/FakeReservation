import AddStation from "../pages/AddStation"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import PermissionDenied from "../pages/PermissionDenied"
import PlanJourney from "../pages/PlanJourney"
import Register from "../pages/Register"
import StationList from "../pages/StationList"
import SvgMarkup from '../svg'

const ACCESS_RIGHTS = {
    NoAuth: 'NoAuth',
    All: 'All',
    Admin: 'admin',
    User: 'user'
}

const AllRoutes = [
    { title: '/', path: '/', access: ACCESS_RIGHTS.All, component: <Dashboard />, IconSvg: SvgMarkup.Dashboard },
    { title: 'Dashboard', path: '/dashboard', access: ACCESS_RIGHTS.All, component: <Dashboard />, IconSvg: SvgMarkup.Dashboard },
    { title: 'Plan Journey', path: '/plan-journey', access: ACCESS_RIGHTS.User, component: <PlanJourney />, IconSvg: SvgMarkup.PlanJourney },
    { title: 'Stations List', path: '/stations-list', access: ACCESS_RIGHTS.Admin, component: <StationList />, IconSvg: SvgMarkup.StationList },
    { title: 'Login', path: '/login', access: ACCESS_RIGHTS.NoAuth, component: <Login />, IconSvg: SvgMarkup.Dashboard },
    { title: 'Register', path: '/register', access: ACCESS_RIGHTS.NoAuth, component: <Register />, IconSvg: null },
    { title: 'Permission Denied', path: '/permission-denied', access: ACCESS_RIGHTS.NoAuth, component: <PermissionDenied /> },
    { title: 'Add Station', path: '/add-station', access: ACCESS_RIGHTS.Admin, component: <AddStation />, IconSvg: SvgMarkup.AddStation }
]

export default AllRoutes
