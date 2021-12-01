import React from 'react'

const AppTable = ({ listData }) => {
    return (
        <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead class="text-white">
                <tr class="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                    <th class="p-3 text-left text-black lg:bg-white bg-gray-300">Sr no.</th>
                    <th class="p-3 text-left text-black lg:bg-white bg-gray-300">Booking Id</th>
                    <th class="p-3 text-left text-black lg:bg-white bg-gray-300" width="110px">Source</th>
                    <th class="p-3 text-left text-black lg:bg-white bg-gray-300" width="110px">Destination</th>
                    <th class="p-3 text-left text-black lg:bg-white bg-gray-300" width="110px">StationId</th>
                    <th class="p-3 text-left text-black lg:bg-white bg-gray-300" width="110px">User Id</th>
                    <th class="p-3 text-left text-black lg:bg-white bg-gray-300" width="110px">Action</th>
                    <th class="p-3 text-left text-black lg:bg-white bg-gray-300" width="110px">Action</th>
                </tr>

            </thead>
            <tbody class="flex-1 sm:flex-none">
                {listData.length && listData.map((item, index) => {
                    return (<tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                        <td class="border-grey-light border hover:bg-gray-100 p-3">{index + 1}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{item?.id}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{item?.source}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3">{item?.destination}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{item?.stationName}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{item?.userName}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3 truncate text-green-400 hover:text-green-600">View</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
                    </tr>)
                })}

            </tbody>
        </table>
    )
}

export default AppTable
