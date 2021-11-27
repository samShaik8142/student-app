import React, { useState } from 'react'
import axios from "axios";

export default function UpdateSchool(props) {

    const [userData, setuserData] = useState({
        name: props.data.name,
        houseNo: props.data.address.houseNo,
        street: props.data.address.street,
        town: props.data.address.town,
        district: props.data.address.district,
        state: props.data.address.state,
        country: props.data.address.country,
        isRegistrationOk: false
    });
    console.log(userData);

    function handleChange(event) {
        const name = event.target.id;
        const value = event.target.value;
        console.log(name);
        console.log(value);
        setuserData({ ...userData, [name]: value });
    }

    function handleUpdate() {

        let isRegistrationOk = true;

        if (!userData.name) {
            isRegistrationOk = false;
        }
        else {
            isRegistrationOk = true;
        }
        if (!userData.houseNo) {
            isRegistrationOk = false;
        }
        else {
            isRegistrationOk = true;
        }
        if (!userData.town) {
            isRegistrationOk = false;
        }
        else {
            isRegistrationOk = true;
        }
        if (!userData.district) {
            isRegistrationOk = false;
        }
        else {
            isRegistrationOk = true;
        }
        if (!userData.state) {
            isRegistrationOk = false;
        }
        else {
            isRegistrationOk = true;
        }
        if (!userData.country) {
            isRegistrationOk = false;
        }
        else {
            isRegistrationOk = true;
        }


        axios.put("http://localhost:5000/school/update", {
            'id': props.data.id,
            "name": userData.name,
            "address": {
                "houseNo": userData.houseNo,
                "street": userData.street,
                "town": userData.town,
                "district": userData.district,
                "state": userData.state,
                "country": userData.country
            }
        }).then(result => {
            setuserData({ ...userData, isRegistrationOk: isRegistrationOk });
            props.schools()
            props.clear(null)
        }).catch(error => {
            // alert("Error handled")
            console.log(error)
        })
    }



    function handleReset() {
        console.log(userData);
        setuserData({
            name: props.data.name,
            houseNo: props.data.address.houseNo,
            street: props.data.address.street,
            town: props.data.address.town,
            district: props.data.address.district,
            state: props.data.address.state,
            country: props.data.address.country,
            isRegistrationOk: false
        });
    }
    return (
        <div>
            <div className="container">
                <div className="sub-container">
                    <div className="registration_form">
                        <h1 className="header">Update your school details</h1>
                        <form autoComplete="off">
                            <input type="Name" className="input" style={userData.name === "" ? { borderColor: "red" } : {}} placeholder="Enter Your School Name*" id="name" value={userData.name} onChange={handleChange}></input><br />
                            {userData.name === "" ? <p id="name-error" className="error_msg">School name is a mandatory field</p> : ""}
                            <input type="house" className="input" style={userData.houseNo === "" ? { borderColor: "red" } : {}} placeholder="House no   ex:1/117*" id="houseNo" onChange={handleChange} value={userData.houseNo}></input><br />
                            {userData.houseNo === "" ? <p className="error_msg">House Number is a mandatory field</p> : ""}
                            <input type="Street" className="input" placeholder="Enter Your Street Name" id="street" onChange={handleChange} value={userData.street}></input><br />
                            <input type="Name" className="input" style={userData.town === "" ? { borderColor: "red" } : {}} placeholder="Enter Your Town*" id="town" onChange={handleChange} value={userData.town}></input><br />
                            {userData.town === "" ? <p className="error_msg"> Town is a mandatory field</p> : ""}
                            <input type="Name" className="input" style={userData.district === "" ? { borderColor: "red" } : {}} placeholder="Enter Your District*" id="district" onChange={handleChange} value={userData.district}></input><br />
                            {userData.district === "" ? <p className="error_msg"> District is a mandatory field</p> : ""}
                            <input type="Name" className="input" style={userData.state === "" ? { borderColor: "red" } : {}} placeholder="Enter State*" id="state" onChange={handleChange} value={userData.state}></input><br />
                            {userData.state === "" ? <p className="error_msg"> State is a mandatory field</p> : ""}
                            <input type="Name" className="input" style={userData.country === "" ? { borderColor: "red" } : {}} placeholder="Enter Your Country*" id="country" onChange={handleChange} value={userData.country}></input><br />
                            {userData.country === "" ? <p className="error_msg"> Country is a mandatory field</p> : ""}
                            <button className="button1" type="button" onClick={handleUpdate}>Update</button>
                            <button className="button2" type="button" onClick={handleReset}>Reset</button>

                            {userData.isRegistrationOk && <h4 id="success_msg" className="success"><span id="success" className="success"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="green" className="bi bi-check2-circle" viewBox="0 0 16 16">
                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                            </svg></span>Update Successfully!!</h4>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}