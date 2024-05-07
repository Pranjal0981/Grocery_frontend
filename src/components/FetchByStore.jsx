import Pagination from "./Pagination";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom"
import { asyncFetchStorePro } from "../store/actions/productAction";
const Storeproduct = () => {
    const { store } = useParams();
    console.log(store)
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncFetchStorePro(store))
    }, [store])
    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(page)
        dispatch(asyncFetchStorePro(store,page));
    };
    return <>
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </>
}
export default Storeproduct