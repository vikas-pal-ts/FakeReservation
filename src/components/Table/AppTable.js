import React from 'react'
import DeleteButton from '../DeleteButton';

const AppTable = ({ data, thArray, trArray, handleRefresh, apiEndPoint }) => {
    console.log(thArray, trArray, 'data');
    return (
        <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead class="text-white">


                {data.map((item) => {
                    return (
                        <tr key={item?.id} class="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none lg:mb-2 mb-4">
                            {thArray.map((thItem, index) => {
                                return (
                                    <th key={index} class="p-3 text-left text-black lg:bg-white bg-gray-300 h-16">{thItem}</th>
                                )
                            })}
                        </tr>
                    )
                })}



            </thead>
            <tbody class="flex-1 sm:flex-none">
                {data.map((item, index) => {
                    return (<tr key={item?.id} class="flex flex-col flex-no wrap sm:table-row lg:mb-2 mb-4">
                        {trArray.map((trItem) => {
                            if (trItem === trArray[0]) {
                                return (
                                    <td class="border-grey-light border hover:bg-gray-100 p-3 h-16">{index + 1}</td>
                                )
                            }
                            else if (trItem === trArray[trArray.length - 1]) {
                                return (
                                    <td class="border-grey-light border hover:bg-gray-100 p-3 h-16"><DeleteButton id={item?.id} title={'Delete'} apiEndPoint={apiEndPoint} callback={handleRefresh} /></td>
                                )
                            }
                            return (
                                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{item[trItem]}</td>
                            )
                        })}
                    </tr>)
                })}

            </tbody>

        </table>
    )
}

export default AppTable
