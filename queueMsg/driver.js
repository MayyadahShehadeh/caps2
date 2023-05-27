'use strict';

// const events = require('../GlobalEventPool');

const io = require('socket.io-client');
const host ='http://localhost:3000/caps';
const capsConnection = io.connect(host);

// require('./caps');
// require('./vendor');

capsConnection.emit('get_all');

capsConnection.on('order', payload=> {
    console.log("i got the order and i will deleverd it : ", payload.id)
    capsConnection.emit('received', payload)
    
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.id}`);
        capsConnection.emit('in-transit', payload);
    }, 1500);

    setTimeout(() => {
        console.log(`DRIVER: delivered up  ${payload.id}`);
        capsConnection.emit('delivered', payload);

    }, 3000);


})
