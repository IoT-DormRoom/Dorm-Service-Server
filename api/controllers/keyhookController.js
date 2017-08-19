'use strict';
var Particle = require('particle-api-js');
var _und = require("underscore");

module.exports.getAllKeyhooks = function(req, res) {
    var particleUsername = process.env.PARTICLE_USER;
    var particlePassword = process.env.PARTICLE_PASS;
    var keyhookID = process.env.KEYHOOK_ID;
    var token = null;

    var particle = new Particle();
    var resObj = {
        leftHook: null,
        rightHook: null
    };
    particle = new Particle();
    particle.login({ username: particleUsername, password: particlePassword })
        .then(data => {
                token = data.body.access_token
                return particle.getVariable({
                    deviceId: keyhookID,
                    name: 'detected1',
                    auth: token
                })
            },
            err => res.status(400).jsonp(err))
        .then(
            data => {
                resObj.leftHook = data.body.result;
                console.log(resObj);
                return particle.getVariable({
                    deviceId: keyhookID,
                    name: 'detected2',
                    auth: token
                })
            },
            err => res.status(400).jsonp(err))
        .then(
            data => {
                resObj.rightHook = data.body.result;
                res.status(200).jsonp(resObj);
            },
            err => res.status(400).jsonp(err));
}
