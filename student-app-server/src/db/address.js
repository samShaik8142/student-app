import { getConnection } from "./db.js";

export function getAddressById(id, callbackFn) {
    const connection = getConnection();
    connection.connect();

    connection.query(`SELECT * FROM ADDRESS WHERE ID=${id}`, function (error, results, fields) {
        if (error) throw error;
        connection.end();
        callbackFn(results[0] ? results[0] : { message: "Address not found" });
    });
}

export function getAddressByParams(address, callbackFn) {
    const connection = getConnection();
    connection.connect();

    connection.query(`SELECT * FROM ADDRESS WHERE HOUSENO='${address.houseNo}' AND STREET='${address.street}' AND TOWN='${address.town}' AND DISTRICT='${address.district}' AND STATE='${address.state}'`, function (error, results, fields) {
        // console.log(results)
        if (error) throw error;
        connection.end();
        callbackFn(results[0] ? results[0] : null);
    });
}

export function createAddress(address, callbackFn) {
    const connection = getConnection();
    connection.connect();

    connection.query(`INSERT INTO ADDRESS (HOUSENO, STREET, TOWN, DISTRICT, STATE, COUNTRY, IS_SCHOOL_ADDR) VALUES ('${address.houseNo}', '${address.street}', '${address.town}', '${address.district}', '${address.state}', '${address.country}', 'Y')`, (error, result, fields) => {
        // console.log(result, error);
        connection.end();
        if (error) callbackFn(null)
        else {
            getAddressByParams(address, (addr) => {
                callbackFn(addr)
            })
        }
    });
}

export function deleteAddress(id, callbackFn) {
    const connection = getConnection();
    connection.connect();

    connection.query(`DELETE FROM ADDRESS WHERE ADDRESSID=${id}`, function (error, result, fields) {
        if (error) throw error;
        connection.end();
        callbackFn(result.affectedRows > 0 ? true : false);
    });
}

export function updateAddress(address, callbackFn) {
    const connection = getConnection()
    connection.connect()
    connection.query(`update address set houseno="${address.houseNo}",street='${address.street}',town='${address.town}',district='${address.district}',state='${address.state}',country='${address.country}' where addressid=${address.addressid}`, (error, result) => {
        if (error) throw error;
        connection.end();
        callbackFn(result.affectedRows  > 0 ? true : false)
    })
}

