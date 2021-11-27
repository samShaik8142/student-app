import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UpdateSchool from './UpdateSchool';

export default function DisplaySchools() {

    const [schools, setSchools] = useState([]);
    const [dataFilter, setdataFilter] = useState(null);

    useEffect(() => {
        getSchools();
    }, []);

    function getSchools() {
        axios.get("http://localhost:5000/school/get-all").then(response => {
            setSchools(response.data)
        }).catch(error => console.error(error));
    }

    function editSchool(id) {
        const filterData = schools.filter((value) => id === value.id);        
        setdataFilter( filterData[0]);
    }

    function deleteSchool(event) {
        const id = event.target.id;
        console.log(id);
        axios.delete("http://localhost:5000/school/delete/" + id).then(result => {
            getSchools()
        }).catch(error => console.error(error));
    }

    return (
        <div>
            <div >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" onClick={getSchools} height="20" fill="currentColor" class="bi bi-arrow-clockwise icon" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                </svg>
            </div>
            <table className="Table">
                <thead>
                    <tr >
                        <th>Edit</th>
                        <th>Name</th>
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
                        schools.map((data, index) => {
                            return (
                                <tr key={index} className="rows">
                                    <td> <svg style={{float: "none"}} onClick={() => editSchool(data.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square icon" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg></td>
                                    <td>{data.name}</td>
                                    <td>{data.address.houseNo}</td>
                                    <td>{data.address.street}</td>
                                    <td>{data.address.town}</td>
                                    <td>{data.address.district}</td>
                                    <td>{data.address.state}</td>
                                    <td>{data.address.country}</td>
                                    <td> <svg id={data.id} style={{float: "none"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" onClick={deleteSchool} fill="currentColor" class="bi bi-x-circle icon" viewBox="0 0 16 16">
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
                {dataFilter !== null ? <UpdateSchool data={dataFilter} schools={getSchools} clear={setdataFilter} /> : ""}
            </div>
        </div>
    );
}

