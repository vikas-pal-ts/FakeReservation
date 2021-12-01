import React, { useContext, useEffect, useState } from 'react'
import AppSearch from '../components/AppSearch';
import DeleteButton from '../components/DeleteButton';
import Sidebar from '../components/Sidebar';
import '../components/Table/AppTable.css'
import { AppContext } from '../context/AppContext';
import Api from '../utils/Api';

const SearchBasedKey = [
    'source',
    'id',
    'journeyDate',
    'source',
    'stationName',
    'userName'
]

const Dashboard = () => {
    const [bookingList, setbookingList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const apiEndPoint = '/booking';
    const { getUser } = useContext(AppContext)
    const currentUserIsAdmin = getUser()?.role === 'admin';

    const getStationData = async () => {
        const url = currentUserIsAdmin ? apiEndPoint : `${apiEndPoint}?userId=${getUser().id}`
        const data = await Api.get(url);
        setbookingList(data?.data)
        setSearchList(data?.data)
    }

    const handleRefresh = () => {
        getStationData()
    }

    useEffect(() => {
        getStationData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Sidebar>
            <div className="flex items-center justify-center">
                <div className="container">
                    <AppSearch list={bookingList} updateState={setSearchList} searchKeys={SearchBasedKey} />
                    <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                        <thead className="text-white">
                            {searchList.map((_, index) => {
                                return (
                                    <tr key={index} className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-4 sm:mb-0">
                                        <th className="p-3 text-left text-black lg:bg-white bg-gray-300">Sr no.</th>
                                        <th className="p-3 text-left text-black lg:bg-white bg-gray-300 truncate">Booking Id</th>
                                        <th className="p-3 text-left text-black lg:bg-white bg-gray-300" >Source</th>
                                        <th className="p-3 text-left text-black lg:bg-white bg-gray-300" >Destination</th>
                                        <th className="p-3 text-left text-black lg:bg-white bg-gray-300 truncate" >Station Name</th>
                                        <th className="p-3 text-left text-black lg:bg-white bg-gray-300 truncate" >Journey Date</th>
                                        <th className="p-3 text-left text-black lg:bg-white bg-gray-300" >User Name</th>
                                        <th className="p-3 text-left text-black lg:bg-white bg-gray-300" >Delete</th>
                                    </tr>
                                )
                            })}



                        </thead>
                        <tbody className="flex-1 sm:flex-none">
                            {searchList.map((item, index) => {
                                return (<tr key={index} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                                    <td className="border-grey-light border hover:bg-gray-100 p-3">{index + 1}</td>
                                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">{item?.id}</td>
                                    <td className="border-grey-light border hover:bg-gray-100 p-3 lg:truncate">{item?.source}</td>
                                    <td className="border-grey-light border hover:bg-gray-100 p-3">{item?.destination}</td>
                                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">{item?.stationName}</td>
                                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">{item?.journeyDate}</td>
                                    <td className="border-grey-light border hover:bg-gray-100 p-3 lg:truncate">{item?.userName}</td>
                                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate"><DeleteButton id={item?.id} title={'Delete'} apiEndPoint={apiEndPoint} callback={handleRefresh} /></td>
                                </tr>)
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </Sidebar>
    )
}

export default Dashboard
