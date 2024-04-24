import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import bookingStyle from "./Booking.module.scss";
import Address from "../Address/Address";
import Payment from "../Payments/Payment";
import logo from "../../assets/amazon-in-logo.png";
import secureIcon from "../../assets/secure-icon.png";
import { getData, postData, deleteData } from "../../services/actions";
import { discountedPrice } from "../../components/Helpers";
import Footer from "../Footer/Footer";

const Booking = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

    const handleAddressOptionChange = (address_id) => {
        console.log(address_id);
        setSelectedAddress(address_id);
    }

    const handlePaymentOptionChange = (payment_method) => {
        console.log(payment_method);
        setSelectedPaymentMethod(payment_method);
    }

    const calculateTotalPrice = (response) => {
        let totalPrice = 0;
        let count = 0;
        response?.map((item) => {
            let price  = discountedPrice(item?.product?.price, item?.product?.discount);
            totalPrice += (price * item?.quantity);
            count += 1;
        })
        setTotalPrice(totalPrice);
        setTotalItems(count);
    }

    const handleOrderPlaceButton = () => {
        let carItems = []
        products?.map((item) => {
            let price  = discountedPrice(item?.product?.price, item?.product?.discount);

            carItems.push({
                product_id: item?.product?.id,
                quantity: item?.quantity,
                price: price * item?.quantity,
                size: item?.size,
                color: item?.color
            })
        })
        console.log('cartitems: ', carItems)

        let data = {
            user_id: user?.id,
            total_amount: totalPrice,
            address_id: selectedAddress,
            payment_method: selectedPaymentMethod,
            items: carItems
        }
        console.log('data: ', data)

        postData("/order", data).then((response) => {
            console.log(response)
            deleteData("/cart/bulk-delete/" + user?.id).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            });
            window.location.href = "/order";
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getData("/cart/" + user?.id).then((response) => {
            console.log(response);
            setProducts(response);
            calculateTotalPrice(response);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    
    return (
        <>
            <div className={bookingStyle.bookingContainer}>
                <div className={bookingStyle.bookingHeader}>
                    <img src={logo} alt="Amazon logo" className={bookingStyle.logo} />
                    <h3>Check Out</h3>
                    <img src={secureIcon} alt="secure-icon" className={bookingStyle.secureIcon} />
                </div>

                <div className={bookingStyle.bookingBody}>
                    <div className={bookingStyle.bookingBodyLeft}>
                        <div>
                            <h2>Delivery Address</h2>
                            <Address handleAddressOptionChange={handleAddressOptionChange}/>
                        </div>

                        <div>
                            <h2>Select a payment method</h2>
                            <Payment handlePaymentOptionChange={handlePaymentOptionChange}/>
                        </div>
                        <button className={bookingStyle.bookingButton} onClick={handleOrderPlaceButton}>Order Place</button>
                    </div>

                    <div className={bookingStyle.bookingBodyRight}>
                        <div className={bookingStyle.bookingBodyRightTop}>
                            <button className={bookingStyle.bookingButton + " " + bookingStyle.bookingButtonLarge} onClick={handleOrderPlaceButton}>Order Place</button>
                            <p>Choose a payment method to continue checking out. You will still have a chance to review and edit your order before it is final.</p>
                        </div>
                        <hr />
                        <div className={bookingStyle.bookingBodyRightMiddle}>
                            <h3>Order Summary</h3>
                            <div className={bookingStyle.orderSummary}>
                                <p>Items:</p>
                                <p>Rs. {totalPrice}</p>
                            </div>
                            <div className={bookingStyle.orderSummary}>
                                <p>Delivery:</p>
                                <p>Rs. 160</p>
                            </div>
                            <div className={bookingStyle.orderSummary}>
                                <p>Total:</p>
                                <p>Rs. {totalPrice + 160}</p>
                            </div>
                            <div className={bookingStyle.orderSummary}>
                                <p>Promotion Applied:</p>
                                <p>-Rs. 160</p>
                            </div>
                            <hr />
                            <div className={bookingStyle.orderSummary}>
                                <strong>Order Total:</strong>
                                <strong>Rs. {totalPrice}</strong>
                            </div>
                            <hr />
                        </div>

                        <div className={bookingStyle.bookingBodyRightBottom}>
                            <a href="#">How are delivery costs calculated?</a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Booking;