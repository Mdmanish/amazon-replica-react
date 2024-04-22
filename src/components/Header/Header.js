import React, { useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/amazon-in-logo.png";
import searchIcon from "../../assets/search-icon.png";
import cartIcon from "../../assets/cart-icon.png";
import flagIcon from "../../assets/flag-icon.png";
import { Link } from "react-router-dom";
import { Cart } from "../Cart/Cart";

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [username, setUsername] = useState("");
    
    const user = JSON.parse(sessionStorage.getItem('user'));

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to={'/'} ><img src={logo} alt="Amazon logo" /></Link>
            </div>
            <div className={styles.location}>
                <p>Deliver to</p>
                <h3>India</h3>
            </div>
            <div className={styles.searchContainer}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Search Amazon.in"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        <i className="fas fa-search"></i>
                        <img src={searchIcon} alt="search icon" />
                    </button>
                </form>
                {showSearchResults && (
                    <div className={styles.searchResults}>
                        {searchResults.map((result) => (
                            <Link
                                to={`/search/${result}`}
                                key={result}
                                className={styles.resultLink}
                            >
                                {result}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.language}>
                <img src={flagIcon} alt="flag-icon"/><p>EN</p>
            </div>
            <div className={styles.accounts}>
                {user?.name ? (
                    <>
                        <p>Hello, {user?.name}</p>
                        <h3>Accounts & Lists</h3>
                    </>
                ) : (
                    <>
                        <p>Hello, Sign in</p>
                        <h3>Accounts & Lists</h3>
                    </>
                )}
            </div>
            <div className={styles.orders}>
                <Link to={'/order'} >
                    <p>Returns</p>
                    <h3>& Orders</h3>
                </Link>
            </div>
            <div className={styles.cart}>
                <Link to={'/cart/items'} ><img src={cartIcon} alt="cart-icon" /></Link>
            </div>
        </div>
    );
};

export default Header;
