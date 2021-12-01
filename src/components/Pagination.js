import { useState } from "react";

export default function Pagination({ data, RenderComponent, pageLimit, dataLimit, thArray, trArray, handleRefresh, apiEndPoint }) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    const goToNextPage = () => {
        setCurrentPage((page) => page + 1);
    }

    const goToPreviousPage = () => {
        setCurrentPage((page) => page - 1);
    }

    const changePage = (event) => {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div>
            <div className="dataContainer">
                <RenderComponent data={getPaginatedData()} thArray={thArray} trArray={trArray} handleRefresh={handleRefresh} apiEndPoint={apiEndPoint} />
            </div>
            <div className="pagination">
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''} bg-yellow-100 w-24 px-5 py-1 rounded-full mr-1`}
                >
                    prev
                </button>
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null} bg-gray-500 text-white w-12 px-5 py-1 rounded-full mr-1`}
                    >
                        <span>{item}</span>
                    </button>
                ))}
                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === pages ? 'disabled' : ''} bg-yellow-100 w-24 px-5 py-1 rounded-full ml-1`}
                >
                    next
                </button>
            </div>
        </div>
    );
}