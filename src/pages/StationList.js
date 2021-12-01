import React, { useEffect, useState } from 'react'
import AppSearch from '../components/AppSearch';
import DeleteButton from '../components/DeleteButton';
import Sidebar from '../components/Sidebar';
import Api from '../utils/Api';

const SearchBasedKey = [
    'id',
    'stationName',
]

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
        <Sidebar>
            <div class="flex items-center justify-center">
                <div class="container">
                    <AppSearch list={stationList} updateState={setSearchList} searchKeys={SearchBasedKey} />
                    <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                        <thead class="text-white">


                            {searchList.map((item) => {
                                return (
                                    <tr key={item?.id} class="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none lg:mb-2 mb-4">
                                        <th class="p-3 text-left text-black lg:bg-white bg-gray-300 h-16">Sr no.</th>
                                        <th class="p-3 text-left text-black lg:bg-white bg-gray-300">St Id</th>
                                        <th class="p-3 text-left text-black lg:bg-white bg-gray-300">St Name</th>
                                        <th class="p-3 text-left text-black lg:bg-white bg-gray-300 h-16">Delete</th>
                                    </tr>
                                )
                            })}



                        </thead>
                        <tbody class="flex-1 sm:flex-none">
                            {searchList.map((item, index) => {
                                return (<tr key={item?.id} class="flex flex-col flex-no wrap sm:table-row lg:mb-2 mb-4">
                                    <td class="border-grey-light border hover:bg-gray-100 p-3 h-16">{index + 1}</td>
                                    <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{item?.id}</td>
                                    <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{item?.stationName}</td>
                                    <td class="border-grey-light border hover:bg-gray-100 p-3 h-16"><DeleteButton id={item?.id} title={'Delete'} apiEndPoint={apiEndPoint} callback={handleRefresh} /></td>
                                </tr>)
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </Sidebar>
    )
}

export default StationList
