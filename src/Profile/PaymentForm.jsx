import React, { useState } from 'react';
// Make sure to import your CSS file

function InitiatePaymentForm() {
    const [formData, setFormData] = useState({
        txnid: '',
        amount: '',
        first_name: '',
        email: '',
        phone: '',
        productinfo: '',
        surl: '',
        furl: '',
        udf1: '',
        udf2: '',
        udf3: '',
        udf4: '',
        udf5: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        sub_merchant_id: '',
        unique_id: '',
        split_payments: '',
        customer_authentication_id: '',
        udf6: '',
        udf7: '',
        udf8: '',
        udf9: '',
        udf10: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    return (
        <div className="grid-container">
            <header className="wrapper">
                <div className="logo">
                    <a href="../index.html">
                        <img src="/static/images/eb-logo.svg" alt="Easebuzz" />
                    </a>
                </div>
                <div className="hedding">
                    <h2><a className="highlight" href="../index.html">Back</a></h2>
                </div>
            </header>
            <script src="https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js"></script>
            <div className="form-container">
                <h2>INITIATE PAYMENT API</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="main-form">
                        <h3>Mandatory Parameters</h3>
                        <hr />
                        <div className="mandatory-data">
                            <div className="form-field">
                                <label htmlFor="txnid">Transaction ID<sup>*</sup></label>
                                <input id="txnid" className="txnid" name="txnid" value={formData.txnid} onChange={handleChange} placeholder="T31Q6JT8HB" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="amount">Amount<sup>(should be float)*</sup></label>
                                <input id="amount" className="amount" name="amount" value={formData.amount} onChange={handleChange} placeholder="125.25" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="first_name">First Name<sup>*</sup></label>
                                <input id="first_name" className="first_name" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Easebuzz Pvt. Ltd." />
                            </div>
                            <div className="form-field">
                                <label htmlFor="email">Email ID<sup>*</sup></label>
                                <input id="email" className="email" name="email" value={formData.email} onChange={handleChange} placeholder="initiate.payment@easebuzz.in" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="phone">Phone<sup>*</sup></label>
                                <input id="phone" className="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="0123456789" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="productinfo">Product Information<sup>*</sup></label>
                                <input id="productinfo" className="productinfo" name="productinfo" value={formData.productinfo} onChange={handleChange} placeholder="Apple Laptop" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="surl">Success URL<sup>*</sup></label>
                                <input id="surl" className="surl" name="surl" value={formData.surl} onChange={handleChange} placeholder="http://localhost:3000/response" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="furl">Failure URL<sup>*</sup></label>
                                <input id="furl" className="furl" name="furl" value={formData.furl} onChange={handleChange} placeholder="http://localhost:3000/response" />
                            </div>
                        </div>
                        <h3>Optional Parameters</h3>
                        <hr />
                        <div className="optional-data">
                            <div className="form-field">
                                <label htmlFor="udf1">UDF1</label>
                                <input id="udf1" className="udf1" name="udf1" value={formData.udf1} onChange={handleChange} placeholder="User description1" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="udf2">UDF2</label>
                                <input id="udf2" className="udf2" name="udf2" value={formData.udf2} onChange={handleChange} placeholder="User description2" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="udf3">UDF3</label>
                                <input id="udf3" className="udf3" name="udf3" value={formData.udf3} onChange={handleChange} placeholder="User description3" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="udf4">UDF4</label>
                                <input id="udf4" className="udf4" name="udf4" value={formData.udf4} onChange={handleChange} placeholder="User description4" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="udf5">UDF5</label>
                                <input id="udf5" className="udf5" name="udf5" value={formData.udf5} onChange={handleChange} placeholder="User description5" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="address1">Address 1</label>
                                <input id="address1" className="address1" name="address1" value={formData.address1} onChange={handleChange} placeholder="#250, Main 5th cross," />
                            </div>
                            <div className="form-field">
                                <label htmlFor="address2">Address 2</label>
                                <input id="address2" className="address2" name="address2" value={formData.address2} onChange={handleChange} placeholder="Saket nagar, Pune" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="city">City</label>
                                <input id="city" className="city" name="city" value={formData.city} onChange={handleChange} placeholder="Pune" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="state">State</label>
                                <input id="state" className="state" name="state" value={formData.state} onChange={handleChange} placeholder="Maharashtra" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="country">Country</label>
                                <input id="country" className="country" name="country" value={formData.country} onChange={handleChange} placeholder="India" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="zipcode">Zip-Code</label>
                                <input id="zipcode" className="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} placeholder="123456" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="sub_merchant_id">Sub-Merchant ID</label>
                                <input id="sub_merchant_id" className="sub_merchant_id" name="sub_merchant_id" value={formData.sub_merchant_id} onChange={handleChange} placeholder="123456" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="unique_id">Unique Id</label>
                                <input id="unique_id" className="unique_id" name="unique_id" value={formData.unique_id} onChange={handleChange} placeholder="Customer unique Id" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="split_payments">Split payment</label>
                                <input id="split_payments" className="split_payments" name="split_payments" value={formData.split_payments} onChange={handleChange} placeholder='{ "axisaccount" : 100, "hdfcaccount" : 100}' />
                            </div>
                            <div className="form-field">
                                <label htmlFor="customer_authentication_id">Customer Authentication ID</label>
                                <input id="customer_authentication_id" className="customer_authentication_id" name="customer_authentication_id" value={formData.customer_authentication_id} onChange={handleChange} placeholder="customer authentication number" />
                            </div>
                        </div>
                        <div className="btn-submit">
                            <button type="submit">SUBMIT</button>
                        </div>
                        <input id="udf6" type='hidden' className="udf6" name="udf6" value={formData.udf6} />
                        <input id="udf7" type='hidden' className="udf7" name="udf7" value={formData.udf7} />
                        <input id="udf8" type='hidden' className="udf8" name="udf8" value={formData.udf8} />
                        <input id="udf9" type='hidden' className="udf9" name="udf9" value={formData.udf9} />
                        <input id="udf10" type='hidden' className="udf10" name="udf10" value={formData.udf10} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InitiatePaymentForm;
