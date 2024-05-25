import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">RGS Grocery Terms and Conditions</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">Welcome to RGS Grocery! These Terms and Conditions govern your use of our website and the services provided by RGS Grocery. By accessing or using our website, you agree to be bound by these Terms and Conditions. Please read them carefully.</p>
                <p className="text-gray-700">By accessing or using RGS Grocery, you agree to comply with and be bound by these Terms and Conditions, our Privacy Policy, and any other guidelines or rules applicable to our services.</p>
                <p className="text-gray-700">RGS Grocery reserves the right to modify these Terms and Conditions at any time. We will notify you of any changes by posting the revised terms on our website. Your continued use of our services after the changes are posted constitutes your acceptance of the modified terms.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">2. Account Registration</h2>
                <p className="text-gray-700 mb-4">To use our services, you must be at least 18 years old and capable of forming a legally binding contract. By using RGS Grocery, you represent and warrant that you meet these eligibility criteria. If you are under 18 years old, your parents or guardians will be responsible for your actions.</p>
                <p className="text-gray-700 mb-4">To place an order or access certain features of our website, you may be required to create an account. You agree to provide accurate, complete, and current information during the registration process and to update this information as necessary to keep it accurate and complete.</p>
                <p className="text-gray-700">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use or suspected unauthorized use of your account.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">3. Orders and Payments</h2>
                <p className="text-gray-700 mb-4">By placing an order through RGS Grocery, you agree to pay the total amount specified in your order, including any applicable taxes and delivery fees. All orders are subject to acceptance and availability.</p>
                <p className="text-gray-700 mb-4">We accept various payment methods, including credit/debit cards, online banking, and digital wallets. Payment must be made at the time of placing the order.</p>
                <p className="text-gray-700 mb-4">Once your order is placed, you will receive an order confirmation via email. This confirmation does not signify our acceptance of your order but merely acknowledges receipt of your order.</p>
                <p className="text-gray-700">RGS Grocery reserves the right to accept or reject your order for any reason, including but not limited to product availability, errors in product or pricing information, or suspected fraudulent activity.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">4. Delivery</h2>
                <p className="text-gray-700 mb-4">We aim to deliver your order within 24 to 48 hours of order confirmation. Delivery times are estimates and may vary due to factors beyond our control.</p>
                <p className="text-gray-700 mb-4">Delivery fees, if applicable, will be displayed at the time of checkout.</p>
                <p className="text-gray-700">If there are any issues with your delivery, please contact our customer service team immediately. We are not responsible for delays or failures in delivery resulting from incorrect address information provided by you.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">5. Exchanges</h2>
                <p className="text-gray-700 mb-4">We do not accept returns of products. However, we offer exchanges for certain products within 24 to 48 hours of delivery, provided the products are unopened, unused, and in their original packaging. Perishable goods and personal care items are non-exchangeable.</p>
                <p className="text-gray-700">If you wish to exchange a product, please contact our customer service team with your order details and the reason for the exchange. We will provide instructions on how to proceed with the exchange.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">6. Product Information</h2>
                <p className="text-gray-700 mb-4">We strive to provide accurate product descriptions and images on our website. However, we do not warrant that the product descriptions or other content on our website are accurate, complete, reliable, current, or error-free.</p>
                <p className="text-gray-700">Product availability is subject to change without notice. We reserve the right to limit the quantities of any products or services that we offer.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">7. Intellectual Property</h2>
                <p className="text-gray-700 mb-4">All content on the RGS Grocery website, including text, graphics, logos, images, and software, is the property of RGS Grocery or its content suppliers and is protected by intellectual property laws.</p>
                <p className="text-gray-700">You may not use, reproduce, distribute, or create derivative works of any content from our website without our express written permission.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">RGS Grocery provides its services on an "as is" and "as available" basis. We do not warrant that our services will be uninterrupted, error-free, or free from viruses or other harmful components.</p>
                <p className="text-gray-700">To the maximum extent permitted by law, RGS Grocery will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of our services.</p>
            </section>


            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">9. Contact Us</h2>
                <p className="text-gray-700">If you have any questions or concerns about these Terms and Conditions, please contact us at:</p>
                <p className="text-gray-700">Email: <a href="mailto:inforgsgrocery@gmail.com" className="text-blue-600 hover:underline">inforgsgrocery@gmail.com</a></p>
                <p className="text-gray-700">Phone: 9244321195</p>
            </section>
        </div>
    );
};

export default TermsAndConditions;
