import React, { useContext, useEffect, useState } from 'react'
import AppSearch from '../components/AppSearch';
import DeleteButton from '../components/DeleteButton';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import AppTable from '../components/Table/AppTable';
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

const TableTH = [
    "Sr No.",
    "Booking Id ",
    "Source",
    "Destination",
    "Station Name",
    "Journey Date",
    "User Name",
    "Delete",
]

const TableTR = [
    "1",
    "id",
    "source",
    "destination",
    "stationName",
    "journeyDate",
    "userName",
    "Delete"
]

const PaginationDataLimit = 2

const Dashboard = () => {
    const [bookingList, setbookingList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [pageLimit, setPageLimit] = useState(5);
    const apiEndPoint = '/booking';
    const { getUser } = useContext(AppContext)
    const currentUserIsAdmin = getUser()?.role === 'admin';

    const getStationData = async () => {
        const url = currentUserIsAdmin ? apiEndPoint : `${apiEndPoint}?userId=${getUser().id}`
        const data = await Api.get(url);
        setbookingList(data?.data)
        setSearchList(data?.data)
        setPageLimit(data?.data.length / PaginationDataLimit)
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
                    <Pagination data={searchList} pageLimit={pageLimit} dataLimit={PaginationDataLimit} RenderComponent={AppTable} apiEndPoint={apiEndPoint} handleRefresh={handleRefresh} trArray={TableTR} thArray={TableTH} />
                </div>
            </div>
        </Sidebar>
    )
}

export default Dashboard
