import styles from "./Helper.module.scss";

export const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<span key={i} className={styles.star}>&#9733;</span>);
        } else {
            stars.push(<span key={i} className={styles.star}>&#9734;</span>);
        }
    }
    return stars;
};

export const strTruncate = (str, n) => {
    return (str?.length > n) ? str?.substr(0, n - 1) + '...' : str
}

export const discountedPrice = (price, discount) => {
    return parseInt(price - (price * (discount / 100)));
}
