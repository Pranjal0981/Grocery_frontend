import React from 'react'
import Product from './Product'

function ProductList() {

  const ProductsData = [
    {
        category: 'Uncategorized',
        name: 'Vim Dishwash Bar - Lemon',
        store: 'Sold by rgsgrocery minal residency',
        originalPrice: '₹5.00',
        offerPrice: '₹4.50',
        imgSrc: 'https://rgsgrocery.com/wp-content/uploads/2024/04/Vim-Dishwash-Bar-Lemon-300x300.webp'
    },
    {
        category: 'Body & Skin Care',
        name: 'LIFEBUOY Total 10 Active Silver Formula',
        store: 'Sold by rgsgrocery minal residency',
        originalPrice: '₹195.00',
        offerPrice: '₹170.00',
        imgSrc: 'https://rgsgrocery.com/wp-content/uploads/2024/04/LIFEBUOY-Total-10-Active-Silver-Formula.webp'
    },
    {
        category: 'Body & Skin Care',
        name: 'Lux Skin Rose',
        store: 'Sold by rgsgrocery minal residency',
        originalPrice: '₹120.00',
        offerPrice: '₹108.00',
        imgSrc: 'https://rgsgrocery.com/wp-content/uploads/2024/04/Lux-Skin-Rose-300x300.jpg'
    },
    {
        category: 'Body & Skin Care',
        name: 'Lux Skin Rose',
        store: 'Sold by rgsgrocery minal residency',
        originalPrice: '₹140.00',
        offerPrice: '₹133.00',
        imgSrc: 'https://rgsgrocery.com/wp-content/uploads/2024/04/Lux-Soft-Touch-Soap-300x300.jpg'
    },
    {
        category: 'Body & Skin Care',
        name: 'Godrej No.1 Soap',
        store: 'Sold by rgsgrocery minal residency',
        originalPrice: '₹120.00',
        offerPrice: '₹114.00',
        imgSrc: 'https://rgsgrocery.com/wp-content/uploads/2024/04/Godrej-No.1-Soap.webp'
    },
    {
        category: 'Dettol Original Germ Protection Bathing Soap',
        name: 'Lux Skin Rose',
        store: 'Sold by rgsgrocery minal residency',
        originalPrice: '₹165.00',
        offerPrice: '₹155.00',
        imgSrc: 'https://rgsgrocery.com/wp-content/uploads/2024/04/Dettol-Original-Germ-Protection-Bathing-Soap-300x300.jpg'
    },
    {
        category: 'Uncategorized',
        name: 'RIN SOAP',
        store: 'Sold by rgsgrocery minal residency',
        originalPrice: '₹5.00',
        offerPrice: '₹4.50',
        imgSrc: 'https://rgsgrocery.com/wp-content/uploads/2024/04/RIN-SOAP.jpg'
    },
    {
        category: 'Uncategorized',
        name: 'Tide Bar Soap',
        store: 'Sold by rgsgrocery minal residency',
        originalPrice: '₹10.00',
        offerPrice: '₹9.00',
        imgSrc: 'https://rgsgrocery.com/wp-content/uploads/2024/04/Tide-Bar.webp'
    },
    {
        category: 'Snacks & Packaged Food',
        name: 'Britannia Jimjam',
        store: 'Sold by rgsgrocery minal residency',
        originalPrice: '₹35.00',
        offerPrice: '₹27.00',
        imgSrc: 'https://rgsgrocery.com/wp-content/uploads/2024/04/Britannia-jimjam-300x300.jpg'
    },
    {
        category: 'Atta, Rice & Dal',
        name: 'Aashirvaad Superior Atta',
        store: 'Sold by rgsgrocery minal residency',
        originalPrice: '₹294.00',
        offerPrice: '₹238.00',
        imgSrc: 'https://rgsgrocery.com/wp-content/uploads/2024/04/Aashirvaad-Superior-MP-Atta-300x300.jpg'
    },

  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 m-2 gap-2">
        {ProductsData.map((product, index) => (
            <Product key={index} product={product} />
        ))}
    </div>
  )
}

export default ProductList
