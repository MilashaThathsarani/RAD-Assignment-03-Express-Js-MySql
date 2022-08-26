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
        var userTableQuery = "CREATE TABLE IF NOT EXISTS orderDetails (ordersId VARCHAR(255) PRIMARY KEY , qty INT, price DOUBLE ,itemCode VARCHAR(255))"
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
    const ordersId = req.body.ordersId;
    const qty = req.body.qty;
    const price = req.body.price;
    const itemCode = req.body.itemCode;

    var query = "INSERT INTO orderDetails (ordersId,qty,price,itemCode) VALUES (?,?,?,?)"
    connection.query(query, [ordersId,qty,price,itemCode],(error) =>{
        if (error){
            res.send({'message' :'Duplicate Entry'})
        }else {
            res.send({'message' : 'Order Details Created'})
        }
    });
})

router.get('/',(req,res) =>{
    var query = "SELECT * FROM orderDetails"
    connection.query(query, (error,rows) =>{
        if (error) throw error
        res.send(rows)
    })
})

router.put('/', (req,res) =>{
    const ordersId = req.body.ordersId;
    const qty = req.body.qty;
    const price = req.body.price;
    const itemCode = req.body.itemCode;

    var query = "UPDATE orderDetails SET qty=?, price=?,itemCode=? WHERE ordersId=?"
    connection.query(query, [qty,price,itemCode,ordersId],(error,rows) =>{
        if (error) throw error
        if (rows.affectedRows > 0){
            res.send({'message':'Order Details Updated'})
        }else {
            res.send({'message':'Order Details not Found'})
        }
    });
})

router.delete('/:ordersId', (req,res) =>{
    const ordersId = req.params.ordersId

    var query = "DELETE FROM orderDetails WHERE ordersId=?";

    connection.query(query, [ordersId], (error, rows) => {
        if (error) console.log(error);

        if (rows.affectedRows > 0){
            res.send({'message': 'Order Details deleted'})
        }else {
            res.send({'message': 'Order Details not found'})
        }
    })
})

router.get('/:ordersId', (req,res) =>{
    const ordersId = req.params.ordersId

    var query = "SELECT * FROM orderDetails WHERE ordersId=?"

    connection.query(query, [ordersId], (error, rows) =>{
        if (error) console.log(error);

        res.send(rows)
    })
})

module.exports = router