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
        var userTableQuery = "CREATE TABLE IF NOT EXISTS orders (orderId VARCHAR(255) PRIMARY KEY , orderDate DATE, customerId VARCHAR(255))"
        connection.query(userTableQuery, function (error,result) {
            if (error) throw error;
            //console.log(result);
            if (result.warningCount === 0){
                console.log("orders table Created");
            }
        })
    }
})

router.post('/', (req,res) =>{
    console.log(req.body)
    const orderId = req.body.orderId;
    const orderDate = req.body.orderDate;
    const customerId = req.body.customerId;

    var query = "INSERT INTO orders (orderId,orderDate,customerId) VALUES (?,?,?)"
    connection.query(query, [orderId,orderDate,customerId],(error) =>{
        if (error){
            res.send({'message' :'Duplicate Entry'})
        }else {
            res.send({'message' : 'Order Created'})
        }
    });
})

router.get('/',(req,res) =>{
    var query = "SELECT * FROM orders"
    connection.query(query, (error,rows) =>{
        if (error) throw error
        res.send(rows)
    })
})

router.put('/', (req,res) =>{
    const orderId = req.body.orderId;
    const orderDate = req.body.orderDate;
    const customerId = req.body.customerId;

    var query = "UPDATE orders SET orderDate=?, customerId=? WHERE orderId=?"
    connection.query(query, [orderDate,customerId,orderId],(error,rows) =>{
        if (error) throw error
        if (rows.affectedRows > 0){
            res.send({'message':'Order Updated'})
        }else {
            res.send({'message':'Order not Found'})
        }
    });
})

router.delete('/:orderId', (req,res) =>{
    const orderId = req.params.orderId

    var query = "DELETE FROM orders WHERE orderId=?";

    connection.query(query, [orderId], (error, rows) => {
        if (error) console.log(error);

        if (rows.affectedRows > 0){
            res.send({'message': 'user deleted'})
        }else {
            res.send({'message': 'user not found'})
        }
    })
})

router.get('/:orderId', (req,res) =>{
    const orderId = req.params.orderId

    var query = "SELECT * FROM orders WHERE orderId=?"

    connection.query(query, [orderId], (error, rows) => {
        if (error) console.log(error);

        res.send(rows)
    })
})

module.exports = router