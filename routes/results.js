var express = require('express');
var router = express.Router();
var insert = require('./dbmethods').insertDoc;
var find = require('./dbmethods').findDoc;
var update = require('./dbmethods').updateDoc;
var remove = require('./dbmethods').removeDoc;

router
.get('/:companyid', (req, res) => {
    find(req, res);
})
.post('/', (req, res) => {
    insert(req, res);
})
.patch('/:companyid', (req, res) => {
    update(req, res);
})
.delete('/:companyid', (req, res) => {
    remove(req, res);
});



module.exports = router;