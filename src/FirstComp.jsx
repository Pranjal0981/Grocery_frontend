import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion'; // Import motion and useAnimation from Framer Motion
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from 'gsap/TextPlugin'; // Import TextPlugin for advanced text animation
import CategoryProduct from './components/CategorisedProduct';
import Product from './components/Product';

gsap.registerPlugin(ScrollTrigger, TextPlugin); // Register ScrollTrigger and TextPlugin

const FirstComp = () => {
    useEffect(() => {
        const texts = [
            { text: "Shop Now", color: "#4CAF50" },
            { text: "Discover", color: "#2196F3" },
            { text: "Amazing Deals", color: "#FFC107" },
            { text: "Limited Offers", color: "#FF5722" }
        ];
        const finalText = "Top Selling Products";
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

        tl.to('#text', {
            duration: 1,
            text: texts[0].text,
            fill: texts[0].color,
            ease: 'power2.out',
            onComplete: function () {
                gsap.to('#text', { duration: 1, text: finalText, fill: "#F44336", ease: 'power2.out', delay: 1 });
            }
        })
            .to('#text', { duration: 0.5, text: texts[1].text, fill: texts[1].color, ease: 'power2.out' })
            .to('#text', { duration: 0.5, text: texts[2].text, fill: texts[2].color, ease: 'power2.out' })
            .to('#text', { duration: 0.5, text: texts[3].text, fill: texts[3].color, ease: 'power2.out' });

        gsap.fromTo(
            "#image",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: "#image",
                    start: "top 80%",
                    end: "bottom 60%",
                    scrub: true
                }
            }
        );
    }, []);

    return (
        <>
            <div className="w-full h-auto flex flex-col justify-center items-center">
                <div className='border-2 w-[90vw] shadow-lg m-4'>
                    <Link to="https://reeplayerindia.com/">
                        <motion.img id="image" src="/Homelogo.png" alt="Home Logo"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        />
                    </Link>
                </div>

                <svg viewBox="0 0 1320 300" className="w-full">
                    <text id="text" x="50%" y="50%" dy=".35em" textAnchor="middle" style={{ fontSize: "100px", fill: "#4CAF50" }}>
                        Top Selling Products
                    </text>
                </svg>
                <Product />
            </div>
        </>
    );
};

export default FirstComp;
