var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mongoDBurl = 'mongodb://127.0.0.1:27017'
var dbName = 'userdb';

exports.configure_database = function ()
{          
    MongoClient.connect(mongoDBurl, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client_dbconnect) {
    if (!err) {
        dbo = client_dbconnect.db(dbName);
        // user
        dbo.createCollection("user", function (err, col) {
            if (err) {client_dbconnect.close();};                        
        });
                
        // admin
        dbo.createCollection("admin_login", function (err, col) {
            if (err) {client_dbconnect.close();};   
        });
            
        // admin data
        var myobj = { username: "admin", password: "admin"};
            dbo.collection("admin_login").insertOne(myobj, async function (err) {
            if (err) {client_dbconnect.close();  throw err};   
        });    
        console.log("We are connected"); 
    }
    else client_dbconnect.close();        
     
    });
}



