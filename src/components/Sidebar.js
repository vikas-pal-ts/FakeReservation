import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { LogoutSvg } from '../svg';
import AllRoutes from '../utils/AllRoutes';
import AppHeader from './AppHeader'

const Sidebar = ({ children }) => {
    const currentPage = window.location.pathname;
    const navigate = useNavigate();
    const { setUser, getUser } = useContext(AppContext)
    const handleLogout = () => {
        setUser({})
        navigate('/')
    }
    return (
        <AppHeader>
            <div className="flex lg:flex-row flex-col min-h-full h-full p-3 w-full bg-coolGray-50 text-coolGray-800 lg:items-start items-center justify-center ">
                <div className="fixed bottom-0 lg:relative space-y-3 flex-col lg:w-60 w-10/12 lg:block lg:border-r-2 border-indigo-100 lg:bg-transparent lg:opacity-100 opacity-95 bg-white lg:rounded-t-none rounded-full">
                    <ul className="lg:pt-2 lg:pb-4 pb-2 pt-0 text-sm lg:flex-col flex-row flex items-end lg:items-start lg:justify-center justify-evenly w-full">
                        {AllRoutes.map((item, index) => {
                            const filteredMenu = getUser()?.role === 'admin' ? 'user' : 'admin';
                            if (item.access !== filteredMenu && item.access !== 'NoAuth') {
                                const activeClass = item?.path === currentPage ? 'lg:bg-gray-300' : ''
                                return (
                                    item?.title !== '/' && (
                                        <li className={`rounded-sm lg:hover:bg-gray-300 lg:w-full w-20 rounded lg:mb-5 ${activeClass}`}>
                                            <Link to={item?.path} className="w-full flex lg:flex-row flex-col items-center lg:p-2 lg:space-x-3 rounded-md lg:mt-0 mt-5">
                                                {item?.IconSvg}
                                                <span className="lg:block lg:pt-0 pt-2 lg:text-base text-xs">{item?.title}</span>
                                            </Link>
                                        </li>
                                    )
                                )
                            } else {
                                return null
                            }

                        })}
                        <li className={`lg:hidden lg:hover:bg-gray-300 lg:w-full w-20 rounded lg:mb-5`}>
                            <Link to={'/'} onClick={handleLogout} className="w-full flex lg:flex-row flex-col items-center lg:p-2 lg:space-x-3 rounded-md lg:mt-0 mt-5">
                                {LogoutSvg}
                                <span className="lg:block lg:pt-0 pt-2 lg:text-base text-xs">{'Logout'}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="lg:pl-3 flex-col lg:w-10/12 w-full">
                    {children}
                </div>

            </div>
        </AppHeader>

    )
}

export default Sidebar
