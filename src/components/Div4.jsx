import React, { useEffect } from "react";
import { gsap,ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Div4 = () => {
  useEffect(() => {
    // Fade-in effect for images
    gsap.from(".pleasure-left img", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".pleasure-left",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    // Staggered animation for text content
    gsap.from(".pleasure-right > *", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".pleasure-right",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div className="pleasure caveat w-full h-[55%] mt-[20vh] flex flex-col md:flex-row">
      <div className="pleasure-left w-full md:w-[50%] h-full p-10 flex flex-col md:flex-row gap-[20px]">
        <img src="https://plus.unsplash.com/premium_photo-1664202219210-abf6ae3bdf04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvY2VyeXxlbnwwfHwwfHx8MA%3D%3D" className="w-full md:w-[14vw] h-[50vh] md:h-auto rounded-3xl" alt="" />
        <img src="https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3JvY2VyeXxlbnwwfHwwfHx8MA%3D%3D" className="w-full md:w-[14vw] h-[50vh] md:h-auto rounded-3xl translate-y-[-30%]" alt="" />
        <img src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdyb2Nlcnl8ZW58MHx8MHx8fDA%3D" className="w-full md:w-[14vw] h-[50vh] md:h-auto rounded-3xl" alt="" />
      </div>
      <div className="pleasure-right w-full md:w-[50%] p-5">
        <h1 className="text-4xl text-red-300">Welcome to RGS Grocery</h1>
        <h2 className="text-6xl font-bold">Discover Convenience with RGS Grocery</h2>
        <p className="mt-8 text-lg">
          At RGS Grocery, we strive to make your life easier by providing a seamless shopping experience.
        </p>
      </div>
    </div>
  );
};

export default Div4;