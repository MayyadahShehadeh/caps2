'use strict';

const events = require('../GlobalEventPool');


require('./caps');
require('./vendor');

events.on('driverPickedup', (payload) => {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.vendorObject.orderId}`);
        events.emit('in-transit', payload);
    }, 1000);

}) 

events.on('driverInTransit', (payload) => {
    setTimeout(() => {
        console.log(`DRIVER: delivered up  ${payload.vendorObject.orderId}`);
        events.emit('vendorThanksDeliveried', payload);

    }, 3000);

})




module.exports = events;