import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { renderRating, strTruncate, discountedPrice } from "../../components/Helpers";
import styles from "./ItemMainPage.module.scss";
import Header from "../Header/Header";
import jeansImg from "../../assets/jeans-img2.jpg";
import offerIcon from "../../assets/offer-icon.png";
import returnIcon from "../../assets/return-icon.png";
import payOnDevliveryIcon from "../../assets/pay-on-delivery-icon.png";
import freeDeliveryIcon from "../../assets/free-delivery-icon.png";
import topBrandIcon from "../../assets/top-brand-icon.png";
import amazonDeliveryIcon from "../../assets/amazon-delivery-icon.png";
import locationIcon from "../../assets/location-icon.png";
import secureIcon from "../../assets/secure-icon.png";
import { ItemFullDetails } from "../Items/Items";
import { getData, postData } from "../../services/actions";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";


const ItemMainPage = (props) => {
    const { productId } = useParams();
    console.log('productId', productId);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [selectedImg, setSelectedImg] = useState(null);
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [largeImageUrl, setLargeImageUrl] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedQty, setSelectedQty] = useState(1);

    const data = {
        "user_id": user?.id,
        "product_id": productId,
        "quantity": selectedQty,
        "size": selectedSize,
        "color": selectedColor,
        "is_gift": isChecked
    };

    const handleSmallImgClick = (key, imgUrl) => {
        console.log(key);
        setSelectedImg(key);
        setLargeImageUrl(imgUrl);
        console.log(selectedImg);
    };

    const handleColorChanege = (color) => {
        setSelectedColor(color);
    };
    
    const handleAddToCart = () => {
        postData("/cart", data).then((response) => {
            console.log(response);
            window.location.href = '/cart-added';
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleBuyNow = () => {
        postData("/cart", data).then((response) => {
            console.log(response);
            window.location.href = '/cart/items';
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getData("http://127.0.0.1:8000/product/" + productId).then((response) => {
            console.log(response);
            setProductDetails(response);
            setLargeImageUrl(response?.photos?.[0]?.url);
            setSelectedColor(response?.colors?.[0]?.color);
            setSelectedSize(response?.sizes?.[0]?.size);
        }).catch((error) => {
            console.log(error);
        })

        getData("http://127.0.0.1:8000/?limit=12").then((response) => {
            console.log(response);
            setProducts(response);
        }).catch((error) => {
            console.log(error);
        })
    }, [productId])

    return (
        <>
        <Header />
        <div className={styles.container}>
            <div className={styles.productImages}>
                <div className={styles.smallImages}>
                    {productDetails && productDetails?.photos && productDetails.photos?.length > 0 && (
                        productDetails.photos.map((item, key) => (
                            <img
                                key={key}
                                src={item.url}
                                alt="small-img"
                                className={key === selectedImg ? styles.selectedSmallImg : ""}
                                onClick={() => handleSmallImgClick(key, item.url)}
                            />
                        ))
                    )}
                </div>
                <div className={styles.largeImage}>
                    <img src={largeImageUrl} alt="jeansImg" />
                </div>
            </div>
            <div className={styles.productDetails}>
                <div className={styles.detailsHead}>
                    <a href="#">Visit the {productDetails?.brand?.name} store</a>
                    <h3>{productDetails?.product?.description}</h3>
                    <p>{renderRating(4)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">4 ratings</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Search this page</a></p>
                    <div className={styles.amazonsChoice}>
                        <p>Amazon's Choice</p>
                    </div>
                    <span className={styles.detailsHeadSpan}>50+ bought in past month</span>
                </div>
                <hr />
                <div className={styles.priceDetails}>
                    <p className={styles.sell}>Limited time deal</p>
                    <p className={styles.price}><span className={styles.discount}>-{productDetails?.product?.discount}%</span> ₹{discountedPrice(productDetails?.product?.price, productDetails?.product?.discount)}</p>
                    <span className={styles.mrp}>M.R.P.: <del>Rs {productDetails?.product?.price}</del></span>
                    <p>Inclusive of all taxes</p>
                    <p><strong>EMI</strong> starts at Rs 299. No Cost EMI available <a href="#">EMI options ▼</a></p>
                </div>
                <hr />
                <div className={styles.offerMainContainer}>
                    <div className={styles.offerHeadingContainer}>
                    <img className={styles.offerIcon} src={offerIcon} alt="offerIcon" />
                        <p>Offers</p>
                    </div>
                    <div className={styles.offerContainer}>
                        <div className={styles.offer}>
                            <p className={styles.offerHeading}>Bank Offer</p>
                            <p>{strTruncate("Get extra 10% off upto ₹ 200 on min. purchase of 3,000. T&C", 25)}</p>
                            <a href="#">1 offer &gt;</a>
                        </div>
                        <div className={styles.offer}>
                            <p className={styles.offerHeading}>Bank Offer</p>
                            <p>{strTruncate("Get extra 10% off upto ₹ 200 on min. purchase of 3,000. T&C", 25)}</p>
                            <a href="#">1 offer &gt;</a>
                        </div>
                    </div>
                </div>
                <hr />
                <div className={styles.productPolicies}>
                    <div className={styles.productPoliciesIcons}>
                        <img src={returnIcon} alt="returnIcon" />
                        <p>10 days Return & Exchange</p>
                    </div>
                    <div className={styles.productPoliciesIcons}>
                        <img src={payOnDevliveryIcon} alt="payOnDevliveryIcon" />
                        <p>Pay on Delivery</p>
                    </div>
                    <div className={styles.productPoliciesIcons}>
                        <img src={freeDeliveryIcon} alt="freeDeliveryIcon" />
                        <p>Free Delivery</p>
                    </div>
                    <div className={styles.productPoliciesIcons}>
                        <img src={topBrandIcon} alt="topBrandIcon" />
                        <p>Top Brand</p>
                    </div>
                    <div className={styles.productPoliciesIcons}>
                        <img src={amazonDeliveryIcon} alt="amazonDeliveryIcon" />
                        <p>Amazon Delivery</p>
                    </div>
                </div>
                <hr />
                <div className={styles.productSizeDetails}>
                    <p><strong>Size</strong></p>
                    <select onChange={(e) => setSelectedSize(e.target.value)}>
                        {productDetails?.sizes && productDetails.sizes?.length > 0 && (
                            productDetails.sizes.map((item, key) => (
                                <option key={key} value={item.size}>
                                    {item.size}
                                </option>
                            ))
                        )}
                    </select>
                    <div>
                        <p><strong>Color:</strong> {selectedColor}</p>
                        <div className={styles.colorImgages}>
                            {productDetails?.colors && productDetails.colors?.length > 0 && (
                                productDetails.colors.map((item, key) => (
                                    <img src={largeImageUrl} key={key} alt="largeImageUrl" onClick={() => handleColorChanege(item.color)}/>
                                ))
                            )}
                        </div>
                    </div>
                    <a href="#">Size Chart ▼</a>
                </div>
                <div className={styles.productMainDetails}>
                    <h3>Product Details</h3>
                    <p><strong>Material:</strong>{productDetails?.product?.material_type}</p>
                    <p><strong>Brand:</strong>{productDetails?.brand?.name}</p>
                    <p><strong>Category:</strong>{productDetails?.category?.name}</p>
                    <p><strong>Sub Category:</strong>{productDetails?.subcategory?.name}</p>
                    <p><strong>Style:</strong> Casual</p>
                    <p><strong>Pattern:</strong> Solid</p>
                    <p><strong>Occasion:</strong> Casual</p>
                    <p><strong>Usage:</strong> Casual</p>
                    <p><strong>Fit:</strong> Regular</p>
                    <p><strong>Composition:</strong> 100% Cotton</p>
                </div>
                <hr />
                <div className={styles.aboutThisItem}>
                    <h3>About this item</h3>
                    <ul>
                        <li>{productDetails?.product?.description}</li>
                        <li>{productDetails?.brand?.description}</li>
                        <li>{productDetails?.category?.description}</li>
                        <li>{productDetails?.subcategory?.description}</li>
                    </ul>    
                </div>
            </div>
            <div className={styles.bookingDetails}>
                <p className={styles.price}>Rs {discountedPrice(productDetails?.product?.price, productDetails?.product?.discount)}</p>
                <p><a href="#">FREE delivery</a> Thursday, 30th April. <a href="#">Details</a></p>
                <div className={styles.location}>
                    <img src={locationIcon} alt="locationIcon" />
                    <a href="#">Delivering to Patna 854311 - Update location</a>
                </div>
                <h3>In stock</h3>
                <p>Ships from&nbsp;&nbsp;&nbsp;&nbsp;Amazon</p>
                <p>Sold by&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="#">Cocoblu Retail</a></p>
                <div className={styles.quantity}>
                    <label>Quantity</label>
                    <select value={selectedQty} onChange={(e) => setSelectedQty(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button className={styles.addToCart} onClick={handleAddToCart}>Add to Cart</button>
                <button className={styles.addToCart + " " + styles.buyNow} onClick={handleBuyNow}>Buy Now</button>
                <div className={styles.secureTransaction}>
                    <img src={secureIcon} alt="secureIcon" />
                    <a href="#">Secure transaction</a>
                </div>
                <div className={styles.giftOptions}>
                    <input type="checkbox" onChange={() => setIsChecked(!isChecked)}/>
                    <p>Add gift options</p>
                </div>
                <button className={styles.addToWishlist}>Add to wishlist</button>
            </div>
        </div>
        <hr />

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
        <Footer />
        </>
    )
};

export default ItemMainPage;