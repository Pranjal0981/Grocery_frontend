import Pagination from "./Pagination";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom"
import { asyncFetchProdByBrand } from "../store/actions/productAction";
const BrandProduct = () => {
    const { title } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncFetchProdByBrand(title))
    }, [title])
    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(page)
        dispatch(asyncFetchProdByBrand(page));
    };
    return <>
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </>
}
export default BrandProduct