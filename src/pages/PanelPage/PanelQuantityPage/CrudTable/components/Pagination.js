import React from "react";
import {ArrowBack, ArrowForward} from "@mui/icons-material";

const Pagination = ({usersPerPage, totalUsers, paginate, setCurrentPage}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    function handleLeftArrow() {
        setCurrentPage((prevPage) => {
            if (prevPage < pageNumbers.length) {
                return prevPage + 1
            } else {
                return prevPage;
            }
        })
    }
    function handleRightArrow() {
        setCurrentPage((prevPage) => {
            if (prevPage > 1) {
                return prevPage -1
            } else {
                return prevPage;
            }
        })
    }

    return (
        <nav>
            <ul className="pagination">
                <i className={'bx bx-arrow-from-left'} onClick={handleRightArrow}></i>
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="src/pages/PanelPage/PanelQuantityPage/CrudTable/components/Pagination#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
                <i className={'bx bx-arrow-from-right'} onClick={handleLeftArrow}></i>
            </ul>
        </nav>
    );
};

export default Pagination;
