const mongoose = require('mongoose')
var dbconfig = require('../dbconfig')

function connect(){
    return new Promise((resolve, reject) => {

        if(process.env.NODE_ENV === 'test'){
            const Mockgoose = require('mockgoose').Mockgoose;
            const mg = new Mockgoose(mongoose);
            mg.prepareStorage()
            .then(() => {
                mongoose
                .connect(dbconfig.url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
                .then((res, err) => {
                    if(err){
                        return reject(err);
                    }
                    resolve();
                })
            });
        }else{
            mongoose
            .connect(dbconfig.url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
            .then((res, err) => {
                if(err){
                    return reject(err);
                }
                resolve();
            })
        }
    })
}

function close(){
    return mongoose.disconnect();
}

module.exports = {connect, close};