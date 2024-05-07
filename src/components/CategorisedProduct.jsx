import  Pagination  from "./Pagination";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom"
import { asyncFetchCategorisedPro } from "../store/actions/productAction";
const CategoryProduct=()=>{
    const  {category}  = useParams();
    const [currentPage, setCurrentPage] = useState(1); 
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(asyncFetchCategorisedPro(category))
    },[category])
    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(page)
        dispatch(asyncFetchCategorisedPro(category,page));
    };
    return<>
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </>
}
export default CategoryProduct