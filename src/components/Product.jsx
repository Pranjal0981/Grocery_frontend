
import React, { useEffect, useState } from 'react'
import { IoBagHandle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchProducts } from '../store/actions/productAction';
import Pagination from './Pagination';

export const Product = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1); // Manage current page locally
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Dispatch action to fetch products for initial page and preferred store
    dispatch(asyncFetchProducts(currentPage, user?.PreferredStore))
 
  }, [dispatch, currentPage, user?.PreferredStore]); // Include loadedProducts in dependency array

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    // Dispatch action to fetch products for the selected page and preferred store
    setLoading(true);
    try {
      const data = await dispatch(asyncFetchProducts(page, user?.PreferredStore));
      setLoadedProducts(data.products); // Set new products for the selected page
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div>
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};


export default Product
