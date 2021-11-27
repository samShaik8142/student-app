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

export function updateStudent(student, callBkFn) {
    const connection = getConnection();
    connection.connect();
    connection.query(`UPDATE Student SET (firstName,lastName,gender,dob,contactNumber,isAdmin)values('${student.FIRSTNAME}','${student.LASTNAME}','${student.GENDER}','${student.DOB}','${student.CONTACTNUMBER}','${student.ISADMIN}' ) WHERE id=${student.ID} `, (error, result, fields) => {
        if (error) throw error;
        connection.end();
        callBkFn(result.affectedRows > 0 ? true : false);
    })
}

export function deleteStudent(callBkFn) {
    const connection = getConnection();
    connection.connect();
    connection.query(`DELETE FROM STUDENT WHERE id='${id}'`, (error, result, fields) => {
        if (error) throw error;
        connection.end();
        callBkFn(result.affectedRows > 0 ? { message: "deleted successfully" } : { message: "unsuccessfull" });
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