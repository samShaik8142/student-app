import react, { useState } from "react";
import '../css/Student.css';

export default function CreateStudent() {
    const [student, setStudent] = useState({
        name: null,
        lastName: null,
        gender: null,
        DoB: null,
        contactNumber: null,
        houseno: null,
        street: null,
        town: null,
        district: null,
        state: null,
        country: null,
        isRegistrationOk: false
    })
    function handleChange(event) {
        const id = event.target.id;
        console.log(id)
        const value = event.target.value;
        console.log(value)
        setStudent({ ...student, [id]: value })

    }
    function handleCreateStudent() {
        let isRegistrationOk = true;
        if (!student.name) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        } if (!student.gender) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        }
        if (!student.DoB) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        }
        if (!student.contactNumber) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        }
        if (!student.houseno) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        }
        if (!student.town) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        }
        if (!student.district) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        }
        if (!student.state) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        }
        if (!student.country) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        }

        setStudent({ ...student, isRegistrationOk: isRegistrationOk });
        console.log(student)

    }

    function handleReset() {
        setStudent({
            name: "",
            lastName: "",
            gender: "",
            DoB: "",
            contactNumber: "",
            houseno: "",
            street: "",
            town: "",
            district: "",
            state: "",
            country: "",
            isRegistrationOk: false

        })
    }

    return (
        <div className="container">
            <div className="sub-container">
                <div className="registration_form">
                    <h1 className="header">Create Student</h1>
                    <h2 className="sub-header">Student Info</h2>
                    <form autocomplete="off">
                        <div className="subdivision">
                            <div> <div><input type="text" className="information" id="name" style={student.name === "" ? { borderColor: "red" } : {}} placeholder="Enter name*" onChange={handleChange} value={student.name} ></input></div>
                                <div> {student.name === "" ? <p className="error_msg">name is a mandatory field</p> : ""}</div></div>
                            <div><input type="lastName" className="information" id="lastName" onChange={handleChange} value={student.lastName} placeholder="Enter lastname"></input></div><br />
                            <div><select className="information" id="opt">
                                <option value="male" id="male" onChange={handleChange} value={student.gender} style={student.gender === "" ? { borderColor: "red" } : {}} >male</option>
                                <option value="female" id="female" onChange={handleChange} value={student.gender} style={student.gender === "" ? { borderColor: "red" } : {}} >female</option>
                            </select></div></div>
                        <div className="subdivision">
                            <div> <input type="date" className="information" id="DoB" style={student.DoB == "" ? { borderColor: "red" } : {}} onChange={handleChange} value={student.DoB} ></input>
                                <div>{student.DoB === "" ? <p className="error_msg">select DoB is mandatory field</p> : ""}</div></div>
                            <div>  <input type="number" className="information" id="contactNumber" style={student.contactNumber === "" ? { borderColor: "red" } : {}} onChange={handleChange} value={student.contactNumber} placeholder="Enter number*" ></input>
                                <div>{student.contactNumber === "" ? <span className="error_msg" id="contact">contactNumber is a mandatory field</span> : ""}</div></div></div>

                        <h2 className="sub-header">Address Info</h2>
                        <div className="subdivision">
                            <div>  <input type="house" className="information" style={student.houseno === "" ? { borderColor: "red" } : {}} placeholder="Housenoex:1/117*" id="houseno" onChange={handleChange} value={student.houseno}></input>
                                <div>{student.houseno === "" ? <span className="error_msg" id="house" >houseNo is a mandatory field</span> : ""} </div></div>
                            <div> <input type="Street" className="information" placeholder="Enter Your Street Name" id="street" onChange={handleChange} value={student.street}></input></div>
                            <div><input type="town" className="information" style={student.town === "" ? { borderColor: "red" } : {}} placeholder="Enter Your Town*" id="town" onChange={handleChange} value={student.town}></input>
                                <div>{student.town === "" ? <span className="error-msg" className="error_msg">Town is a mandatory field</span> : ""}</div></div></div>
                        <div className="subdivision">
                            <div> <input type="district" className="information" style={student.district === "" ? { borderColor: "red" } : {}} placeholder="Enter Your District*" id="district" onChange={handleChange} value={student.district}></input>                            <div>{student.district === "" ? <span className="error_msg">district is a mandatory field</span> : ""}</div></div>
                            <div>  <input type="state" className="information" style={student.state === "" ? { borderColor: "red" } : {}} placeholder="Enter State*" id="state" onChange={handleChange} value={student.state}></input>
                                <div>{student.state === "" ? <span className="error_msg">state is a mandatory field</span> : ""}</div></div>
                            <div>  <input type="country" className="information" style={student.country === "" ? { borderColor: "red" } : {}} placeholder="Enter Your Country*" id="country" onChange={handleChange} value={student.country}></input>
                                <div>{student.country === "" ? <span className="error_msg">country is a mandatory field</span> : ""}</div></div></div>
                        < div className="subdivision">
                            <button className="button1" onClick={handleCreateStudent}>Create Student</button>
                            <button className="button2" onClick={handleReset}>Reset</button></div>
                        {student.isRegistrationOk && <h4 id="success_msg" className="success"><span id="success" className="success"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="green" className="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                        </svg></span>Create Student Successfully</h4>}
                    </form>
                </div>
            </div>
        </div>

    )
}