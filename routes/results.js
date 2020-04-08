var express = require('express');
var router = express.Router();
var insert = require('./dbmethods').insertDoc;
var find = require('./dbmethods').findDoc;
var update = require('./dbmethods').updateDoc;
var remove = require('./dbmethods').removeDoc;
var ObjectID = require('mongodb').ObjectID;

router
.get('/:companyid', (req, res) => {
    find(req, res);
})
.post('/', (req, res) => {
    if(insertPreCheckIsValid(req, res) && insertPreBoundaryCheckIsValid(req, res)){
        insert(req, res);
    }
})
.patch('/:companyid', (req, res) => {
    update(req, res);
})
.delete('/:companyid', (req, res) => {
    remove(req, res);
});

var findPreCheckIsValid = (req, res)=> {
    var cid = req.body.company_id;
    if(cid == "all" || cid == "count" || ObjectID.isValid(cid)){

    }else{
        res.status(400).send({"status_code": 400, "boundary_error": "company_id is not one of the legal nouns. [all, count, 'MongoDB ObjectID']"});
        return false;
    }
    return true;
}

var insertPreBoundaryCheckIsValid = (req, res) => {
    var num_bad_int = parseInt(req.body.num_bad);
    var num_neutral_int = parseInt(req.body.num_neutral);
    var num_good_int = parseInt(req.body.num_good);
    var retweet_count_int = parseInt(req.body.retweet_count);
    var favorite_count_int = parseInt(req.body.favorite_count);
    var replies_count_int = parseInt(req.body.replies_count);

    if((isNaN(num_bad_int)) || num_bad_int <= -1 || num_bad_int >= 5000001){
        res.status(400).send({"status_code": 400, "boundary_error": "num_bad is outside the specifed range of values. [0, 5000000]"});
        return false;
    }
    else if(isNaN(num_neutral_int) || num_neutral_int <= -1 || num_neutral_int >= 5000001){
        res.status(400).send({"status_code": 400, "boundary_error": "num_neutral is outside the specifed range of values. [0, 5000000]"});
        return false;
    }
    else if(isNaN(num_good_int) ||num_good_int <= -1 || num_good_int >= 5000001){
        res.status(400).send({"status_code": 400, "boundary_error": "num_good is outside the specifed range of values. [0, 5000000]"});
        return false;
    }
    else if(isNaN(retweet_count_int) ||retweet_count_int <= -1 || retweet_count_int >= 5000001){
        res.status(400).send({"status_code": 400, "boundary_error": "retweet_count is outside the specifed range of values. [0, 5000000]"});
        return false;
    }
    else if(isNaN(favorite_count_int) ||favorite_count_int <= -1 || favorite_count_int >= 5000001){
        res.status(400).send({"status_code": 400, "boundary_error": "favorite_count is outside the specifed range of values. [0, 5000000]"});
        return false;
    }
    else if(isNaN(replies_count_int) ||replies_count_int <= -1 || replies_count_int >= 5000001){
        res.status(400).send({"status_code": 400, "boundary_error": "replies_count is outside the specifed range of values. [0, 5000000]"});
        return false;
    }

    return true;
}

var insertPreCheckIsValid = (req, res) => {
    
    if(req.body.company_id == "" || req.body.company_id == null){
        res.status(400).send({"status_code": 400, "key_error": "company_id missing value"});
        return false;
    }
    else if(req.body.location == "" || req.body.location == null){
        res.json({"status_code": 400, "key_error": "location missing value"})
        return false;
    }
    else if(req.body.date_time == "" || req.body.date_time == null){
        res.json({"status_code": 400, "key_error": "date_time missing value"})
        return false;
    }
    else if(req.body.num_bad == "" || req.body.num_bad == null){
        res.json({"status_code": 400, "key_error": "num_bad missing value"})
        return false;
    }
    else if(req.body.num_neutral == "" || req.body.num_neutral == null){
        res.json({"status_code": 400, "key_error": "num_neutral missing value"})
        return false;
    }
    else if(req.body.num_good == "" || req.body.num_good == null){
        res.json({"status_code": 400, "key_error": "num_good missing value"})
        return false;
    }
    else if(req.body.retweet_count == "" || req.body.retweet_count == null){
        res.json({"status_code": 400, "key_error": "retweet_count missing value"})
        return false;
    }
    else if(req.body.favorite_count == "" || req.body.favorite_count == null){
        res.json({"status_code": 400, "key_error": "favorite_count missing value"})
        return false;
    }
    else if(req.body.replies_count == "" || req.body.replies_count == null){
        res.json({"status_code": 400, "key_error": "replies_count missing value"})
        return false;
    }

    return true;

}



module.exports = router;