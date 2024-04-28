import React from 'react';

const About = () => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                        <img src="/images/img7.jpeg" alt="About Us" className="rounded-lg shadow-lg w-full" />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <p className="text-lg mb-4">
                            Welcome to RGS Grocery, your go-to destination for all your grocery needs.
                        </p>
                        <p className="text-lg mb-4">
                            At RGS Grocery, we are committed to providing our customers with
                            the freshest and highest quality products at competitive prices.
                        </p>
                        <p className="text-lg mb-4">
                            Our dedicated team works tirelessly to ensure that your shopping
                            experience with us is convenient, efficient, and enjoyable.
                        </p>
                        <p className="text-lg mb-4">
                            Whether you're looking for fresh produce, pantry staples, or specialty
                            items, you'll find everything you need and more at RGS Grocery.
                        </p>
                        <p className="text-lg">
                            Thank you for choosing RGS Grocery. We appreciate your support
                            and look forward to serving you!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
