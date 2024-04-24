import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import logo from "../../assets/amazon-in-logo.png";
import { authentication } from "../../services/actions";

const Register = () => {
    const [yourname, setYourname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (yourname === "" || username === "" || password === "") {
            setError("All fields are required");
            return;
        }
        authentication("/register", {
            name: yourname,
            username: username,
            password: password,
            confirm_password: password
        }).then((response) => {
            window.location.href = '/login';
        }).catch((error) => {
            console.log(error);
            setError(error?.detail)
        });
    };

    return (
        <>
        <div className={styles.logo}>
            <img src={logo} alt="Amazon logo" />
        </div>
        <div>
            {
                error && <p className={styles.error}>{error}</p>
            }
        </div>
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <h2>Create Account</h2>
                <div className={styles.inputField}>
                    <label>Your Name</label>
                    <input
                        type="text"
                        name="yourname"
                        value={yourname}
                        placeholder="First and last name"
                        onChange={(e) => setYourname(e.target.value)}
                    />
                </div>
                <div className={styles.inputField}>
                    <label>Mobile number</label>
                    <div className={styles.mobileField}>
                        <select>
                            <option>+91</option>
                            <option>+1</option>
                            <option>+92</option>
                            <option>+93</option>
                        </select>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Mobile number"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.inputField}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="At least 6 characters"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className={styles.terms}>To verify your number, we will send you a text message with a temporary code. Message and data rates may apply.</p>
                <button type="submit" className={styles.submitButton}>Continue</button>
                <p className={styles.terms}>Already have an account? <Link to="/login">Sign in</Link></p>
                <p className={styles.terms}>By continuing, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.</p>
            </form>
            <div className={styles.otherTerms}>
                <p className={styles.terms}><a href="#">Conditions of Use</a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="#">Privacy Notice</a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="#">Help</a></p>
                <p className={styles.terms}>© 1996-2022, Amazon.com, Inc. or its affiliates</p>
            </div>
        </div>
        </>
    )
}

export default Register;
