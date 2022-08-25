const express = require('express');
const router = express.Router();
const mysql = require('mysql')
const db = require('../configs/db.config')


const connection = mysql.createConnection(db._database)

connection.connect(function (error) {
    if (error) {
        console.log(error);
    }else {
        console.log("Connected to the MySQL Server")
        var userTableQuery = "CREATE TABLE IF NOT EXISTS fake-store-express (id VARCHAR(255) PRIMARY KEY , name VARCHAR (255),address VARCHAR (255), contact VARCHAR (255))"
        connection.query(userTableQuery, function (error,result) {
            if (error) throw error;
            //console.log(result);
            if (result.warningCount === 0){
                console.log("fake-store-express table Created");
            }
        })
    }
})

module.exports = router