import React, { useState, useEffect} from "react";
import earphone from "../../assets/earphon1.webp";
import styles from "./Order.module.scss";
import Header from "../Header/Header";
import { getData, patchData } from "../../services/actions";
import Footer from "../Footer/Footer";

const Order = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [products, setProducts] = useState([]);
    console.log('products: ', products[0])

    const handleCancelButton = (itemId) => {
        console.log('cancel cliked: ', itemId);
        patchData("/order/" + itemId, {}).then((response) => {
            console.log(response);
            setProducts(prevProducts => prevProducts.filter(item => item.id !== itemId));
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getData("/order/" + user?.id).then((response) => {
            console.log("order userid response:",response);
            setProducts(response);
        }).catch((error) => {
            console.log(error);
        })
    }, []);


    return (
        <>
        <Header />
        <div className={styles.orderContainer}>
            <h1>Your Order</h1>
            <div className={styles.orderContainerTabs}>
                <a href="#">Orders</a>
                <a href="#">Buy Again</a>
                <a href="#">Not Yest Shipped</a>
                <a href="#">Cancelled Orders</a>
            </div>
            <div className={styles.orderContainerItems}>
                {products?.map((item, key) => (
                    <div>
                    <div className={styles.orderContainerItem} key={key}>
                        <div className={styles.orderContainerItemLeft}>
                            <h2>Arriving Thursday</h2>
                            <p>Not yet dispatched</p>
                            <a href="#">{item?.product?.description}</a>
                            <br />
                            <img src={item?.product?.photos?.[0]?.url} alt="item-img" />
                        </div>
                        <div className={styles.orderContainerItemRight}>
                            <button>Track package</button>
                            <button className={styles.viewEditButton}>View or edit order</button>
                            <button className={styles.viewEditButton} onClick={() => {handleCancelButton(item?.id)}}>Cancel order</button>
                        </div>
                    </div>
                    <hr />
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Order;