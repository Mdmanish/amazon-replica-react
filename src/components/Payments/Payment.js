import React, { useState } from "react";
import style from "./Payment.module.scss";

const Payment = ( props ) => {
    const [selectedRadio, setSelectedRadio] = useState(null);
    const handleOptionChange = (e) => {
        console.log(e.target.value)
        setSelectedRadio(e.target.value);
        props.handlePaymentOptionChange(e.target.value);
    };

    return (
        <div className={style.paymentContainer}>
            <h1>Payment Methods</h1>
            <hr />
            <label className={selectedRadio==="card" ? style.selected: ""}>
                <input
                type="radio"
                name="card"
                value="card"
                checked={selectedRadio === "card"}
                onChange={handleOptionChange}
                />
                Credit or debit card
            </label>
            <label className={selectedRadio==="netBanking" ? style.selected: ""}>
                <input
                type="radio"
                name="netBanking"
                value="netBanking"
                checked={selectedRadio === "netBanking"}
                onChange={handleOptionChange}
                />
                Net Banking
            </label>

            <label className={selectedRadio==="upi" ? style.selected: ""}>
                <input
                type="radio"
                name="upi"
                value="upi"
                checked={selectedRadio === "upi"}
                onChange={handleOptionChange}
                />
                UPI Apps
            </label>
            <label className={selectedRadio==="emi" ? style.selected: ""}>
                <input
                type="radio"
                name="emi"
                value="emi"
                checked={selectedRadio === "emi"}
                onChange={handleOptionChange}
                />
                EMI
            </label>
            <label className={selectedRadio==="cod" ? style.selected: ""}>
                <input
                type="radio"
                name="cod"
                value="cod"
                checked={selectedRadio === "cod"}
                onChange={handleOptionChange}
                />
                Cash on Delivery/Pay on Delivery
            </label>
        </div>
    )
};

export default Payment