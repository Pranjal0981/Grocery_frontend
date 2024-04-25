import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncDelProduct, fetchProductsByStore } from '../store/actions/adminAction';

const ProductStore = () => {
    const {products} = useSelector((state) => state.admin);
    console.log(products)
    const { store } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductsByStore(store));
    }, [dispatch, store]);
    const handleDelete = async (id) => {
        await dispatch(asyncDelProduct(id))
    }
    return (
        <>
            <div className="container mx-auto mt-4">
                <h1 className="text-center text-2xl font-bold mb-4">{store} Store</h1>
                
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products?.map((product) => (
                            <div key={product?._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <img src={product?.image?.url} alt={product?.ProductName} className="w-full h-64 object-cover object-center" />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold">{product?.ProductName}</h2>
                                    <p className="text-gray-600">{product?.category}</p>
                                    <p className="text-gray-700">{product?.description}</p>
                                    <p className="text-gray-800 font-bold mt-2">Price: Rs {product?.price}</p>
                                    <p className="text-gray-800 font-bold mt-2">Stock: {product?.stock}</p>
                                    <p className="text-gray-800 font-bold mt-2">Product Code: {product?.ProductCode}</p>
                                    <button onClick={() => handleDelete(product?._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2">Delete</button>

                                </div>
                            </div>
                        ))}
                    </div>
                
            </div>
        </>
    );
}

export default ProductStore;