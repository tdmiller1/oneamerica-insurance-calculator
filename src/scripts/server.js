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
    const DELETE_NAME_QUERY = `DELETE FROM customer WHERE Name = "${name}"`;
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

//Delete customer by Email
app.get('/delete/email', (req, res) => {
    const {email} = req.query;
    const DELETE_NAME_QUERY = `DELETE FROM customer WHERE Email = "${email}"`;
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
    const {lower, upper} = req.query;
    const FILTER_INSURANCE = `SELECT * FROM oneamerica.customer where EInsurance >= ${lower} and EInsurance < ${upper}`;
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

//Filter by Location Region
app.get('/filter/location/region', (req, res) => {
    const { region } = req.query;
    var query = ""
    switch(region){
        case "midwest":
            query = `SELECT * FROM oneamerica.customer WHERE Location LIKE "%IN" OR Location LIKE "%OH" OR Location LIKE "%IL" OR Location LIKE "%MO" OR Location LIKE "%ND" OR Location LIKE "%SD" OR Location LIKE "%KS" OR Location LIKE "%NE" OR Location LIKE "%MI" OR Location LIKE "%IO" OR Location LIKE "%MN" OR Location LIKE "%WI"`;
            break;
        case "northeast":
            query = `SELECT * FROM oneamerica.customer WHERE Location LIKE "%ME" OR Location LIKE "%VT" OR Location LIKE "%NH" OR Location LIKE "%RI" OR Location LIKE "%PA" OR Location LIKE "%NY" OR Location LIKE "%CO" OR Location LIKE "%NJ" OR Location LIKE "%MA"`;
            break;
        case "west":
            query = `SELECT * FROM oneamerica.customer WHERE Location LIKE "%CA" OR Location LIKE "%WA" OR Location LIKE "%OR" OR Location LIKE "%MT" OR Location LIKE "%ID" OR Location LIKE "%NV" OR Location LIKE "%AZ" OR Location LIKE "%NM" OR Location LIKE "%CO" OR Location LIKE "%WY" OR Location LIKE "%UT" OR Location LIKE "%AK" OR Location LIKE "%HI"`;
            break;
        case "south":
            query = `SELECT * FROM oneamerica.customer WHERE Location LIKE "%TX" OR Location LIKE "%OK" OR Location LIKE "%LA" OR Location LIKE "%AL" OR Location LIKE "%AR" OR  Location LIKE "%GA" OR Location LIKE "%SC" OR Location LIKE "%NC" OR Location LIKE "%VA" OR Location LIKE "%MD" OR Location LIKE "%WV" OR Location LIKE "%KY" OR Location LIKE "%TN" OR Location LIKE "%FL" OR Location LIKE "%MS" OR Location LIKE "%DE"`;
            break;
    }
    connection.query(query, (err, results) => {
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

//Filter by Location Region
app.get('/filter/all', (req, res) => {
    var { query, location, insurance_upper, insurance_lower, time_upper, time_lower } = req.query;
    
    query = `SELECT * FROM oneamerica.customer`;
    if(insurance_lower == undefined){
        insurance_lower = 0
    }
    if(insurance_upper == undefined){
        insurance_upper = 1000000
    }
    if(time_lower == undefined){
        time_lower = "2017-01-01"
    }
    if(time_upper == undefined){
        time_upper = "2019-02-22"
    }

    var locationString = ""
    
    switch(location){
        case "midwest":
            locationString = locationString + '(Location LIKE "%IN" OR Location LIKE "%OH" OR Location LIKE "%IL" OR Location LIKE "%MO" OR Location LIKE "%ND" OR Location LIKE "%SD" OR Location LIKE "%KS" OR Location LIKE "%NE" OR Location LIKE "%MI" OR Location LIKE "%IO" OR Location LIKE "%MN" OR Location LIKE "%WI")'
            break;
        case "northeast":
            locationString = locationString + '(Location LIKE "%ME" OR Location LIKE "%VT" OR Location LIKE "%NH" OR Location LIKE "%RI" OR Location LIKE "%PA" OR Location LIKE "%NY" OR Location LIKE "%CO" OR Location LIKE "%NJ" OR Location LIKE "%MA")'
            break;
        case "west":
            locationString = locationString + '(Location LIKE "%CA" OR Location LIKE "%WA" OR Location LIKE "%OR" OR Location LIKE "%MT" OR Location LIKE "%ID" OR Location LIKE "%NV" OR Location LIKE "%AZ" OR Location LIKE "%NM" OR Location LIKE "%CO" OR Location LIKE "%WY" OR Location LIKE "%UT" OR Location LIKE "%AK" OR Location LIKE "%HI")'    
            break;
        case "south":
            locationString = locationString + '(Location LIKE "%TX" OR Location LIKE "%OK" OR Location LIKE "%LA" OR Location LIKE "%AL" OR Location LIKE "%AR" OR  Location LIKE "%GA" OR Location LIKE "%SC" OR Location LIKE "%NC" OR Location LIKE "%VA" OR Location LIKE "%MD" OR Location LIKE "%WV" OR Location LIKE "%KY" OR Location LIKE "%TN" OR Location LIKE "%FL" OR Location LIKE "%MS" OR Location LIKE "%DE")'
            break;
        default:
            break;
    }
    query = `SELECT * FROM oneamerica.customer 
            WHERE ${locationString}
            AND (einsurance >= ${insurance_lower} AND einsurance < ${insurance_upper})
            AND (time >= "${time_lower}" AND time < "${time_upper}")`;

    connection.query(query, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Customer Server FILTER------')
            return res.json({
                data: results,
                query: query
            });
        }
    });
});




// Login Table
//Get all Usernames lol
app.get('/usernames', (req, res) => {
    const SELECT_USERNAMES = `SELECT * FROM oneamerica.OA_CREDENTIALS`;
    connection.query(SELECT_USERNAMES, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Login Server GET ALL------')
            return res.json({
                data: results
            });
        }
    });
});

//Get all Username
app.get('/username', (req, res) => {
    const { username } = req.query;
    const SELECT_USERNAMES = `SELECT * FROM oneamerica.OA_CREDENTIALS WHERE username = "${username}"`;
    connection.query(SELECT_USERNAMES, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Login Server GET ALL------')
            return res.json({
                data: results
            });
        }
    });
});

//Get all Usernames lol
app.get('/test', (req, res) => {
    const { query } = req.query;
    const SELECT_USERNAMES = `${query}`;
    connection.query(SELECT_USERNAMES, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Login Server GET ALL------')
            return res.json({
                data: results,
                query: query
            });
        }
    });
});


//Start Server
app.listen(4000, () => {
    console.log('------Customer Server Listening------')
});
