const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
const SELECT_ALL = 'SELECT * FROM customer';

var fs = require('fs');
configPath = './config.json'
var dbConfig = JSON.parse(fs.readFileSync(configPath, 'UTF-8'))

var connection = mysql.createConnection({ 
  host: dbConfig["host"],
  database: dbConfig["database"],
  user: dbConfig["user"],
  password: dbConfig["password"]
});

app.use(cors());

/* GET users listing. */
app.get('/customers', function(req, res, next) {
    connection.query('SELECT * FROM customer', function (err, rows, fields){
        if (err) throw err
        res.send({data: rows});
    })
});

app.get('/customers/search', function(req, res, next) {
    const SEARCH_QUERY = "SELECT * FROM customer WHERE Name LIKE '%"+req.query.name+"%'"
    connection.query(SEARCH_QUERY, function (err, rows, fields){
        if (err) throw err

        res.send({data: rows, sql: SEARCH_QUERY});
    })
});

app.post('/customers/add',function(req,res){
    const INSERT_PRODUCTS_QUERY = "INSERT INTO customer (name, email, phone_number, location, einsurance,time) VALUES('" 
    + req.body.name + "','" + req.body.email + "','" + req.body.phone_number + "','" + req.body.location + "','" + req.body.einsurance + "',CURRENT_TIMESTAMP)";
    connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            return res.json(results);
        }
    })
})

app.delete('/customers',function(req, res){
    const DELETE_EMAIL_QUERY = "DELETE FROM customer WHERE Email = '" + req.body.email + "'";
    connection.query(DELETE_EMAIL_QUERY, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            return res.send(results)
        }
    });
})

app.get('/filters/timestamp', function(req,res,next){
    const {upper, lower} = req.query;
        const FILTER_TIMESTAMP = `SELECT * FROM customer where Time >= '${lower}' and Time < '${upper}'`;
        connection.query(FILTER_TIMESTAMP, (err, results) => {
            if(err){
                return res.send(err);
            }else{
                console.log('------Customer Server FILTER------')
                return res.json({
                    data: results,
                    query: FILTER_TIMESTAMP
                });
            }
    });
});

    
app.get('/filters/einsurance', function(req, res, next) {
    const {lower, upper} = req.query
    const FILTER_INSURANCE = `SELECT * FROM customer where EInsurance >= ${lower} and EInsurance <= ${upper}`;
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


app.get('/filters/location', function(req, res, next) {
    const region = req.query.region
    var query = ""
    switch(region){
        case "midwest":
            query = `SELECT * FROM customer WHERE Location LIKE "%IN" OR Location LIKE "%OH" OR Location LIKE "%IL" OR Location LIKE "%MO" OR Location LIKE "%ND" OR Location LIKE "%SD" OR Location LIKE "%KS" OR Location LIKE "%NE" OR Location LIKE "%MI" OR Location LIKE "%IA" OR Location LIKE "%MN" OR Location LIKE "%WI"`;
            break;
        case "northeast":
            query = `SELECT * FROM customer WHERE Location LIKE "%ME" OR Location LIKE "%VT" OR Location LIKE "%NH" OR Location LIKE "%RI" OR Location LIKE "%PA" OR Location LIKE "%NY" OR Location LIKE "%CT" OR Location LIKE "%NJ" OR Location LIKE "%MA"`;
            break;
        case "west":
            query = `SELECT * FROM customer WHERE Location LIKE "%CA" OR Location LIKE "%WA" OR Location LIKE "%OR" OR Location LIKE "%MT" OR Location LIKE "%ID" OR Location LIKE "%NV" OR Location LIKE "%AZ" OR Location LIKE "%NM" OR Location LIKE "%CO" OR Location LIKE "%WY" OR Location LIKE "%UT" OR Location LIKE "%AK" OR Location LIKE "%HI"`;
            break;
        case "south":
            query = `SELECT * FROM customer WHERE Location LIKE "%TX" OR Location LIKE "%OK" OR Location LIKE "%LA" OR Location LIKE "%AL" OR Location LIKE "%AR" OR  Location LIKE "%GA" OR Location LIKE "%SC" OR Location LIKE "%NC" OR Location LIKE "%VA" OR Location LIKE "%MD" OR Location LIKE "%WV" OR Location LIKE "%KY" OR Location LIKE "%TN" OR Location LIKE "%FL" OR Location LIKE "%MS" OR Location LIKE "%DE" OR Location LIKE "%DC"`;
            break;
    }
    connection.query(query, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            console.log('------Customer Server FILTER------')
            return res.send({
                data: results,
                sql:query
            });
        }
    });
});

app.get('/users/', function(req, res, next) {
    const SELECT_USERNAMES = `SELECT * FROM oa_credentials`;
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

app.get('/users/username', function(req, res, next) {
  const { username } = req.query;
    const SELECT_USERNAMES = `SELECT * FROM oa_credentials WHERE username = "${username}"`;
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

app.post('/users/add',function(req,res){
    console.log(req)
    // const SELECT_USERNAMES = "SELECT * FROM oa_credentials WHERE username = '" + req.body.username + "'";
    const INSERT_USER_QUERY = "INSERT INTO oa_credentials (username, password) VALUES('"+ req.body.username + "','" + req.body.password + "')";
    connection.query(INSERT_USER_QUERY, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            return res.json(results);
        }
    })
})

//Start Server
app.listen(4000, () => {
    console.log('------Customer Server Listening------')
});
