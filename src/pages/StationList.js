import React, { useEffect, useState } from 'react'
import AppSearch from '../components/AppSearch';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import AppTable from '../components/Table/AppTable';
import Api from '../utils/Api';

const SearchBasedKey = [
    'id',
    'stationName',
]

const TableTH = [
    "Sr No.",
    "St Id",
    "St Name",
    "Delete"
]

const TableTR = [
    "1",
    "id",
    "stationName",
    "Delete"
]

const PaginationDataLimit = 2

const StationList = () => {
    const [stationList, setstationList] = useState([])
    const [searchList, setSearchList] = useState([]);
    const apiEndPoint = '/stations';
    const getStationData = async () => {
        const data = await Api.get(apiEndPoint);
        setstationList(data?.data)
        setSearchList(data?.data)
    }

    const handleRefresh = () => {
        getStationData()
    }

    useEffect(() => {
        getStationData();
    }, [])
    return (
        <Sidebar pageTitle="Station List" searchComp={
            <AppSearch list={stationList} updateState={setSearchList} searchKeys={SearchBasedKey} pageTitle={'Station List'} />
        }>
            <div class="flex items-center justify-center">
                <div class="container">

                    <Pagination data={searchList} dataLimit={PaginationDataLimit} RenderComponent={AppTable} apiEndPoint={apiEndPoint} handleRefresh={handleRefresh} trArray={TableTR} thArray={TableTH} />
                </div>
            </div>
        </Sidebar>
    )
}

export default StationList
