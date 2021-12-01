import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import AllRoutes from '../utils/AllRoutes'
import AppButton from './AppButton'

const AppHeader = ({ children, ...props }) => {
    const { setUser, getUser } = useContext(AppContext)
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser({})
        navigate('/')
    }
    const currentPage = window.location.pathname;
    return (
        <div className="h-full w-full">
            <div className=" flex-row w-full justify-between p-3 flex  border-b-2 border-indigo-100">
                <div className="lg:w-1/4 w-full lg:text-left text-center text-xl font-semibold self-center">
                    FakeReservations
                </div>
                <nav className="w-2/4 self-center lg:block hidden">
                    <ul className="flex flex-row w-2/4 justify-around self-center w-3/4">
                        {AllRoutes.map((item, index) => {
                            const filteredMenu = getUser()?.role === 'admin' ? 'user' : 'admin';
                            if (item.access !== filteredMenu && item.access !== 'NoAuth') {
                                const activeClass = item?.path === currentPage ? 'bg-gray-300' : ''
                                return (
                                    item?.title !== '/' && (
                                        <li key={index} className={`px-4 py-2 rounded-full w-full text-center ${activeClass}`}>
                                            <Link to={item?.path} className="text-lg font-medium">
                                                {item?.title}
                                            </Link>
                                        </li>
                                    )

                                )
                            } else {
                                return null
                            }

                        })}
                    </ul>
                </nav>
                <div className="flex-row w-1/12 justify-between h-full items-center lg:flex hidden">
                    <div className="flex flex-col items-center">
                        <div className="rounded-full bg-gray-300 h-10 w-10 mb-1">

                        </div>
                        <span className="font-semibold inline">{getUser()?.name}</span>
                    </div>
                    <AppButton title="Logout" onClick={handleLogout} className="pl-2 pr-2 pt-1 pb-1" />
                </div>

            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default AppHeader
