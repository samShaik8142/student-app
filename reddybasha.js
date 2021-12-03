//Routers  App.js

import './App.css';
import React from "react"
import CreateSchool from './components/CreateSchool';
import CreateStudent from './components/CreateStudent';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';


function App() {

  return (
    <>
      {/* <div>
        <CreateSchool />
        <CreateStudent />

      </div> */}
       <Router> 
         <Switch>
          <Route path='/school' component={CreateSchool} />
          <Route path='/student' component={CreateStudent} />
           <Route path='/' component={CreateSchool} />
        </Switch>
      </Router> 
    </>
  );
}

export default App;


//DisplayStudent 


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UpdateStudent from './UpdateStudent';

export default function DisplayStudent() {
    const [student, setStudent] = useState([]);
    const [dataFilter, setdataFilter] = useState(null);

    useEffect(() => {
        getStudents();
    }, []);

    function getStudents() {
        axios.get("http://localhost:5000/student/get-all").then(response => {
            setStudent(response.data)
        }).catch(error => console.error(error));
    }

    function editStudent(id) {
        const filterData = student.filter((value) => id === value.id);        
        setdataFilter( filterData[0]);
    }
    
    function deleteStudent(event) {
        const id = event.target.id;
        console.log(id);
        axios.delete("http://localhost:5000/student/delete/" + id).then(result => {
            getStudents()
        }).catch(error => console.error(error));
    }
   

    return (
        <div>
            <div >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" onClick={getStudents} height="20" fill="currentColor" class="bi bi-arrow-clockwise icon" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                </svg>
            </div>
            <table className="Table">
                <thead>
                    <tr >
                        <th>Edit</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>contactNumber</th>
                        <th>HouseNo</th>
                        <th>Street</th>
                        <th>Town</th>
                        <th>District</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data, index) => {
                            return (
                                <tr key={index} className="rows">
                                    <td> <svg style={{float: "none"}} onClick={() => editStudent(data.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square icon" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg></td>
                                    <td>{data.firstName}</td>
                                    <td>{data.lastName}</td>
                                    <td>{data.dob}</td>
                                    <td>{data.gender}</td>
                                    <td>{data.contactNumber}</td>
                                    <td>{data.address.houseNo}</td>
                                    <td>{data.address.street}</td>
                                    <td>{data.address.town}</td>
                                    <td>{data.address.district}</td>
                                    <td>{data.address.state}</td>
                                    <td>{data.address.country}</td>
                                    <td> <svg id={data.id} style={{float: "none"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" onClick={deleteStudent} fill="currentColor" class="bi bi-x-circle icon" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                {dataFilter !== null ? <UpdateStudent data={dataFilter} students={getStudents}/> : ""}
            </div>
        </div>
    );

}


//UpdateStudent  

import React, { useState } from 'react'
import axios from 'axios';

export default function UpdateStudent(props) {
    console.log(props);
    const [student, setStudent] = useState({
        firstName: props.data.firstName,
        lastName: props.data.lastName,
        gender: props.data.gender,
        dob: props.data.dob,
        contactNumber: props.data.contactNumber,
        houseNo: props.data.address.houseNo,
        street: props.data.address.street,
        town: props.data.address.town,
        district: props.data.address.district,
        state: props.data.address.state,
        country: props.data.address.country,
        isRegistrationOk: false
    })
    console.log(student);

    function handleChange(event) {
        const name = event.target.id;
        console.log(name)
        const value = event.target.value;
        console.log(value)
        setStudent({ ...student, [name]: value })

    }

    function handleUpadateStudent() {
        let isRegistrationOk = true;

        if (!student.firstName) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        } if (!student.gender) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        }
        if (!student.dob) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        }
        if (!student.contactNumber) {
            isRegistrationOk = false;
        } else {
            isRegistrationOk = true;
        }
        if (!student.houseNo) {
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

    
        axios.put("http://localhost:5000/student/update", {
            'id': props.data.id,
            "firstName": student.firstName,
            "lastName": student.lastName,
            "gender":student.gender,
            "dob": student.dob,
            "contactNumber": student.contactNumber,
            "address": {
                "houseNo": student.houseNo,
                "street": student.street,
                "town": student.town,
                "district": student.district,
                "state": student.state,
                "country": student.country
            }
        }).then(result => {
            setStudent({ ...student, isRegistrationOk: isRegistrationOk });
            props.students()
            props.clear(null)
        }).catch(error => {
            // alert("Error handled")
            console.log(error)
        })

    }

    function handleReset() {
        setStudent({
            firstName: props.data.firstName,
            lastName: props.data.lastName,
            gender: props.data.gender,
            dob: props.data.dob,
            contactNumber: props.data.contactNumber,
            houseNo: props.data.address.houseNo,
            street: props.data.address.street,
            town: props.data.address.town,
            district: props.data.address.district,
            state: props.data.address.state,
            country: props.data.address.country,
            isRegistrationOk: false
           

        })
    }

    return (
        <div className="container">
            <div className="sub-container">
                <div className="registration_form">
                    <h1 className="header">Update Student</h1>
                    <h2 className="sub-header">Student Info</h2>
                    <form autocomplete="off">
                        <div className="subdivision">
                            <div> <div><input type="text" className="information" id="name" style={student.firstName === "" ? { borderColor: "red" } : {}} placeholder="Enter name*" onChange={handleChange} value={student.firstName} ></input></div>
                                <div> {student.firstName === "" ? <p className="error_msg">name is a mandatory field</p> : ""}</div></div>
                            <div><input type="lastName" className="information" id="lastName" onChange={handleChange} value={student.lastName} placeholder="Enter lastname"></input></div><br />
                            <div><select className="information" id="opt">
                                <option option="m" id="male" onChange={handleChange} value={student.gender} style={student.gender === "" ? { borderColor: "red" } : {}} >m</option>
                                <option option="f" id="female" onChange={handleChange} value={student.gender} style={student.gender === "" ? { borderColor: "red" } : {}} >f</option>
                            </select></div></div>
                        <div className="subdivision">
                            <div> <input type="date" className="information" id="dob" style={student.dob === "" ? { borderColor: "red" } : {}} onChange={handleChange} value={student.dob} ></input>
                                <div>{student.dob === "" ? <p className="error_msg">select DoB is mandatory field</p> : ""}</div></div>
                            <div>  <input type="number" className="information" id="contactNumber" style={student.contactNumber === "" ? { borderColor: "red" } : {}} onChange={handleChange} value={student.contactNumber} placeholder="Enter number*" ></input>
                                <div>{student.contactNumber === "" ? <span className="error_msg" id="contact">contactNumber is a mandatory field</span> : ""}</div></div></div>

                        <h2 className="sub-header">Address Info</h2>
                        <div className="subdivision">
                            <div>  <input type="house" className="information" style={student.houseNo === "" ? { borderColor: "red" } : {}} placeholder="Housenoex:1/117*" id="houseno" onChange={handleChange} value={student.houseNo}></input>
                                <div>{student.houseNo === "" ? <span className="error_msg" id="house" >houseNo is a mandatory field</span> : ""} </div></div>
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
                            <button className="button1" onClick={handleUpadateStudent}>Update Student</button>
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

