import { useDispatch } from "react-redux";
import Pagination from "./Pagination"
import { useState } from "react";
import { asyncSearch } from "../store/actions/productAction";

const SearchResult=()=>{
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1); // Manage current page locally

    const handlePageChange = async(page) => {
        setCurrentPage(page);
        console.log(page)
        await dispatch(asyncSearch());
    };

    return<>
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </>
}
export default SearchResult