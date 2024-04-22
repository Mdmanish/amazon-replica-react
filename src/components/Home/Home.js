import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import Header from "../Header/Header";
import { ItemFullDetails } from "../Items/Items";
import { getData } from "../../services/actions";

const Home = () => {

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        // const user = JSON.parse(sessionStorage.getItem('user'));
        getData("http://127.0.0.1:8000/").then((response) => {
            console.log(response);
            setProducts(response);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <>
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
        </>
    )
}

export default Home
