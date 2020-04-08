var config = require('../dbconfig');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
const url = config.url;
const db = config.db;
var collection = config.collection;
var dbconnection = null;
const mongoose = require('mongoose');
const PertinentResult = require('../models/pertinentResultModel');

    var insertDoc = async function(req, res) {
        const new_pr = new PertinentResult(req.body);
        new_pr
        .save()
        .then(result => {
            res.json(result);
        })
    };
    
    var findDoc = async function(req, res) {

        var companyid = req.params.companyid;
        var query = null; 
        if(companyid == "all" || companyid == "count"){
            query = {}; // {} equivalent to SELECT * FROM <table>
        }else{
            query = {"company_id": companyid};
        }

        PertinentResult
        .find(query)
        .exec()
        .then(data => {
            if(companyid == "count"){
                var numRecords = 0;
                data.forEach(element => {
                    numRecords++;
                });
                res.json({"number_of_records": numRecords})
            }else{
                if(data != []){
                    res.json(data);
                }else{
                    res.json({"number_of_records": "company id did not match any records."});
                }
            }
        }).catch(err => {
            console.log(err);
        })
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