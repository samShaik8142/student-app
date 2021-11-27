import { getConnection } from "./db.js";


export function getStudent(id, callBkFn) {
    const connection = getConnection();
    connection.connect();
    connection.query(`SELECT * FROM STUDENT WHERE ID='${id}'`, (error, result, fields) => {
        if (error) throw error;
        connection.end();
        callBkFn(result[0] ? result[0] : { message: "Student  Not Found" });
    })
}


export function getStudents(callBkFn) {
    const connection = getConnection();
    connection.connect();
    connection.query(`SELECT * FROM STUDENT S,ADDRESS A,school S1 WHERE A.ADDRESSID=S.ADDRESSID AND  S1.ID=S.SCHOOLID`, (error, result, fields) => {
        if (error) throw error;
        connection.end();
        callBkFn(result ? result : error);
    })
}

export function updateStudent(student,callBkFn){
    const connection=getConnection();
    connection.connect();
    connection.query(`UPDATE Student SET (firstName,lastName,gender,dob,contactNumber,isAdmin)values('${student.FIRSTNAME}','${student.LASTNAME}','${student.GENDER}','${student.DOB}','${student.CONTACTNUMBER}','${student.ISADMIN}' ) WHERE id=${student.ID} `,(error,result,fields)=>{
        if(error) throw error;
        connection.end();
        callBkFn(result.affectedRows > 0 ? true: false);
    })
}

export function deleteStudent(callBkFn) {
    const connection = getConnection();
    connection.connect();
    connection.query(`DELETE FROM STUDENT WHERE id='${id}'`, (error, result, fields) => {
        if (error) throw error;
        connection.end();
        callBkFn(result.affectedRows > 0  ? {message:"deleted successfully"} : {message:"unsuccessfull"});
    })
}

    export function createStudent(address, callBkFn) {
        const connection = getConnection();
        connection.connect();
        connection.query(`INSERT INTO STUDENT (firstname,lastname,gender,contactnumber,isadmin)VALUES('${address.firstName}','${address.lastName}','${address.gender}','${address.contactNumber}','${address.isAdmin}')`, (error, result, fields) => {
            if (error) throw error;
            connection.end();
            callBkFn(result ? { message: "Address created successfully" } : { message: "Failed to create Address" })
        })
    }

    export function getStudentUpdate(student, callBkFn) {
        const connection = getConnection();
        connection.connect();
        connection.query(`SELECT  * FROM STUDENT WHERE firstName='${student.firstName}' and contactnumber='${student.contactNumber}'`, (error, result, fields) => {
            if (error) throw error;
            connection.end();
            callBkFn(result[0] ? result[0] : null);
        })
    }






  app.get("/student/:id", (req, res) => {
        const id = req.params.id;
        getStudent(id, (student) => {
            res.send(student);
        })
    })

    app.get('/students/get-all', (req, res) => {
        getStudents((students) => {
            const results = students.map(name => {
                return { id: name.ID, firstName: name.FIRSTNAME, lastName: name.LASTNAME, contactNumber: name.CONTACTNUMBER, isAdmin: name.ISADMIN, school: { id: name.ID, name: name.NAME, address: { houseNo: name.HOUSENO, street: name.STREET, town: name.TOWN, district: name.DISTRICT, country: name.COUNTRY, is_school_address: name.IS_SCHOOL_ADDRESS } } }

            })
            res.send(results);
        })
    })



    app.delete("/delete/student/:id", (req, res) => {
        const id = req.params.id;
        console.log(id);
        getStudent(id, (school) => {
            console.log(school);
            if (school) {
                deleteStudent(id, (delSchool) => {
                    console.log(delSchool);
                    if (delSchool) {
                        deleteAddr(id, (delStudent) => {
                            res.send(delStudent ? { message: "deleted" } : { message: "unsuccessfull" })
                        })
                    }
                    else {
                        res.send({ message: "unsuccessfull" });
                    }
                })
            }
            else {
                res.send({ message: "unsuccessfull" });
            }
        })

    });

    app.post("/create/student", (req, res) => {
        const body = req.body;
        getStudentUpdate(body, (student) => {
            console.log(student);
            if (!student) {
                createAddress(body, (address) => {
                    console.log(address);
                    createStudent(body, (student) => {
                        res.send(student ? { message: "s" } : { message: "n" });
                    })
                })
            }
            else {
                res.send("nnn")
            }
        })

    })


    app.put("/update/student", (req, res) => {
        const body = req.body;
        console.log(body);
        updateStudent(body, (student) => {
            console.log(student);
            if (body.address) {
                updateAddress(body, (address) => {
                    res.send(address ? { message: "updated successfully" } : { message: "updated unsuccessfull" });
                })
            }
            else {
                res.send({ message: " student updated successfully" })
            }
        })
    })

