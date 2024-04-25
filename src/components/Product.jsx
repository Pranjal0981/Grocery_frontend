
import React, { useEffect, useState } from 'react'
import { IoBagHandle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchProducts } from '../store/actions/productAction';
import Pagination from './Pagination';



export const Product = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // Manage current page locally

  useEffect(() => {
    // Dispatch action to fetch products for initial page
    dispatch(asyncFetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(page)
    dispatch(asyncFetchProducts(page));
  };

  return (
    <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
  );
};

export default Product
