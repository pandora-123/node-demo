var objuserDB = require('./userdb');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var mongoDBurl = 'mongodb://127.0.0.1:27017'
var dbName = 'userdb';

// for encryption 
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv = "6ZVKvuqyYZ";  

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Node Js Project run successfully !!!.');
});

// User dynamic data insertion
app.post('/add_user', function (req, res) {

    MongoClient.connect(mongoDBurl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        if (err) throw err;
        var dbo = client.db(dbName);
        var firstname = req.body.firstName;
        var lastname = req.body.lastName;
        var telephone = req.body.telephone;
        var address = req.body.address;
        var ssn = encrypt(req.body.ssn);
    
        var myobj = { firstName: firstname, lastName: lastname, teleno: telephone, address: address, ssn: ssn };
        let data;
        
        dbo.collection("user").insertOne(myobj, function (err, resp) {
            if (err) throw err;
            data = {status:200, message:'data inserted'};
            res.send(data);
            client.close();
        });
       
    });
    
});

// Get user data list
app.get('/getuserlist', function (req, res) {
    var data;
    MongoClient.connect(mongoDBurl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        if (err) throw err;
        var dbo = client.db(dbName);
        dbo.collection("user").find({}).toArray(function (err, result) {
            if (err) throw err;

            for(var i = 0; i< result.length; i++)
            {
                var newval = decrypt(result[i]['ssn']);
                result[i]['ssn'] = newval;
            }
            data = result;
            res.send(data);
            client.close();
        });
    });

});

// Validate admin login
app.post('/admin_login', function (req, res) {
    const temp = encrypt(req.body.password);
    const dec = decrypt(temp);

    MongoClient.connect(mongoDBurl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        if (err) throw err;
        var dbo = client.db(dbName);

        dbo.collection("admin_login").findOne({username: req.body.email, password: req.body.password},function (err, result) {
            if (err) throw err;            
            if(result) {
                data = {status: 200, message:'success', data:{id:result._id}}
            } else {
                data = {status: 400, message:'login error'}
            }
            res.send(data);
            client.close();
        });
    });
});

// SSN Encryption
function encrypt(text) {
    var mykey = crypto.createCipher('aes-128-cbc', iv);
    var mystr = mykey.update(text, 'utf8', 'hex')
    mystr += mykey.final('hex');
    
    return mystr.toString();
}
   
// SSN decyption
function decrypt(text) {
    var mykey = crypto.createDecipher('aes-128-cbc', iv);
    var mystr = mykey.update(text, 'hex', 'utf8')
    mystr += mykey.final('utf8');
    
    return mystr.toString();
}

// Server Reset
var server = app.listen(5000, function (err) {
    if (err) console.log("Error in server setup");
    objuserDB.configure_database();
    console.log('Node Express server is running..');
});

