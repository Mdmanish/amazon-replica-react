import React, {useState, useEffect} from "react";
import Styles from "./Address.module.scss"
import AddAddressPopUp from "./AddAddressPopUp"
import addIcon from "../../assets/add-icon.png";
import { postData, getData } from "../../services/actions";

const Address = ( props ) => {
    const [selectedOptions, setSelectedOptions] = useState(null)
    const [showPopUp, setShowPopUp] = useState(false)
    const [userAddresses, setUserAddresses] = useState(null)
    const user = JSON.parse(sessionStorage.getItem('user'))
    
    const handleOptionChange = (e) => {
        console.log(e.target.value)
        setSelectedOptions(e.target.value);
        props.handleAddressOptionChange(e.target.value);
    };

    const handleAddAddress = () => {
        setShowPopUp(true);
    }

    const getDeleviryAddresses = () => {
        getData("http://127.0.0.1:8000/address/" + user?.id).then((response) => {
            console.log('addresses: ', response);
            setUserAddresses(response);
        }).catch((error) => {
            console.log(error);
        })
    }
    
    const submitHandler = (fromData) => {
        console.log('submit handler: ', user?.id)
        fromData = {...fromData, user_id: user?.id}
        console.log('submit formdata: ', fromData)
        postData("/address", fromData).then((response) => {
            console.log('response: ', response)
            getDeleviryAddresses();
            setShowPopUp(false);
        }).catch((error) => {
            console.log(error);
        })
        console.log('formData: ', fromData)
    }

    useEffect(() => {
        getDeleviryAddresses();
    }, [])
    
    return (
        <>
        {showPopUp && 
            <AddAddressPopUp
                submitHandler={submitHandler}
                closePopup={() => { setShowPopUp(false); }}
            />}
        <div className={Styles.addressContainer}>
            <h3>Your Addresses</h3>
            <hr />
            <div className={Styles.radioOptions}>
                {userAddresses?.map((address) => (
                    <label className={selectedOptions == address.id ? Styles.selected : ""}>
                        <input
                        type="radio"
                        name="option"
                        value={address.id}
                        checked={selectedOptions == address.id}
                        onChange={handleOptionChange}
                        />
                        <p><strong>{address.full_name}</strong>, {address.address_line1}, {address.city}, {address.state}, {address.pincode}, {address.country}</p>
                    </label>
                ))}
            </div>
            <div className={Styles.addNewAddress}>
                <img src={addIcon} alt="add-icon" />
                <a onClick={handleAddAddress}>Add a new Address</a>
            </div>
        </div>
        </>
    )
};

export default Address;
