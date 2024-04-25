import React, { useEffect } from "react";
import { gsap, ScrollTrigger } from "gsap/all";
import { FaPen, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Div3 = () => {
    useEffect(() => {
        gsap.from(".card1, .card2, .card3, .card4", {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".city-name",
                start: "top center",
                end: "bottom center",
                scrub: 1,
            },
        });

        gsap.from(".lower", {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1,
            scrollTrigger: {
                trigger: ".lower",
                start: "top center",
                end: "bottom center",
                scrub: 1,
            },
        });
    }, []);

    // Array of objects containing store names and their routes
    const stores = [
        { name: "Minal Residency, Bhopal", route: "/store/Minal Residency" },
        { name: "AwadhPuri, Bhopal", route: "/store/awadhpuri" },
        { name: "Rohit Nagar, Bhopal", route: "/store/rohit nagar" },
        { name: "Jhansi", route: "/store/jhansi" },
    ];

    return (
        <>
            <div className="city-name h-[52vh] w-full flex flex-col items-center justify-evenly">
                <h1 className="text-7xl caveat">Enter Our site for Choice</h1>
                <div className="cards w-full h-3/5 flex justify-evenly items-center">
                    {/* Render links dynamically */}
                    {stores.map((store, index) => (
                        <div key={index} className={`card${index + 1} flex flex-col w-[250px] h-full`}>
                            <div className={`card${index + 1}-img flex justify-between p-3`}>
                                <h2 className="text-teal-50 tracking-[5px]">{store.name}</h2>
                                <FaSearch className="w-[20px] h-[20px] rounded-full border-2 text-violet-50" />
                            </div>
                            <div className="card-cont flex justify-between items-center bg-neutral-100 shadow-2xl">
                                <div className="left-cont p-4">
                                    <Link to={store.route}>Explore</Link>
                                </div>
                                <div className="right-cont circle w-12 h-12 border-indigo-50 border-2 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Div3;
