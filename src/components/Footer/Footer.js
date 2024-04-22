import React from "react";
import style from "./Footer.module.scss";
import logo from "../../assets/amazon-in-logo.png";

const Footer = () => {
    return (
        <div className={style.footerContainer}>
            <div className={style.backToTop} onClick={() => window.scrollTo(0, 0)}>
                <p>Back to top</p>
            </div>
            <div className={style.aboutUs}>
                <div className={style.getToKnowUs}>
                    <h2>Get to Know Us</h2>
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>Press Releases</p>
                    <p>Amazon Cares</p>
                    <p>Gift a Smile</p>
                </div>
                <div className={style.connectWithUs}>
                    <h2>Connect with Us</h2>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>
                <div className={style.makeMoneyWithUs}>
                    <h2>Make Money with Us</h2>
                    <p>Sell on Amazon</p>
                    <p>Sell under Amazon Accelerator</p>
                    <p>Amazon Global Selling</p>
                    <p>Become an Affiliate</p>
                    <p>Fulfilment by Amazon</p>
                    <p>Advertise Your Products</p>
                    <p>Amazon Pay on Merchants</p>
                </div>
                <div className={style.letUsHelpYou}>
                    <h2>Let Us Help You</h2>
                    <p>COVID-19 and Amazon</p>
                    <p>Your Account</p>
                    <p>Returns Centre</p>
                    <p>100% Purchase Protection</p>
                    <p>Amazon App Download</p>
                    <p>Amazon Assistant Download</p>
                    <p>Help</p>
                </div>
            </div>
            <hr />
            <div className={style.footerImages}>
                <img src={logo} alt="footerImage" />
                <p>English</p>    
                <p>India</p>    
            </div>
            <div className={style.amazonServices}>
                <div className={style.amazonServicesDetails}>
                    <div>
                        <h3>AbeBooks</h3>
                        <p>Books, art &amp; collectibles</p>
                    </div>
                    <div>
                        <h3>Amazon Web Services</h3>
                        <p>Scalable Cloud Computing Services</p>
                    </div>
                    <div>
                        <h3>Audible</h3>
                        <p>Download Audio Books</p>
                    </div>
                    <div>
                        <h3>IMDb</h3>
                        <p>Movie, TV &amp; Celebrities</p>
                    </div>
                    <div>
                        <h3>Shopbop</h3>
                        <p>Designer Fashion Brands</p>
                    </div>
                    <div>
                        <h3>Amazon Business</h3>
                        <p>Everything For Your Business</p>
                    </div>
                    <div>
                        <h3>Prime Now</h3>
                        <p>2-Hour Delivery on Everyday Items</p>
                    </div>
                    <div>
                        <h3>Amazon Prime Music</h3>
                        <p>100 million songs, ad-free Over 15 million podcast episodes</p>
                    </div>
                </div>
                <div className={style.copyright}>
                    <div className={style.terms}>
                        <p>Conditions of Use</p>
                        <p>Privacy Notice</p>
                        <p>Interest-Based Ads</p>
                    </div>
                    <p>© 1996-2022, Amazon.com, Inc. or its affiliates</p>
                </div>
            </div>
        </div>
    )
};

export default Footer