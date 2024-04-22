import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import { renderRating, strTruncate, discountedPrice } from "../../components/Helpers";
import styles from "./Items.module.scss";
import earphon1 from "../../assets/earphon1.webp";
import { deleteData } from "../../services/actions";

const ItemFullDetails = ( props ) => {
    const rating = 4.5;
    const name = "Safari Ray 65 Cms Medium Check-In Polycarbonate (Pc) Hard Sided 4 Wheels 360";
    return (
        <div className={styles.itemContainer}>
            <Link to={`/product/${props?.product?.id}`}><img className={styles.itemImage} src={props.product.url} alt="item-img" /></Link>
            <p className={styles.itemName}>{props.product.name}</p>
            <a className={styles.itemDescription}>{strTruncate(props.product.description, 65)}</a>
            <div className={styles.itemRating}>
                {renderRating(rating)}
            </div>
            <div className={styles.prices}>
                <p className={styles.discountedPrice}>Rs: {discountedPrice(props.product.price, props.product.discount)}</p>
                <p className={styles.price}>Rs: {props.product.price}</p>
                {/* <p className={styles.discountedPrice}>-{props.product.discount}%</p> */}
            </div>
        </div>
    )
};

const ItemPichOnly = () => {
    return <div>Items</div>;
};

const CartItems = ( props ) => {
    const [quantity, setQuantity] = useState(props?.product?.quantity);
    const [isChecked, setIsChecked] = useState(props?.product?.is_gift);

    const onClickCheckbox = () => {
        setIsChecked(!isChecked);
    }

    const handleDelete = (id) => {
        deleteData("/cart/" + id).then((response) => {
            console.log(response);
            props.handleCartItemdDelete(id);
        }).catch((error) => {
            console.log(error);
        })
    }
    
    return (
        <>
        <div className={styles.cartItemContainer}>
            <div className={styles.cartItemImg}>
                <img className={styles.itemImage} src={props?.product?.product?.photos?.[0]?.url} alt="img" />
            </div>
            <div className={styles.cartItemDetails}>
                <h3>{props?.product?.product?.description}</h3>
                <p className={styles.inStock}>In stock</p>
                <p>Eligible for FREE shipping</p>
                <div className={styles.checkBox}>
                    <input type="checkbox" name="gift" value="gift" checked={isChecked} onClick={onClickCheckbox} />
                    <p>This will be a gift <a href="#">Learn more</a></p>
                </div>
                <p><strong>Size: </strong>{props?.product?.size}</p>
                <p><strong>Color: </strong>{props?.product?.color}</p>
                <div className={styles.actions}>
                    <div>
                    <label>Qty:</label>
                        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <a href="#" onClick={() => handleDelete(props?.product?.id)}>Delete</a>
                    <a href="#">Save for later</a>
                    <a href="#">See more like this</a>
                    <a href="#">Share</a>
                </div>
            </div>
            <div className={styles.cartItemPrice}>
                <div className={styles.offer}>
                    <p className={styles.discountPercent}>{props?.product?.product?.discount} off</p>
                    <p>Limited time deal</p>
                </div>
                <h3 className={styles.discountedPrice}>Rs {discountedPrice(props?.product?.product?.price, props?.product?.product?.discount)}</h3>
                <p className={styles.cartItemMrp}>M.R.P.: <del>Rs {props?.product?.product?.price}</del></p>
            </div>
        </div>
        </>
    )
}

export { ItemFullDetails, ItemPichOnly, CartItems }