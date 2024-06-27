import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <motion.h1
                    className="text-4xl font-serif font-bold text-center mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    About Us
                </motion.h1>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <motion.div
                        className="md:w-1/2 md:pr-8 mb-8 md:mb-0"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="/images/img7.jpeg" alt="About Us" className="rounded-lg shadow-lg w-full" />
                    </motion.div>
                    <motion.div
                        className="md:w-1/2 md:pl-8"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-lg mb-4 leading-relaxed">
                            Welcome to RGS Grocery, your go-to destination for all your grocery needs.
                        </p>
                        <p className="text-lg mb-4 leading-relaxed">
                            At RGS Grocery, we are committed to providing our customers with
                            the freshest and highest quality products at competitive prices.
                        </p>
                        <p className="text-lg mb-4 leading-relaxed">
                            Our dedicated team works tirelessly to ensure that your shopping
                            experience with us is convenient, efficient, and enjoyable.
                        </p>
                        <p className="text-lg mb-4 leading-relaxed">
                            Whether you're looking for fresh produce, pantry staples, or specialty
                            items, you'll find everything you need and more at RGS Grocery.
                        </p>
                        <p className="text-lg mb-4 leading-relaxed">
                            Thank you for choosing RGS Grocery. We appreciate your support
                            and look forward to serving you!
                        </p>
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-md mt-8"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
                            <p className="text-lg mb-2 leading-relaxed">
                                <strong>Minimum Order:</strong> Rs 100
                            </p>
                            <p className="text-lg mb-2 leading-relaxed">
                                <strong>Delivery Fee:</strong> Orders below Rs 500 incur a delivery fee.
                            </p>
                            <p className="text-lg leading-relaxed">
                                <strong>Free Delivery:</strong> Orders above Rs 500 qualify for free delivery.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default About;
