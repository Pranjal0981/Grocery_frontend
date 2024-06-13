import React from 'react';
import { motion } from 'framer-motion';

export default function Widget() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
            <motion.div
                className="relative w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="relative z-10 flex flex-col items-center p-8"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-bold opacity-50"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        404
                    </motion.h1>
                    <motion.p
                        className="text-2xl md:text-4xl font-bold mt-4 text-center"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        Oops! Page not found.
                    </motion.p>
                    <motion.a
                        href="/"
                        className="mt-8 bg-black text-white py-2 px-6 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                    >
                        Go back home
                    </motion.a>
                </motion.div>
            </motion.div>
        </div>
    )
}
