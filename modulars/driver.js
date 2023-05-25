'use strict';

// const events = require('../GlobalEventPool');

const io = require('socket.io-client');
const host ='http://localhost:3000/caps';
const capsConnection = io.connect(host);

// require('./caps');
// require('./vendor');

capsConnection.on('driverPickedup', (payload) => {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.vendorObject.orderId}`);
        capsConnection.emit('in-transit', payload);
    }, 1000);

}) 

capsConnection.on('driverInTransit', (payload) => {
    setTimeout(() => {
        console.log(`DRIVER: delivered up  ${payload.vendorObject.orderId}`);
        // capsConnection.emit('vendorThanksDeliveried', payload);

    }, 3000);

})
