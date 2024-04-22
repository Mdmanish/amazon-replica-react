import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styles from "./Cart.module.scss";
import { Link } from "react-router-dom";
import { ItemFullDetails, CartItems } from "../Items/Items";
import Header from "../Header/Header";
import { getData, postData, deleteData } from "../../services/actions";
import jeansImg from "../../assets/jeans-img2.jpg";
import rightTickIcon from "../../assets/right-tick-icon.png";
import { discountedPrice } from "../../components/Helpers";

const Cart = () => {
    const { productId } = useParams();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [products, setProducts] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const [selectedItemImg, setSelectedItemImg] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

    const fetchRequiredData = (response) => {
        let totalPrice = 0;
        let count = 0;
        let selectedSize = "";
        let selectedColor = "";
        let selectedItemImg = "";

        response?.map((item) => {
            let price = discountedPrice(item?.product?.price, item?.product?.discount);
            totalPrice += (price * item?.quantity);
            count += 1;
            selectedSize = item?.size;
            selectedColor = item?.color;
            selectedItemImg = item?.product?.photos?.[0]?.url;
        })
        setTotalPrice(totalPrice);
        setTotalItems(count);
        setSelectedSize(selectedSize);
        setSelectedColor(selectedColor);
        setSelectedItemImg(selectedItemImg);
    }
    useEffect(() => {
        getData("http://127.0.0.1:8000/cart/" + user?.id).then((response) => {
            console.log(response);
            fetchRequiredData(response);
        }).catch((error) => {
            console.log(error);
        })

        getData("http://127.0.0.1:8000/?limit=12").then((response) => {
            console.log(response);
            setProducts(response);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <>
        <Header />
        <div className={styles.container}>
            <div className={styles.leftPart}>
                <div className={styles.productImg}>
                    <img src={selectedItemImg} alt="jeansImg" />
                </div>
                <div className={styles.productDetails}>
                    <div>
                        <img src={rightTickIcon} alt="right-tick-icon" />
                        <p>Added to Cart</p>
                    </div>
                    <p><strong>Size: </strong>{selectedSize}</p>
                    <p><strong>Color: </strong>{selectedColor}</p>
                </div>
            </div>
            <div className={styles.middlePart}>
                <div className={styles.middlePart1}>
                    <p className={styles.symbol}></p>
                    <p className={styles.price}>Rs 499</p>
                </div>
                <div className={styles.middlePart2}>
                    <p className={styles.middlePart2p1}>Your order is eligible for FREE Delivery.</p>
                    <p>Choose <a href="#">FREE Delivery</a> option at checkout.</p>
                </div>
            </div>
            <div className={styles.rightPart}>
                <div className={styles.rightPart1}>
                    <h3>Cart Subtotal:</h3>
                    <p>Rs {totalPrice}</p>
                </div>
                {/* <button>Proceed to Buy ({totalItems} items)</button> */}
                <Link to={'/booking'}><button>Proceed to Buy ({totalItems} items)</button></Link>
                <Link to={'/cart/items'} ><button className={styles.goToCart}>Go to Cart</button></Link>
            </div>
        </div>
        <div className={styles.recommendedContainer}>
        <h3>Recommended Items</h3>
        <div className={styles.rocommendedItems}>
            {
                products.map((product) => (
                    <ItemFullDetails key={product.id} product={product} />
                ))
            }
        </div>
    </div>
    </>
    )
};

const CartMainPage = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

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

    const handleCartItemdDelete = (productId) => {
        setProducts(products.filter((product) => product.id !== productId));
    }

    useEffect(() => {
        getData("http://127.0.0.1:8000/cart/" + user?.id).then((response) => {
            console.log(response);
            setProducts(response);
            calculateTotalPrice(response);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    return (
        <>
        <Header />
        <div className={styles.cartItemContainer}>
            <div className={styles.cartItemDetails}>
                <h1>Shipping Cart</h1>
                <hr />
                {products?.map((product, key) => (
                    <div>
                        <CartItems key={key} product={product} handleCartItemdDelete={handleCartItemdDelete} />
                        <hr />
                    </div>
                ))}
            </div>
            <div className={styles.cartItemBooking}>
                <div className={styles.cartItemBooking1}>
                    <div className={styles.middlePart1}>
                        <p className={styles.symbol}></p>
                        <p className={styles.price}>Rs 499</p>
                    </div>
                    <div className={styles.middlePart2}>
                        <p className={styles.middlePart2p1}>Your order is eligible for FREE Delivery.</p>
                        <p>Choose <a href="#">FREE Delivery</a> option at checkout.</p>
                    </div>
                </div>
                <div>
                    <h3>Subtotal ({totalItems} items): <strong>Rs {totalPrice}</strong></h3>
                </div>
                <div className={styles.checkBox}>
                    <input type="checkbox" />
                    <p>This order contains a gift</p>
                </div>

                {/* <button onClick={handleBuyButton}>Proceed to Buy</button> */}
                <Link to={'/booking'}><button>Proceed to Buy</button></Link>
                <div className={styles.CharItemEMI}>
                    <p>EMI available</p>
                    <p>▼</p>
                </div>
            </div>
        </div>
        </>
    )
}

export { Cart, CartMainPage };