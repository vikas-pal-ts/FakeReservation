import React, { useCallback, useState } from "react";
import { LeftArrowSvg, RightArrowSvg } from "../svg";

const Pagination = ({ data, RenderComponent, pageLimit, dataLimit, thArray, trArray, handleRefresh, apiEndPoint }) => {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    const goToNextPage = useCallback(() => {
        setCurrentPage((page) => page + 1);
    }, [])

    const goToPreviousPage = useCallback(() => {
        setCurrentPage((page) => page - 1);
    }, [])

    const changePage = useCallback((event) => {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }, [])

    const getPaginatedData = useCallback(() => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    }, [currentPage, dataLimit, data]);

    const getPaginationGroup = useCallback(() => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        const returnData = new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
        console.log(returnData, 'returnData')
        return returnData;
    }, [currentPage, pageLimit]);

    return (
        <div>
            <div className="dataContainer">
                <RenderComponent data={getPaginatedData()} thArray={thArray} trArray={trArray} handleRefresh={handleRefresh} apiEndPoint={apiEndPoint} />
            </div>
            <div className="pagination flex flex-row justify-end">
                {currentPage !== 1 && (
                    <button
                        onClick={goToPreviousPage}
                        className={`prev ${currentPage === 1 ? 'disabled' : ''} px-5 py-1 rounded-full mr-1`}
                    >
                        {LeftArrowSvg}
                    </button>
                )}

                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'bg-blue-700 text-white' : null} ring-2 ring-blue-700 text-black w-12 px-5 py-1 rounded-full mr-3`}
                    >
                        <span>{item}</span>
                    </button>
                ))}
                {currentPage !== pageLimit && (
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === pageLimit}
                        className={`next ${currentPage === pageLimit ? 'disabled' : ''} px-5 py-1 rounded-full ml-1`}
                    >
                        {RightArrowSvg}
                    </button>
                )}

            </div>
        </div>
    );
}

export default (Pagination)