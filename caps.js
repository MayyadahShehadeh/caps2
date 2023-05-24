'use strict';

const events = require('./GlobalEventPool');
require('./driver');

let date = new Date().toString();

events.on('pickup', (payload) => {

    console.log('EVENT', {
        event: 'pickup',
        time: date,
        payload: payload
    }
    );
    events.emit('driverPickedup', payload);
});


events.on('in-transit', (payload) => {
    console.log('EVENT', {
        event: 'in-transit',
        time: date,
        payload: payload
    });
    events.emit('driverInTransit', payload);
});


events.on('delivered', (payload) => {
    console.log('EVENT', {
        event: 'delivered',
        time: date,
        payload: payload

    }
        , '------------------------');

});



module.exports = events;