const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const SELECT_ALL = 'SELECT * FROM customer';

connection = mysql.createConnection({
    host:'10.12.18.10',
    user:'Noonja',
    password:'Chair5000',
    database:'oneamerica'
});

app.use(cors());

//Landing Page
app.get('/', (req, res) => {
    res.send("landing")
});

//Get all Customers
app.get('/customers', (req, res) => {

    connection.query(SELECT_ALL, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Customer Server GET ALL------')
            return res.json({
                data: results
            });
        }
    });
});

//Add Customer
app.get('/customers/add', (req, res) => {
    const {full_name, email, phone_number, location, einsurance, time} = req.query;
    console.log(res);
    const INSERT_PRODUCTS_QUERY = `INSERT INTO customer (name, email, phone_number, location, einsurance,time) VALUES('${full_name}', '${email}', '${phone_number}', '${location}', ${einsurance}, CURRENT_TIMESTAMP)`;
    connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            return res.send('successfully added');
        }
    })
})

//Get Customer by LIKE Name
app.get('/query/name', (req, res) => {
    const {name} = req.query;
    const SELECT_ALL_NAME_QUERY = `SELECT * FROM customer WHERE Name like '%${name}%'`;
    connection.query(SELECT_ALL_NAME_QUERY, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Customer Server SEARCH LIKE NAME------')
            return res.json({
                data: results
            });
        }
    });
});

//Delete customer by Name
app.get('/delete/name', (req, res) => {
    const {name} = req.query;
    const DELETE_NAME_QUERY = `DELETE FROM customer WHERE Name= "${name}"`;
    connection.query(DELETE_NAME_QUERY, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Customer Server DELETE------')
            return res.json({
                data: results
            });
        }
    });
});

//Filter by timestamp DESC
app.get('/filter/timestamp', (req, res) => {
    const FILTER_TIMESTAMP = `SELECT * FROM oneamerica.customer ORDER BY Time DESC;`;
    connection.query(FILTER_TIMESTAMP, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Customer Server FILTER------')
            return res.json({
                data: results
            });
        }
    });
});

//Filter by timestamp Like Day
app.get('/filter/timestamp/day', (req, res) => {
    const {currentDay} = req.query;
    const FILTER_TIMESTAMP = `SELECT * FROM oneamerica.customer Where Time Like "%${currentDay}%";`;
    connection.query(FILTER_TIMESTAMP, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Customer Server FILTER------')
            return res.json({
                data: results
            });
        }
    });
});

//Filter by timestamp Range
app.get('/filter/timestamp/range', (req, res) => {
    const {upperBound, lowerBound} = req.query;
    const FILTER_TIMESTAMP = `SELECT * FROM oneamerica.customer where Time >= '${lowerBound}' and Time < '${upperBound}'`;
    connection.query(FILTER_TIMESTAMP, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Customer Server FILTER------')
            return res.json({
                data: results
            });
        }
    });
});

//Filter by Insurance Needs Range
app.get('/filter/einsurance/range', (req, res) => {
    const {upperBound, lowerBound} = req.query;
    const FILTER_INSURANCE = `SELECT * FROM oneamerica.customer where EInsurance >= ${lowerBound} and EInsurance < ${upperBound}`;
    connection.query(FILTER_INSURANCE, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Customer Server FILTER------')
            return res.json({
                data: results
            });
        }
    });
});


//Filter by Insurance Needs ASC or DSC
app.get('/filter/einsurance/order', (req, res) => {
    const { order } = req.query;
    const FILTER_INSURANCE = `SELECT * FROM oneamerica.customer ORDER BY EInsurance ${order}`;
    connection.query(FILTER_INSURANCE, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Customer Server FILTER------')
            return res.json({
                data: results
            });
        }
    });
});

//Filter by Location States
app.get('/filter/location/state', (req, res) => {
    const { state } = req.query;
    const FILTER_INSURANCE = `SELECT * FROM oneamerica.customer WHERE Location LIKE "%${state}"`;
    connection.query(FILTER_INSURANCE, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Customer Server FILTER------')
            return res.json({
                data: results
            });
        }
    });
});

//Start Server
app.listen(4000, () => {
    console.log('------Customer Server Listening------')
});
