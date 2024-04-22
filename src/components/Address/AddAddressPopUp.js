import React, { useState } from "react";
import style from "./AddAddressPopUp.module.scss"

const AddAddressPopUp = ( props ) => {
    const [formData, setFormData] = useState({
        country: '',
        full_name: '',
        mobile: '',
        pincode: '',
        address_line1: '',
        address_line2: '',
        landmark: '',
        city: '',
        state: ''
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
        props.submitHandler(formData);
    };

    return (
        <div className={style.popup}>
            <div className={style.popupInner}>
                <div className={style.header}>
                    <div className={style.headingNCloseIcon}>
                        <p>Enter a new delivery address</p>
                        <span onClick={props.closePopup}>X</span>
                    </div>
                    <hr />
                    <h2>Add a new address</h2>
                </div>
                <form className={style.addressForm} onSubmit={handleSubmit}>
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="full_name">Full Name</label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="alternate_mobile">Alternate Mobile Number</label>
                    <input
                        type="text"
                        id="alternate_mobile"
                        name="alternate_mobile"
                        value={formData.alternate_mobile}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="pincode">Pincode</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="address_line1">Address Line 1</label>
                    <input
                        type="text"
                        id="address_line1"
                        name="address_line1"
                        value={formData.address_line1}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="address_line2">Address Line 2</label>
                    <input
                        type="text"
                        id="address_line2"
                        name="address_line2"
                        value={formData.address_line2}
                        onChange={handleChange}
                    />
                    <label htmlFor="landmark">Landmark</label>
                    <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                    />

                    <label htmlFor="city">Town/City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" onClick={handleSubmit}>Use this address</button>
                </form>
            </div>
        </div>
    )
}

export default AddAddressPopUp;