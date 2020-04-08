var mongoose = require('mongoose');
const config = require('../dbconfig');
var coll = config.collection;
var qacoll = config["qa-collection"];

const pertinentResultSchema = mongoose.Schema({
    company_id: {type: String, require: true},
    location: {type: String, require: true},
    date_time: {type: String, require: true},
    num_bad: {type: String, require: true},
    num_neutral: {type: String, require: true},
    num_good: {type: String, require: true},
    retweet_count: {type: String, require: true},
    favorite_count: {type: String, require: true},
    replies_count: {type: String, require: true}	
})

module.exports = mongoose.model('OSNI PR', pertinentResultSchema, qacoll);