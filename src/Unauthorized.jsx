import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Unauthorized = () => {
    useEffect(() => {
        gsap.fromTo('.error-code', { scale: 0 }, { scale: 1, duration: 1, ease: 'elastic.out(1, 0.3)' });
        gsap.fromTo('.error-message', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5 });
        gsap.fromTo('.error-description', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 1 });
        gsap.fromTo('.back-button', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 1.5 });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-screen bg-white text-gray-900 p-4"
        >
            <div className="text-center">
                <motion.div
                    className="error-code text-6xl font-bold mb-4 text-red-500"
                >
                    401
                </motion.div>
                <motion.div
                    className="error-message text-2xl font-semibold mb-4"
                >
                    Access Denied
                </motion.div>
                <motion.div
                    className="error-description text-lg mb-4"
                >
                    Your session has expired or you don't have the required permissions.
                </motion.div>
                <motion.div
                    className="error-description text-lg mb-4"
                >
                    Please log in again to continue.
                </motion.div>
                <motion.button
                    className="back-button mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow"
                    onClick={() => window.location.href = '/'}
                >
Go to Home
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Unauthorized;
