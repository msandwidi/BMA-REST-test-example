var config = require('../dbconfig');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
const url = config.url;
const db = config.db;
const collection = config.collection;
var dbconnection = null;

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
        assert.equal(err, null);
        dbconnection = client.db(db);
    });


    var insertDoc = async function(req, res) {
        await dbconnection.collection(collection).insertOne( 
            req.body, 
            function(err, result) {
                assert.equal(err, null);
                console.log("Inserted a document into the results collection.");
                res.json(result).end();
            }
        );
    };
    
    var findDoc = async function(req, res) {
        var companyid = req.params.companyid;
        var query = null; 
        if(companyid == "all" || companyid == "count"){
            query = {}; // {} equivalent to SELECT * FROM <table>
        }else{
            query = {"company_id": companyid};
        }
        console.log(companyid);
        await dbconnection
        .collection(collection)
        .find(query)//search here
        .toArray()
        .then( data => {
            if(companyid == "count"){
                var numRecords = 0;
                data.forEach(element => {
                    numRecords++
                });
                res.json({"number_of_records": numRecords});
            }else{
                res.json(data);
            }
        }).catch( err => {
            console.log(err);
        });
    };
    
    var updateDoc = async function(req, res) {
        var companyid = req.params.companyid;
        await dbconnection
        .collection(collection)
        .updateOne(
            { 
                "company_id" : companyid
            },
            {
                $set: { "company_id": companyid},
                $currentDate: { "lastModified": true}
            },
            function(err, results) {
                console.log(results);
                res.json(results).end();
            });
    };
    
    var removeDoc = async function(req, res) {
        var companyid = req.params.companyid;
        await dbconnection
        .collection(collection)
        .deleteMany(
            {
                "company_id": companyid
            },
            function(err, results) {
                console.log(results);
                res.json(results).end();
            }
        );
    };

    module.exports = {
        removeDoc,
        updateDoc,
        findDoc,
        insertDoc
    }