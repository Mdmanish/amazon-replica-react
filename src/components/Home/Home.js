import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ItemFullDetails } from "../Items/Items";
import { getData } from "../../services/actions";
import { LoadingSpinner } from "../Helpers";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // const user = JSON.parse(sessionStorage.getItem('user'));
        getData("/").then((response) => {
            console.log(response);
            setProducts(response);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <>
        {loading && <LoadingSpinner />}
        <Header />
        <div className={styles.homeContainer}>
            <div className={styles.homeItems}>
                {
                    products.map((product) => (
                        <ItemFullDetails key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Home
